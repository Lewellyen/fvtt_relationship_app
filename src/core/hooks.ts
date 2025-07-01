import { registerPreCreateActorHook } from "./hooks/preCreateActorHook";
import { registerCreateActorHook } from "./hooks/createActorHook";
import { registerPreUpdateActorHook } from "./hooks/preUpdateActorHook";
import { registerUpdateActorHook } from "./hooks/updateActorHook";

/**
 * Registriert alle Actor-bezogenen Hooks.
 */
export function registerHooks(): void {
  registerPreCreateActorHook();
  registerCreateActorHook();
  registerPreUpdateActorHook();
  registerUpdateActorHook();
}
