import type { GraphModel, NodeData, EdgeData, NodePolicy } from "../types/RelationshipGraphTypes";

export class GraphService {
  private _page: JournalEntryPage;
  private _snapshot: GraphModel | null;
  private _instanceId: string;

  constructor(page: JournalEntryPage) {
    this._page = page;
    this._snapshot = null;
    this._instanceId = foundry.utils.randomID();
  }

  // -- Public ----------------------------------------------------------------

  async init(page: JournalEntryPage): Promise<void> {
    this._page = page;
    this._snapshot = foundry.utils.deepClone(this._loadFromSystem());
  }

  get instanceId(): string {
    return this._instanceId;
  }

  getSnapshot(): Readonly<GraphModel> {
    if (!this._snapshot) throw new Error("GraphService not initialized. Call init() first.");
    return foundry.utils.deepClone(this._snapshot);
  }

  getNode(id: string): NodeData | undefined {
    return this._snapshot?.nodes[id];
  }

  async addNode(node: NodeData): Promise<void> {
    const next = this._cloneCurrent();
    next.nodes[node.id] = foundry.utils.deepClone(node);
    await this._write(next);
  }

  async updateNode(id: string, patch: Partial<NodeData>): Promise<void> {
    const next = this._cloneCurrent();
    const base = next.nodes[id] ?? ({ id } as NodeData);
    next.nodes[id] = { ...base, ...patch, id };
    await this._write(next);
  }

  async removeNode(id: string): Promise<void> {
    const next = this._cloneCurrent();
    delete next.nodes[id];
    for (const [eid, e] of Object.entries(next.edges)) {
      if (e.source === id || e.target === id) delete next.edges[eid];
    }
    if (next.policy) delete next.policy[id];
    await this._write(next);
  }

  getEdge(id: string): EdgeData | undefined {
    return this._snapshot?.edges[id];
  }

  async addEdge(edge: EdgeData): Promise<void> {
    const next = this._cloneCurrent();
    this._assertEndpointsExist(next, edge.source, edge.target);
    next.edges[edge.id] = foundry.utils.deepClone(edge);
    await this._write(next);
  }

  async updateEdge(id: string, patch: Partial<EdgeData>): Promise<void> {
    const next = this._cloneCurrent();
    const base = next.edges[id] ?? ({ id } as EdgeData);
    const newSource = patch.source ?? base.source;
    const newTarget = patch.target ?? base.target;
    if (newSource && newTarget) this._assertEndpointsExist(next, newSource, newTarget);
    next.edges[id] = { ...base, ...patch, id };
    await this._write(next);
  }

  async removeEdge(id: string): Promise<void> {
    const next = this._cloneCurrent();
    delete next.edges[id];
    await this._write(next);
  }

  async setPolicy(nodeId: string, policy: NodePolicy): Promise<void> {
    const next = this._cloneCurrent();
    if (!next.policy) next.policy = {};
    next.policy[nodeId] = foundry.utils.deepClone(policy);
    await this._write(next);
  }

  getPolicy(nodeId: string): NodePolicy | undefined {
    return this._snapshot?.policy?.[nodeId];
  }

  // -- Intern ----------------------------------------------------------------

  private _loadFromSystem(): GraphModel {
    const sys = this._page.system as any;
    return {
      version: sys.version ?? 1,
      nodes: foundry.utils.deepClone(sys.nodes ?? {}),
      edges: foundry.utils.deepClone(sys.edges ?? {}),
      policy: foundry.utils.deepClone(sys.policy ?? {})
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
    if (!this._snapshot) throw new Error("init() first");

    const prev = this._snapshot;
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

    await this._page.update(patch, { _graphService: this._instanceId, render: false } as any);
  }

  /**
   * Patch für Dictionary-Felder (Record<string, any>) erzeugen:
   * - Entfernte Keys -> `${basePath}.-=${key}`: null
   * - Neu/Geändert   -> `${basePath}.${key}`: value   (robust: ganzen Eintrag setzen)
   *   (Optional: granular pro Feld mit diffObject, siehe Kommentar)
   */
  private _dictDiff(
    basePath: string,
    prev: Record<string, any>,
    next: Record<string, any>
  ): Record<string, unknown> {
    const patch: Record<string, unknown> = {};

    // 1) Deletions
    for (const k of Object.keys(prev)) {
      if (!(k in next)) patch[`${basePath}.-=${k}`] = null;
    }

    // 2) Inserts/Updates
    for (const [k, newVal] of Object.entries(next)) {
      const oldVal = prev[k];
      if (oldVal === undefined) {
        patch[`${basePath}.${k}`] = newVal;
      } else {
        const d = foundry.utils.diffObject(oldVal, newVal);
        if (!foundry.utils.isEmpty(d)) {
          // a) robust & simpel: kompletten Eintrag setzen
          patch[`${basePath}.${k}`] = newVal;

          // b) granular (optional): nur geänderte Felder
          // for (const [p, v] of Object.entries(d)) {
          //   patch[`${basePath}.${k}.${p}`] = v;
          // }
        }
      }
    }

    return patch;
  }

  private _assertEndpointsExist(g: GraphModel, source: string, target: string): void {
    if (!g.nodes[source]) throw new Error(`Edge source '${source}' does not exist`);
    if (!g.nodes[target]) throw new Error(`Edge target '${target}' does not exist`);
  }
}
