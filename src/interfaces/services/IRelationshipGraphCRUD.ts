/**
 * Interface für Relationship Graph CRUD Operations
 * Verantwortlichkeit: Nur CRUD Operations
 */
export interface IRelationshipGraphCRUD {
  // Node CRUD
  addNode(nodeData: any): Promise<void>;
  updateNode(nodeId: string, updates: any): Promise<void>;
  removeNode(nodeId: string): Promise<void>;

  // Edge CRUD
  addEdge(edgeData: any): Promise<void>;
  updateEdge(edgeId: string, updates: any): Promise<void>;
  removeEdge(edgeId: string): Promise<void>;

  // Connection Operations
  connectNodes(sourceId: string, targetId: string, edgeData?: any): Promise<void>;
  disconnectNodes(sourceId: string, targetId: string): Promise<void>;

  // Position Operations
  moveNode(nodeId: string, x: number, y: number): Promise<void>;
}
