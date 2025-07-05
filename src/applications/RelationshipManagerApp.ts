import SvelteApplicationMixin from "@/mixins/SvelteApplicationMixin.svelte";
import RelationshipManager from "@/svelte/RelationshipManager.svelte";

/**
 * Relationship Manager Application as its own window.
 */
export class RelationshipManagerApp extends SvelteApplicationMixin(
  foundry.applications.api.ApplicationV2,
) {
  static override DEFAULT_OPTIONS = {
    id: "relationship-manager",
    title: "Relationship Manager",
    classes: ["wh40k-deathwatch", "relationship-manager"],
    tag: "form",
    position: {
      width: 800,
      height: 600,
    },
    window: {
      resizable: true,
      frame: true,
      contentClasses: ["standard-form"],
    },
    svelte: {
      component: RelationshipManager,
      target: document.body,
    },
  } as any;

  override get title() {
    return "Relationship Manager";
  }

  override async _prepareContext(options: any): Promise<any> {
    const context = await super._prepareContext(options);
    return context;
  }
}
