import type { IRelationshipGraphDemoDataService } from "./IRelationshipGraphDemoDataService";
import type { IRelationshipGraphService } from "./IRelationshipGraphService";
import type { NodeData, EdgeData } from "../global";

export class RelationshipGraphDemoDataService implements IRelationshipGraphDemoDataService {
  getDemoData(): { nodes: NodeData[]; edges: EdgeData[] } {
    const defaultPermissions = { defaultLevel: 0, users: [] };

    const createNodeAttributes = () => {
      return {
        color: "#000",
        shape: "ellipse",
        size: 30,
        "border-color": "#000",
        "border-width": 0,
        "background-color": "#999",
        "background-opacity": 1,
        opacity: 1,
        visibility: "visible",
        events: "yes",
        "text-events": "no",
        // label: "", // Removed to prevent overriding actual labels
        "font-size": 16,
        "font-family": "Helvetica Neue, Helvetica, sans-serif",
        "font-weight": "normal",
        "font-style": "normal",
        "text-valign": "top",
        "text-halign": "center",
        "text-justification": "auto",
        "text-wrap": "none",
        "text-overflow-wrap": "whitespace",
        "text-max-width": 9999,
        "text-rotation": "none",
        "text-margin-x": 0,
        "text-margin-y": 0,
        "line-height": 1,
        display: "element",
        "text-outline-color": "#000",
        "text-outline-width": 0,
        "text-outline-opacity": 1,
        "text-opacity": 1,
        "text-decoration": "none",
        "text-transform": "none",
        "text-background-color": "#000",
        "text-background-opacity": 0,
        "text-background-shape": "rectangle",
        "text-background-padding": 0,
        "text-border-color": "#000",
        "text-border-width": 0,
        "text-border-style": "solid",
        "text-border-opacity": 0,
        "min-zoomed-font-size": 0,
        "overlay-color": "#000",
        "overlay-opacity": 0,
        "overlay-padding": 10,
        "overlay-shape": "roundrectangle",
        "overlay-corner-radius": "auto",
        "underlay-color": "#000",
        "underlay-opacity": 0,
        "underlay-padding": 10,
        "underlay-shape": "roundrectangle",
        "underlay-corner-radius": "auto",
        "transition-property": "none",
        "transition-duration": 0,
        "transition-delay": 0,
        "transition-timing-function": "linear",
        "z-index": 0,
        "z-compound-depth": "auto",
        "z-index-compare": "auto",
        "box-select-labels": "no",
        width: 30,
        height: 30,
        "background-image": "none",
        "background-image-crossorigin": "anonymous",
        "background-image-opacity": 1,
        "background-image-containment": "inside",
        "background-image-smoothing": "yes",
        "background-position-x": "50%",
        "background-position-y": "50%",
        "background-offset-x": 0,
        "background-offset-y": 0,
        "background-width-relative-to": "include-padding",
        "background-height-relative-to": "include-padding",
        "background-repeat": "no-repeat",
        "background-fit": "none",
        "background-clip": "node",
        "background-width": "auto",
        "background-height": "auto",
        "corner-radius": "auto",
        padding: 0,
        "border-style": "solid",
        "border-opacity": 1,
        "border-dash-pattern": [4, 2],
        "border-dash-offset": 0,
        "border-cap": "butt",
        "border-join": "miter",
        "border-position": "center",
        "outline-color": "#999",
        "outline-width": 0,
        "outline-opacity": 1,
        "outline-offset": 0,
        "outline-style": "solid",
        "background-gradient-direction": "to-bottom",
        "background-gradient-stop-colors": "#999",
        "background-gradient-stop-positions": "0%",
        "background-blacken": 0,
        "background-fill": "solid",
        "shape-polygon-points": "-1, -1,   1, -1,   1, 1,   -1, 1",
        "bounds-expansion": 0,
        "pie-size": "100%",
        "pie-hole": 0,
        "pie-start-angle": "0deg",
        "padding-relative-to": "width",
        position: "origin",
        "compound-sizing-wrt-labels": "include",
        "min-width": 0,
        "min-height": 0,
        ghost: "no",
        "ghost-offset-x": 0,
        "ghost-offset-y": 0,
        "ghost-opacity": 0,
      } as any;
    };

    const createEdgeAttributes = () => {
      return {
        color: "#000",
        opacity: 1,
        visibility: "visible",
        events: "yes",
        "text-events": "no",
        // label: "", // Removed to prevent overriding actual labels
        "font-size": 16,
        "font-family": "Helvetica Neue, Helvetica, sans-serif",
        "font-weight": "normal",
        "font-style": "normal",
        "text-valign": "top",
        "text-halign": "center",
        "text-justification": "auto",
        "text-wrap": "none",
        "text-overflow-wrap": "whitespace",
        "text-max-width": 9999,
        "text-rotation": "none",
        "text-margin-x": 0,
        "text-margin-y": 0,
        "line-height": 1,
        display: "element",
        "text-outline-color": "#000",
        "text-outline-width": 0,
        "text-outline-opacity": 1,
        "text-opacity": 1,
        "text-decoration": "none",
        "text-transform": "none",
        "text-background-color": "#000",
        "text-background-opacity": 0,
        "text-background-shape": "rectangle",
        "text-background-padding": 0,
        "text-border-color": "#000",
        "text-border-width": 0,
        "text-border-style": "solid",
        "text-border-opacity": 0,
        "min-zoomed-font-size": 0,
        "overlay-color": "#000",
        "overlay-opacity": 0,
        "overlay-padding": 10,
        "overlay-shape": "roundrectangle",
        "overlay-corner-radius": "auto",
        "underlay-color": "#000",
        "underlay-opacity": 0,
        "underlay-padding": 10,
        "underlay-shape": "roundrectangle",
        "underlay-corner-radius": "auto",
        "transition-property": "none",
        "transition-duration": 0,
        "transition-delay": 0,
        "transition-timing-function": "linear",
        "z-index": 0,
        "z-compound-depth": "auto",
        "z-index-compare": "auto",
        "box-select-labels": "no",
        width: 3,
        "line-color": "#999",
        "line-opacity": 1,
        "line-style": "solid",
        "curve-style": "haystack",
        "target-arrow-shape": "none",
        "target-arrow-color": "#999",
        "target-arrow-width": 1,
        "target-arrow-fill": "filled",
        "source-arrow-shape": "none",
        "source-arrow-color": "#999",
        "source-arrow-width": 1,
        "source-arrow-fill": "filled",
        "mid-source-arrow-shape": "none",
        "mid-source-arrow-color": "#999",
        "mid-source-arrow-width": 1,
        "mid-source-arrow-fill": "filled",
        "mid-target-arrow-shape": "none",
        "mid-target-arrow-color": "#999",
        "mid-target-arrow-width": 1,
        "mid-target-arrow-fill": "filled",
        "line-cap": "butt",
        "line-fill": "solid",
        "line-outline-width": 0,
        "line-outline-color": "#000",
        "line-gradient-stop-colors": "#999",
        "line-gradient-stop-positions": "0%",
        "line-dash-pattern": [6, 3],
        "line-dash-offset": 0,
        "control-point-step-size": 40,
        "control-point-weights": 0.5,
        "segment-weights": 0.5,
        "segment-distances": 20,
        "segment-radii": 15,
        "radius-type": "arc-radius",
        "taxi-turn": "50%",
        "taxi-radius": 15,
        "taxi-turn-min-distance": 10,
        "taxi-direction": "auto",
        "edge-distances": "intersection",
        "haystack-radius": 0,
        "arrow-scale": 1,
        "loop-direction": "-45deg",
        "loop-sweep": "-90deg",
        "source-distance-from-node": 0,
        "target-distance-from-node": 0,
        "source-endpoint": "outside-to-node",
        "target-endpoint": "outside-to-node",
        "source-label": "",
        "source-text-offset": 0,
        "source-text-margin-x": 0,
        "source-text-margin-y": 0,
        "source-text-rotation": "none",
        "target-label": "",
        "target-text-offset": 0,
        "target-text-margin-x": 0,
        "target-text-margin-y": 0,
        "target-text-rotation": "none",
      } as any;
    };

    const node1Id = foundry.utils.randomID();
    const node2Id = foundry.utils.randomID();

    const nodes: NodeData[] = [
      {
        id: node1Id,
        x: 100,
        y: 100,
        label: { value: "Bauer", permissions: defaultPermissions },
        type: { value: "person", permissions: defaultPermissions },
        globalPermissions: defaultPermissions,
        cytoScapeAttributes: {
          ...createNodeAttributes(),
          color: "#000000",
          "background-color": "#006400",
          shape: "ellipse",
          width: 80,
          height: 80,
          "border-color": "#000",
          "border-width": 2,
          "text-valign": "center",
          "text-halign": "center",
          "font-size": 16,
          "font-weight": "bold",
          "font-family": "Arial, sans-serif",
          label: "Bauer",
          group: "bauern",
        },
        descriptions: [],
        playerRelationshipEffects: [],
        image: { path: "", permissions: defaultPermissions },
        zIndex: 1,
      },
      {
        id: node2Id,
        x: 300,
        y: 100,
        label: { value: "Müller", permissions: defaultPermissions },
        type: { value: "person", permissions: defaultPermissions },
        globalPermissions: defaultPermissions,
        cytoScapeAttributes: {
          ...createNodeAttributes(),
          color: "#000000",
          "background-color": "#4169E1",
          shape: "ellipse",
          width: 80,
          height: 80,
          "border-color": "#000",
          "border-width": 2,
          "text-valign": "center",
          "text-halign": "center",
          "font-size": 16,
          "font-weight": "bold",
          "font-family": "Arial, sans-serif",
          label: "Müller",
          group: "bürger",
        },
        descriptions: [],
        playerRelationshipEffects: [],
        image: { path: "", permissions: defaultPermissions },
        zIndex: 1,
      },
    ];

    const edges: EdgeData[] = [
      {
        id: foundry.utils.randomID(),
        source: node1Id,
        target: node2Id,
        label: { value: "Weizen", permissions: defaultPermissions },
        type: "trade",
        globalPermissions: defaultPermissions,
        cytoScapeAttributes: {
          ...createEdgeAttributes(),
          color: "#000",
          "line-color": "#000",
          "line-opacity": 1,
          "line-style": "solid",
          "target-arrow-shape": "triangle",
          "target-arrow-color": "#000",
          "target-arrow-width": 2,
          "curve-style": "bezier",
          "text-margin-y": -10,
          label: "Weizen", // Override the empty label from createEdgeAttributes
        },
      },
    ];

    return { nodes, edges };
  }

  async createDemoData(service: IRelationshipGraphService): Promise<void> {
    const demoData = this.getDemoData();

    // Erstelle das elements Objekt im korrekten Cytoscape-Format
    const elements = {
      nodes: demoData.nodes.map((node) => ({
        data: {
          id: node.id,
          label: node.label?.value || "",
          type: node.type?.value || "",
          // Alle NodeData-Felder direkt in data speichern
          x: node.x,
          y: node.y,
          permissions: node.globalPermissions,
          descriptions: node.descriptions,
          playerRelationshipEffects: node.playerRelationshipEffects,
          image: node.image,
          zIndex: node.zIndex,
          // Cytoscape-Attribute
          ...node.cytoScapeAttributes,
        },
        position: {
          x: node.x,
          y: node.y,
        },
      })),
      edges: demoData.edges.map((edge) => ({
        data: {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          label: edge.label?.value || "",
          type: edge.type,
          // Alle EdgeData-Felder direkt in data speichern
          permissions: edge.globalPermissions,
          connectionCategory: edge.connectionCategory,
          zIndex: edge.zIndex,
          // Cytoscape-Attribute
          ...edge.cytoScapeAttributes,
        },
      })),
    };

    // Speichere NUR die elements direkt in das Journal Entry
    if (service.getDocument()) {
      await service.getDocument().update({
        "system.elements": elements,
      },{render: false});
    }
  }

  // Demo Data Templates
  createSimpleDemo(): { nodes: NodeData[]; edges: EdgeData[] } {
    const defaultPermissions = { defaultLevel: 0, users: [] };

    const nodes: NodeData[] = [
      {
        id: foundry.utils.randomID(),
        x: 100,
        y: 100,
        label: { value: "Node 1", permissions: defaultPermissions },
        type: { value: "simple", permissions: defaultPermissions },
        cytoScapeAttributes: {
          shape: "ellipse",
          size: 60,
          color: "#000000",
          "background-color": "#ffffff",
          "border-color": "#000000",
          "border-width": 1,
          width: 60,
          height: 60,
        },
        globalPermissions: defaultPermissions,
      },
      {
        id: foundry.utils.randomID(),
        x: 300,
        y: 100,
        label: { value: "Node 2", permissions: defaultPermissions },
        type: { value: "simple", permissions: defaultPermissions },
        cytoScapeAttributes: {
          shape: "ellipse",
          size: 60,
          color: "#000000",
          "background-color": "#ffffff",
          "border-color": "#000000",
          "border-width": 1,
          width: 60,
          height: 60,
        },
        globalPermissions: defaultPermissions,
      },
    ];

    const edges: EdgeData[] = [
      {
        id: foundry.utils.randomID(),
        source: nodes[0].id,
        target: nodes[1].id,
        label: { value: "Connection", permissions: defaultPermissions },
        type: "simple",
        cytoScapeAttributes: {
          color: "#000000",
          "line-color": "#000000",
          width: 1,
        },
        globalPermissions: defaultPermissions,
      },
    ];

    return { nodes, edges };
  }

  createComplexDemo(): { nodes: NodeData[]; edges: EdgeData[] } {
    const defaultPermissions = { defaultLevel: 0, users: [] };

    const nodes: NodeData[] = Array.from({ length: 10 }, (_, i) => ({
      id: foundry.utils.randomID(),
      x: 100 + i * 80,
      y: 100 + i * 60,
      label: { value: `Complex Node ${i + 1}`, permissions: defaultPermissions },
      type: { value: "complex", permissions: defaultPermissions },
      cytoScapeAttributes: {
        shape: "ellipse",
        size: 80,
        color: "#000000",
        "background-color": `hsl(${i * 36}, 70%, 60%)`,
        "border-color": "#000000",
        "border-width": 2,
        width: 80,
        height: 80,
      },
      globalPermissions: defaultPermissions,
    }));

    const edges: EdgeData[] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      edges.push({
        id: foundry.utils.randomID(),
        source: nodes[i].id,
        target: nodes[i + 1].id,
        label: { value: `Edge ${i + 1}`, permissions: defaultPermissions },
        type: "complex",
        cytoScapeAttributes: {
          color: `hsl(${i * 36}, 70%, 40%)`,
          "line-color": `hsl(${i * 36}, 70%, 40%)`,
          width: 2,
          "curve-style": "bezier",
        },
        globalPermissions: defaultPermissions,
      });
    }

    return { nodes, edges };
  }

  createCharacterDemo(): { nodes: NodeData[]; edges: EdgeData[] } {
    const defaultPermissions = { defaultLevel: 0, users: [] };

    const nodes: NodeData[] = [
      {
        id: foundry.utils.randomID(),
        x: 200,
        y: 200,
        label: { value: "Hero", permissions: defaultPermissions },
        type: { value: "character", permissions: defaultPermissions },
        cytoScapeAttributes: {
          shape: "ellipse",
          size: 100,
          color: "#000000",
          "background-color": "#ffd700",
          "border-color": "#ff8c00",
          "border-width": 3,
          width: 100,
          height: 100,
        },
        globalPermissions: defaultPermissions,
      },
      {
        id: foundry.utils.randomID(),
        x: 400,
        y: 150,
        label: { value: "Villain", permissions: defaultPermissions },
        type: { value: "character", permissions: defaultPermissions },
        cytoScapeAttributes: {
          shape: "ellipse",
          size: 100,
          color: "#000000",
          "background-color": "#ff4444",
          "border-color": "#cc0000",
          "border-width": 3,
          width: 100,
          height: 100,
        },
        globalPermissions: defaultPermissions,
      },
      {
        id: foundry.utils.randomID(),
        x: 300,
        y: 300,
        label: { value: "Ally", permissions: defaultPermissions },
        type: { value: "character", permissions: defaultPermissions },
        cytoScapeAttributes: {
          shape: "ellipse",
          size: 100,
          color: "#000000",
          "background-color": "#44ff44",
          "border-color": "#00cc00",
          "border-width": 3,
          width: 100,
          height: 100,
        },
        globalPermissions: defaultPermissions,
      },
    ];

    const edges: EdgeData[] = [
      {
        id: foundry.utils.randomID(),
        source: nodes[0].id,
        target: nodes[1].id,
        label: { value: "Fights", permissions: defaultPermissions },
        type: "enemy",
        cytoScapeAttributes: {
          "line-color": "#ff0000",
          width: 3,
          "line-style": "solid",
          color: "#ff0000",
        },
        globalPermissions: defaultPermissions,
      },
      {
        id: foundry.utils.randomID(),
        source: nodes[0].id,
        target: nodes[2].id,
        label: { value: "Helps", permissions: defaultPermissions },
        type: "ally",
        cytoScapeAttributes: {
          "line-color": "#00ff00",
          width: 3,
          "line-style": "solid",
          color: "#00ff00",
        },
        globalPermissions: defaultPermissions,
      },
    ];

    return { nodes, edges };
  }

  createWorldDemo(): { nodes: NodeData[]; edges: EdgeData[] } {
    const defaultPermissions = { defaultLevel: 0, users: [] };

    const nodes: NodeData[] = [
      {
        id: foundry.utils.randomID(),
        x: 300,
        y: 200,
        label: { value: "Capital City", permissions: defaultPermissions },
        type: { value: "city", permissions: defaultPermissions },
        cytoScapeAttributes: {
          shape: "rectangle",
          size: 80,
          color: "#87ceeb",
          "background-color": "#87ceeb",
          "border-color": "#4682b4",
          "border-width": 2,
          width: 120,
          height: 80,
        },
        globalPermissions: defaultPermissions,
      },
      {
        id: foundry.utils.randomID(),
        x: 100,
        y: 100,
        label: { value: "Forest Village", permissions: defaultPermissions },
        type: { value: "village", permissions: defaultPermissions },
        cytoScapeAttributes: {
          shape: "rectangle",
          size: 60,
          color: "#90ee90",
          "background-color": "#90ee90",
          "border-color": "#228b22",
          "border-width": 2,
          width: 100,
          height: 60,
        },
        globalPermissions: defaultPermissions,
      },
      {
        id: foundry.utils.randomID(),
        x: 500,
        y: 300,
        label: { value: "Mountain Fortress", permissions: defaultPermissions },
        type: { value: "fortress", permissions: defaultPermissions },
        cytoScapeAttributes: {
          shape: "rectangle",
          size: 80,
          color: "#d2b48c",
          "background-color": "#d2b48c",
          "border-color": "#8b4513",
          "border-width": 2,
          width: 100,
          height: 80,
        },
        globalPermissions: defaultPermissions,
      },
    ];

    const edges: EdgeData[] = [
      {
        id: foundry.utils.randomID(),
        source: nodes[0].id,
        target: nodes[1].id,
        label: { value: "Trade Route", permissions: defaultPermissions },
        type: "trade",
        cytoScapeAttributes: {
          "line-color": "#ffa500",
          width: 2,
          "line-style": "dashed",
          color: "#ffa500",
        },
        globalPermissions: defaultPermissions,
      },
      {
        id: foundry.utils.randomID(),
        source: nodes[0].id,
        target: nodes[2].id,
        label: { value: "Military Road", permissions: defaultPermissions },
        type: "military",
        cytoScapeAttributes: {
          "line-color": "#ff0000",
          width: 3,
          "line-style": "solid",
          color: "#ff0000",
        },
        globalPermissions: defaultPermissions,
      },
    ];

    return { nodes, edges };
  }

  // Demo Data Management
  async clearDemoData(service: IRelationshipGraphService): Promise<void> {
    // Lösche alle Elements aus dem Journal Entry
    if (service.getDocument()) {
      await service.getDocument().update({
        "system.elements": { nodes: [], edges: [] },
      });
    }
  }

  hasDemoData(service: IRelationshipGraphService): boolean {
    const document = service.getDocument();
    if (!document) return false;

    const elements = (document.system as any)?.elements;
    if (!elements) return false;

    return (
      (elements.nodes && elements.nodes.length > 0) || (elements.edges && elements.edges.length > 0)
    );
  }

  // Demo Data Configuration
  private currentTemplate: string = "simple";

  setDemoDataTemplate(template: "simple" | "complex" | "character" | "world"): void {
    this.currentTemplate = template;
  }

  getCurrentTemplate(): string {
    return this.currentTemplate;
  }

  // Cleanup
  cleanup(): void {
    // Reset to default template
    this.currentTemplate = "simple";
  }
}
