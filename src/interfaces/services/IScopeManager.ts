import type { IScopeChain } from "./IScopeChain";

/**
 * Interface für Scope Manager
 *
 * Verantwortlichkeit: Scope und Scope Chain Management
 */
export interface IScopeManager {
  /**
   * Aktuellen Scope setzen
   * @param scope - Scope-Name
   */
  setCurrentScope(scope: string): void;

  /**
   * Aktuellen Scope abrufen
   * @returns Aktueller Scope oder null
   */
  getCurrentScope(): string | null;

  /**
   * Scope leeren
   * @param scope - Scope-Name
   */
  clearScope(scope: string): void;

  /**
   * Scope Chain erstellen
   * @param parentScope - Parent Scope-Name
   * @returns Scope Chain Interface
   */
  createScopeChain(parentScope: string): IScopeChain;

  /**
   * Child Scope zur Parent Chain hinzufügen
   * @param parentScope - Parent Scope-Name
   * @param childScope - Child Scope-Name
   */
  addChildScope(parentScope: string, childScope: string): void;

  /**
   * Child Scope aus Parent Chain entfernen
   * @param parentScope - Parent Scope-Name
   * @param childScope - Child Scope-Name
   */
  removeChildScope(parentScope: string, childScope: string): void;

  /**
   * Scope Chain entsorgen
   * @param parentScope - Parent Scope-Name
   */
  disposeScopeChain(parentScope: string): void;

  /**
   * Scope Chain abrufen
   * @param parentScope - Parent Scope-Name
   * @returns Scope Chain oder undefined
   */
  getScopeChain(parentScope: string): IScopeChain | undefined;

  /**
   * Alle Scope Chains entsorgen
   */
  disposeAllScopeChains(): void;

  /**
   * Anzahl Scope Chains
   * @returns Anzahl Scope Chains
   */
  getScopeChainCount(): number;

  /**
   * Alle Parent Scopes abrufen
   * @returns Array mit Parent Scope-Namen
   */
  getAllParentScopes(): string[];
}
