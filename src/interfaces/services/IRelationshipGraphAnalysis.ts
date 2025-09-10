/**
 * Interface für Relationship Graph Analysis
 * Verantwortlichkeit: Nur Graph Analysis und Statistics
 */
export interface IRelationshipGraphAnalysis {
  // Graph Analysis
  getConnectedNodes(nodeId: string): any[];
  getNodeDegree(nodeId: string): number;
  getGraphStats(): GraphStats;

  // Advanced Analysis
  findShortestPath(sourceId: string, targetId: string): string[];
  findCycles(): string[][];
  getIsolatedNodes(): any[];
  getMostConnectedNodes(limit?: number): any[];
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
