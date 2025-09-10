import type { ISvelteApplicationDependencies } from "../interfaces";

/**
 * V2 JournalEntryPageSheet subclass drawing a simple relationship graph.
 * @extends JournalEntryPageSheet
 */
export default class JournalEntryPageRelationshipGraphSheet extends foundry.applications.sheets
  .journal.JournalEntryPageHandlebarsSheet {
  // ✅ Echte Dependency Injection - nur benötigte Dependencies
  private svelteDependencies: ISvelteApplicationDependencies;

  constructor() {
    super();
    // Service Resolution über ServiceRegistrar
    const serviceRegistrar = (globalThis as any).relationshipApp?.serviceRegistrar;
    if (!serviceRegistrar) {
      throw new Error("ServiceRegistrar not available! Make sure the module is properly initialized.");
    }
    
    this.svelteDependencies = {
      svelteManager: serviceRegistrar.getService('_SvelteManager'),
      cssManager: serviceRegistrar.getService('_CSSManager'),
      logger: serviceRegistrar.getService('_FoundryLogger')
    };
  }

  private get logger() {
    return this.svelteDependencies.logger;
  }
  private get svelteManager() {
    return this.svelteDependencies.svelteManager;
  }
  private get cssManager() {
    return this.svelteDependencies.cssManager;
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

  // ✅ Entfernt - Svelte Management wird an SvelteManager delegiert

  /** @override */
  static DEFAULT_OPTIONS = {
    // Unique ID for the sheet
    id: "journal-entry-relationship-graph",
    // CSS classes to apply
    classes: ["journal-entry-page", "relationship-graph"],
    type: "relationship-app.relationship-graph",
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
    this.writeLog("info", "[JournalEntryPageRelationshipGraphSheet] _prepareContext called with context:", context);
    return context;
  }

  async _loadCSS() {
    const cssPath = "modules/relationship-app/styles/journal-entry-relationship-graph-sheet.css";
    await this.cssManager.loadCSS(cssPath);
  }


  async _onRender(context: any, options: any) {
    this.writeLog("info", "[JournalEntryPageRelationshipGraphSheet] _onRender started", {
        context,
        options,
      });

    await super._onRender(context, options);

    // ✅ Delegation an SvelteManager - Single Responsibility
    const journalEntryPage = (this as any).document;
    const isEditMode = !(this as any).isView;

    await this._loadCSS();

    // Mounte Graph-Komponente über SvelteManager
    await this.svelteManager.mountGraphComponent(this.element, journalEntryPage, isEditMode);

    this.writeLog("info", "[JournalEntryPageRelationshipGraphSheet] Graph component mounted successfully");
  }

  /** @override */
  async _onClose(options: any) {
    this.writeLog("info", "[JournalEntryPageRelationshipGraphSheet] _onClose called with options:", options);
    // ✅ Svelte Cleanup wird von SvelteManager gehandhabt
    return super._onClose(options);
  }

  private writeLog(modus: "info" | "warn" | "error" | "debug", message: string, ...args: any[]) {
    if (this.logger) {
      this.logger[modus](message, ...args);
    } else {
      console[modus](message, ...args);
    }
  }
}
