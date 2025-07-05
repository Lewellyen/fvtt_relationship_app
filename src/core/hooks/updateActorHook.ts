import type { DeathwatchActor } from "@/entities/DeathwatchActor";
import { LoggerService } from "../../services/LoggerService";

/**
 * Hook: Nach dem Aktualisieren eines Actors Logging.
 */
export function registerUpdateActorHook(): void {
  Hooks.on<"updateActor">(
    "updateActor",
    async (actor: DeathwatchActor, updates, options, userId) => {
      LoggerService.getInstance().debug(
        "updateActor",
        actor,
        updates,
        options,
        userId,
      );
      // Erweiterungslogik kann hier hinzugefügt werden
    },
  );
}
