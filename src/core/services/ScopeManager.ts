import type { IScopeChain } from "../../interfaces/services/IScopeChain";
import type { ILogger } from "../../interfaces";

/**
 * ScopeManager - Verantwortlich für Scope und Scope Chain Management
 *
 * Single Responsibility: Nur Scope Management + Scope Chains
 */
export class ScopeManager {
  private currentScope: string | null = null;
  private readonly scopeChains = new Map<string, IScopeChain>();

  constructor(private logger: ILogger) {}

  /**
   * Aktuellen Scope setzen
   */
  setCurrentScope(scope: string): void {
    this.writeLog("info", `[ScopeManager] 🎯 Setting current scope: ${scope}`);
    this.currentScope = scope;
  }

  /**
   * Aktuellen Scope abrufen
   */
  getCurrentScope(): string | null {
    return this.currentScope;
  }

  /**
   * Scope leeren
   */
  clearScope(scope: string): void {
    this.writeLog("info", `[ScopeManager] 🗑️ Clearing scope: ${scope}`);
    // Scope wird in ServiceCache verwaltet, hier nur Logging
    this.writeLog("info", `[ScopeManager] ✅ Scope cleared: ${scope}`);
  }

  /**
   * Scope Chain erstellen
   */
  createScopeChain(parentScope: string): IScopeChain {
    this.writeLog("info", `[ScopeManager] 🔗 Creating scope chain for parent: ${parentScope}`);

    const chain: IScopeChain = {
      parentScope,
      childScopes: new Set(),
      addChildScope: (scope: string) => {
        chain.childScopes.add(scope);
        this.writeLog(
          "info",
          `[ScopeManager] ➕ Added child scope: ${scope} to parent: ${parentScope}`
        );
      },
      removeChildScope: (scope: string) => {
        chain.childScopes.delete(scope);
        this.writeLog(
          "info",
          `[ScopeManager] ➖ Removed child scope: ${scope} from parent: ${parentScope}`
        );
      },
      disposeAllChildScopes: () => {
        this.writeLog(
          "info",
          `[ScopeManager] 🧹 Disposing ${chain.childScopes.size} child scopes for parent: ${parentScope}`
        );
        // Child scopes werden in ServiceCache entsorgt
        chain.childScopes.clear();
      },
      getChildScopeCount: () => chain.childScopes.size,
      isChildScope: (scope: string) => chain.childScopes.has(scope),
    };

    this.scopeChains.set(parentScope, chain);
    this.writeLog("info", `[ScopeManager] ✅ Scope chain created for parent: ${parentScope}`);
    return chain;
  }

  /**
   * Child Scope zu Parent hinzufügen
   */
  addChildScope(parentScope: string, childScope: string): void {
    const chain = this.scopeChains.get(parentScope);
    if (chain) {
      chain.addChildScope(childScope);
    } else {
      this.writeLog("warn", `[ScopeManager] ⚠️ Parent scope chain not found: ${parentScope}`);
    }
  }

  /**
   * Child Scope von Parent entfernen
   */
  removeChildScope(parentScope: string, childScope: string): void {
    const chain = this.scopeChains.get(parentScope);
    if (chain) {
      chain.removeChildScope(childScope);
    } else {
      this.writeLog("warn", `[ScopeManager] ⚠️ Parent scope chain not found: ${parentScope}`);
    }
  }

  /**
   * Scope Chain entsorgen
   */
  disposeScopeChain(parentScope: string): void {
    const chain = this.scopeChains.get(parentScope);
    if (chain) {
      this.writeLog("info", `[ScopeManager] 🧹 Disposing scope chain for parent: ${parentScope}`);
      chain.disposeAllChildScopes();
      this.scopeChains.delete(parentScope);
      this.writeLog("info", `[ScopeManager] ✅ Scope chain disposed for parent: ${parentScope}`);
    } else {
      this.writeLog("warn", `[ScopeManager] ⚠️ Scope chain not found: ${parentScope}`);
    }
  }

  /**
   * Scope Chain abrufen
   */
  getScopeChain(parentScope: string): IScopeChain | undefined {
    return this.scopeChains.get(parentScope);
  }

  /**
   * Alle Scope Chains entsorgen
   */
  disposeAllScopeChains(): void {
    this.writeLog(
      "info",
      `[ScopeManager] 🗑️ Disposing all scope chains (${this.scopeChains.size} chains)`
    );

    for (const [parentScope, chain] of this.scopeChains) {
      chain.disposeAllChildScopes();
      this.writeLog("info", `[ScopeManager] ✅ Disposed scope chain: ${parentScope}`);
    }
    this.scopeChains.clear();
    this.writeLog("info", `[ScopeManager] ✅ All scope chains disposed`);
  }

  /**
   * Anzahl Scope Chains
   */
  getScopeChainCount(): number {
    return this.scopeChains.size;
  }

  /**
   * Alle Parent Scopes abrufen
   */
  getAllParentScopes(): string[] {
    return Array.from(this.scopeChains.keys());
  }

  private writeLog(modus: "info" | "warn" | "error" | "debug", message: string, ...args: any[]) {
    if (this.logger) {
      this.logger[modus](message, ...args);
    } else {
      console[modus](message, ...args);
    }
  }
}
