import MetadataManagementView from "../svelte/MetadataManagementView.svelte";
import type { ISvelteApplicationDependencies, INotificationApplicationDependencies } from "../interfaces";
import { ApplicationDependencyResolver } from "../core/services/ApplicationDependencyResolver";

export default class MetadataManagementApplication extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  // ✅ Echte Dependency Injection - explizite Dependencies
  private svelteDependencies: ISvelteApplicationDependencies;
  private notificationDependencies: INotificationApplicationDependencies;

  constructor() {
    super();
    const resolver = new ApplicationDependencyResolver();
    this.svelteDependencies = resolver.resolveSvelteApplicationDependencies();
    this.notificationDependencies = resolver.resolveNotificationApplicationDependencies();
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
  private get notificationService() {
    return this.notificationDependencies.notificationService;
  }
  private get errorHandler() {
    return this.notificationDependencies.errorHandler;
  }
  /**
   * Merge the default parts, inserting our graph part between header and footer.
   */
  static PARTS = {
    main: {
      template: "modules/relationship-app/templates/metadata-management-main.hbs",
    },
  };

  svelteApp: any = null;

  /** @override */
  static DEFAULT_OPTIONS = {
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
      this.logger.info(
        "[MetadataManagementApplication] _prepareContext called with context:",
        context
      );
      this.logger.info(
        "[MetadataManagementApplication] _prepareContext called with options:",
        options
      );
    } else {
      console.log("[MetadataManagementApplication] _prepareContext called with context:", context);
      console.log("[MetadataManagementApplication] _prepareContext called with options:", options);
    }
    return context;
  }

  async _loadCSS() {
    const cssPath = "modules/relationship-app/styles/metadata-management-app.css";
    await this.cssManager.loadCSS(cssPath);
  }

  async _onRender(context: any, options: any) {
    if (this.logger) {
      this.logger.info("[MetadataManagementApplication] _onRender started", { context, options });
    } else {
      console.log("[MetadataManagementApplication] _onRender started", { context, options });
    }

    await super._onRender(context, options);
    const target = this.element.querySelector("#metadata-management-svelte");
    if (!target) {
      if (this.logger) {
        this.logger.warn("[MetadataManagementApplication] Svelte mount point not found");
      } else {
        console.warn("[MetadataManagementApplication] Svelte mount point not found");
      }
      return;
    }

    if (this.logger) {
      this.logger.info("[MetadataManagementApplication] Found target element:", target);
    } else {
      console.log("[MetadataManagementApplication] Found target element:", target);
    }

    // ✅ Delegation an SvelteManager - Single Responsibility
    await this.svelteManager.unmountApp(this.svelteApp);
    this.svelteApp = null;

    await this._loadCSS();
    // Mount the new MetadataManagementView component via SvelteManager
    this.svelteApp = await this.svelteManager.mountComponent(
      MetadataManagementView,
      target as HTMLElement,
      {}
    );

    if (this.logger) {
      this.logger.info(
        "[MetadataManagementApplication] MetadataManagementView mounted successfully"
      );
    } else {
      console.log("[MetadataManagementApplication] MetadataManagementView mounted successfully");
    }
  }

  /** @override */
  async _onClose(options: any) {
    if (this.logger) {
      this.logger.info("[MetadataManagementApplication] _onClose called with options:", options);
    } else {
      console.log("[MetadataManagementApplication] _onClose called with options:", options);
    }
    // ✅ Delegation an SvelteManager - Single Responsibility
    await this.svelteManager.unmountApp(this.svelteApp);
    this.svelteApp = null;
    return super._onClose(options);
  }
}
