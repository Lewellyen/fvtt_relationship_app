// TypeScript strict checking enabled

// Using global foundry.applications.api.DocumentSheetV2 for types
import type { DeathwatchItem } from "../entities/DeathwatchItem";
import type { DeathwatchActor } from "../entities/DeathwatchActor";

/** Context provided to the Svelte sheet */
// Removed custom context interface – use minimal typed override

import ItemSheet from "@/svelte/ItemSheet.svelte";
import SvelteApplicationMixin from "@/mixins/SvelteApplicationMixin.svelte";
import { ItemContextBuilder } from "@/services/ItemContextBuilder";

export class DeathwatchItemSheet extends SvelteApplicationMixin(
  foundry.applications.sheets.ItemSheetV2,
) {
  static type = "dw-item";
  /** Use V2 static DEFAULT_OPTIONS which are auto-merged */
  static override DEFAULT_OPTIONS = {
    id: "deathwatch-itemsheet",
    classes: ["wh40k-deathwatch", "sheet", this.type],
    tag: "form",
    type: this.type,
    position: {
      width: "1000", // passt sich an Inhalt an
      height: "800",
    },
    window: {
      resizable: true,
      frame: true,
      contentClasses: ["standard-form"],
    },
    svelte: {
      component: ItemSheet,
      target: document.body,
    },
  } as any;

  override get title() {
    return this.document.name;
  }

  // Inherit Foundry's _prepareContext signature to merge data context via ActorContextBuilder
  override async _prepareContext(options: any): Promise<any> {
    const context = await super._prepareContext(options);
    // Build minimal context for Svelte component
    const item = this.document as DeathwatchItem;
    const actor = item.parent as DeathwatchActor;
    const dataContext = ItemContextBuilder.build(item);
    return { ...context, ...dataContext };
  }
}
