import MetadataManagementView from "../svelte/MetadataManagementView.svelte";
import { use } from "../core/edge/appContext";
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

  private get logger() { return (this.#logger ??= use(FoundryLogger)); }
  private get svelte() { return (this.#svelte ??= use(SvelteManager)); }
  private get css() { return (this.#css ??= use(CSSManager)); }

  constructor() {
    super();
    // Kein Service im Konstruktor holen (Foundry erzeugt die Klasse; Constructor-Zeitpunkt ist zu früh)
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
    this.logger.info("[MetadataManagementApplication] _prepareContext called with context:", context);
    this.logger.info("[MetadataManagementApplication] _prepareContext called with options:", options);
    return context;
  }
   

  async _loadCSS() {
    const cssPath = "modules/relationship-app/styles/metadata-management-app.css";
    await this.css.loadCSS(cssPath);
  }

  async _onRender(context: any, options: any) {
    this.logger.info("[MetadataManagementApplication] _onRender started", { context, options });
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
      {}
    );

    this.logger.info("[MetadataManagementApplication] MetadataManagementView mounted successfully");
  }

  /** @override */
  async _onClose(options: any) {
    this.logger.info("[MetadataManagementApplication] _onClose called with options:", options);
    // ✅ Delegation an SvelteManager - Single Responsibility
    await this.svelte.unmountApp(this.svelteApp);
    this.svelteApp = null;
    return super._onClose(options);
  }

}
