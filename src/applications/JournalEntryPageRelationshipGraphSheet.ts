import { use, setCurrentScope, disposeScopedServices } from "../core/edge/appContext";
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
  #graphService?: GraphService;
  private _pageScope?: string;

  private get logger() {
    return (this.#logger ??= use(FoundryLogger));
  }
  private get svelteManager() {
    if (!this._pageScope) throw new Error("Page scope not set. Call _onRender first.");
    return (this.#svelte ??= use(SvelteManager, this._pageScope));
  }
  private get cssManager() {
    if (!this._pageScope) throw new Error("Page scope not set. Call _onRender first.");
    return (this.#css ??= use(CSSManager, this._pageScope));
  }
  private get graphService() {
    if (!this._pageScope) throw new Error("Page scope not set. Call _onRender first.");
    return (this.#graphService ??= use(GraphService, this._pageScope));
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
  static override DEFAULT_OPTIONS = {
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
  override get title() {
    return this.options.window.title;
  }

  /** @override */
  override async _renderHTML(context: any, options: any) {
    // Delegate template rendering to HandlebarsApplicationMixin
    return await super._renderHTML(context, options);
  }

  /** @override */
  override _replaceHTML(html: any, options: any, context: any) {
    // Replace rendered HTML via HandlebarsApplicationMixin
    return super._replaceHTML(html, options, context);
  }

  override async _preparePartContext(partContext: any, part: any, options: any) {
    const context = await super._preparePartContext(partContext, part, options);
    return context;
  }

  override async _prepareContext(options: any) {
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

  override async _onRender(context: any, options: any) {
    this.logger.info("[JournalEntryPageRelationshipGraphSheet] _onRender started", {
      context,
      options,
    });

    // Page-Scope setzen
    const pageId = this.document.uuid;
    this._pageScope = `page-${pageId}`;
    setCurrentScope(this._pageScope);

    // Scoped Services verwenden
    // GraphRepositoryAdapter mit pageUuid konfigurieren
    this.graphService.repository.setPageUuid(this.document.uuid);

    await this.graphService.init();
    bindFoundrySync(this.document, this.graphService);

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
  override async _onClose(options: any) {
    this.logger.info(
      "[JournalEntryPageRelationshipGraphSheet] _onClose called with options:",
      options
    );

    // ✅ Delegation an SvelteManager - Single Responsibility
    await this.svelteManager.unmountApp(this.svelteApp);
    this.svelteApp = null;

    // Scope-Cleanup
    if (this._pageScope) {
      disposeScopedServices(this._pageScope);
      this.logger.info(
        `[JournalEntryPageRelationshipGraphSheet] Disposed scoped services for scope: ${this._pageScope}`
      );
    }

    return super._onClose(options);
  }
}
