import type {
  RelationshipGraph,
  RelationshipNode,
  RelationshipEdge,
} from "@/types/relationship";
import type { IRelationshipGraphService } from "./IRelationshipGraphService";
import { relationshipGraphPersistenceService } from "./RelationshipGraphPersistenceService";
import { relationshipGraphValidationService } from "./RelationshipGraphValidationService";
import { relationshipGraphCytoscapeService } from "./RelationshipGraphCytoscapeService";
import { PerformanceMonitor } from "./PerformanceMonitor";

/**
 * Main service for relationship graph operations.
 * Follows SOLID principles by aggregating specific services.
 *
 * Single Responsibility: Orchestrates relationship graph operations
 * Open/Closed: Extensible through service composition
 * Liskov Substitution: Uses interfaces for all dependencies
 * Interface Segregation: Aggregates focused interfaces
 * Dependency Inversion: Depends on abstractions, not concretions
 */
export class RelationshipGraphService implements IRelationshipGraphService {
  loadGraph(actor: Actor): RelationshipGraph {
    return {
      nodes: [],
      edges: [],
    } as RelationshipGraph;
  }

  getAvailableNodes(actor: Actor): RelationshipNode[] {
    return this.loadGraph(actor).nodes;
  }

  // Persistence operations
  async saveGraph(actor: Actor, graph: RelationshipGraph): Promise<void> {
    await PerformanceMonitor.getInstance().measureAsync(
      "saveGraph",
      async () => {
        // Validate before saving
        const validation =
          relationshipGraphValidationService.validateGraph(graph);
        if (!validation.isValid) {
          throw new Error(
            `Graph validation failed: ${validation.errors.join(", ")}`,
          );
        }

        await relationshipGraphPersistenceService.saveGraph(actor, graph);
      },
    );
  }

  async addNode(actor: Actor, node: RelationshipNode): Promise<void> {
    await PerformanceMonitor.getInstance().measureAsync("addNode", async () => {
      // Validate node before adding
      const validation = relationshipGraphValidationService.validateNode(node);
      if (!validation.isValid) {
        throw new Error(
          `Node validation failed: ${validation.errors.join(", ")}`,
        );
      }

      const graph = this.loadGraph(actor);
      if (!relationshipGraphValidationService.isNodeIdUnique(node.id, graph)) {
        throw new Error(`Node ID ${node.id} already exists`);
      }

      await relationshipGraphPersistenceService.addNode(actor, node);
    });
  }

  async removeNode(actor: Actor, nodeId: string): Promise<void> {
    await relationshipGraphPersistenceService.removeNode(actor, nodeId);
  }

  async addEdge(actor: Actor, edge: RelationshipEdge): Promise<void> {
    await PerformanceMonitor.getInstance().measureAsync("addEdge", async () => {
      // Validate edge before adding
      const graph = this.loadGraph(actor);
      const validation = relationshipGraphValidationService.validateEdge(
        edge,
        graph,
      );
      if (!validation.isValid) {
        throw new Error(
          `Edge validation failed: ${validation.errors.join(", ")}`,
        );
      }

      if (!relationshipGraphValidationService.isEdgeIdUnique(edge.id, graph)) {
        throw new Error(`Edge ID ${edge.id} already exists`);
      }

      await relationshipGraphPersistenceService.addEdge(actor, edge);
    });
  }

  async removeEdge(actor: Actor, edgeId: string): Promise<void> {
    await relationshipGraphPersistenceService.removeEdge(actor, edgeId);
  }

  async updateNode(
    actor: Actor,
    nodeId: string,
    updates: Partial<RelationshipNode>,
  ): Promise<void> {
    await relationshipGraphPersistenceService.updateNode(
      actor,
      nodeId,
      updates,
    );
  }

  async updateEdge(
    actor: Actor,
    edgeId: string,
    updates: Partial<RelationshipEdge>,
  ): Promise<void> {
    await relationshipGraphPersistenceService.updateEdge(
      actor,
      edgeId,
      updates,
    );
  }

  // Validation operations
  validateGraph(graph: RelationshipGraph) {
    return relationshipGraphValidationService.validateGraph(graph);
  }

  validateNode(node: RelationshipNode) {
    return relationshipGraphValidationService.validateNode(node);
  }

  validateEdge(edge: RelationshipEdge, graph: RelationshipGraph) {
    return relationshipGraphValidationService.validateEdge(edge, graph);
  }

  isNodeIdUnique(nodeId: string, graph: RelationshipGraph): boolean {
    return relationshipGraphValidationService.isNodeIdUnique(nodeId, graph);
  }

  isEdgeIdUnique(edgeId: string, graph: RelationshipGraph): boolean {
    return relationshipGraphValidationService.isEdgeIdUnique(edgeId, graph);
  }

  doNodesExist(edge: RelationshipEdge, graph: RelationshipGraph): boolean {
    return relationshipGraphValidationService.doNodesExist(edge, graph);
  }

  isSelfLoop(edge: RelationshipEdge): boolean {
    return relationshipGraphValidationService.isSelfLoop(edge);
  }

  isDuplicateEdge(edge: RelationshipEdge, graph: RelationshipGraph): boolean {
    return relationshipGraphValidationService.isDuplicateEdge(edge, graph);
  }

  // Cytoscape operations
  convertToCytoscapeElements(graph: RelationshipGraph): any[] {
    return PerformanceMonitor.getInstance().measure(
      "convertToCytoscapeElements",
      () => {
        return relationshipGraphCytoscapeService.convertToCytoscapeElements(
          graph,
        );
      },
    );
  }

  getEdgeColor(edgeType: string): string {
    return relationshipGraphCytoscapeService.getEdgeColor(edgeType);
  }

  getDefaultStyle(): any[] {
    return relationshipGraphCytoscapeService.getDefaultStyle();
  }

  getDefaultLayout(layoutName: string): any {
    return relationshipGraphCytoscapeService.getDefaultLayout(layoutName);
  }

  isCytoscapeInitialized(cy: any): boolean {
    return relationshipGraphCytoscapeService.isCytoscapeInitialized(cy);
  }

  addElements(cy: any, elements: any[]): void {
    relationshipGraphCytoscapeService.addElements(cy, elements);
  }

  removeElements(cy: any, elementIds: string[]): void {
    relationshipGraphCytoscapeService.removeElements(cy, elementIds);
  }

  applyLayout(cy: any, layoutName: string): void {
    relationshipGraphCytoscapeService.applyLayout(cy, layoutName);
  }
}

// Singleton instance for dependency injection
export const relationshipGraphService = new RelationshipGraphService();
