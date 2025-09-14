import { use } from "../core/edge/appContext";
import { FoundryLogger } from "../core/services/FoundryLogger";
import { SvelteManager } from "../core/services/SvelteManager";
import { CSSManager } from "../core/services/CSSManager";
import { bindFoundrySync } from "../utils/syncGraphWithFoundry";
import { GraphService } from "../services/GraphService";

/**
 * V2 JournalEntryPageSheet subclass drawing a simple relationship graph.
 * @extends JournalEntryPageSheet
 */
export default class JournalEntryPageRelationshipGraphSheet extends foundry.applications.sheets
  .journal.JournalEntryPageHandlebarsSheet {
  // Lazy-Memoized Getter – kein Service im Konstruktor auflösen!
  #logger?: FoundryLogger;
  #svelte?: SvelteManager;
  #css?: CSSManager;

  private get logger() {
    return (this.#logger ??= use(FoundryLogger));
  }
  private get svelteManager() {
    return (this.#svelte ??= use(SvelteManager));
  }
  private get cssManager() {
    return (this.#css ??= use(CSSManager));
  }

  constructor(...args: any[]) {
    super(...args);    
    // Kein Service im Konstruktor holen (Foundry erzeugt die Klasse; Constructor-Zeitpunkt ist zu früh)
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

  svelteApp: any = null;

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
    this.logger.info(
      "[JournalEntryPageRelationshipGraphSheet] _prepareContext called with context:",
      context
    );
    this.logger.info(
      "[JournalEntryPageRelationshipGraphSheet] _prepareContext called with options:",
      options
    );
    return context;
  }

  async _loadCSS() {
    const cssPath = "modules/relationship-app/styles/journal-entry-relationship-graph-sheet.css";
    await this.cssManager.loadCSS(cssPath);
  }

  async _onRender(context: any, options: any) {
    this.logger.info("[JournalEntryPageRelationshipGraphSheet] _onRender started", {
      context,
      options,
    });

    const graphService: GraphService = use(GraphService);
    await graphService.init(this.document);
    bindFoundrySync(this.document, graphService);

    await super._onRender(context, options);

    // ✅ Delegation an SvelteManager - Single Responsibility
    await this.svelteManager.unmountApp(this.svelteApp);
    this.svelteApp = null;

    const journalEntryPage = (this as any).document;
    const isEditMode = !(this as any).isView;

    await this._loadCSS();

    // Mounte Graph-Komponente über SvelteManager
    this.svelteApp = await this.svelteManager.mountGraphComponent(
      this.element as HTMLElement,
      journalEntryPage,
      isEditMode
    );

    this.logger.info(
      "[JournalEntryPageRelationshipGraphSheet] Graph component mounted successfully"
    );
  }

  /** @override */
  async _onClose(options: any) {
    this.logger.info(
      "[JournalEntryPageRelationshipGraphSheet] _onClose called with options:",
      options
    );
    // ✅ Delegation an SvelteManager - Single Responsibility
    await this.svelteManager.unmountApp(this.svelteApp);
    this.svelteApp = null;
    return super._onClose(options);
  }
}
