import type { ServiceContainer } from "../../services/ServiceContainer";

let _container: ServiceContainer | undefined;

export function setContainer(c: ServiceContainer) {
  _container = c;
}

/** Nur in Foundry-Randklassen verwenden (Sheets, ApplicationV2, Enricher, NodeViews, Hooks) */
export function use<T = unknown>(tokenOrCtor: any): T {
  if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");
  return _container.getService(tokenOrCtor) as T; // In deiner Basis wird per Klasse aufgelöst
}
