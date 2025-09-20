import DynamicTableSheet from "../svelte/DynamicTableSheet.svelte";
import type { IDynamicTableConfig } from "../types/DynamicTableTypes";
import type { IWindowedApp } from "../interfaces";
import {
  use,
  setCurrentScope,
  disposeScopedServices,
  createChildScope,
  removeChildScope,
} from "../core/edge/appContext";
import { FoundryLogger } from "../core/services/FoundryLogger";
import { SvelteManager } from "../core/services/SvelteManager";
import { CSSManager } from "../core/services/CSSManager";

export default class DynamicTableApp
  extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.api.ApplicationV2
  )
  implements IWindowedApp
{
  // Lazy-Memoized Getter – kein Service im Konstruktor auflösen!
  #logger?: FoundryLogger;
  #svelte?: SvelteManager;
  #css?: CSSManager;
  private _instanceId: string;
  private _instanceScope: string;
  private _parentScope: string | undefined;

  private get logger() {
    return (this.#logger ??= use(FoundryLogger));
  }
  private get svelteManager() {
    return (this.#svelte ??= use(SvelteManager, this._instanceScope));
  }
  private get cssManager() {
    return (this.#css ??= use(CSSManager, this._instanceScope));
  }

  constructor(parentScope?: string) {
    super();
    this._parentScope = parentScope;

    if (parentScope) {
      // Child Scope in Parent Chain erstellen
      this._instanceScope = createChildScope(parentScope, "DynamicTableApp");
      this._instanceId = this._instanceScope;
    } else {
      // Fallback: Eigenen Scope erstellen
      this._instanceId = this.generateInstanceId();
      this._instanceScope = `instance-${this._instanceId}`;
    }
  }

  private generateInstanceId(): string {
    const timestamp = Date.now();
    const randomId = `table_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return `${this.constructor.name}-${timestamp}-${randomId}`;
  }
  /**
   * Merge the default parts, inserting our table part between header and footer.
   */
  static override PARTS = {
    main: {
      template: "modules/relationship-app/templates/DynamicTableApp.hbs",
    },
  };

  static appId = "DynamicTableApp";
  static config: IDynamicTableConfig = {
    title: "Dynamic Table",
    columns: [],
  };
  static onSubmit: (data: unknown[]) => void = () => {};
  static onCancel: () => void = () => {};

  svelteApp: unknown = null;

  /** @override */
  static override DEFAULT_OPTIONS = {
    // Unique ID for the sheet
    id: "dynamic-table",
    // CSS classes to apply
    classes: ["dynamic-table"],
    // Window sizing and behavior
    position: { width: 1200, height: 800 },
    window: { title: "Dynamic Table", resizable: true },
    tag: "div",
  };

  /** @override */
  override get title() {
    return this.options.window.title;
  }

  // IWindowedApp implementation
  override get id(): string {
    return this._instanceId;
  }

  get isVisible(): boolean {
    return this.rendered;
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
    this.logger.info(`[${DynamicTableApp.appId}] _prepareContext called with context:`, context);
    this.logger.info(`[${DynamicTableApp.appId}] _prepareContext called with options:`, options);
    return context;
  }

  async _prepareConfig(config: IDynamicTableConfig) {
    DynamicTableApp.config = config;
    this.logger.info(
      `[${DynamicTableApp.appId}] _prepareConfig called with config:`,
      DynamicTableApp.config
    );
    return DynamicTableApp.config;
  }

  async _prepareOnSubmit(onSubmit: (data: unknown[]) => void) {
    DynamicTableApp.onSubmit = onSubmit;
    this.logger.info(
      `[${DynamicTableApp.appId}] _prepareOnSubmit called with onSubmit:`,
      DynamicTableApp.onSubmit
    );
    return DynamicTableApp.onSubmit;
  }

  async _prepareOnCancel(onCancel: () => void) {
    DynamicTableApp.onCancel = onCancel;
    this.logger.info(
      `[${DynamicTableApp.appId}] _prepareOnCancel called with onCancel:`,
      DynamicTableApp.onCancel
    );
    return DynamicTableApp.onCancel;
  }

  override async _onRender(context: any, options: any) {
    this.logger.info(`[${DynamicTableApp.appId}] _onRender started`, {
      instanceId: this._instanceId,
      context,
      options,
    });

    // Instance-Scope setzen
    if (this._instanceScope) {
      setCurrentScope(this._instanceScope);
    }

    try {
      await super._onRender(context, options);

      // CSS-Datei laden
      await this._loadCSS();

      const target = this.element.querySelector("#dynamic-table-svelte");

      if (!target) {
        this.logger.warn(
          `[${DynamicTableApp.appId}] Svelte mount point '#dynamic-table-svelte' not found`
        );
        return;
      }

      this.logger.info(`[${DynamicTableApp.appId}] Found target element:`, target);

      // ✅ Delegation an SvelteManager - Single Responsibility
      await this.svelteManager.unmountApp(this.svelteApp);
      this.svelteApp = null;

      // Mount the new DynamicTableSheet component via SvelteManager
      this.svelteApp = await this.svelteManager.mountComponent(
        DynamicTableSheet,
        target as HTMLElement,
        {
          config: DynamicTableApp.config,
          onSubmit: DynamicTableApp.onSubmit,
          onCancel: DynamicTableApp.onCancel,
        }
      );

      this.logger.info(`[${DynamicTableApp.appId}] DynamicTableSheet mounted successfully`);
    } catch (error) {
      this.logger.error(`[${DynamicTableApp.appId}] Error during render:`, error);
      throw error;
    }
  }

  /**
   * CSS-Datei für die DynamicTableApp laden
   */
  async _loadCSS() {
    const cssPath = "modules/relationship-app/styles/dynamic-table-app.css";
    await this.cssManager.loadCSS(cssPath);
  }

  /** @override */
  override async _onClose(options: any) {
    this.logger.info(`[${DynamicTableApp.appId}] _onClose called`, {
      instanceId: this._instanceId,
      parentScope: this._parentScope,
      options,
    });

    // ✅ Delegation an SvelteManager - Single Responsibility
    await this.svelteManager.unmountApp(this.svelteApp);
    this.svelteApp = null;

    // Child Scope aus Parent Chain entfernen (falls vorhanden)
    if (this._parentScope && this._instanceScope) {
      removeChildScope(this._parentScope, this._instanceScope);
      this.logger.info(
        `[${DynamicTableApp.appId}] Removed child scope from parent chain: ${this._instanceScope}`
      );
    }

    // Instance-Scope cleanup
    if (this._instanceScope) {
      disposeScopedServices(this._instanceScope);
      this.logger.info(
        `[${DynamicTableApp.appId}] Disposed instance scope: ${this._instanceScope}`
      );
    }

    return super._onClose(options);
  }

  /**
   * Statische Methode zum einfachen Öffnen der Tabelle
   */
  static async show(config: IDynamicTableConfig, parentScope?: string): Promise<unknown[] | null> {
    return new Promise((resolve) => {
      const app = new DynamicTableApp(parentScope);

      // Konfiguration setzen
      app._prepareConfig(config);

      // Callbacks setzen
      app._prepareOnSubmit((data) => {
        app.close();
        resolve(data);
      });

      app._prepareOnCancel(() => {
        app.close();
        resolve(null);
      });

      // Tabelle öffnen
      app.render({ force: true } as any);
    });
  }
}
