import type { NodeData, EdgeData } from "../models/RelationsShipGraphModel";
import type {
  IDocument,
  IRelationshipGraphService,
} from "./IRelationshipGraphService";

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
      id: edge.id || foundry.utils.randomID(),
      from: edge.from,
      to: edge.to,
      label: edge.label,
      type: edge.type || "relation",
      color: edge.color || "#000000",
    };

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
    this.edges = this.edges.filter((e) => e.from !== nodeId && e.to !== nodeId);
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
