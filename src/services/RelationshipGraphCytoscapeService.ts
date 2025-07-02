import type { RelationshipGraph } from "../types/relationship";
import { LoggerService } from "./LoggerService";

export class RelationshipGraphCytoscapeService {
  private logger = LoggerService.getInstance();

  convertToCytoscapeElements(graph: RelationshipGraph): any[] {
    const plain = JSON.parse(JSON.stringify(graph)) as RelationshipGraph;
    const elements: any[] = [];
    elements.push(...plain.nodes.map((n) => ({ data: n })));
    elements.push(
      ...plain.edges.map((e) => ({
        data: { ...e, color: this.getEdgeColor(e.type || "") },
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

  addElements(cy: any, elements: any[]): void {
    if (!this.isCytoscapeInitialized(cy)) {
      this.logger.warn("Cytoscape instance not initialized");
      return;
    }
    try {
      cy.add(elements);
    } catch (err) {
      this.logger.error("Error adding elements to Cytoscape", err as Error);
    }
  }

  removeElements(cy: any, ids: string[]): void {
    if (!this.isCytoscapeInitialized(cy)) {
      this.logger.warn("Cytoscape instance not initialized");
      return;
    }
    try {
      cy.getElementById(ids).remove();
    } catch (err) {
      this.logger.error("Error removing elements from Cytoscape", err as Error);
    }
  }

  applyLayout(cy: any, layoutName: string): void {
    if (!this.isCytoscapeInitialized(cy)) {
      this.logger.warn("Cytoscape instance not initialized");
      return;
    }
    try {
      cy.layout({ name: layoutName }).run();
    } catch (err) {
      this.logger.error("Error applying layout to Cytoscape", err as Error);
    }
  }
}

export const relationshipGraphCytoscapeService =
  new RelationshipGraphCytoscapeService();
