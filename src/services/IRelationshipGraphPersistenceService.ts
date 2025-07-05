import type {
  RelationshipGraph,
  RelationshipNode,
  RelationshipEdge,
} from "@/types/relationship";
import type { DeathwatchActor } from "@/entities/DeathwatchActor";

/**
 * Interface for relationship graph persistence operations.
 * Single Responsibility: Handles only data persistence.
 */
export interface IRelationshipGraphPersistenceService {
  /**
   * Saves the relationship graph to the actor.
   */
  saveGraph(actor: DeathwatchActor, graph: RelationshipGraph): Promise<void>;

  /**
   * Adds a new node to the graph.
   */
  addNode(actor: DeathwatchActor, node: RelationshipNode): Promise<void>;

  /**
   * Removes a node and all its connected edges from the graph.
   */
  removeNode(actor: DeathwatchActor, nodeId: string): Promise<void>;

  /**
   * Adds a new edge to the graph.
   */
  addEdge(actor: DeathwatchActor, edge: RelationshipEdge): Promise<void>;

  /**
   * Removes an edge from the graph.
   */
  removeEdge(actor: DeathwatchActor, edgeId: string): Promise<void>;

  /**
   * Updates an existing node in the graph.
   */
  updateNode(
    actor: DeathwatchActor,
    nodeId: string,
    updates: Partial<RelationshipNode>,
  ): Promise<void>;

  /**
   * Updates an existing edge in the graph.
   */
  updateEdge(
    actor: DeathwatchActor,
    edgeId: string,
    updates: Partial<RelationshipEdge>,
  ): Promise<void>;
}
