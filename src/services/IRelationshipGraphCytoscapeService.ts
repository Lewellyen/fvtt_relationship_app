import type {
  RelationshipGraph,
  RelationshipNode,
  RelationshipEdge,
} from "@/types/relationship";

/**
 * Interface for Cytoscape.js graph visualization operations.
 * Single Responsibility: Handles only Cytoscape-specific operations.
 */
export interface IRelationshipGraphCytoscapeService {
  /**
   * Converts a relationship graph to Cytoscape elements format.
   */
  convertToCytoscapeElements(graph: RelationshipGraph): any[];

  /**
   * Gets the color for an edge based on its type.
   */
  getEdgeColor(edgeType: string): string;

  /**
   * Gets the default Cytoscape style configuration.
   */
  getDefaultStyle(): any[];

  /**
   * Gets the default Cytoscape layout configuration.
   */
  getDefaultLayout(layoutName: string): any;

  /**
   * Validates if a Cytoscape instance is properly initialized.
   */
  isCytoscapeInitialized(cy: any): boolean;

  /**
   * Safely adds elements to a Cytoscape instance.
   */
  addElements(cy: any, elements: any[]): void;

  /**
   * Safely removes elements from a Cytoscape instance.
   */
  removeElements(cy: any, elementIds: string[]): void;

  /**
   * Applies layout to a Cytoscape instance.
   */
  applyLayout(cy: any, layoutName: string): void;
}
