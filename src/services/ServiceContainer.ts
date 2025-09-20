import type { IServiceContainer } from "../interfaces/services/IServiceContainer";
import type { IScopeChain } from "../interfaces/services/IScopeChain";
import type { ServicePlan } from "../core/services/ServicePlanner";
import type { IServiceValidator, ILogger } from "../interfaces";
import { ServicePlanner } from "../core/services/ServicePlanner";
import { ServiceValidator } from "../core/services/ServiceValidator";
import { FoundryLogger } from "../core/services/FoundryLogger";
import { ServiceFactory } from "../core/services/ServiceFactory";
import { ServiceCache } from "../core/services/ServiceCache";
import { ScopeManager } from "../core/services/ScopeManager";

/**
 * ServiceContainer - Orchestriert ServiceFactory, ServiceCache und ScopeManager
 *
 * Verantwortlichkeit: Orchestrierung der spezialisierten Services
 * Single Responsibility: Nur Orchestrierung und Delegation
 */
export class ServiceContainer implements IServiceContainer {
  static readonly API_NAME = "serviceContainer";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "ServiceContainer"; // ✅ Klassename für Dependency Resolution
  static readonly DEPENDENCIES = [FoundryLogger, ServicePlanner, ServiceValidator]; // ✅ Dependencies explizit definiert

  private static instance: ServiceContainer;
  private readonly servicePlans: Map<any, ServicePlan>;
  private readonly serviceValidator: IServiceValidator;
  private readonly logger: ILogger;

  // Spezialisierte Services (werden nachträglich injiziert)
  private serviceFactory?: ServiceFactory;
  private serviceCache?: ServiceCache;
  private scopeManager?: ScopeManager;

  constructor(
    logger: ILogger,
    servicePlans: Map<any, ServicePlan>,
    serviceValidator: IServiceValidator
  ) {
    this.logger = logger;
    this.servicePlans = servicePlans;
    this.serviceValidator = serviceValidator;
  }

  /**
   * ServiceFactory nachträglich injizieren
   */
  setServiceFactory(factory: ServiceFactory): void {
    this.serviceFactory = factory;
    this.writeLog("info", `[ServiceContainer] ✅ ServiceFactory injected`);
  }

  /**
   * ServiceCache nachträglich injizieren
   */
  setServiceCache(cache: ServiceCache): void {
    this.serviceCache = cache;
    this.writeLog("info", `[ServiceContainer] ✅ ServiceCache injected`);
  }

  /**
   * ScopeManager nachträglich injizieren
   */
  setScopeManager(scopeManager: ScopeManager): void {
    this.scopeManager = scopeManager;
    this.writeLog("info", `[ServiceContainer] ✅ ScopeManager injected`);
  }

  static getInstance(
    logger: ILogger,
    servicePlans: Map<any, ServicePlan>,
    serviceValidator: IServiceValidator
  ): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer(logger, servicePlans, serviceValidator);
    }
    return ServiceContainer.instance;
  }

  /**
   * Service über spezialisierte Services abrufen oder erstellen
   */
  getService<T>(ctor: new (...args: unknown[]) => T, scope?: string): T {
    this.writeLog(
      "info",
      `[ServiceContainer] 🏪 Getting service: ${ctor.name || ctor}${scope ? ` (scope: ${scope})` : ""}`
    );

    const plan = this.servicePlans.get(ctor);
    if (!plan) {
      this.writeLog(
        "error",
        `[ServiceContainer] ❌ No service plan found for ${ctor.name || ctor}`
      );
      throw new Error(`No service plan found for ${ctor.name || ctor}`);
    }

    // Prüfen ob spezialisierte Services injiziert wurden
    if (!this.serviceFactory || !this.serviceCache || !this.scopeManager) {
      throw new Error(
        "ServiceContainer not properly initialized. Missing ServiceFactory, ServiceCache, or ScopeManager."
      );
    }

    // Factory-Funktion für Service-Erstellung
    const factory = () => this.serviceFactory!.createService(ctor);

    // Transient: Immer neu erstellen (kein Caching)
    if (plan.isTransient) {
      this.writeLog(
        "info",
        `[ServiceContainer] 🔄 Creating transient service: ${ctor.name || ctor}`
      );
      return this.serviceCache.getTransient(ctor, factory) as T;
    }

    // Scoped: Scope-basierte Instanzen
    if (plan.isScoped) {
      const scopeKey = scope || this.scopeManager.getCurrentScope() || "default";
      this.writeLog(
        "info",
        `[ServiceContainer] 🎯 Getting scoped service: ${ctor.name || ctor} (scope: ${scopeKey})`
      );
      return this.serviceCache.getScoped(ctor, scopeKey, factory) as T;
    }

    // Singleton: Cached Instanzen
    if (plan.isSingleton) {
      this.writeLog(
        "info",
        `[ServiceContainer] ♻️ Getting singleton service: ${ctor.name || ctor}`
      );
      return this.serviceCache.getSingleton(ctor, factory) as T;
    }

    // Fallback: Als Singleton behandeln
    this.writeLog(
      "warn",
      `[ServiceContainer] ⚠️ Unknown service type for ${ctor.name || ctor}, treating as singleton`
    );
    return this.serviceCache.getSingleton(ctor, factory) as T;
  }

  /**
   * Service mit Dependencies erstellen (delegiert an ServiceFactory)
   */
  createService<T>(ctor: new (...args: unknown[]) => T): T {
    if (!this.serviceFactory) {
      throw new Error("ServiceFactory not injected. Call setServiceFactory() first.");
    }
    return this.serviceFactory.createService(ctor);
  }

  /**
   * Alle Services erstellen (delegiert an ServiceFactory)
   */
  createAllServices(): void {
    this.writeLog(
      "info",
      `[ServiceContainer] 🏗️ Creating all services (${this.servicePlans.size} plans)`
    );

    const creationOrder = this.calculateCreationOrder();

    for (const serviceClass of creationOrder) {
      try {
        this.writeLog(
          "info",
          `[ServiceContainer] 🏗️ Creating service: ${serviceClass.name || serviceClass}`
        );
        this.getService(serviceClass);
        this.writeLog(
          "info",
          `[ServiceContainer] ✅ Service created: ${serviceClass.name || serviceClass}`
        );
      } catch (error) {
        this.writeLog(
          "error",
          `[ServiceContainer] ❌ Failed to create service ${serviceClass.name || serviceClass}:`,
          error
        );
        this.serviceValidator.handleServiceCreationError(error as Error, serviceClass);
        throw error;
      }
    }

    this.writeLog("info", `[ServiceContainer] ✅ All services created successfully`);
  }

  /**
   * Erstellungsreihenfolge berechnen (Topological Sort)
   */
  private calculateCreationOrder(): any[] {
    this.writeLog("info", `[ServiceContainer] 🔄 Calculating creation order`);

    const visited = new Set<any>();
    const result: any[] = [];

    for (const serviceClass of this.servicePlans.keys()) {
      this.topologicalSort(serviceClass, visited, result);
    }

    this.writeLog(
      "info",
      `[ServiceContainer] 🔄 Creation order:`,
      result.map((s) => s.name || s)
    );
    return result;
  }

  private topologicalSort(service: any, visited: Set<any>, result: any[]): void {
    if (visited.has(service)) {
      return;
    }

    visited.add(service);

    const plan = this.servicePlans.get(service);
    if (plan) {
      for (const dependency of plan.dependencies) {
        this.topologicalSort(dependency, visited, result);
      }
    }

    result.push(service);
  }

  /**
   * Service aus Cache entfernen (delegiert an ServiceCache)
   */
  disposeService(identifier: any): void {
    if (!this.serviceCache) {
      throw new Error("ServiceCache not injected. Call setServiceCache() first.");
    }
    this.serviceCache.disposeSingleton(identifier);
  }

  /**
   * Alle Services aus Cache entfernen (delegiert an ServiceCache)
   */
  disposeAll(): void {
    if (!this.serviceCache) {
      throw new Error("ServiceCache not injected. Call setServiceCache() first.");
    }
    this.serviceCache.disposeAll();
  }

  /**
   * Prüfen ob Service im Cache ist (delegiert an ServiceCache)
   */
  hasCachedService(identifier: any): boolean {
    if (!this.serviceCache) {
      return false;
    }
    return this.serviceCache.hasSingleton(identifier);
  }

  /**
   * Anzahl gecachter Services (delegiert an ServiceCache)
   */
  getCachedServiceCount(): number {
    if (!this.serviceCache) {
      return 0;
    }
    return this.serviceCache.getSingletonCount();
  }

  /**
   * Service-Plan abrufen
   */
  getServicePlan(identifier: any): ServicePlan | undefined {
    return this.servicePlans.get(identifier);
  }

  /**
   * Alle Service-Pläne abrufen
   */
  getAllServicePlans(): Map<any, ServicePlan> {
    return this.servicePlans;
  }

  /**
   * Aktuellen Scope setzen (delegiert an ScopeManager)
   */
  setCurrentScope(scope: string): void {
    if (!this.scopeManager) {
      throw new Error("ScopeManager not injected. Call setScopeManager() first.");
    }
    this.scopeManager.setCurrentScope(scope);
  }

  /**
   * Scope leeren (delegiert an ScopeManager)
   */
  clearScope(scope: string): void {
    if (!this.scopeManager) {
      throw new Error("ScopeManager not injected. Call setScopeManager() first.");
    }
    this.scopeManager.clearScope(scope);
  }

  /**
   * Scoped Services eines Scopes entsorgen (delegiert an ServiceCache)
   */
  disposeScopedServices(scope: string): void {
    if (!this.serviceCache) {
      throw new Error("ServiceCache not injected. Call setServiceCache() first.");
    }
    this.serviceCache.disposeScopedServices(scope);
  }

  /**
   * Anzahl Scoped Services in einem Scope (delegiert an ServiceCache)
   */
  getScopedServiceCount(scope: string): number {
    if (!this.serviceCache) {
      return 0;
    }
    return this.serviceCache.getScopedServiceCount(scope);
  }

  private writeLog(modus: "info" | "warn" | "error" | "debug", message: string, ...args: any[]) {
    if (this.logger) {
      this.logger[modus](message, ...args);
    }
    // Kein Console-Fallback - Logger ist Pflicht
  }

  // Scope Chain Management (delegiert an ScopeManager)

  createScopeChain(parentScope: string): IScopeChain {
    if (!this.scopeManager) {
      throw new Error("ScopeManager not injected. Call setScopeManager() first.");
    }
    return this.scopeManager.createScopeChain(parentScope);
  }

  addChildScope(parentScope: string, childScope: string): void {
    if (!this.scopeManager) {
      throw new Error("ScopeManager not injected. Call setScopeManager() first.");
    }
    this.scopeManager.addChildScope(parentScope, childScope);
  }

  removeChildScope(parentScope: string, childScope: string): void {
    if (!this.scopeManager) {
      throw new Error("ScopeManager not injected. Call setScopeManager() first.");
    }
    this.scopeManager.removeChildScope(parentScope, childScope);
  }

  disposeScopeChain(parentScope: string): void {
    if (!this.scopeManager || !this.serviceCache) {
      throw new Error(
        "ScopeManager or ServiceCache not injected. Call setScopeManager() and setServiceCache() first."
      );
    }

    // Scope Chain über ScopeManager entsorgen
    this.scopeManager.disposeScopeChain(parentScope);

    // Scoped Services über ServiceCache entsorgen
    this.serviceCache.disposeScopedServices(parentScope);
  }

  getScopeChain(parentScope: string): IScopeChain | undefined {
    if (!this.scopeManager) {
      return undefined;
    }
    return this.scopeManager.getScopeChain(parentScope);
  }
}
