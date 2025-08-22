import type { RelationshipGraphData } from "../global";
import type { IRelationshipGraphService } from "./IRelationshipGraphService";
import type { IRelationshipGraphPersistenceService } from "./IRelationshipGraphPersistenceService";

export class RelationshipGraphService implements IRelationshipGraphService {
  private elements: any = { nodes: [], edges: [] };

  constructor(
    private document: any,
    private persistence: IRelationshipGraphPersistenceService
  ) {
    // Only load data if both document and persistence are available
    if (this.document && this.persistence) {
      this.loadData();
    }
  }

  // Neue Methoden für Cytoscape-kompatible Datenzugriffe
  getElements(): any {
    return this.elements;
  }

  getNodes(): any[] {
    return this.elements.nodes || [];
  }

  getEdges(): any[] {
    return this.elements.edges || [];
  }

  // Document Access
  getDocument(): any {
    return this.document;
  }

  // Cytoscape-kompatible Suchmethoden
  findNodeById(id: string): any {
    return this.elements.nodes?.find((node: any) => node.data.id === id);
  }

  findEdgesBySource(sourceId: string): any[] {
    return this.elements.edges?.filter((edge: any) => edge.data.source === sourceId) || [];
  }

  findEdgesByTarget(targetId: string): any[] {
    return this.elements.edges?.filter((edge: any) => edge.data.target === targetId) || [];
  }

  // Filter-Methoden mit Cytoscape-Effizienz
  filterNodesByType(type: string): any[] {
    return this.elements.nodes?.filter((node: any) => node.data.type === type) || [];
  }

  filterEdgesByType(type: string): any[] {
    return this.elements.edges?.filter((edge: any) => edge.data.type === type) || [];
  }

  getGraphData(): RelationshipGraphData {
    return {
      name: this.document?.name || "Neuer Beziehungsgraph",
      permissions: { defaultLevel: 0, users: [] },
      elements: this.elements,
    };
  }

  getNode(nodeId: string): any {
    return this.findNodeById(nodeId);
  }

  getEdge(edgeId: string): any {
    return this.elements.edges?.find((e: any) => e.data.id === edgeId);
  }

  getNodeByLabel(label: string): any {
    return this.elements.nodes?.find((node: any) => node.data.label === label);
  }

  getEdgeByLabel(label: string): any {
    return this.elements.edges?.find((edge: any) => edge.data.label === label);
  }

  getNodeByType(type: string): any {
    return this.elements.nodes?.find((node: any) => node.data.type === type);
  }

  getEdgeByType(type: string): any {
    return this.elements.edges?.find((edge: any) => edge.data.type === type);
  }

  getNodeById(id: string): any {
    return this.findNodeById(id);
  }

  getEdgeById(id: string): any {
    return this.elements.edges?.find((e: any) => e.data.id === id);
  }

  /**
   * Fügt einen neuen Node hinzu oder aktualisiert einen bestehenden
   */
  async addNode(nodeData: any): Promise<void> {
    const existingNode = this.findNodeById(nodeData.id);
    if (existingNode) {
      this.updateNode(nodeData.id, nodeData);
    } else {
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
      this.elements.nodes?.push(newNode);
    }
    await this.saveData();
  }

  /**
   * Fügt eine neue Edge hinzu oder aktualisiert eine bestehende
   */
  async addEdge(edgeData: any): Promise<void> {
    const defaultPermissions = { defaultLevel: 0, users: [] };
    const newEdge = {
      data: {
        id: edgeData.id || foundry.utils.randomID(),
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

    if (!this.elements.edges) {
      this.elements.edges = [];
    }

    const existingEdgeIndex = this.elements.edges.findIndex((e: any) => e.data.id === newEdge.data.id);
    if (existingEdgeIndex >= 0) {
      this.elements.edges[existingEdgeIndex] = newEdge;
    } else {
      this.elements.edges.push(newEdge);
    }
    await this.saveData();
  }

  /**
   * Aktualisiert einen bestehenden Node
   */
  async updateNode(nodeId: string, updates: any): Promise<void> {
    const node = this.findNodeById(nodeId);
    if (node) {
      const updatedNode = {
        ...node,
        data: {
          ...node.data,
          ...updates,
        },
      };
      const index = this.elements.nodes?.findIndex((n: any) => n.data.id === nodeId);
      if (index !== undefined && index >= 0 && this.elements.nodes) {
        this.elements.nodes[index] = updatedNode;
      }
      await this.saveData();
    }
  }

  /**
   * Entfernt einen Node und alle verbundenen Edges
   */
  async removeNode(nodeId: string): Promise<void> {
    if (this.elements.nodes) {
      this.elements.nodes = this.elements.nodes.filter((n: any) => n.data.id !== nodeId);
    }
    if (this.elements.edges) {
      this.elements.edges = this.elements.edges.filter((e: any) => e.data.source !== nodeId && e.data.target !== nodeId);
    }
    await this.saveData();
  }

  /**
   * Aktualisiert eine bestehende Edge
   */
  async updateEdge(edgeId: string, updates: any): Promise<void> {
    const edge = this.elements.edges?.find((e: any) => e.data.id === edgeId);
    if (edge) {
      const updatedEdge = {
        ...edge,
        data: {
          ...edge.data,
          ...updates,
        },
      };
      const index = this.elements.edges?.findIndex((e: any) => e.data.id === edgeId);
      if (index !== undefined && index >= 0 && this.elements.edges) {
        this.elements.edges[index] = updatedEdge;
      }
      await this.saveData();
    }
  }

  /**
   * Entfernt eine Edge
   */
  async removeEdge(edgeId: string): Promise<void> {
    if (this.elements.edges) {
      this.elements.edges = this.elements.edges.filter((e: any) => e.data.id !== edgeId);
    }
    await this.saveData();
  }

  // Graph Operations
  async moveNode(nodeId: string, x: number, y: number): Promise<void> {
    const node = this.findNodeById(nodeId);
    if (node) {
      node.position.x = x;
      node.position.y = y;
      await this.saveData();
    }
  }

  /**
   * Verbindet zwei Nodes mit einer Edge
   */
  async connectNodes(
    sourceId: string,
    targetId: string,
    edgeData?: any
  ): Promise<void> {
    const sourceNode = this.findNodeById(sourceId);
    const targetNode = this.findNodeById(targetId);

    if (!sourceNode || !targetNode) {
      throw new Error("Source or target node not found");
    }

    const newEdge = {
      data: {
        id: foundry.utils.randomID(),
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
    this.elements.edges = this.elements.edges?.filter((e: any) => !(e.data.source === sourceId && e.data.target === targetId));
    await this.saveData();
  }

  // Search and Filter Operations
  searchNodes(query: string): any[] {
    const lowerQuery = query.toLowerCase();
    return this.elements.nodes?.filter(
      (node: any) =>
        node.data.label?.toLowerCase().includes(lowerQuery) ||
        node.data.type?.toLowerCase().includes(lowerQuery)
    ) || [];
  }

  searchEdges(query: string): any[] {
    const lowerQuery = query.toLowerCase();
    return this.elements.edges?.filter(
      (edge: any) =>
        edge.data.label?.toLowerCase().includes(lowerQuery) ||
        edge.data.type?.toLowerCase().includes(lowerQuery)
    ) || [];
  }

  // Graph Analysis
  getConnectedNodes(nodeId: string): any[] {
    const connectedNodeIds = new Set<string>();

    this.elements.edges?.forEach((edge: any) => {
      if (edge.data.source === nodeId) {
        connectedNodeIds.add(edge.data.target);
      } else if (edge.data.target === nodeId) {
        connectedNodeIds.add(edge.data.source);
      }
    });

    return this.elements.nodes?.filter((node: any) => connectedNodeIds.has(node.data.id)) || [];
  }

  getNodeDegree(nodeId: string): number {
    return this.elements.edges?.filter((edge: any) => edge.data.source === nodeId || edge.data.target === nodeId).length || 0;
  }

  getGraphStats(): any {
    const nodeCount = this.elements.nodes?.length || 0;
    const edgeCount = this.elements.edges?.length || 0;
    const averageConnections = nodeCount > 0 ? edgeCount / nodeCount : 0;
    const isolatedNodes = this.elements.nodes?.filter(
      (n: any) => !this.elements.edges?.some((e: any) => e.data.source === n.data.id || e.data.target === n.data.id)
    ).length || 0;

    const nodeDegrees = this.elements.nodes?.map((node: any) => this.getNodeDegree(node.data.id)) || [];
    const maxDegree = nodeDegrees.length > 0 ? Math.max(...nodeDegrees) : 0;
    const minDegree = nodeDegrees.length > 0 ? Math.min(...nodeDegrees) : 0;

    return {
      nodeCount,
      edgeCount,
      averageConnections,
      isolatedNodes,
      maxDegree,
      minDegree,
      density: nodeCount > 1 ? (2 * edgeCount) / (nodeCount * (nodeCount - 1)) : 0,
    };
  }

  // Demo Data Management
  async loadDemoData(demoData: { nodes: any[]; edges: any[] }): Promise<void> {
    if (!this.persistence || !this.document) {
      console.warn(
        "RelationshipGraphService: Cannot load demo data - persistence or document not available"
      );
      return;
    }

    try {
      // Konvertiere Demo-Daten zu Cytoscape-Format
      this.elements.nodes = demoData.nodes.map((node) => ({
        data: {
          id: node.id,
          label: node.label?.value || "",
          type: node.type?.value || "",
          x: node.x,
          y: node.y,
          permissions: node.globalPermissions,
          descriptions: node.descriptions,
          playerRelationshipEffects: node.playerRelationshipEffects,
          image: node.image,
          zIndex: node.zIndex,
          ...node.cytoScapeAttributes,
        },
        position: {
          x: node.x,
          y: node.y,
        },
      }));
      this.elements.edges = demoData.edges.map((edge) => ({
        data: {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          label: edge.label?.value || "",
          type: edge.type,
          permissions: edge.globalPermissions,
          connectionCategory: edge.connectionCategory,
          zIndex: edge.zIndex,
          ...edge.cytoScapeAttributes,
        },
      }));

      // Save demo data to document
      await this.saveData();

      console.log("Demo data loaded successfully:", {
        nodes: this.elements.nodes?.length || 0,
        edges: this.elements.edges?.length || 0,
      });
    } catch (error) {
      console.error("RelationshipGraphService: Error loading demo data:", error);
      throw error;
    }
  }

  async loadData(): Promise<void> {
    if (!this.persistence || !this.document) {
      console.warn(
        "RelationshipGraphService: Cannot load data - persistence or document not available"
      );
      return;
    }

    try {
      const graph = await this.persistence.load(this.document);
      this.elements = graph.elements || { nodes: [], edges: [] };
    } catch (err) {
      console.error("RelationshipGraphService: Error loading data:", err);
      this.elements = { nodes: [], edges: [] };
    }
  }

  async saveData(): Promise<void> {
    if (!this.persistence || !this.document) {
      console.warn(
        "RelationshipGraphService: Cannot save data - persistence or document not available"
      );
      return;
    }

    try {
      await this.persistence.save(this.document, {
        elements: this.elements,
      });
    } catch (error) {
      console.error("RelationshipGraphService: Error saving data:", error);
      throw error;
    }
  }

  // Cleanup
  cleanup(): void {
    this.elements.nodes = [];
    this.elements.edges = [];
  }
}
