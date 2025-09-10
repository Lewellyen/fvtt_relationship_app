import { RelationshipGraphDemoDataService } from "../services/RelationshipGraphDemoDataService";
import type { IServiceApplicationDependencies, ISvelteApplicationDependencies } from "../interfaces";
import { ApplicationDependencyResolver } from "../core/services/ApplicationDependencyResolver";

/**
 * V2 JournalEntryPageSheet subclass drawing a simple relationship graph.
 * @extends JournalEntryPageSheet
 */
export default class JournalEntryPageRelationshipGraphSheet extends foundry.applications.sheets
  .journal.JournalEntryPageHandlebarsSheet {
  // ✅ Echte Dependency Injection - nur benötigte Dependencies
  private serviceDependencies: IServiceApplicationDependencies;
  private svelteDependencies: ISvelteApplicationDependencies;

  constructor() {
    super();
    const resolver = new ApplicationDependencyResolver();
    this.serviceDependencies = resolver.resolveServiceApplicationDependencies();
    this.svelteDependencies = resolver.resolveSvelteApplicationDependencies();
  }

  private get serviceLocator() {
    return this.serviceDependencies.serviceLocator;
  }
  private get logger() {
    return this.serviceDependencies.logger;
  }
  private get foundryAdapter() {
    return this.serviceDependencies.foundryAdapter;
  }
  private get svelteManager() {
    return this.svelteDependencies.svelteManager;
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
    if (this.logger) {
      this.logger.info(
        "[JournalEntryPageRelationshipGraphSheet] _prepareContext called with context:",
        context
      );
    } else {
      console.log(
        "[JournalEntryPageRelationshipGraphSheet] _prepareContext called with context:",
        context
      );
    }
    return context;
  }

  async _onRender(context: any, options: any) {
    if (this.logger) {
      this.logger.info("[JournalEntryPageRelationshipGraphSheet] _onRender started", {
        context,
        options,
      });
    } else {
      console.log("[JournalEntryPageRelationshipGraphSheet] _onRender started", {
        context,
        options,
      });
    }

    await super._onRender(context, options);

    // ✅ Delegation an SvelteManager - Single Responsibility
    const journalEntryPage = (this as any).document;
    const isEditMode = !(this as any).isView;

    // Prüfe ob Demo-Daten geladen werden müssen
    await this.ensureDemoDataLoaded(journalEntryPage);

    // Mounte Graph-Komponente über SvelteManager
    await this.svelteManager.mountGraphComponent(this.element, journalEntryPage, isEditMode);

    if (this.logger) {
      this.logger.info(
        "[JournalEntryPageRelationshipGraphSheet] Graph component mounted successfully"
      );
    } else {
      console.log("[JournalEntryPageRelationshipGraphSheet] Graph component mounted successfully");
    }
  }

  /**
   * Stellt sicher, dass Demo-Daten geladen sind falls nötig
   * @param journalEntryPage - Das Journal Entry Document
   */
  private async ensureDemoDataLoaded(journalEntryPage: any): Promise<void> {
    const system = journalEntryPage.system;

    if (
      !system ||
      !system.elements ||
      !system.elements.nodes ||
      !system.elements.edges ||
      system.elements.nodes.length === 0 ||
      system.elements.edges.length === 0
    ) {
      if (this.logger) {
        this.logger.info("[JournalEntryPageRelationshipGraphSheet] Loading demo data");
      } else {
        console.log("[JournalEntryPageRelationshipGraphSheet] Loading demo data");
      }

      // ✅ Service Resolution über ServiceLocator
      const graphService = this.serviceLocator.getGraphService(journalEntryPage);
      const demoDataService = new RelationshipGraphDemoDataService(this.foundryAdapter);

      await demoDataService.createDemoData(graphService);
    }
  }

  /** @override */
  async _onClose(options: any) {
    if (this.logger) {
      this.logger.info(
        "[JournalEntryPageRelationshipGraphSheet] _onClose called with options:",
        options
      );
    } else {
      console.log(
        "[JournalEntryPageRelationshipGraphSheet] _onClose called with options:",
        options
      );
    }
    // ✅ Svelte Cleanup wird von SvelteManager gehandhabt
    return super._onClose(options);
  }
}
