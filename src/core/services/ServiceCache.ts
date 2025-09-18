import type { ILogger } from "../../interfaces";

/**
 * ServiceCache - Verantwortlich für Service Caching (Singleton, Scoped, Transient)
 *
 * Single Responsibility: Nur Service Caching und Cache Management
 */
export class ServiceCache {
  private readonly instances = new Map<any, any>(); // Singleton Cache
  private readonly scopedInstances = new Map<string, Map<any, any>>(); // Scoped Cache

  constructor(private logger: ILogger) {}

  /**
   * Singleton Service abrufen oder erstellen
   */
  getSingleton<T>(identifier: any, factory: () => T): T {
    this.writeLog("info", `[ServiceCache] 🔍 Getting singleton: ${identifier.name || identifier}`);

    if (this.instances.has(identifier)) {
      this.writeLog(
        "info",
        `[ServiceCache] ♻️ Returning cached singleton: ${identifier.name || identifier}`
      );
      return this.instances.get(identifier);
    }

    this.writeLog(
      "info",
      `[ServiceCache] 🏗️ Creating new singleton: ${identifier.name || identifier}`
    );
    const service = factory();
    this.instances.set(identifier, service);

    this.writeLog("info", `[ServiceCache] 💾 Cached singleton: ${identifier.name || identifier}`);
    return service;
  }

  /**
   * Scoped Service abrufen oder erstellen
   */
  getScoped<T>(identifier: any, scope: string, factory: () => T): T {
    this.writeLog(
      "info",
      `[ServiceCache] 🎯 Getting scoped service: ${identifier.name || identifier} (scope: ${scope})`
    );

    if (!this.scopedInstances.has(scope)) {
      this.scopedInstances.set(scope, new Map());
      this.writeLog("info", `[ServiceCache] 📁 Created new scope: ${scope}`);
    }

    const scopeInstances = this.scopedInstances.get(scope)!;

    if (scopeInstances.has(identifier)) {
      this.writeLog(
        "info",
        `[ServiceCache] ♻️ Returning cached scoped service: ${identifier.name || identifier} (scope: ${scope})`
      );
      return scopeInstances.get(identifier);
    }

    this.writeLog(
      "info",
      `[ServiceCache] 🏗️ Creating new scoped service: ${identifier.name || identifier} (scope: ${scope})`
    );
    const service = factory();
    scopeInstances.set(identifier, service);

    this.writeLog(
      "info",
      `[ServiceCache] 💾 Cached scoped service: ${identifier.name || identifier} (scope: ${scope})`
    );
    return service;
  }

  /**
   * Transient Service erstellen (kein Caching)
   */
  getTransient<T>(identifier: any, factory: () => T): T {
    this.writeLog(
      "info",
      `[ServiceCache] 🔄 Creating transient service: ${identifier.name || identifier}`
    );
    return factory();
  }

  /**
   * Singleton Service aus Cache entfernen
   */
  disposeSingleton(identifier: any): void {
    this.writeLog(
      "info",
      `[ServiceCache] 🗑️ Disposing singleton: ${identifier.name || identifier}`
    );

    if (this.instances.has(identifier)) {
      this.instances.delete(identifier);
      this.writeLog(
        "info",
        `[ServiceCache] ✅ Singleton disposed: ${identifier.name || identifier}`
      );
    } else {
      this.writeLog(
        "info",
        `[ServiceCache] ℹ️ Singleton not cached: ${identifier.name || identifier}`
      );
    }
  }

  /**
   * Alle Singleton Services aus Cache entfernen
   */
  disposeAllSingletons(): void {
    this.writeLog(
      "info",
      `[ServiceCache] 🗑️ Disposing all singletons (${this.instances.size} cached)`
    );

    this.instances.clear();
    this.writeLog("info", `[ServiceCache] ✅ All singletons disposed`);
  }

  /**
   * Scoped Services eines Scopes entsorgen
   */
  disposeScopedServices(scope: string): void {
    this.writeLog("info", `[ServiceCache] 🗑️ Disposing scoped services: ${scope}`);
    if (this.scopedInstances.has(scope)) {
      const scopeInstances = this.scopedInstances.get(scope)!;
      const count = scopeInstances.size;
      scopeInstances.clear();
      this.scopedInstances.delete(scope);
      this.writeLog(
        "info",
        `[ServiceCache] ✅ Disposed ${count} scoped services from scope: ${scope}`
      );
    } else {
      this.writeLog("info", `[ServiceCache] ℹ️ No scoped services found in scope: ${scope}`);
    }
  }

  /**
   * Alle Scoped Services entsorgen
   */
  disposeAllScopedServices(): void {
    this.writeLog(
      "info",
      `[ServiceCache] 🗑️ Disposing all scoped services (${this.scopedInstances.size} scopes)`
    );

    for (const [scope, scopeInstances] of this.scopedInstances) {
      const count = scopeInstances.size;
      scopeInstances.clear();
      this.writeLog("info", `[ServiceCache] ✅ Disposed ${count} services from scope: ${scope}`);
    }
    this.scopedInstances.clear();
    this.writeLog("info", `[ServiceCache] ✅ All scoped services disposed`);
  }

  /**
   * Alle Services entsorgen
   */
  disposeAll(): void {
    this.writeLog(
      "info",
      `[ServiceCache] 🗑️ Disposing all services (${this.instances.size} singletons, ${this.scopedInstances.size} scopes)`
    );

    this.disposeAllSingletons();
    this.disposeAllScopedServices();
    this.writeLog("info", `[ServiceCache] ✅ All services disposed`);
  }

  /**
   * Prüfen ob Singleton im Cache ist
   */
  hasSingleton(identifier: any): boolean {
    return this.instances.has(identifier);
  }

  /**
   * Anzahl gecachter Singleton Services
   */
  getSingletonCount(): number {
    return this.instances.size;
  }

  /**
   * Anzahl Scoped Services in einem Scope
   */
  getScopedServiceCount(scope: string): number {
    if (this.scopedInstances.has(scope)) {
      return this.scopedInstances.get(scope)!.size;
    }
    return 0;
  }

  /**
   * Anzahl aller Scopes
   */
  getScopeCount(): number {
    return this.scopedInstances.size;
  }

  private writeLog(modus: "info" | "warn" | "error" | "debug", message: string, ...args: any[]) {
    if (this.logger) {
      this.logger[modus](message, ...args);
    } else {
      console[modus](message, ...args);
    }
  }
}
