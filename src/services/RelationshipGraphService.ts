import type {
  RelationshipGraph,
  RelationshipNode,
  RelationshipEdge,
} from "../types/relationship";
import { relationshipGraphPersistenceService } from "./RelationshipGraphPersistenceService";
import { relationshipGraphValidationService } from "./RelationshipGraphValidationService";
import { relationshipGraphCytoscapeService } from "./RelationshipGraphCytoscapeService";

export class RelationshipGraphService {
  loadGraph(actor: Actor): RelationshipGraph {
    return (
      (foundry.utils.getProperty(
        actor.system,
        "props.relationshipGraph",
      ) as RelationshipGraph) || { nodes: [], edges: [] }
    );
  }

  getAvailableNodes(actor: Actor): RelationshipNode[] {
    return this.loadGraph(actor).nodes;
  }

  async saveGraph(actor: Actor, graph: RelationshipGraph): Promise<void> {
    const validation = relationshipGraphValidationService.validateGraph(graph);
    if (!validation.isValid) {
      throw new Error(
        `Graph validation failed: ${validation.errors.join(", ")}`,
      );
    }
    await relationshipGraphPersistenceService.saveGraph(actor, graph);
  }

  async addNode(actor: Actor, node: RelationshipNode): Promise<void> {
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
  }

  async removeNode(actor: Actor, nodeId: string): Promise<void> {
    await relationshipGraphPersistenceService.removeNode(actor, nodeId);
  }

  async addEdge(actor: Actor, edge: RelationshipEdge): Promise<void> {
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

  convertToCytoscapeElements(graph: RelationshipGraph): any[] {
    return relationshipGraphCytoscapeService.convertToCytoscapeElements(graph);
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

export const relationshipGraphService = new RelationshipGraphService();
