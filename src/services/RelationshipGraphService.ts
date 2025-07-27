import type { NodeData, EdgeData, RelationshipGraphData, IDocument } from "../global";
import type { IRelationshipGraphService } from "./IRelationshipGraphService";
import type { IRelationshipGraphPersistenceService } from "./IRelationshipGraphPersistenceService";

export class RelationshipGraphService implements IRelationshipGraphService {
  private nodes: NodeData[] = [];
  private edges: EdgeData[] = [];

  constructor(
    private document: IDocument,
    private persistence: IRelationshipGraphPersistenceService
  ) {
    this.loadData();
  }

  getNodes(): NodeData[] {
    return [...this.nodes];
  }

  getEdges(): EdgeData[] {
    return [...this.edges];
  }

  getGraph(): RelationshipGraphData {
    return {
      name: "Relationship Graph",
      permissions: { defaultLevel: 0, users: [] },
      nodes: this.nodes,
      edges: this.edges,
    };
  }

  getNode(nodeId: string): NodeData | undefined {
    return this.nodes.find((n) => n.id === nodeId);
  }

  getEdge(edgeId: string): EdgeData | undefined {
    return this.edges.find((e) => e.id === edgeId);
  }

  getNodeByLabel(label: string): NodeData | undefined {
    return this.nodes.find((n) => n.label?.value === label);
  }

  getEdgeByLabel(label: string): EdgeData | undefined {
    return this.edges.find((e) => e.label?.value === label);
  }

  getNodeByType(type: string): NodeData | undefined {
    return this.nodes.find((n) => n.type.value === type);
  }

  getEdgeByType(type: string): EdgeData | undefined {
    return this.edges.find((e) => e.type === type);
  }

  getNodeById(id: string): NodeData | undefined {
    return this.nodes.find((n) => n.id === id);
  }

  getEdgeById(id: string): EdgeData | undefined {
    return this.edges.find((e) => e.id === id);
  }

  /**
   * Fügt einen neuen Node hinzu oder aktualisiert einen bestehenden und speichert die Änderung.
   */
  async addNode(node: NodeData): Promise<void> {
    const existingNodeIndex = this.nodes.findIndex((n) => n.id === node.id);
    if (existingNodeIndex >= 0) {
      this.nodes[existingNodeIndex] = node;
    } else {
      this.nodes.push(node);
    }
    const updateObj = {
      "system.nodes": this.nodes,
      "system.edges": this.edges,
    };
    await this.saveData(updateObj);
  }

  /**
   * Fügt eine neue Kante hinzu oder aktualisiert eine bestehende und speichert die Änderung.
   */
  async addEdge(edge: EdgeData): Promise<void> {
    const defaultPermissions = { defaultLevel: 0, users: [] };
    const newEdge: EdgeData = {
      ...edge,
      id: edge.id || foundry.utils.randomID(),
      label: edge.label || {
        value: `${edge.source} → ${edge.target}`,
        permissions: defaultPermissions,
      },
      type: edge.type || "relation",
      globalPermissions: edge.globalPermissions || defaultPermissions,
    };

    const existingEdgeIndex = this.edges.findIndex((e) => e.id === newEdge.id);
    if (existingEdgeIndex >= 0) {
      this.edges[existingEdgeIndex] = newEdge;
    } else {
      this.edges.push(newEdge);
    }
    const updateObj = {
      "system.nodes": this.nodes,
      "system.edges": this.edges,
    };
    await this.saveData(updateObj);
  }

  /**
   * Aktualisiert einen bestehenden Node anhand der ID und speichert die Änderung.
   */
  async updateNode(nodeId: string, updates: Partial<NodeData>): Promise<void> {
    const nodeIndex = this.nodes.findIndex((n) => n.id === nodeId);
    if (nodeIndex >= 0) {
      this.nodes[nodeIndex] = { ...this.nodes[nodeIndex], ...updates };
      const updateObj = {
        "system.nodes": this.nodes,
        "system.edges": this.edges,
      };
      await this.saveData(updateObj);
    }
  }

  /**
   * Entfernt einen Node und alle zugehörigen Kanten und speichert die Änderung.
   */
  async removeNode(nodeId: string): Promise<void> {
    this.nodes = this.nodes.filter((n) => n.id !== nodeId);
    this.edges = this.edges.filter((e) => e.source !== nodeId && e.target !== nodeId);
    const updateObj = {
      "system.nodes": this.nodes,
      "system.edges": this.edges,
    };
    await this.saveData(updateObj);
  }

  /**
   * Aktualisiert eine bestehende Kante anhand der ID und speichert die Änderung.
   */
  async updateEdge(edgeId: string, updates: Partial<EdgeData>): Promise<void> {
    const edgeIndex = this.edges.findIndex((e) => e.id === edgeId);
    if (edgeIndex >= 0) {
      this.edges[edgeIndex] = { ...this.edges[edgeIndex], ...updates };
      const updateObj = {
        "system.nodes": this.nodes,
        "system.edges": this.edges,
      };
      await this.saveData(updateObj);
    }
  }

  /**
   * Entfernt eine Kante anhand der ID und speichert die Änderung.
   */
  async removeEdge(edgeId: string): Promise<void> {
    this.edges = this.edges.filter((e) => e.id !== edgeId);
    const updateObj = {
      "system.nodes": this.nodes,
      "system.edges": this.edges,
    };
    await this.saveData(updateObj);
  }

  private loadData(): void {
    this.persistence
      .load(this.document)
      .then((graph) => {
        this.nodes = graph.nodes;
        this.edges = graph.edges;
      })
      .catch((err) => console.error(err));
  }

  /**
   * Speichert die übergebenen Änderungen im Dokument.
   */
  private async saveData(updateObj: object): Promise<void> {
    await this.persistence.save(this.document, updateObj);
  }
}
