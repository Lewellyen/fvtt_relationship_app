import type { RelationshipGraph } from "@/types/relationship";
import type { IRelationshipGraphCytoscapeService } from "./IRelationshipGraphCytoscapeService";
import type { RelationshipNode, RelationshipEdge } from "@/types/relationship";
import { LoggerService } from "./LoggerService";

/**
 * Concrete implementation of Cytoscape.js graph visualization operations.
 * Single Responsibility: Handles only Cytoscape-specific operations.
 */
export class RelationshipGraphCytoscapeService
  implements IRelationshipGraphCytoscapeService
{
  private logger = LoggerService.getInstance();

  addElements(cy: any, elements: any[]): void {
    if (!cy) {
      this.logger.warn("Cytoscape instance is not properly initialized");
      return;
    }
    try {
      cy.add(elements);
    } catch (error) {
      this.logger.error("Error adding elements to Cytoscape", error as Error);
    }
  }

  removeElements(cy: any, elementIds: string[]): void {
    if (!cy) {
      this.logger.warn("Cytoscape instance is not properly initialized");
      return;
    }
    try {
      const elems = cy.getElementById(elementIds);
      elems.remove();
    } catch (error) {
      this.logger.error(
        "Error removing elements from Cytoscape",
        error as Error,
      );
    }
  }

  applyLayout(cy: any, layoutName: string, options?: any): void {
    if (!cy) {
      this.logger.warn("Cytoscape instance is not properly initialized");
      return;
    }
    try {
      const layout = cy.layout({ name: layoutName, ...options });
      layout.run();
    } catch (error) {
      this.logger.error("Error applying layout to Cytoscape", error as Error);
    }
  }

  convertToCytoscapeElements(graph: RelationshipGraph): any[] {
    const elements: any[] = [];
    // Deep-clone the graph to plain objects to avoid DataModel instances
    const plainGraph = JSON.parse(JSON.stringify(graph)) as RelationshipGraph;

    // Convert nodes
    elements.push(...plainGraph.nodes.map((n) => ({ data: n })));

    // Convert edges with colors
    elements.push(
      ...plainGraph.edges.map((e) => ({
        data: {
          ...e,
          color: this.getEdgeColor(e.type || ""),
        },
      })),
    );

    return elements;
  }

  getEdgeColor(edgeType: string): string {
    switch (edgeType) {
      case "ally":
        return "#16a34a";
      case "foe":
        return "#dc2626";
      default:
        return "#64748b";
    }
  }

  getDefaultStyle(): any[] {
    return [
      {
        selector: "node",
        style: {
          content: "data(label)",
          "text-valign": "center",
          "text-halign": "center",
          "background-color": "#1e40af",
          color: "#ffffff",
          "text-outline-color": "#000000",
          "text-outline-width": "1px",
        },
      },
      {
        selector: "edge",
        style: {
          "curve-style": "bezier",
          "target-arrow-shape": "triangle",
          content: "data(label)",
          "line-color": "data(color)",
          "target-arrow-color": "data(color)",
          color: "#ffffff",
          "text-outline-color": "#000000",
          "text-outline-width": "1px",
        },
      },
    ];
  }

  getDefaultLayout(layoutName: string): any {
    return { name: layoutName };
  }

  isCytoscapeInitialized(cy: any): boolean {
    return (
      cy && typeof cy.add === "function" && typeof cy.remove === "function"
    );
  }
}

// Singleton instance for dependency injection
export const relationshipGraphCytoscapeService =
  new RelationshipGraphCytoscapeService();
