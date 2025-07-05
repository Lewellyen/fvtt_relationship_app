import type { DeathwatchActor } from "@/entities/DeathwatchActor";
import { AttributeInitializationService } from "@/services/AttributeInitializationService";
import { LoggerService } from "../../services/LoggerService";

/**
 * Hook: Nach dem Erstellen eines Actors standardmäßige Attribute initialisieren.
 */
export function registerCreateActorHook(): void {
  Hooks.on<"createActor">(
    "createActor",
    async (actor: DeathwatchActor, options, userId) => {
      LoggerService.getInstance().debug("createActor", actor, options, userId);
      await AttributeInitializationService.initialize(actor);
    },
  );
}
