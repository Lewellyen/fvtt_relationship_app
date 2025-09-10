import type { IRelationshipGraphCRUDService, IRelationshipGraphDataManager, IRelationshipGraphPersistenceService } from "../../interfaces";
import type { IFoundryAdapter } from "../adapters/IFoundryAdapter";
// ✅ Services direkt importieren (zirkuläre Abhängigkeiten vermeiden)
import { RelationshipGraphDataManager } from "./RelationshipGraphDataManager";
import { RelationshipGraphPersistenceService } from "../../services/RelationshipGraphPersistenceService";
import { FoundryAdapter } from "../adapters/FoundryAdapter";

/**
 * RelationshipGraphCRUDService - Verantwortlich für CRUD Operations
 * Single Responsibility: Nur CRUD Operations
 */
export class RelationshipGraphCRUDService implements IRelationshipGraphCRUDService {
  // ✅ Metadaten für Service Registration
  static readonly API_NAME = "relationshipGraphCRUDService";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "RelationshipGraphCRUDService";
  static readonly DEPENDENCIES = [RelationshipGraphDataManager, RelationshipGraphPersistenceService, FoundryAdapter]; // ✅ Dependencies explizit definiert

  constructor(
    private readonly dataManager: IRelationshipGraphDataManager,
    private readonly persistence: IRelationshipGraphPersistenceService,
    private readonly foundryAdapter: IFoundryAdapter
  ) {}

  // Node CRUD
  async addNode(nodeData: any): Promise<void> {
    const existingNode = this.dataManager.findNodeById(nodeData.id);
    if (existingNode) {
      await this.updateNode(nodeData.id, nodeData);
      return;
    }

    const newNode = {
      data: {
        id: nodeData.id,
        label: nodeData.label || "",
        type: nodeData.type || "",
        x: nodeData.x,
        y: nodeData.y,
        permissions: nodeData.permissions || { defaultLevel: 0, users: [] },
        descriptions: nodeData.descriptions,
        playerRelationshipEffects: nodeData.playerRelationshipEffects,
        image: nodeData.image,
        zIndex: nodeData.zIndex,
        ...nodeData.cytoScapeAttributes,
      },
      position: {
        x: nodeData.x,
        y: nodeData.y,
      },
    };

    const nodes = this.dataManager.getNodes();
    nodes.push(newNode);
    this.dataManager.setNodes(nodes);

    await this.saveData();
  }

  async updateNode(nodeId: string, updates: any): Promise<void> {
    const node = this.dataManager.findNodeById(nodeId);
    if (!node) return;

    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        ...updates,
      },
    };

    const nodes = this.dataManager.getNodes();
    const index = nodes.findIndex((n: any) => n.data.id === nodeId);
    if (index >= 0) {
      nodes[index] = updatedNode;
      this.dataManager.setNodes(nodes);
      await this.saveData();
    }
  }

  async removeNode(nodeId: string): Promise<void> {
    const nodes = this.dataManager.getNodes().filter((n: any) => n.data.id !== nodeId);
    const edges = this.dataManager
      .getEdges()
      .filter((e: any) => e.data.source !== nodeId && e.data.target !== nodeId);

    this.dataManager.setNodes(nodes);
    this.dataManager.setEdges(edges);

    await this.saveData();
  }

  // Edge CRUD
  async addEdge(edgeData: any): Promise<void> {
    const defaultPermissions = { defaultLevel: 0, users: [] };
    const newEdge = {
      data: {
        id: edgeData.id || this.foundryAdapter.generateId(),
        source: edgeData.source,
        target: edgeData.target,
        label: edgeData.label || `${edgeData.source} → ${edgeData.target}`,
        type: edgeData.type || "relation",
        permissions: edgeData.permissions || defaultPermissions,
        connectionCategory: edgeData.connectionCategory,
        zIndex: edgeData.zIndex,
        ...edgeData.cytoScapeAttributes,
      },
    };

    const edges = this.dataManager.getEdges();
    const existingEdgeIndex = edges.findIndex((e: any) => e.data.id === newEdge.data.id);

    if (existingEdgeIndex >= 0) {
      edges[existingEdgeIndex] = newEdge;
    } else {
      edges.push(newEdge);
    }

    this.dataManager.setEdges(edges);
    await this.saveData();
  }

  async updateEdge(edgeId: string, updates: any): Promise<void> {
    const edges = this.dataManager.getEdges();
    const edge = edges.find((e: any) => e.data.id === edgeId);
    if (!edge) return;

    const updatedEdge = {
      ...edge,
      data: {
        ...edge.data,
        ...updates,
      },
    };

    const index = edges.findIndex((e: any) => e.data.id === edgeId);
    if (index >= 0) {
      edges[index] = updatedEdge;
      this.dataManager.setEdges(edges);
      await this.saveData();
    }
  }

  async removeEdge(edgeId: string): Promise<void> {
    const edges = this.dataManager.getEdges().filter((e: any) => e.data.id !== edgeId);
    this.dataManager.setEdges(edges);
    await this.saveData();
  }

  // Connection Operations
  async connectNodes(sourceId: string, targetId: string, edgeData?: any): Promise<void> {
    const sourceNode = this.dataManager.findNodeById(sourceId);
    const targetNode = this.dataManager.findNodeById(targetId);

    if (!sourceNode || !targetNode) {
      throw new Error("Source or target node not found");
    }

    const newEdge = {
      data: {
        id: this.foundryAdapter.generateId(),
        source: sourceId,
        target: targetId,
        label: "Relationship",
        type: "default",
        cytoScapeAttributes: {
          "line-color": "#000000",
          width: 1,
          "line-style": "solid",
          "curve-style": "bezier",
          "target-arrow-color": "#000000",
          "target-arrow-shape": "triangle",
          color: "#000000",
        },
        permissions: { defaultLevel: 0, users: [] },
        ...edgeData,
      },
    };

    await this.addEdge(newEdge.data);
  }

  async disconnectNodes(sourceId: string, targetId: string): Promise<void> {
    const edges = this.dataManager
      .getEdges()
      .filter((e: any) => !(e.data.source === sourceId && e.data.target === targetId));
    this.dataManager.setEdges(edges);
    await this.saveData();
  }

  // Position Operations
  async moveNode(nodeId: string, x: number, y: number): Promise<void> {
    const node = this.dataManager.findNodeById(nodeId);
    if (node) {
      node.position.x = x;
      node.position.y = y;
      await this.saveData();
    }
  }

  // Private helper method
  private async saveData(): Promise<void> {
    // This would be implemented by the orchestrator service
    // For now, we'll leave it empty as the persistence is handled elsewhere
  }
}
