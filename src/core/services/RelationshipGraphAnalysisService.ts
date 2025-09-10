import type { IRelationshipGraphAnalysisService, IRelationshipGraphDataManager } from "../../interfaces";
// ✅ Services direkt importieren (zirkuläre Abhängigkeiten vermeiden)
import { RelationshipGraphDataManager } from "./RelationshipGraphDataManager";

/**
 * RelationshipGraphAnalysisService - Verantwortlich für Graph Analysis
 * Single Responsibility: Nur Graph Analysis und Statistics
 */
export class RelationshipGraphAnalysisService implements IRelationshipGraphAnalysisService {
  // ✅ Metadaten für Service Registration
  static readonly API_NAME = "relationshipGraphAnalysisService";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "RelationshipGraphAnalysisService";
  static readonly DEPENDENCIES = [RelationshipGraphDataManager]; // ✅ Dependencies explizit definiert

  constructor(
    private readonly dataManager: IRelationshipGraphDataManager
  ) {}

  // Graph Analysis
  getConnectedNodes(nodeId: string): any[] {
    const connectedNodeIds = new Set<string>();
    const edges = this.dataManager.getEdges();

    edges.forEach((edge: any) => {
      if (edge.data.source === nodeId) {
        connectedNodeIds.add(edge.data.target);
      } else if (edge.data.target === nodeId) {
        connectedNodeIds.add(edge.data.source);
      }
    });

    return this.dataManager.getNodes().filter((node: any) => connectedNodeIds.has(node.data.id));
  }

  getNodeDegree(nodeId: string): number {
    const edges = this.dataManager.getEdges();
    return edges.filter((edge: any) => edge.data.source === nodeId || edge.data.target === nodeId)
      .length;
  }

  getGraphStats(): any {
    const nodeCount = this.dataManager.getNodes().length;
    const edgeCount = this.dataManager.getEdges().length;
    const averageConnections = nodeCount > 0 ? edgeCount / nodeCount : 0;
    const isolatedNodes = this.getIsolatedNodes().length;

    const nodeDegrees = this.dataManager
      .getNodes()
      .map((node: any) => this.getNodeDegree(node.data.id));
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

  // Advanced Analysis
  findShortestPath(sourceId: string, targetId: string): string[] {
    // Simple BFS implementation for shortest path
    const visited = new Set<string>();
    const queue: { nodeId: string; path: string[] }[] = [{ nodeId: sourceId, path: [sourceId] }];

    while (queue.length > 0) {
      const { nodeId, path } = queue.shift()!;

      if (nodeId === targetId) {
        return path;
      }

      if (visited.has(nodeId)) continue;
      visited.add(nodeId);

      const connectedNodes = this.getConnectedNodes(nodeId);
      for (const connectedNode of connectedNodes) {
        if (!visited.has(connectedNode.data.id)) {
          queue.push({ nodeId: connectedNode.data.id, path: [...path, connectedNode.data.id] });
        }
      }
    }

    return []; // No path found
  }

  findCycles(): string[][] {
    const cycles: string[][] = [];
    const visited = new Set<string>();
    const recStack = new Set<string>();
    const nodes = this.dataManager.getNodes();

    for (const node of nodes) {
      if (!visited.has(node.data.id)) {
        this.dfsForCycles(node.data.id, visited, recStack, [], cycles);
      }
    }

    return cycles;
  }

  private dfsForCycles(
    nodeId: string,
    visited: Set<string>,
    recStack: Set<string>,
    path: string[],
    cycles: string[][]
  ): void {
    visited.add(nodeId);
    recStack.add(nodeId);
    path.push(nodeId);

    const connectedNodes = this.getConnectedNodes(nodeId);
    for (const connectedNode of connectedNodes) {
      if (!visited.has(connectedNode.data.id)) {
        this.dfsForCycles(connectedNode.data.id, visited, recStack, [...path], cycles);
      } else if (recStack.has(connectedNode.data.id)) {
        // Found a cycle
        const cycleStart = path.indexOf(connectedNode.data.id);
        cycles.push(path.slice(cycleStart).concat([connectedNode.data.id]));
      }
    }

    recStack.delete(nodeId);
  }

  getIsolatedNodes(): any[] {
    const nodes = this.dataManager.getNodes();
    return nodes.filter(
      (n: any) =>
        !this.dataManager
          .getEdges()
          .some((e: any) => e.data.source === n.data.id || e.data.target === n.data.id)
    );
  }

  getMostConnectedNodes(limit: number = 10): any[] {
    const nodes = this.dataManager.getNodes();
    return nodes
      .map((node) => ({
        ...node,
        degree: this.getNodeDegree(node.data.id),
      }))
      .sort((a, b) => b.degree - a.degree)
      .slice(0, limit);
  }
}
