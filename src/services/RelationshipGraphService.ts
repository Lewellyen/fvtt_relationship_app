import type { NodeData, EdgeData, IDocument } from "../global";
import type { IRelationshipGraphService } from "./IRelationshipGraphService";

export class RelationshipGraphService implements IRelationshipGraphService {
  private nodes: NodeData[] = [];
  private edges: EdgeData[] = [];

  constructor(private document: IDocument) {
    this.loadData();
  }

  getNodes(): NodeData[] {
    return [...this.nodes];
  }

  getEdges(): EdgeData[] {
    return [...this.edges];
  }

  getNode(nodeId: string): NodeData | undefined {
    return this.nodes.find((n) => n.id === nodeId);
  }
  getEdge(edgeId: string): EdgeData | undefined {
    return this.edges.find((e) => e.id === edgeId);
  }
  getNodeByLabel(label: string): NodeData | undefined {
    return this.nodes.find((n) => n.label === label);
  }
  getEdgeByLabel(label: string): EdgeData | undefined {
    return this.edges.find((e) => e.label === label);
  }
  getNodeByType(type: string): NodeData | undefined {
    return this.nodes.find((n) => n.type === type);
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

  async addNode(node: NodeData): Promise<void> {
    const existingNodeIndex = this.nodes.findIndex((n) => n.id === node.id);
    if (existingNodeIndex >= 0) {
      this.nodes[existingNodeIndex] = node;
    } else {
      this.nodes.push(node);
    }
    await this.saveData();
  }

  async addEdge(edge: EdgeData): Promise<void> {
    const newEdge: EdgeData = {
      ...edge,
      id: edge.id || foundry.utils.randomID(),
      label: edge.label || `${edge.source} → ${edge.target}`,
      type: edge.type || "relation",
      color: edge.color || "#000000",
    }

    const existingEdgeIndex = this.edges.findIndex((e) => e.id === newEdge.id);
    if (existingEdgeIndex >= 0) {
      this.edges[existingEdgeIndex] = newEdge;
    } else {
      this.edges.push(newEdge);
    }
    await this.saveData();
  }

  async updateNode(nodeId: string, updates: Partial<NodeData>): Promise<void> {
    const nodeIndex = this.nodes.findIndex((n) => n.id === nodeId);
    if (nodeIndex >= 0) {
      this.nodes[nodeIndex] = { ...this.nodes[nodeIndex], ...updates };
      await this.saveData();
    }
  }

  async removeNode(nodeId: string): Promise<void> {
    this.nodes = this.nodes.filter((n) => n.id !== nodeId);
    this.edges = this.edges.filter((e) => e.source !== nodeId && e.target !== nodeId);
    await this.saveData();
  }

  async updateEdge(edgeId: string, updates: Partial<EdgeData>): Promise<void> {
    const edgeIndex = this.edges.findIndex((e) => e.id === edgeId);
    if (edgeIndex >= 0) {
      this.edges[edgeIndex] = { ...this.edges[edgeIndex], ...updates };
      await this.saveData();
    }
  }

  async removeEdge(edgeId: string): Promise<void> {
    this.edges = this.edges.filter((e) => e.id !== edgeId);
    await this.saveData();
  }

  private loadData(): void {
    const system = this.document.system;
    this.nodes = system.nodes || [];
    this.edges = system.edges || [];
  }

  private async saveData(): Promise<void> {
    await this.document.update({
      "system.nodes": this.nodes,
      "system.edges": this.edges,
    });
  }
}
