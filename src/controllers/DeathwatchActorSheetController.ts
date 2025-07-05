// TypeScript strict checking enabled

// Using global foundry.applications.api.DocumentSheetV2 for types
//import type { DeathwatchActor } from "../entities/DeathwatchActor";

/** Context provided to the Svelte sheet */
// Removed custom context interface – use minimal typed override

/*import PlayerCharacterSheet from "@/svelte/PlayerCharacterSheet.svelte";
import SvelteApplicationMixin from "@/mixins/SvelteApplicationMixin.svelte";
import { ActorContextBuilder } from "@/services/ActorContextBuilder";
import { ItemDropService } from "@/services/ItemDropService";
// Item ist global durch fvtt-types verfügbar, kein Import nötig

export class DeathwatchActorSheet extends SvelteApplicationMixin(
  foundry.applications.sheets.ActorSheetV2,
) {
  static type = "dw-character";
  /** Use V2 static DEFAULT_OPTIONS which are auto-merged */
/*  static override DEFAULT_OPTIONS = {
    id: "deathwatch-actorsheet",
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
      component: PlayerCharacterSheet,
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
    const actor = this.document as DeathwatchActor;
    const dataContext = ActorContextBuilder.build(actor);
    return { ...context, ...dataContext };
  }

  /** V2 DropItem: Handle dropped Item-Dokument direkt */
/* protected async _onDropItem(event: DragEvent, item: Item) {
    return ItemDropService.handleDrop(this.document as DeathwatchActor, item);
  }
}*/
