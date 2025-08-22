import cytoscape from "cytoscape";
import type { RelationshipGraphData, NodeData, EdgeData } from "../global";
import type { IRelationshipGraphCytoscapeService } from "./IRelationshipGraphCytoscapeService";

export class RelationshipGraphCytoscapeService implements IRelationshipGraphCytoscapeService {
  private cy?: any;
  private eventCallbacks: Map<string, ((...args: any[]) => void)[]> = new Map();

  // Core Cytoscape Operations
  initialize(container: HTMLElement, graph: RelationshipGraphData): any {
    this.cy = cytoscape({
      container,
      elements: {
        nodes: graph.nodes.map((n) => ({
          data: {
            id: n.id,
            label: n.label?.value,
            x: n.x,
            y: n.y,
            ...n.cytoScapeAttributes,
          },
        })),
        edges: graph.edges.map((e) => ({
          data: {
            id: e.id,
            source: e.source,
            target: e.target,
            ...e.cytoScapeAttributes,
          },
        })),
      },
      layout: { name: "preset" },
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#ffffff",
            "border-color": "#000000",
            "border-width": "1px",
            width: "60px",
            height: "60px",
            "font-size": "12px",
            color: "#000000",
            "text-valign": "center",
            "text-halign": "center",
          },
        },
        {
          selector: "edge",
          style: {
            "line-color": "#000000",
            "line-width": "1px",
            "line-style": "solid",
            "curve-style": "bezier",
            "target-arrow-color": "#000000",
            "target-arrow-shape": "triangle",
          },
        },
      ],
    } as any);
    return this.cy;
  }

  destroy(): void {
    if (this.cy) {
      this.cy.destroy();
      this.cy = undefined;
    }
    this.eventCallbacks.clear();
  }

  // Graph Manipulation
  addNode(node: NodeData): void {
    if (this.cy) {
      this.cy.add({
        group: "nodes",
        data: {
          id: node.id,
          label: node.label?.value,
          x: node.x,
          y: node.y,
          ...node.cytoScapeAttributes,
        },
      });
    }
  }

  updateNode(nodeId: string, updates: Partial<NodeData>): void {
    if (this.cy) {
      const node = this.cy.getElementById(nodeId);
      if (node.length > 0) {
        const data = { ...node.data() };
        if (updates.x !== undefined) data.x = updates.x;
        if (updates.y !== undefined) data.y = updates.y;
        if (updates.label?.value) data.label = updates.label.value;
        if (updates.cytoScapeAttributes) {
          Object.assign(data, updates.cytoScapeAttributes);
        }
        node.data(data);
      }
    }
  }

  removeNode(nodeId: string): void {
    if (this.cy) {
      const node = this.cy.getElementById(nodeId);
      if (node.length > 0) {
        node.remove();
      }
    }
  }

  addEdge(edge: EdgeData): void {
    if (this.cy) {
      this.cy.add({
        group: "edges",
        data: {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          ...edge.cytoScapeAttributes,
        },
      });
    }
  }

  updateEdge(edgeId: string, updates: Partial<EdgeData>): void {
    if (this.cy) {
      const edge = this.cy.getElementById(edgeId);
      if (edge.length > 0) {
        const data = { ...edge.data() };
        if (updates.label?.value) data.label = updates.label.value;
        if (updates.cytoScapeAttributes) {
          Object.assign(data, updates.cytoScapeAttributes);
        }
        edge.data(data);
      }
    }
  }

  removeEdge(edgeId: string): void {
    if (this.cy) {
      const edge = this.cy.getElementById(edgeId);
      if (edge.length > 0) {
        edge.remove();
      }
    }
  }

  // Layout Management
  async applyLayout(layoutName: string, options?: any): Promise<void> {
    if (this.cy) {
      const layout = this.cy.layout({
        name: layoutName,
        ...options,
      });
      return new Promise((resolve) => {
        layout.run();
        layout.on("layoutstop", resolve);
      });
    }
  }

  getAvailableLayouts(): string[] {
    return ["preset", "grid", "random", "circle", "concentric", "breadthfirst", "cose"];
  }

  getCurrentLayout(): string {
    return "preset"; // This would need to track the current layout
  }

  // Interaction Management
  enablePanning(enabled: boolean): void {
    if (this.cy) {
      this.cy.panningEnabled(enabled);
    }
  }

  enableZooming(enabled: boolean): void {
    if (this.cy) {
      this.cy.zoomingEnabled(enabled);
    }
  }

  enableSelection(enabled: boolean): void {
    if (this.cy) {
      this.cy.selectionType(enabled ? "single" : "none");
    }
  }

  // Event Handling
  onNodeClick(callback: (nodeId: string) => void): void {
    if (this.cy) {
      this.cy.on("tap", "node", (event: any) => {
        const nodeId = event.target.id();
        callback(nodeId);
      });
    }
  }

  onEdgeClick(callback: (edgeId: string) => void): void {
    if (this.cy) {
      this.cy.on("tap", "edge", (event: any) => {
        const edgeId = event.target.id();
        callback(edgeId);
      });
    }
  }

  onCanvasClick(callback: () => void): void {
    if (this.cy) {
      this.cy.on("tap", (event: any) => {
        if (event.target === this.cy) {
          callback();
        }
      });
    }
  }

  onNodeDrag(callback: (nodeId: string, x: number, y: number) => void): void {
    if (this.cy) {
      this.cy.on("dragfreeon", "node", (event: any) => {
        const node = event.target;
        const position = node.position();
        callback(node.id(), position.x, position.y);
      });
    }
  }

  // Styling
  updateNodeStyle(nodeId: string, style: any): void {
    if (this.cy) {
      const node = this.cy.getElementById(nodeId);
      if (node.length > 0) {
        node.style(style);
      }
    }
  }

  updateEdgeStyle(edgeId: string, style: any): void {
    if (this.cy) {
      const edge = this.cy.getElementById(edgeId);
      if (edge.length > 0) {
        edge.style(style);
      }
    }
  }

  updateGlobalStyle(style: any): void {
    if (this.cy) {
      this.cy.style(style);
    }
  }

  // Performance
  enableAnimation(enabled: boolean): void {
    if (this.cy) {
      this.cy.animate({
        duration: enabled ? 300 : 0,
      });
    }
  }

  setAnimationDuration(duration: number): void {
    if (this.cy) {
      this.cy.animate({
        duration,
      });
    }
  }

  // Cleanup
  cleanup(): void {
    this.destroy();
  }
}
