import type {
  RelationshipGraph,
  RelationshipNode,
  RelationshipEdge,
} from "../types/relationship";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export class RelationshipGraphValidationService {
  validateGraph(graph: RelationshipGraph): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    const nodeIds = new Set<string>();
    for (const node of graph.nodes) {
      const result = this.validateNode(node);
      errors.push(...result.errors);
      warnings.push(...result.warnings);
      if (nodeIds.has(node.id)) errors.push(`Duplicate node ID: ${node.id}`);
      else nodeIds.add(node.id);
    }

    const edgeIds = new Set<string>();
    for (const edge of graph.edges) {
      const result = this.validateEdge(edge, graph);
      errors.push(...result.errors);
      warnings.push(...result.warnings);
      if (edgeIds.has(edge.id)) errors.push(`Duplicate edge ID: ${edge.id}`);
      else edgeIds.add(edge.id);
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  validateNode(node: RelationshipNode): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    if (!node.id || node.id.trim() === "") errors.push("Node ID is required");
    if (!node.label || node.label.trim() === "")
      warnings.push(`Node ${node.id} has no label`);
    return { isValid: errors.length === 0, errors, warnings };
  }

  validateEdge(
    edge: RelationshipEdge,
    graph: RelationshipGraph,
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    if (!edge.id || edge.id.trim() === "") errors.push("Edge ID is required");
    if (!edge.source || edge.source.trim() === "")
      errors.push("Edge source is required");
    if (!edge.target || edge.target.trim() === "")
      errors.push("Edge target is required");
    if (edge.source === edge.target) errors.push("Self-loops are not allowed");
    const sourceExists = graph.nodes.some((n) => n.id === edge.source);
    const targetExists = graph.nodes.some((n) => n.id === edge.target);
    if (!sourceExists || !targetExists)
      errors.push(
        `Edge references non-existent nodes: ${edge.source} -> ${edge.target}`,
      );
    if (
      graph.edges.some(
        (e) =>
          e.id !== edge.id &&
          e.source === edge.source &&
          e.target === edge.target,
      )
    )
      errors.push(`Duplicate edge between ${edge.source} and ${edge.target}`);
    if (!edge.label || edge.label.trim() === "")
      warnings.push(`Edge ${edge.id} has no label`);
    return { isValid: errors.length === 0, errors, warnings };
  }

  isNodeIdUnique(nodeId: string, graph: RelationshipGraph): boolean {
    return !graph.nodes.some((n) => n.id === nodeId);
  }

  isEdgeIdUnique(edgeId: string, graph: RelationshipGraph): boolean {
    return !graph.edges.some((e) => e.id === edgeId);
  }

  doNodesExist(edge: RelationshipEdge, graph: RelationshipGraph): boolean {
    return (
      graph.nodes.some((n) => n.id === edge.source) &&
      graph.nodes.some((n) => n.id === edge.target)
    );
  }
}

export const relationshipGraphValidationService =
  new RelationshipGraphValidationService();
