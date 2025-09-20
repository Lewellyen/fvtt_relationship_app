import MetadataManagementView from "../svelte/MetadataManagementView.svelte";
import type { IWindowedApp } from "../interfaces";
import { use, setCurrentScope, createScopeChain, disposeScopeChain } from "../core/edge/appContext";
import { FoundryLogger } from "../core/services/FoundryLogger";
import { SvelteManager } from "../core/services/SvelteManager";
import { CSSManager } from "../core/services/CSSManager";

export default class MetadataManagementApplication extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  // Lazy-Memoized Getter – kein Service im Konstruktor auflösen!
  #logger?: FoundryLogger;
  #svelte?: SvelteManager;
  #css?: CSSManager;
  private _appScope?: string;
  private _openChildApps: Set<IWindowedApp> = new Set(); // Tracking offener Child Apps

  private get logger() {
    return (this.#logger ??= use(FoundryLogger));
  }
  private get svelte() {
    if (!this._appScope) throw new Error("App scope not set. Call _onRender first.");
    return (this.#svelte ??= use(SvelteManager, this._appScope));
  }
  private get css() {
    if (!this._appScope) throw new Error("App scope not set. Call _onRender first.");
    return (this.#css ??= use(CSSManager, this._appScope));
  }

  constructor() {
    super();
    // Kein Service im Konstruktor holen (Foundry erzeugt die Klasse; Constructor-Zeitpunkt ist zu früh)
  }

  /**
   * Merge the default parts, inserting our graph part between header and footer.
   */
  static override PARTS = {
    main: {
      template: "modules/relationship-app/templates/metadata-management-main.hbs",
    },
  };

  svelteApp: unknown = null;

  /** @override */
  static override DEFAULT_OPTIONS = {
    // Unique ID for the sheet
    id: "metadata-management",
    // CSS classes to apply
    classes: ["metadata-management"],
    // Window sizing and behavior
    position: { width: 800, height: 600 },
    window: { title: "Metadata Management", resizable: true },
    tag: "div",
  };

  /** @override */
  override get title() {
    return this.options.window.title;
  }

  /** @override */
  override async _renderHTML(context: any, options: any) {
    // Delegate template rendering to HandlebarsApplicationMixin
    return super._renderHTML(context, options);
  }

  /** @override */
  override _replaceHTML(html: any, options: any, context: any) {
    // Replace rendered HTML via HandlebarsApplicationMixin
    return super._replaceHTML(html, options, context);
  }

  override async _prepareContext(options: any) {
    const context = await super._prepareContext(options);
    this.logger.info(
      "[MetadataManagementApplication] _prepareContext called with context:",
      context
    );
    this.logger.info(
      "[MetadataManagementApplication] _prepareContext called with options:",
      options
    );
    return context;
  }

  async _loadCSS() {
    const cssPath = "modules/relationship-app/styles/metadata-management-app.css";
    await this.css.loadCSS(cssPath);
  }

  override async _onRender(context: any, options: any) {
    this.logger.info("[MetadataManagementApplication] _onRender started", { context, options });

    // App-Scope setzen
    const appId = "MetadataManagementApplication";
    this._appScope = `app-${appId}`;
    setCurrentScope(this._appScope);

    // Scope Chain erstellen für Child Apps
    createScopeChain(this._appScope);

    await super._onRender(context, options);

    const target = this.element.querySelector("#metadata-management-svelte");
    if (!target) {
      this.logger.warn("[MetadataManagementApplication] Svelte mount point not found");
      return;
    }

    this.logger.info("[MetadataManagementApplication] Found target element:", target);

    // ✅ Delegation an SvelteManager - Single Responsibility
    await this.svelte.unmountApp(this.svelteApp);
    this.svelteApp = null;

    await this._loadCSS();
    // Mount the new MetadataManagementView component via SvelteManager
    this.svelteApp = await this.svelte.mountComponent(
      MetadataManagementView,
      target as HTMLElement,
      {
        parentScope: this._appScope,
        parentApp: this, // Parent App-Referenz für automatisches Tracking
      }
    );

    this.logger.info("[MetadataManagementApplication] MetadataManagementView mounted successfully");
  }

  /** @override */
  override async _onClose(options: any) {
    this.logger.info("[MetadataManagementApplication] _onClose called with options:", options);

    // ✅ Alle offenen Child Apps schließen
    if (this._openChildApps.size > 0) {
      this.logger.info(
        `[MetadataManagementApplication] Closing ${this._openChildApps.size} open child apps`
      );
      for (const childApp of this._openChildApps) {
        try {
          await childApp.close();
          this.logger.info(
            `[MetadataManagementApplication] Closed child app: ${childApp.constructor.name}`
          );
        } catch (error) {
          this.logger.warn(`[MetadataManagementApplication] Error closing child app:`, error);
        }
      }
      this._openChildApps.clear();
    }

    // ✅ Delegation an SvelteManager - Single Responsibility
    await this.svelte.unmountApp(this.svelteApp);
    this.svelteApp = null;

    // Scope Chain mit allen Children entsorgen
    if (this._appScope) {
      this.logger.info(
        `[MetadataManagementApplication] Disposing scope chain with all child services: ${this._appScope}`
      );
      disposeScopeChain(this._appScope);
      this.logger.info(`[MetadataManagementApplication] ✅ All child services have been disposed`);
    }

    return super._onClose(options);
  }

  /**
   * Dynamic Dialog öffnen mit Parent Scope
   */
  async openDynamicDialog(config: any): Promise<Record<string, unknown> | null> {
    const DynamicDialogApp = (await import("./DynamicDialogApp")).default;
    const app = new DynamicDialogApp(this._appScope);

    // App zur Tracking-Liste hinzufügen
    this._openChildApps.add(app);

    // Promise für automatisches Cleanup
    const result = await new Promise<Record<string, unknown> | null>((resolve) => {
      app._prepareConfig(config);
      app._prepareOnSubmit((values) => {
        app.close();
        this._openChildApps.delete(app); // Aus Tracking entfernen
        resolve(values);
      });
      app._prepareOnCancel(() => {
        app.close();
        this._openChildApps.delete(app); // Aus Tracking entfernen
        resolve(null);
      });
      app.render({ force: true });
    });

    return result;
  }

  /**
   * Dynamic Table öffnen mit Parent Scope
   */
  async openDynamicTable(config: any): Promise<any[] | null> {
    const DynamicTableApp = (await import("./DynamicTableApp")).default;
    const app = new DynamicTableApp(this._appScope);

    // App zur Tracking-Liste hinzufügen
    this._openChildApps.add(app);

    // Promise für automatisches Cleanup
    const result = await new Promise<any[] | null>((resolve) => {
      app._prepareConfig(config);
      app._prepareOnSubmit((data) => {
        app.close();
        this._openChildApps.delete(app); // Aus Tracking entfernen
        resolve(data);
      });
      app._prepareOnCancel(() => {
        app.close();
        this._openChildApps.delete(app); // Aus Tracking entfernen
        resolve(null);
      });
      app.render({ force: true });
    });

    return result;
  }
}
