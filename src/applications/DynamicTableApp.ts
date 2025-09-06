import { mount, unmount } from "svelte";
import DynamicTableSheet from "../svelte/DynamicTableSheet.svelte";
import type { IDynamicTableConfig } from "../types/DynamicTableTypes";

export default class DynamicTableApp extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  /**
   * Merge the default parts, inserting our table part between header and footer.
   */
  static PARTS = {
    main: {
      template: "modules/relationship-app/templates/DynamicTableApp.hbs",
    },
  };

  static appId = "DynamicTableApp";
  static config: IDynamicTableConfig = {
    title: "Dynamic Table",
    columns: [],
  };
  static onSubmit: (data: any[]) => void = () => {};
  static onCancel: () => void = () => {};

  svelteApp: any = null;

  /** @override */
  static DEFAULT_OPTIONS = {
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
  get title() {
    return this.options.window.title;
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

  async _prepareContext(options: any) {
    const context = await super._prepareContext(options);
    console.log(`[${DynamicTableApp.appId}] _prepareContext called with context:`, context);
    console.log(`[${DynamicTableApp.appId}] _prepareContext called with options:`, options);
    return context;
  }

  async _prepareConfig(config: IDynamicTableConfig) {
    DynamicTableApp.config = config;
    console.log(`[${DynamicTableApp.appId}] _prepareConfig called with config:`, DynamicTableApp.config);
    return DynamicTableApp.config;
  }

  async _prepareOnSubmit(onSubmit: (data: any[]) => void) {
    DynamicTableApp.onSubmit = onSubmit;
    console.log(`[${DynamicTableApp.appId}] _prepareOnSubmit called with onSubmit:`, DynamicTableApp.onSubmit);
    return DynamicTableApp.onSubmit;
  }

  async _prepareOnCancel(onCancel: () => void) {
    DynamicTableApp.onCancel = onCancel;
    console.log(`[${DynamicTableApp.appId}] _prepareOnCancel called with onCancel:`, DynamicTableApp.onCancel);
    return DynamicTableApp.onCancel;
  }

  async _onRender(context: any, options: any) {
    console.log(`[${DynamicTableApp.appId}] _onRender started`, { context, options });

    try {
      await super._onRender(context, options);
      
      // CSS-Datei laden
      await this._loadCSS();
      
      const target = this.element.querySelector("#dynamic-table-svelte");
      
      if (!target) {
        throw new Error("Svelte mount point '#dynamic-table-svelte' not found");
      }

      console.log(`[${DynamicTableApp.appId}] Found target element:`, target);

      // Unmount existing instance
      if (this.svelteApp) {
        console.log(`[${DynamicTableApp.appId}] Unmounting existing Svelte app`);
        await unmount(this.svelteApp);
        this.svelteApp = null;
      }

      // Mount the new DynamicTableSheet component
      this.svelteApp = mount(DynamicTableSheet, {
        target,
        props: {
          config: DynamicTableApp.config,
          onSubmit: DynamicTableApp.onSubmit,
          onCancel: DynamicTableApp.onCancel
        },
      });

      console.log(`[${DynamicTableApp.appId}] DynamicTableSheet mounted successfully`);
    } catch (error) {
      console.error(`[${DynamicTableApp.appId}] Error during render:`, error);
      throw error;
    }
  }

  /**
   * CSS-Datei für die DynamicTableApp laden
   */
  async _loadCSS() {
    const cssPath = "modules/relationship-app/styles/dynamic-table-app.css";
    
    // Prüfen ob CSS bereits geladen wurde
    if (document.querySelector(`link[href*="${cssPath}"]`)) {
      return;
    }
    
    // CSS-Datei laden
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = cssPath;
    document.head.appendChild(link);
    
    console.log(`[${DynamicTableApp.appId}] CSS loaded: ${cssPath}`);
  }

  /** @override */
  async _onClose(options: any) {
    console.log(`[${DynamicTableApp.appId}] _onClose called with options:`, options);
    if (this.svelteApp) {
      await unmount(this.svelteApp);
      this.svelteApp = null;
    }
    return super._onClose(options);
  }

  /**
   * Statische Methode zum einfachen Öffnen der Tabelle
   */
  static async show(config: IDynamicTableConfig): Promise<any[] | null> {
    return new Promise((resolve) => {
      const app = new DynamicTableApp();
      
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
      app.render(true);
    });
  }
}
