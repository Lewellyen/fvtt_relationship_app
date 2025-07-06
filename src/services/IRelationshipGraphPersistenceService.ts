import type {
  RelationshipGraph,
  RelationshipNode,
  RelationshipEdge,
} from "@/types/relationship";

/**
 * Interface for relationship graph persistence operations.
 * Single Responsibility: Handles only data persistence.
 * Generic to support both Actor and JournalEntryPage implementations.
 */
export interface IRelationshipGraphPersistenceService<T = any> {
  /**
   * Saves the relationship graph to the document.
   */
  saveGraph(document: T, graph: RelationshipGraph): Promise<void>;

  /**
   * Adds a new node to the graph.
   */
  addNode(document: T, node: RelationshipNode): Promise<void>;

  /**
   * Removes a node and all its connected edges from the graph.
   */
  removeNode(document: T, nodeId: string): Promise<void>;

  /**
   * Adds a new edge to the graph.
   */
  addEdge(document: T, edge: RelationshipEdge): Promise<void>;

  /**
   * Removes an edge from the graph.
   */
  removeEdge(document: T, edgeId: string): Promise<void>;

  /**
   * Updates an existing node in the graph.
   */
  updateNode(
    document: T,
    nodeId: string,
    updates: Partial<RelationshipNode>,
  ): Promise<void>;

  /**
   * Updates an existing edge in the graph.
   */
  updateEdge(
    document: T,
    edgeId: string,
    updates: Partial<RelationshipEdge>,
  ): Promise<void>;
}
