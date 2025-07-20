import RelationshipGraphEdit from "../svelte/RelationshipGraphEdit.svelte";
import RelationshipGraphView from "../svelte/RelationshipGraphView.svelte";
import { mount, unmount } from "svelte";

/**
 * V2 JournalEntryPageSheet subclass drawing a simple relationship graph.
 * @extends JournalEntryPageSheet
 */
export default class JournalEntryPageRelationshipGraphSheet extends foundry.applications.sheets
  .journal.JournalEntryPageHandlebarsSheet {
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

  /** @override */
  async _prepareContext(options: any) {
    // No dynamic context needed for hard-coded POC
    const context = await super._prepareContext(options);
    (context as any).graphData = (this as any).document.system;
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

  /** @override */
  async _onRender(context: any, options: any) {
    await super._onRender(context, options);
    // After the sheet content (including parts) is rendered, draw the graph
    const target = this.element.querySelector("#relationship-graph-svelte");
    if (!target) return console.warn("Svelte mount point not found");

    // Unmount existing instance
    if (this.svelteApp) {
      await unmount(this.svelteApp);
      this.svelteApp = null;
    }

    const graphData = (context as any).graphData;
    if (graphData.nodes.length === 0) {
      graphData.nodes = [ { id: "Bauer", x: 150, y: 200 }, { id: "Müller", x: 450, y: 200 } ];
    }

    if (graphData.edges.length === 0) {
      graphData.edges = [ { from: "Bauer", to: "Müller", label: "Weizen" } ];
    }

    const props = {
      nodes: graphData.nodes,
      edges: graphData.edges
    }

    const svelteOptions = {
      target,
      props: props,
    }
    console.log("🚀 Relationship App: Svelte options:", svelteOptions);
    // Mount the Svelte component using the v5 mount API
    this.svelteApp = mount((this as any).isView ? RelationshipGraphView : RelationshipGraphEdit, svelteOptions);
  }

  /** @override */
  async _onClose(options: any) {
    if (this.svelteApp) {
      await unmount(this.svelteApp);
      this.svelteApp = null;
    }
    return super._onClose(options);
  }
}
