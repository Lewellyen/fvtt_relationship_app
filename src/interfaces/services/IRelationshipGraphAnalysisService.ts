/**
 * Interface für Relationship Graph Analysis
 * Verantwortlichkeit: Nur Graph Analysis und Statistics
 */
export interface IRelationshipGraphAnalysisService {
  // Graph Analysis
  getConnectedNodes(nodeId: string): any[];
  getNodeDegree(nodeId: string): number;
  getGraphStats(): any;

  // Advanced Analysis
  findShortestPath(sourceId: string, targetId: string): string[];
  findCycles(): string[][];
  getIsolatedNodes(): any[];
  getMostConnectedNodes(limit?: number): any[];
}
