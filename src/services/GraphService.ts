import type {
  GraphModel,
  NodeData,
  EdgeData,
  NodePolicy,
  FieldPath,
} from "../types/RelationshipGraphTypes";
import type { IGraphRepository } from "../interfaces/core/IPorts";
import { IdGeneratorAdapter } from "../core/adapters/IdGeneratorAdapter";
import { TimeSourceAdapter } from "../core/adapters/TimeSourceAdapter";
import { GraphRepositoryAdapter } from "../core/adapters/GraphRepositoryAdapter";
import { FoundryLogger } from "../core/services/FoundryLogger";
import type { ILogger } from "../interfaces";

export class GraphService {
  // ✅ Metadaten für Service Registration
  static readonly API_NAME = "graphService";
  static readonly SERVICE_TYPE = "scoped" as const;
  static readonly CLASS_NAME = "GraphService";
  static readonly DEPENDENCIES = [FoundryLogger, IdGeneratorAdapter, TimeSourceAdapter, GraphRepositoryAdapter];
  
  private _snapshot: GraphModel | null;
  private _instanceId: string;
  private _initialized: boolean = false;

  constructor(
    private readonly logger: ILogger,
    private readonly idGenerator: IdGeneratorAdapter,
    private readonly timeSource: TimeSourceAdapter,
    public readonly repository: GraphRepositoryAdapter
  ) {
    this._snapshot = null;
    this._instanceId = this.idGenerator.generateId();
  }

  // -- Public ----------------------------------------------------------------

  async init(): Promise<void> {
    this._snapshot = await this.repository.load();
    this._initialized = true;
  }

  get instanceId(): string {
    return this._instanceId;
  }

  getSnapshot(): Readonly<GraphModel> {
    if (!this._initialized || !this._snapshot) throw new Error("GraphService not initialized. Call init() first.");
    return this._snapshot;
  }

  getNode(id: string): NodeData | undefined {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    return this._snapshot?.nodes[id];
  }

  async addNode(node: NodeData): Promise<void> {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    const next = this._cloneCurrent();
    next.nodes[node.id] = { ...node };
    await this._write(next);
  }

  async updateNode(id: string, patch: Partial<NodeData>): Promise<void> {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    const next = this._cloneCurrent();
    const base = next.nodes[id] ?? ({ id } as NodeData);
    next.nodes[id] = { ...base, ...patch, id };
    await this._write(next);
  }

  async removeNode(id: string): Promise<void> {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    const next = this._cloneCurrent();
    delete next.nodes[id];
    for (const [eid, e] of Object.entries(next.edges)) {
      if (e.source === id || e.target === id) delete next.edges[eid];
    }
    if (next.policy) delete next.policy[id];
    await this._write(next);
  }

  getEdge(id: string): EdgeData | undefined {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    return this._snapshot?.edges[id];
  }

  async addEdge(edge: EdgeData): Promise<void> {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    const next = this._cloneCurrent();
    this._assertEndpointsExist(next, edge.source, edge.target);
    next.edges[edge.id] = { ...edge };
    await this._write(next);
  }

  async updateEdge(id: string, patch: Partial<EdgeData>): Promise<void> {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    const next = this._cloneCurrent();
    const base = next.edges[id] ?? ({ id } as EdgeData);
    const newSource = patch.source ?? base.source;
    const newTarget = patch.target ?? base.target;
    if (newSource && newTarget) this._assertEndpointsExist(next, newSource, newTarget);
    next.edges[id] = { ...base, ...patch, id };
    await this._write(next);
  }

  async removeEdge(id: string): Promise<void> {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    const next = this._cloneCurrent();
    delete next.edges[id];
    await this._write(next);
  }

  // --- Policy API ------------------------------------------------------------

  /** GM-only: komplette Policy eines Nodes setzen/überschreiben */
  async setPolicy(nodeId: string, policy: NodePolicy): Promise<void> {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    // Note: GM check should be handled by the calling application layer
    const next = this._cloneCurrent();
    if (!next.policy) next.policy = {};
    next.policy[nodeId] = { ...policy };
    await this._write(next);
  }

  getPolicy(nodeId: string): NodePolicy | undefined {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    return this._snapshot?.policy?.[nodeId];
  }

  /** GM-only: Node-Sichtbarkeit (für Spieler) setzen */
  async setNodeVisible(nodeId: string, visible: boolean): Promise<void> {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    // Note: GM check should be handled by the calling application layer
    const next = this._cloneCurrent();
    if (!next.policy) next.policy = {};
    const np: NodePolicy = next.policy[nodeId] ?? { visibility: {} };
    np.visible = visible;
    next.policy[nodeId] = np;
    await this._write(next);
  }

  /** Sichtbarkeitsstatus eines Nodes lesen (Default: false) */
  isNodeVisible(nodeId: string): boolean {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    const p = this._snapshot?.policy?.[nodeId];
    return p?.visible === true;
  }

  /** GM-only: komplette Policy eines Nodes entfernen */
  async removePolicy(nodeId: string): Promise<void> {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    // Note: GM check should be handled by the calling application layer
    const next = this._cloneCurrent();
    if (!next.policy || !(nodeId in next.policy)) return;
    delete next.policy[nodeId];
    await this._write(next);
  }

  /** GM-only: nur Node-Visibility zurücksetzen (Policy-Eintrag bleibt sonst erhalten) */
  async clearNodeVisible(nodeId: string): Promise<void> {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    // Note: GM check should be handled by the calling application layer
    const next = this._cloneCurrent();
    const p = next.policy?.[nodeId];
    if (!p) return;
    delete p.visible;
    next.policy![nodeId] = p;
    await this._write(next);
  }

  /** GM-only: Feld-Visibilities zurücksetzen (alle oder ausgewählte Pfade) */
  async clearFieldVisibility(nodeId: string, paths?: FieldPath[]): Promise<void> {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    // Note: GM check should be handled by the calling application layer
    const next = this._cloneCurrent();
    const p = next.policy?.[nodeId];
    if (!p) return;

    if (!paths || paths.length === 0) {
      p.visibility = {};
    } else {
      for (const fp of paths) delete p.visibility[fp];
    }
    next.policy![nodeId] = p;
    await this._write(next);
  }

  // -- Intern ----------------------------------------------------------------

  private _cloneCurrent(): GraphModel {
    if (!this._snapshot) throw new Error("GraphService not initialized. Call init() first.");
    return JSON.parse(JSON.stringify(this._snapshot)); // Deep clone without Foundry dependency
  }

  private async _write(next: GraphModel): Promise<void> {
    await this.repository.save(next);
    this._snapshot = next;
  }


  private _assertEndpointsExist(g: GraphModel, source: string, target: string): void {
    if (!g.nodes[source]) throw new Error(`Edge source '${source}' does not exist`);
    if (!g.nodes[target]) throw new Error(`Edge target '${target}' does not exist`);
  }
}
