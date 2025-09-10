/**
 * Interface für Relationship Graph Data Management
 * Verantwortlichkeit: Nur Data Management und Access
 */
export interface IRelationshipGraphDataManager {
  // Data Access
  getElements(): any;
  getNodes(): any[];
  getEdges(): any[];
  findNodeById(id: string): any;
  findEdgesBySource(sourceId: string): any[];
  findEdgesByTarget(targetId: string): any[];

  // Filter Methods
  filterNodesByType(type: string): any[];
  filterEdgesByType(type: string): any[];

  // Data Management
  setElements(elements: any): void;
  setNodes(nodes: any[]): void;
  setEdges(edges: any[]): void;

  // Search Operations
  searchNodes(query: string): any[];
  searchEdges(query: string): any[];
}
