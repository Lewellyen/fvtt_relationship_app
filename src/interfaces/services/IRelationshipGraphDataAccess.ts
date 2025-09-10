import type { RelationshipGraphData } from "../../global";

/**
 * Interface für Relationship Graph Data Access
 * Verantwortlichkeit: Nur Data Access und Read Operations
 */
export interface IRelationshipGraphDataAccess {
  // Core Data Access
  getElements(): any;
  getNodes(): any[];
  getEdges(): any[];
  getGraphData(): RelationshipGraphData;

  // Document Access
  getDocument(): any;

  // Node Access
  getNode(nodeId: string): any;
  getNodeByLabel(label: string): any;
  getNodeByType(type: string): any;
  getNodeById(id: string): any;

  // Edge Access
  getEdge(edgeId: string): any;
  getEdgeByLabel(label: string): any;
  getEdgeByType(type: string): any;
  getEdgeById(id: string): any;

  // Search Operations
  findNodeById(id: string): any;
  findEdgesBySource(sourceId: string): any[];
  findEdgesByTarget(targetId: string): any[];
  searchNodes(query: string): any[];
  searchEdges(query: string): any[];
  filterNodesByType(type: string): any[];
  filterEdgesByType(type: string): any[];
}
