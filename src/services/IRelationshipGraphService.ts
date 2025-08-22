import type { RelationshipGraphData } from "../global";

export interface IRelationshipGraphService {
  // Core Data Access - Cytoscape-kompatibel
  getElements(): any;
  getNodes(): any[];
  getEdges(): any[];
  getGraphData(): RelationshipGraphData;
  
  // Cytoscape-kompatible Suchmethoden
  findNodeById(id: string): any;
  findEdgesBySource(sourceId: string): any[];
  findEdgesByTarget(targetId: string): any[];
  
  // Standard Access Methods
  getNode(nodeId: string): any;
  getEdge(edgeId: string): any;
  getNodeByLabel(label: string): any;
  getEdgeByLabel(label: string): any;
  getNodeByType(type: string): any;
  getEdgeByType(type: string): any;
  getNodeById(id: string): any;
  getEdgeById(id: string): any;

  // Document Access
  getDocument(): any; // JournalEntryPage

  // CRUD Operations - Cytoscape-kompatibel
  addNode(nodeData: any): Promise<void>;
  addEdge(edgeData: any): Promise<void>;
  updateNode(nodeId: string, updates: any): Promise<void>;
  removeNode(nodeId: string): Promise<void>;
  updateEdge(edgeId: string, updates: any): Promise<void>;
  removeEdge(edgeId: string): Promise<void>;

  // Data Loading and Persistence
  loadData(): Promise<void>;
  saveData(): Promise<void>;

  // Graph Operations
  moveNode(nodeId: string, x: number, y: number): Promise<void>;
  connectNodes(sourceId: string, targetId: string, edgeData?: any): Promise<void>;
  disconnectNodes(sourceId: string, targetId: string): Promise<void>;

  // Search and Filter - Hocheffizient mit Cytoscape
  searchNodes(query: string): any[];
  searchEdges(query: string): any[];
  filterNodesByType(type: string): any[];
  filterEdgesByType(type: string): any[];

  // Graph Analysis
  getConnectedNodes(nodeId: string): any[];
  getNodeDegree(nodeId: string): number;
  getGraphStats(): GraphStats;

  // Demo Data Management
  loadDemoData(demoData: { nodes: any[]; edges: any[] }): Promise<void>;

  // Cleanup
  cleanup(): void;
}

export interface GraphStats {
  nodeCount: number;
  edgeCount: number;
  averageConnections: number;
  isolatedNodes: number;
  maxDegree: number;
  minDegree: number;
  density: number;
}
