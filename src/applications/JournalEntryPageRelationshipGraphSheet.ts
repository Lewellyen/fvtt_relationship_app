import RelationshipGraphEdit from "../svelte/RelationshipGraphEdit.svelte";
import RelationshipGraphView from "../svelte/RelationshipGraphView.svelte";
import { mount, unmount } from "svelte";
import { ServiceManager } from "../services/ServiceManager";
import { SERVICE_IDENTIFIERS } from "../services/IServiceFactory";
import type { IRelationshipGraphService } from "../services/IRelationshipGraphService";
import type { IDocument, RelationshipGraphData } from "../global";

/**
 * V2 JournalEntryPageSheet subclass drawing a simple relationship graph.
 * @extends JournalEntryPageSheet
 */
export default class JournalEntryPageRelationshipGraphSheet extends foundry.applications.sheets
  .journal.JournalEntryPageHandlebarsSheet {
  // ✅ Nur eine Methode, die bei Bedarf den Service holt
  private getGraphService(): IRelationshipGraphService {
    return ServiceManager.getInstance().getService<IRelationshipGraphService>(
      SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH,
      (this as any).document as IDocument,
      (this as any).document as IDocument
    );
  }

  /**
   * Merge the default parts, inserting our graph part between header and footer.
   */
  static EDIT_PARTS = (() => {
    const parts = (foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet as any)
      .EDIT_PARTS as Record<string, { template: string }>;
    const { header, footer, ...rest } = parts;
    return {
      header,
      graph: {
        template:
          "modules/relationship-app/templates/journal-entry-relationship-graph-edit-part.hbs",
      },
      ...rest,
      footer,
    };
  })();

  static VIEW_PARTS = (() => {
    // Use the base EDIT_PARTS to ensure header and footer exist for view mode
    const parts = (foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet as any)
      .VIEW_PARTS as Record<string, { template: string }>;
    return {
      ...parts,
      graph: {
        template:
          "modules/relationship-app/templates/journal-entry-relationship-graph-view-part.hbs",
      },
    };
  })();

  svelteApp: any = null;

  /** @override */
  static DEFAULT_OPTIONS = {
    // Unique ID for the sheet
    id: "journal-entry-relationship-graph",
    // CSS classes to apply
    classes: ["journal-entry-page", "relationship-graph"],
    // Window sizing and behavior
    position: { width: 650, height: 500 },
    window: { title: "Beziehungsgraph" },
    resizable: true,
    includeTOC: true,
  };

  /** @override */
  get title() {
    return this.options.window.title;
  }

  async _prepareContext(options: any) {
    const context = await super._prepareContext(options);
    const service = this.getGraphService();
    (context as any).graphData = {
      nodes: service.getNodes(),
      edges: service.getEdges(),
    };
    return context;
  }

  /** @override */
  async _renderHTML(context: any, options: any) {
    // Delegate template rendering to HandlebarsApplicationMixin
    return super._renderHTML(context, options);
  }

  /** @override */
  _replaceHTML(html: any, options: any, context: any) {
    // Replace rendered HTML via HandlebarsApplicationMixin
    return super._replaceHTML(html, options, context);
  }

  async _onRender(context: any, options: any) {
    await super._onRender(context, options);
    const target = this.element.querySelector("#relationship-graph-svelte");
    if (!target) return console.warn("Svelte mount point not found");

    // Unmount existing instance
    if (this.svelteApp) {
      await unmount(this.svelteApp);
      this.svelteApp = null;
    }
    // ✅ Service direkt holen, wenn gebraucht
    const service = this.getGraphService();

    // Demo-Daten falls leer
    if (service.getNodes().length === 0) {
      //this.createDemoData();
    }

    // ✅ Direkt vom Service holen
    this.svelteApp = mount((this as any).isView ? RelationshipGraphView : RelationshipGraphEdit, {
      target,
      props: {
        graph: service.getGraph() as RelationshipGraphData,
        nodes: service.getNodes(),
        edges: service.getEdges(),
      },
    });
  }

  /** @override */
  async _onClose(options: any) {
    if (this.svelteApp) {
      await unmount(this.svelteApp);
      this.svelteApp = null;
    }
    return super._onClose(options);
  }

  createDemoData() {
    const service = this.getGraphService();
    const defaultPermissions = { defaultLevel: 0, users: [] };
    
    // Hilfsfunktion für korrekte Node-Attribute-Initialisierung
    const createNodeAttributes = () => {
      return {
        // Erforderliche Felder
        color: "#000",
        shape: "ellipse",
        size: 30,
        'border-color': "#000",
        'border-width': 0,
        // Optionale Felder mit Defaults
        'background-color': "#999", // Grau als Standard
        'background-opacity': 1,
        opacity: 1,
        visibility: "visible",
        events: "yes",
        'text-events': "no",
        label: "",
        'font-size': 16,
        'font-family': "Helvetica Neue, Helvetica, sans-serif",
        'font-weight': "normal",
        'font-style': "normal",
        'text-valign': "top",
        'text-halign': "center",
        'text-justification': "auto",
        'text-wrap': "none",
        'text-overflow-wrap': "whitespace",
        'text-max-width': 9999,
        'text-rotation': "none",
        'text-margin-x': 0,
        'text-margin-y': 0,
        'line-height': 1,
        display: "element",
        'text-outline-color': "#000",
        'text-outline-width': 0,
        'text-outline-opacity': 1,
        'text-opacity': 1,
        'text-decoration': "none",
        'text-transform': "none",
        'text-background-color': "#000",
        'text-background-opacity': 0,
        'text-background-shape': "rectangle",
        'text-background-padding': 0,
        'text-border-color': "#000",
        'text-border-width': 0,
        'text-border-style': "solid",
        'text-border-opacity': 0,
        'min-zoomed-font-size': 0,
        'overlay-color': "#000",
        'overlay-opacity': 0,
        'overlay-padding': 10,
        'overlay-shape': "roundrectangle",
        'overlay-corner-radius': "auto",
        'underlay-color': "#000",
        'underlay-opacity': 0,
        'underlay-padding': 10,
        'underlay-shape': "roundrectangle",
        'underlay-corner-radius': "auto",
        'transition-property': "none",
        'transition-duration': 0,
        'transition-delay': 0,
        'transition-timing-function': "linear",
        'z-index': 0,
        'z-compound-depth': "auto",
        'z-index-compare': "auto",
        'box-select-labels': "no",
        // Node-spezifische Felder
        width: 30,
        height: 30,
        'background-image': "none",
        'background-image-crossorigin': "anonymous",
        'background-image-opacity': 1,
        'background-image-containment': "inside",
        'background-image-smoothing': "yes",
        'background-position-x': "50%",
        'background-position-y': "50%",
        'background-offset-x': 0,
        'background-offset-y': 0,
        'background-width-relative-to': "include-padding",
        'background-height-relative-to': "include-padding",
        'background-repeat': "no-repeat",
        'background-fit': "none",
        'background-clip': "node",
        'background-width': "auto",
        'background-height': "auto",
        'corner-radius': "auto",
        padding: 0,
        'border-style': "solid",
        'border-opacity': 1,
        'border-dash-pattern': [4, 2],
        'border-dash-offset': 0,
        'border-cap': "butt",
        'border-join': "miter",
        'border-position': "center",
        'outline-color': "#999",
        'outline-width': 0,
        'outline-opacity': 1,
        'outline-offset': 0,
        'outline-style': "solid",
        'background-gradient-direction': "to-bottom",
        'background-gradient-stop-colors': "#999",
        'background-gradient-stop-positions': "0%",
        'background-blacken': 0,
        'background-fill': "solid",
        'shape-polygon-points': "-1, -1,   1, -1,   1, 1,   -1, 1",
        'bounds-expansion': 0,
        'pie-size': "100%",
        'pie-hole': 0,
        'pie-start-angle': "0deg",
        'padding-relative-to': "width",
        position: "origin",
        'compound-sizing-wrt-labels': "include",
        'min-width': 0,
        'min-height': 0,
        ghost: "no",
        'ghost-offset-x': 0,
        'ghost-offset-y': 0,
        'ghost-opacity': 0
      };
    };
    
    // Hilfsfunktion für korrekte Edge-Attribute-Initialisierung
    const createEdgeAttributes = () => {
      return {
        // Erforderliche Felder
        color: "#000",
        // Optionale Felder mit Defaults
        opacity: 1,
        visibility: "visible",
        events: "yes",
        'text-events': "no",
        label: "",
        'font-size': 16,
        'font-family': "Helvetica Neue, Helvetica, sans-serif",
        'font-weight': "normal",
        'font-style': "normal",
        'text-valign': "top",
        'text-halign': "center",
        'text-justification': "auto",
        'text-wrap': "none",
        'text-overflow-wrap': "whitespace",
        'text-max-width': 9999,
        'text-rotation': "none",
        'text-margin-x': 0,
        'text-margin-y': 0,
        'line-height': 1,
        display: "element",
        'text-outline-color': "#000",
        'text-outline-width': 0,
        'text-outline-opacity': 1,
        'text-opacity': 1,
        'text-decoration': "none",
        'text-transform': "none",
        'text-background-color': "#000",
        'text-background-opacity': 0,
        'text-background-shape': "rectangle",
        'text-background-padding': 0,
        'text-border-color': "#000",
        'text-border-width': 0,
        'text-border-style': "solid",
        'text-border-opacity': 0,
        'min-zoomed-font-size': 0,
        'overlay-color': "#000",
        'overlay-opacity': 0,
        'overlay-padding': 10,
        'overlay-shape': "roundrectangle",
        'overlay-corner-radius': "auto",
        'underlay-color': "#000",
        'underlay-opacity': 0,
        'underlay-padding': 10,
        'underlay-shape': "roundrectangle",
        'underlay-corner-radius': "auto",
        'transition-property': "none",
        'transition-duration': 0,
        'transition-delay': 0,
        'transition-timing-function': "linear",
        'z-index': 0,
        'z-compound-depth': "auto",
        'z-index-compare': "auto",
        'box-select-labels': "no",
        // Edge-spezifische Felder
        width: 3,
        'line-color': "#999",
        'line-opacity': 1,
        'line-style': "solid",
        'curve-style': "haystack",
        'target-arrow-shape': "none",
        'target-arrow-color': "#999",
        'target-arrow-width': 1,
        'target-arrow-fill': "filled",
        'source-arrow-shape': "none",
        'source-arrow-color': "#999",
        'source-arrow-width': 1,
        'source-arrow-fill': "filled",
        'mid-source-arrow-shape': "none",
        'mid-source-arrow-color': "#999",
        'mid-source-arrow-width': 1,
        'mid-source-arrow-fill': "filled",
        'mid-target-arrow-shape': "none",
        'mid-target-arrow-color': "#999",
        'mid-target-arrow-width': 1,
        'mid-target-arrow-fill': "filled",
        'line-cap': "butt",
        'line-fill': "solid",
        'line-outline-width': 0,
        'line-outline-color': "#000",
        'line-gradient-stop-colors': "#999",
        'line-gradient-stop-positions': "0%",
        'line-dash-pattern': [6, 3],
        'line-dash-offset': 0,
        'control-point-step-size': 40,
        'control-point-weights': 0.5,
        'segment-weights': 0.5,
        'segment-distances': 20,
        'segment-radii': 15,
        'radius-type': "arc-radius",
        'taxi-turn': "50%",
        'taxi-radius': 15,
        'taxi-turn-min-distance': 10,
        'taxi-direction': "auto",
        'edge-distances': "intersection",
        'haystack-radius': 0,
        'arrow-scale': 1,
        'loop-direction': "-45deg",
        'loop-sweep': "-90deg",
        'source-distance-from-node': 0,
        'target-distance-from-node': 0,
        'source-endpoint': "outside-to-node",
        'target-endpoint': "outside-to-node",
        'source-label': "",
        'source-text-offset': 0,
        'source-text-margin-x': 0,
        'source-text-margin-y': 0,
        'source-text-rotation': "none",
        'target-label': "",
        'target-text-offset': 0,
        'target-text-margin-x': 0,
        'target-text-margin-y': 0,
        'target-text-rotation': "none"
      };
    };
    
    // Passe alle Demo-Nodes und Edges auf Snake_case an
    service.addNode({ 
      id: foundry.utils.randomID(), 
      x: 150, 
      y: 200, 
      label: { value: "Bauer", permissions: defaultPermissions }, 
      type: { value: "person", permissions: defaultPermissions }, 
      globalPermissions: defaultPermissions,
      cytoScapeAttributes: {
        ...createNodeAttributes(),
        color: "#000000",
        'background-color': "#006400", // Grün für Bauer
        shape: "ellipse",
        width: 80,
        height: 80,
        'border-color': "#000",
        'border-width': 0,
        'text-valign': "center",
        'text-halign': "center",
        'font-size': 14, // Kleinere Schrift für bessere Passung
        'font-weight': "bold",
        'font-family': "Arial, sans-serif",
      }
    });
    service.addNode({ 
      id: foundry.utils.randomID(), 
      x: 450, 
      y: 200, 
      label: { value: "Müller", permissions: defaultPermissions }, 
      type: { value: "person", permissions: defaultPermissions }, 
      globalPermissions: defaultPermissions,
      cytoScapeAttributes: {
        ...createNodeAttributes(),
        color: "#000000",
        'background-color': "#F5DEB3", // Weizengelb für Müller
        shape: "ellipse",
        width: 80,
        height: 80,
        'border-color': "#000",
        'border-width': 0,
        'text-valign': "center",
        'text-halign': "center",
        'font-size': 14, // Kleinere Schrift für bessere Passung
        'font-weight': "bold",
        'font-family': "Arial, sans-serif",
        'background-opacity': 1,
        'outline-color': "#F5DEB3",
        'background-gradient-stop-colors': "#F5DEB3",
      }
    });
    service.addEdge({
      id: foundry.utils.randomID(),
      source: service.getNodeByLabel("Bauer")?.id ?? "",
      target: service.getNodeByLabel("Müller")?.id ?? "",
      label: { value: "Weizen", permissions: defaultPermissions },
      type: "trade",
      globalPermissions: defaultPermissions,
      cytoScapeAttributes: {
        ...createEdgeAttributes(),
        color: "#000",
        'line-color': "#000",
        'line-opacity': 1,
        'line-style': "solid",
        'target-arrow-shape': "triangle", // Pfeil am Ende
        'target-arrow-color': "#000",
        'target-arrow-width': 2,
        'curve-style': "bezier", // Schönere Kurve
        'text-margin-y': -10, // Text über dem Pfeil
      }
    });
  }
}
