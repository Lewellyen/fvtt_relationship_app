import { LoggerService } from "../../services/LoggerService";

/**
 * Hook: Nach dem Erstellen eines Actors standardmäßige Attribute initialisieren.
 */
export function registerCreateActorHook(): void {
  Hooks.on<"createActor">(
    "createActor",
    async (actor: Actor, options, userId) => {
      LoggerService.getInstance().debug("createActor", actor, options, userId);
    },
  );
}
