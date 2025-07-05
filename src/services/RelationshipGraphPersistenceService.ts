import type {
  RelationshipGraph,
  RelationshipNode,
  RelationshipEdge,
} from "@/types/relationship";
import type { DeathwatchActor } from "@/entities/DeathwatchActor";
import type { IRelationshipGraphPersistenceService } from "./IRelationshipGraphPersistenceService";

/**
 * Concrete implementation of relationship graph persistence operations.
 * Single Responsibility: Handles only data persistence.
 */
export class RelationshipGraphPersistenceService
  implements IRelationshipGraphPersistenceService
{
  async saveGraph(
    actor: DeathwatchActor,
    graph: RelationshipGraph,
  ): Promise<void> {
    // Deep-clone the graph so that actor.update sees real changes
    const currentGraph = foundry.utils.getProperty(
      actor.system,
      "props.relationshipGraph",
    ) as RelationshipGraph;
    const updatedGraph = { ...currentGraph, ...graph };
    await actor.update({
      system: { props: { relationshipGraph: updatedGraph } },
    });
  }

  async addNode(actor: DeathwatchActor, node: RelationshipNode): Promise<void> {
    const graph = this.loadGraph(actor);
    graph.nodes.push(node);
    await this.saveGraph(actor, graph);
  }

  async removeNode(actor: DeathwatchActor, nodeId: string): Promise<void> {
    const graph = this.loadGraph(actor);
    graph.nodes = graph.nodes.filter((n) => n.id !== nodeId);
    graph.edges = graph.edges.filter(
      (e) => e.source !== nodeId && e.target !== nodeId,
    );
    await this.saveGraph(actor, graph);
  }

  async addEdge(actor: DeathwatchActor, edge: RelationshipEdge): Promise<void> {
    const graph = this.loadGraph(actor);
    graph.edges.push(edge);
    await this.saveGraph(actor, graph);
  }

  async removeEdge(actor: DeathwatchActor, edgeId: string): Promise<void> {
    const graph = this.loadGraph(actor);
    graph.edges = graph.edges.filter((e) => e.id !== edgeId);
    await this.saveGraph(actor, graph);
  }

  async updateNode(
    actor: DeathwatchActor,
    nodeId: string,
    updates: Partial<RelationshipNode>,
  ): Promise<void> {
    const graph = this.loadGraph(actor);
    const nodeIndex = graph.nodes.findIndex((n) => n.id === nodeId);
    if (nodeIndex !== -1) {
      graph.nodes[nodeIndex] = { ...graph.nodes[nodeIndex], ...updates };
      await this.saveGraph(actor, graph);
    }
  }

  async updateEdge(
    actor: DeathwatchActor,
    edgeId: string,
    updates: Partial<RelationshipEdge>,
  ): Promise<void> {
    const graph = this.loadGraph(actor);
    const edgeIndex = graph.edges.findIndex((e) => e.id === edgeId);
    if (edgeIndex !== -1) {
      graph.edges[edgeIndex] = { ...graph.edges[edgeIndex], ...updates };
      await this.saveGraph(actor, graph);
    }
  }

  private loadGraph(actor: DeathwatchActor): RelationshipGraph {
    return (foundry.utils.getProperty(
      actor.system,
      "props.relationshipGraph",
    ) || {
      nodes: [],
      edges: [],
    }) as RelationshipGraph;
  }
}

// Singleton instance for dependency injection
export const relationshipGraphPersistenceService =
  new RelationshipGraphPersistenceService();
