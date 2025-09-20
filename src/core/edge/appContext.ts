import type { ServiceContainer } from "../../services/ServiceContainer";

let _container: ServiceContainer | undefined;

export function setContainer(c: ServiceContainer) {
  _container = c;
}

/** Nur in Foundry-Randklassen verwenden (Sheets, ApplicationV2, Enricher, NodeViews, Hooks) */
export function use<T = unknown>(tokenOrCtor: any, scope?: string): T {
  if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");
  return _container.getService(tokenOrCtor, scope) as T; // In deiner Basis wird per Klasse aufgelöst
}

/** Scope-Management für Edge-Adapter */
export function setCurrentScope(scope: string): void {
  if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");
  _container.setCurrentScope(scope);
}

/** Scope-Cleanup für Edge-Adapter */
export function disposeScopedServices(scope: string): void {
  if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");
  _container.disposeScopedServices(scope);
}

/** Scope-Informationen für Edge-Adapter */
export function getScopedServiceCount(scope: string): number {
  if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");
  return _container.getScopedServiceCount(scope);
}

/** Scope Chain Management für Edge-Adapter */

/**
 * Child Scope in Parent Chain erstellen
 * @param parentScope - Parent Scope-Name
 * @param childType - Child Type (z.B. 'DynamicDialogApp')
 * @returns Child Scope-Name
 */
export function createChildScope(parentScope: string, childType: string): string {
  if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");

  const childScope = `${childType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Child Scope zur Parent Chain hinzufügen
  _container.addChildScope(parentScope, childScope);

  return childScope;
}

/**
 * Scope Chain mit allen Children entsorgen
 * @param parentScope - Parent Scope-Name
 */
export function disposeScopeChain(parentScope: string): void {
  if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");
  _container.disposeScopeChain(parentScope);
}

/**
 * Scope Chain erstellen
 * @param parentScope - Parent Scope-Name
 */
export function createScopeChain(parentScope: string): void {
  if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");
  _container.createScopeChain(parentScope);
}

/**
 * Child Scope aus Parent Chain entfernen
 * @param parentScope - Parent Scope-Name
 * @param childScope - Child Scope-Name
 */
export function removeChildScope(parentScope: string, childScope: string): void {
  if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");
  _container.removeChildScope(parentScope, childScope);
}
