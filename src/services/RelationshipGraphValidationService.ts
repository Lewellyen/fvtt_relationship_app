import type {
  RelationshipGraph,
  RelationshipNode,
  RelationshipEdge,
} from "@/types/relationship";
import type {
  IRelationshipGraphValidationService,
  ValidationResult,
} from "./IRelationshipGraphValidationService";

/**
 * Concrete implementation of relationship graph validation operations.
 * Single Responsibility: Handles only validation logic.
 */
export class RelationshipGraphValidationService
  implements IRelationshipGraphValidationService
{
  validateGraph(graph: RelationshipGraph): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate nodes
    const nodeIds = new Set<string>();
    for (const node of graph.nodes) {
      const nodeResult = this.validateNode(node);
      errors.push(...nodeResult.errors);
      warnings.push(...nodeResult.warnings);

      if (nodeIds.has(node.id)) {
        errors.push(`Duplicate node ID: ${node.id}`);
      } else {
        nodeIds.add(node.id);
      }
    }

    // Validate edges
    const edgeIds = new Set<string>();
    for (const edge of graph.edges) {
      const edgeResult = this.validateEdge(edge, graph);
      errors.push(...edgeResult.errors);
      warnings.push(...edgeResult.warnings);

      if (edgeIds.has(edge.id)) {
        errors.push(`Duplicate edge ID: ${edge.id}`);
      } else {
        edgeIds.add(edge.id);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  validateNode(node: RelationshipNode): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!node.id || node.id.trim() === "") {
      errors.push("Node ID is required");
    }

    if (!node.label || node.label.trim() === "") {
      warnings.push(`Node ${node.id} has no label`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  validateEdge(
    edge: RelationshipEdge,
    graph: RelationshipGraph,
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!edge.id || edge.id.trim() === "") {
      errors.push("Edge ID is required");
    }

    if (!edge.source || edge.source.trim() === "") {
      errors.push("Edge source is required");
    }

    if (!edge.target || edge.target.trim() === "") {
      errors.push("Edge target is required");
    }

    if (this.isSelfLoop(edge)) {
      errors.push("Self-loops are not allowed");
    }

    if (!this.doNodesExist(edge, graph)) {
      errors.push(
        `Edge references non-existent nodes: ${edge.source} -> ${edge.target}`,
      );
    }

    if (this.isDuplicateEdge(edge, graph)) {
      errors.push(`Duplicate edge between ${edge.source} and ${edge.target}`);
    }

    if (!edge.label || edge.label.trim() === "") {
      warnings.push(`Edge ${edge.id} has no label`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  isNodeIdUnique(nodeId: string, graph: RelationshipGraph): boolean {
    return !graph.nodes.some((node) => node.id === nodeId);
  }

  isEdgeIdUnique(edgeId: string, graph: RelationshipGraph): boolean {
    return !graph.edges.some((edge) => edge.id === edgeId);
  }

  doNodesExist(edge: RelationshipEdge, graph: RelationshipGraph): boolean {
    const sourceExists = graph.nodes.some((node) => node.id === edge.source);
    const targetExists = graph.nodes.some((node) => node.id === edge.target);
    return sourceExists && targetExists;
  }

  isSelfLoop(edge: RelationshipEdge): boolean {
    return edge.source === edge.target;
  }

  isDuplicateEdge(edge: RelationshipEdge, graph: RelationshipGraph): boolean {
    return graph.edges.some(
      (existingEdge) =>
        existingEdge.id !== edge.id &&
        existingEdge.source === edge.source &&
        existingEdge.target === edge.target,
    );
  }
}

// Singleton instance for dependency injection
export const relationshipGraphValidationService =
  new RelationshipGraphValidationService();
