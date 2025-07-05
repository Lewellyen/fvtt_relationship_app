import type { DeathwatchActor } from "@/entities/DeathwatchActor";
import { LoggerService } from "../../services/LoggerService";

/**
 * Hook: Vor dem Erstellen eines Actors Event protokollieren.
 */
export function registerPreCreateActorHook(): void {
  Hooks.on<"preCreateActor">(
    "preCreateActor",
    (actor: DeathwatchActor, updates, options, userId) => {
      LoggerService.getInstance().debug(
        "preCreateActor",
        actor,
        updates,
        options,
        userId,
      );
    },
  );
}
