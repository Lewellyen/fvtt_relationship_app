import { mount, unmount } from "svelte";
import MetadataManagementView from "../svelte/MetadataManagementView.svelte";

export default class MetadataManagementApplication extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
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
    console.log("[MetadataManagementApplication] _prepareContext called with context:", context);
    console.log("[MetadataManagementApplication] _prepareContext called with options:", options);
    return context;
  }

  async _onRender(context: any, options: any) {
    console.log("[MetadataManagementApplication] _onRender started", { context, options });

    await super._onRender(context, options);
    const target = this.element.querySelector("#metadata-management-svelte");
    if (!target) {
      console.warn("[MetadataManagementApplication] Svelte mount point not found");
      return;
    }

    console.log("[MetadataManagementApplication] Found target element:", target);

    // Unmount existing instance
    if (this.svelteApp) {
      console.log("[MetadataManagementApplication] Unmounting existing Svelte app");
      await unmount(this.svelteApp);
      this.svelteApp = null;
    }

    // Mount the new MetadataManagementView component
    this.svelteApp = mount(MetadataManagementView, {
      target,
      props: {},
    });

    console.log("[MetadataManagementApplication] MetadataManagementView mounted successfully");
  }

  /** @override */
  async _onClose(options: any) {
    console.log("[MetadataManagementApplication] _onClose called with options:", options);
    if (this.svelteApp) {
      await unmount(this.svelteApp);
      this.svelteApp = null;
    } else {
    }
    return super._onClose(options);
  }
}
