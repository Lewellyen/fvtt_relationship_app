import cytoscape from "cytoscape";
import type { RelationshipGraphData } from "../global";
import type { IRelationshipGraphCytoscapeService } from "./IRelationshipGraphCytoscapeService";

export class RelationshipGraphCytoscapeService implements IRelationshipGraphCytoscapeService {
  private cy?: any;

  initialize(container: HTMLElement, graph: RelationshipGraphData): any {
    this.cy = cytoscape({
      container,
      elements: {
        nodes: graph.nodes.map((n) => ({ data: { id: n.id, label: n.label?.value } })),
        edges: graph.edges.map((e) => ({ data: { id: e.id, source: e.source, target: e.target } })),
      },
      layout: { name: "preset" },
    } as any);
    return this.cy;
  }

  destroy(): void {
    if (this.cy) {
      this.cy.destroy();
      this.cy = undefined;
    }
  }
}
