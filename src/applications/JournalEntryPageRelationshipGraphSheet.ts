import RelationshipGraphView from "../svelte/RelationshipGraphView.svelte";
import RelationshipGraphEdit from "../svelte/RelationshipGraphEdit.svelte";
import { RelationshipGraphDemoDataService } from "../services/RelationshipGraphDemoDataService";
import { RelationshipGraphService } from "../services/RelationshipGraphService";
import { RelationshipGraphPersistenceService } from "../services/RelationshipGraphPersistenceService";
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
      content: {
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
      content: {
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
    position: { width: 800, height: 600 },
    window: { title: "Beziehungsgraph" },
    resizable: true,
    includeTOC: true,
  };

  /** @override */
  get title() {
    return this.options.window.title;
  }

  /** @override */
  async _renderHTML(context: any, options: any) {
    // Delegate template rendering to HandlebarsApplicationMixin
    return await super._renderHTML(context, options);
  }

  /** @override */
  _replaceHTML(html: any, options: any, context: any) {
    // Replace rendered HTML via HandlebarsApplicationMixin
    return super._replaceHTML(html, options, context);
  }

  async _preparePartContext(partContext: any, part: any, options: any) {
    const context = await super._preparePartContext(partContext, part, options);
    return context;
  }

  async _prepareContext(options: any) {
    const context = await super._prepareContext(options);
    console.log(
      "[JournalEntryPageRelationshipGraphSheet] _prepareContext called with context:",
      context
    );
    return context;
  }

  async _onRender(context: any, options: any) {
    console.log("[JournalEntryPageRelationshipGraphSheet] _onRender started", { context, options });

    await super._onRender(context, options);
    const target = this.element.querySelector("#relationship-graph-svelte");
    if (!target) {
      console.warn("[JournalEntryPageRelationshipGraphSheet] Svelte mount point not found");
      return;
    }

    console.log("[JournalEntryPageRelationshipGraphSheet] Found target element:", target);

    // Unmount existing instance
    if (this.svelteApp) {
      console.log("[JournalEntryPageRelationshipGraphSheet] Unmounting existing Svelte app");
      await unmount(this.svelteApp);
      this.svelteApp = null;
    }

    // Get the journal entry page UUID - this.document is a JournalEntryPage with the system data
    const journalEntryPage = (this as any).document;
    const graphJournalUuid = journalEntryPage.uuid;
    let system = (await foundry.utils.fromUuid(graphJournalUuid))?.system;

    console.log("[JournalEntryPageRelationshipGraphSheet] Journal Entry UUID:", graphJournalUuid);
    console.log("[JournalEntryPageRelationshipGraphSheet] System:", system);

    const relationshipGraphPersistenceService = new RelationshipGraphPersistenceService();
    const relationshipGraphService = new RelationshipGraphService(
      journalEntryPage as any,
      relationshipGraphPersistenceService
    );

    if (
      !system ||
      !(system as any).elements ||
      !(system as any).elements.nodes ||
      !(system as any).elements.edges ||
      (system as any).elements.nodes.length === 0 ||
      (system as any).elements.edges.length === 0
    ) {
      const demoDataService = new RelationshipGraphDemoDataService();
      await demoDataService.createDemoData(relationshipGraphService);
      system = (await foundry.utils.fromUuid(graphJournalUuid))?.system;
    }

    const elements = (system as any).elements;

    console.log("[JournalEntryPageRelationshipGraphSheet] Elements:", elements);

    // Mount the new RelationshipGraphView component
    this.svelteApp = mount((this as any).isView ? RelationshipGraphView : RelationshipGraphEdit, {
      target,
      props: {
        elements: elements,
        interactive: false,
        onNodeClick: () => {},
        onEdgeClick: () => {},
      },
    });

    console.log(
      "[JournalEntryPageRelationshipGraphSheet] RelationshipGraphView mounted successfully"
    );
  }

  /** @override */
  async _onClose(options: any) {
    console.log("[JournalEntryPageRelationshipGraphSheet] _onClose called with options:", options);
    if (this.svelteApp) {
      await unmount(this.svelteApp);
      this.svelteApp = null;
    } else {
    }
    return super._onClose(options);
  }
}
