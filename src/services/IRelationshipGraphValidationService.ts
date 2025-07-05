import type {
  RelationshipGraph,
  RelationshipNode,
  RelationshipEdge,
} from "@/types/relationship";

/**
 * Interface for relationship graph validation operations.
 * Single Responsibility: Handles only validation logic.
 */
export interface IRelationshipGraphValidationService {
  /**
   * Validates a complete relationship graph.
   */
  validateGraph(graph: RelationshipGraph): ValidationResult;

  /**
   * Validates a single node.
   */
  validateNode(node: RelationshipNode): ValidationResult;

  /**
   * Validates a single edge.
   */
  validateEdge(
    edge: RelationshipEdge,
    graph: RelationshipGraph,
  ): ValidationResult;

  /**
   * Checks if a node ID is unique in the graph.
   */
  isNodeIdUnique(nodeId: string, graph: RelationshipGraph): boolean;

  /**
   * Checks if an edge ID is unique in the graph.
   */
  isEdgeIdUnique(edgeId: string, graph: RelationshipGraph): boolean;

  /**
   * Checks if both source and target nodes exist for an edge.
   */
  doNodesExist(edge: RelationshipEdge, graph: RelationshipGraph): boolean;

  /**
   * Checks if an edge would create a self-loop (source === target).
   */
  isSelfLoop(edge: RelationshipEdge): boolean;

  /**
   * Checks if an edge already exists between the same nodes.
   */
  isDuplicateEdge(edge: RelationshipEdge, graph: RelationshipGraph): boolean;
}

/**
 * Result of validation operations.
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
