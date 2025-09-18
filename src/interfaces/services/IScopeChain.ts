/**
 * Interface für Scope Chain Management
 * Ermöglicht hierarchische Scope-Strukturen mit automatischem Cleanup
 */
export interface IScopeChain {
  /** Parent Scope dieser Chain */
  parentScope: string;

  /** Set aller Child Scopes */
  childScopes: Set<string>;

  /** Child Scope zur Chain hinzufügen */
  addChildScope(scope: string): void;

  /** Child Scope aus der Chain entfernen */
  removeChildScope(scope: string): void;

  /** Alle Child Scopes entsorgen */
  disposeAllChildScopes(): void;

  /** Anzahl der Child Scopes */
  getChildScopeCount(): number;

  /** Prüfen ob Scope ein Child ist */
  isChildScope(scope: string): boolean;
}
