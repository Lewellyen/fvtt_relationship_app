import type { DeathwatchActor } from "@/entities/DeathwatchActor";
import { LoggerService } from "../../services/LoggerService";

/**
 * Hook: Vor dem Aktualisieren eines Actors Logging.
 */
export function registerPreUpdateActorHook(): void {
  Hooks.on<"preUpdateActor">(
    "preUpdateActor",
    (actor: DeathwatchActor, updates, options, userId) => {
      LoggerService.getInstance().debug(
        "preUpdateActor",
        actor,
        updates,
        options,
        userId,
      );
    },
  );
}
