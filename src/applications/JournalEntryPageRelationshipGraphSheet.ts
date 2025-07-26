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
      this.createDemoData();
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
    
    service.addNode({ 
      id: foundry.utils.randomID(), 
      x: 150, 
      y: 200, 
      label: { value: "Bauer", permissions: defaultPermissions }, 
      type: { value: "person", permissions: defaultPermissions }, 
      globalPermissions: defaultPermissions
    });
    
    service.addNode({ 
      id: foundry.utils.randomID(), 
      x: 450, 
      y: 200, 
      label: { value: "Müller", permissions: defaultPermissions }, 
      type: { value: "person", permissions: defaultPermissions }, 
      globalPermissions: defaultPermissions
    });
    
    service.addEdge({
      id: foundry.utils.randomID(),
      source: service.getNodeByLabel("Bauer")?.id ?? "",
      target: service.getNodeByLabel("Müller")?.id ?? "",
      label: { value: "Weizen", permissions: defaultPermissions },
      type: "trade",
      globalPermissions: defaultPermissions
    });
  }
}
