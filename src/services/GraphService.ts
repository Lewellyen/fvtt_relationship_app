import type {
  GraphModel,
  NodeData,
  EdgeData,
  NodePolicy,
  FieldPath,
} from "../types/RelationshipGraphTypes";
import type { IFoundryAdapter } from "../core/adapters/IFoundryAdapter";
import { FoundryLogger } from "../core/services/FoundryLogger";

export class GraphService {
  // ✅ Metadaten für Service Registration
  static readonly API_NAME = "graphService";
  static readonly SERVICE_TYPE = "scoped" as const;
  static readonly CLASS_NAME = "GraphService";
  static readonly DEPENDENCIES = [FoundryLogger]; // ✅ Dependencies werden über Container injiziert
  private _page?: JournalEntryPage | undefined;
  private _snapshot: GraphModel | null;
  private _instanceId: string;
  private _initialized: boolean = false;
  private _foundryAdapter?: IFoundryAdapter | undefined;

  constructor(page?: JournalEntryPage, foundryAdapter?: IFoundryAdapter) {
    this._page = page;
    this._foundryAdapter = foundryAdapter;
    this._snapshot = null;
    this._instanceId = foundry.utils.randomID();
  }

  // -- Public ----------------------------------------------------------------

  async init(page: JournalEntryPage): Promise<void> {
    this._page = page;
    
    // FoundryAdapter über API abrufen, falls nicht injiziert
    if (!this._foundryAdapter) {
      const api = (globalThis as any).game?.modules?.get("relationship-app")?.api;
      this._foundryAdapter = api?.foundryAdapter;
    }
    
    this._snapshot = foundry.utils.deepClone(this._loadFromSystem());
    this._initialized = true;
  }

  get instanceId(): string {
    return this._instanceId;
  }

  getSnapshot(): Readonly<GraphModel> {
    if (!this._initialized || !this._snapshot) throw new Error("GraphService not initialized. Call init() first.");
    return foundry.utils.deepClone(this._snapshot);
  }

  getNode(id: string): NodeData | undefined {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    return this._snapshot?.nodes[id];
  }

  async addNode(node: NodeData): Promise<void> {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    const next = this._cloneCurrent();
    next.nodes[node.id] = foundry.utils.deepClone(node);
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
    next.edges[edge.id] = foundry.utils.deepClone(edge);
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
    if (!game.user?.isGM) throw new Error("Only GM can modify policies.");
    const next = this._cloneCurrent();
    if (!next.policy) next.policy = {};
    next.policy[nodeId] = foundry.utils.deepClone(policy);
    await this._write(next);
  }

  getPolicy(nodeId: string): NodePolicy | undefined {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    return this._snapshot?.policy?.[nodeId];
  }

  /** GM-only: Node-Sichtbarkeit (für Spieler) setzen */
  async setNodeVisible(nodeId: string, visible: boolean): Promise<void> {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    if (!game.user?.isGM) throw new Error("Only GM can modify node visibility.");
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
    if (!game.user?.isGM) throw new Error("Only GM can remove policies.");
    const next = this._cloneCurrent();
    if (!next.policy || !(nodeId in next.policy)) return;
    delete next.policy[nodeId];
    await this._write(next);
  }

  /** GM-only: nur Node-Visibility zurücksetzen (Policy-Eintrag bleibt sonst erhalten) */
  async clearNodeVisible(nodeId: string): Promise<void> {
    if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
    if (!game.user?.isGM) throw new Error("Only GM can modify visibility.");
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
    if (!game.user?.isGM) throw new Error("Only GM can modify field policies.");
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

  private _loadFromSystem(): GraphModel {
    if (!this._page) throw new Error("GraphService not initialized. Call init() first.");
    const sys = this._page.system as any;
    return {
      version: sys.version ?? 1,
      nodes: foundry.utils.deepClone(sys.nodes ?? {}),
      edges: foundry.utils.deepClone(sys.edges ?? {}),
      policy: foundry.utils.deepClone(sys.policy ?? {}),
    } as GraphModel;
  }

  private _cloneCurrent(): GraphModel {
    if (!this._snapshot) throw new Error("GraphService not initialized. Call init() first.");
    return foundry.utils.deepClone(this._snapshot);
  }

  private async _write(next: GraphModel): Promise<void> {
    await this._writeToSystem(next);
    this._snapshot = foundry.utils.deepClone(next);
  }

  private async _writeToSystem(next: GraphModel): Promise<void> {
    if (!this._initialized || !this._page) throw new Error("GraphService not initialized. Call init() first.");

    const prev = this._snapshot;
    if (!prev) throw new Error("GraphService not initialized. Call init() first.");
    
    let patch: Record<string, unknown> = {};

    // version (optional – setze nur, wenn geändert)
    if (next.version !== prev.version) {
      patch["system.version"] = next.version;
    }

    // Dictionaries diffen (Nodes, Edges, Policy)
    patch = { ...patch, ...this._dictDiff("system.nodes", prev.nodes, next.nodes) };
    patch = { ...patch, ...this._dictDiff("system.edges", prev.edges, next.edges) };
    patch = { ...patch, ...this._dictDiff("system.policy", prev.policy ?? {}, next.policy ?? {}) };

    if (foundry.utils.isEmpty(patch)) return;

    // FoundryAdapter verwenden für konsistente Updates mit Reload
    if (this._foundryAdapter) {
      await this._foundryAdapter.updateDocumentWithReload(this._page, patch);
    } else {
      // Fallback: Direktes Update (für Backward-Kompatibilität)
      await this._page.update(patch, { _graphService: this._instanceId, render: false } as any);
    }
  }

  /**
   * Patch für Dictionary-Felder (Record<string, any>) erzeugen:
   * - Entfernte Keys -> `${basePath}.-=${key}`: null
   * - Neu/Geändert   -> `${basePath}.${key}`: value   (ganzen Eintrag setzen)
   */
  private _dictDiff(
    basePath: string,
    prev: Record<string, any>,
    next: Record<string, any>
  ): Record<string, unknown> {
    const patch: Record<string, unknown> = {};

    // 1) Deletions (Top-Level)
    for (const k of Object.keys(prev)) {
      if (!(k in next)) patch[`${basePath}.-=${k}`] = null;
    }

    // 2) Inserts/Updates (ganzer Eintrag, robust & simpel)
    for (const [k, newVal] of Object.entries(next)) {
      const oldVal = prev[k];
      if (oldVal === undefined) {
        patch[`${basePath}.${k}`] = newVal;
      } else {
        const d = foundry.utils.diffObject(oldVal, newVal);
        if (!foundry.utils.isEmpty(d)) patch[`${basePath}.${k}`] = newVal;
      }
    }

    return patch;
  }

  private _assertEndpointsExist(g: GraphModel, source: string, target: string): void {
    if (!g.nodes[source]) throw new Error(`Edge source '${source}' does not exist`);
    if (!g.nodes[target]) throw new Error(`Edge target '${target}' does not exist`);
  }
}
