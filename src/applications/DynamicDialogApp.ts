import DynamicFormSheet from "../svelte/DynamicFormSheet.svelte";
import type { IDynamicFormConfig } from "../types/DynamicFormTypes";
import type { ISvelteApplicationDependencies } from "../interfaces";
import { ApplicationDependencyResolver } from "../core/services/ApplicationDependencyResolver";

export default class DynamicDialogApp extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  // ✅ Echte Dependency Injection - nur benötigte Dependencies
  private svelteDependencies: ISvelteApplicationDependencies;

  constructor() {
    super();
    this.svelteDependencies =
      new ApplicationDependencyResolver().resolveSvelteApplicationDependencies();
  }

  private get svelteManager() {
    return this.svelteDependencies.svelteManager;
  }
  private get cssManager() {
    return this.svelteDependencies.cssManager;
  }
  private get logger() {
    return this.svelteDependencies.logger;
  }
  /**
   * Merge the default parts, inserting our graph part between header and footer.
   */
  static PARTS = {
    main: {
      template: "modules/relationship-app/templates/DynamicFormApp.hbs",
    },
  };

  static appId = "DynamicDialogApp";
  static config: IDynamicFormConfig = {
    title: "Dynamic Dialog",
    elements: [],
  };
  static onSubmit: (values: Record<string, any>) => void = () => {};
  static onCancel: () => void = () => {};

  svelteApp: any = null;

  /** @override */
  static DEFAULT_OPTIONS = {
    // Unique ID for the sheet
    id: "dynamic-dialog",
    // CSS classes to apply
    classes: ["dynamic-dialog"],
    // Window sizing and behavior
    position: { width: 800, height: 600 },
    window: { title: "Dynamic Dialog", resizable: true },
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
    if (this.logger) {
      this.logger.info(`[${DynamicDialogApp.appId}] _prepareContext called with context:`, context);
      this.logger.info(`[${DynamicDialogApp.appId}] _prepareContext called with options:`, options);
    } else {
      console.log(`[${DynamicDialogApp.appId}] _prepareContext called with context:`, context);
      console.log(`[${DynamicDialogApp.appId}] _prepareContext called with options:`, options);
    }
    return context;
  }

  async _prepareConfig(config: IDynamicFormConfig) {
    DynamicDialogApp.config = config;
    if (this.logger) {
      this.logger.info(
        `[${DynamicDialogApp.appId}] _prepareConfig called with config:`,
        DynamicDialogApp.config
      );
    } else {
      console.log(
        `[${DynamicDialogApp.appId}] _prepareConfig called with config:`,
        DynamicDialogApp.config
      );
    }
    return DynamicDialogApp.config;
  }

  async _prepareOnSubmit(onSubmit: (values: Record<string, any>) => void) {
    DynamicDialogApp.onSubmit = onSubmit;
    if (this.logger) {
      this.logger.info(
        `[${DynamicDialogApp.appId}] _prepareOnSubmit called with onSubmit:`,
        DynamicDialogApp.onSubmit
      );
    } else {
      console.log(
        `[${DynamicDialogApp.appId}] _prepareOnSubmit called with onSubmit:`,
        DynamicDialogApp.onSubmit
      );
    }
    return DynamicDialogApp.onSubmit;
  }

  async _prepareOnCancel(onCancel: () => void) {
    DynamicDialogApp.onCancel = onCancel;
    if (this.logger) {
      this.logger.info(
        `[${DynamicDialogApp.appId}] _prepareOnCancel called with onCancel:`,
        DynamicDialogApp.onCancel
      );
    } else {
      console.log(
        `[${DynamicDialogApp.appId}] _prepareOnCancel called with onCancel:`,
        DynamicDialogApp.onCancel
      );
    }
    return DynamicDialogApp.onCancel;
  }

  async _onRender(context: any, options: any) {
    if (this.logger) {
      this.logger.info(`[${DynamicDialogApp.appId}] _onRender started`, { context, options });
    } else {
      console.log(`[${DynamicDialogApp.appId}] _onRender started`, { context, options });
    }

    try {
      await super._onRender(context, options);

      // CSS-Datei laden
      await this._loadCSS();

      const target = this.element.querySelector("#dynamic-dialog-svelte");

      if (!target) {
        throw new Error("Svelte mount point '#dynamic-dialog-svelte' not found");
      }

      if (this.logger) {
        this.logger.info(`[${DynamicDialogApp.appId}] Found target element:`, target);
      } else {
        console.log(`[${DynamicDialogApp.appId}] Found target element:`, target);
      }

      // ✅ Delegation an SvelteManager - Single Responsibility
      await this.svelteManager.unmountApp(this.svelteApp);
      this.svelteApp = null;

      // Mount the new DynamicFormSheet component via SvelteManager
      this.svelteApp = await this.svelteManager.mountComponent(
        DynamicFormSheet,
        target as HTMLElement,
        {
          config: DynamicDialogApp.config,
          onSubmit: DynamicDialogApp.onSubmit,
          onCancel: DynamicDialogApp.onCancel,
        }
      );

      if (this.logger) {
        this.logger.info(`[${DynamicDialogApp.appId}] DynamicFormSheet mounted successfully`);
      } else {
        console.log(`[${DynamicDialogApp.appId}] DynamicFormSheet mounted successfully`);
      }
    } catch (error) {
      if (this.logger) {
        this.logger.error(`[${DynamicDialogApp.appId}] Error during render:`, error);
      } else {
        console.error(`[${DynamicDialogApp.appId}] Error during render:`, error);
      }
      throw error;
    }
  }

  /**
   * CSS-Datei für die DynamicDialogApp laden
   */
  async _loadCSS() {
    const cssPath = "modules/relationship-app/styles/dynamic-dialog-app.css";
    await this.cssManager.loadCSS(cssPath);
  }

  /** @override */
  async _onClose(options: any) {
    if (this.logger) {
      this.logger.info(`[${DynamicDialogApp.appId}] _onClose called with options:`, options);
    } else {
      console.log(`[${DynamicDialogApp.appId}] _onClose called with options:`, options);
    }
    // ✅ Delegation an SvelteManager - Single Responsibility
    await this.svelteManager.unmountApp(this.svelteApp);
    this.svelteApp = null;
    return super._onClose(options);
  }

  /**
   * Statische Methode zum einfachen Öffnen des Dialogs
   */
  static async show(config: IDynamicFormConfig): Promise<Record<string, any> | null> {
    return new Promise((resolve) => {
      const app = new DynamicDialogApp();

      // Konfiguration setzen
      app._prepareConfig(config);

      // Callbacks setzen
      app._prepareOnSubmit((values) => {
        app.close();
        resolve(values);
      });

      app._prepareOnCancel(() => {
        app.close();
        resolve(null);
      });

      // Dialog öffnen
      app.render(true);
    });
  }
}
