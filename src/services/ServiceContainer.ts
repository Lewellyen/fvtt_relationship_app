import type { IServiceContainer } from "./IServiceContainer";
import type { ServicePlan } from "../core/services/ServicePlanner";
import type { IServiceValidator } from "../interfaces";
import { ServicePlanner } from "../core/services/ServicePlanner";
import { ServiceValidator } from "../core/services/ServiceValidator";

/**
 * ServiceContainer - Services mit Dependencies erstellen und lagern
 * 
 * Verantwortlichkeit: Services mit Dependencies erstellen und lagern
 * Single Responsibility: Nur Service Creation und Caching
 */
export class ServiceContainer implements IServiceContainer {
  static readonly API_NAME = "serviceContainer";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "ServiceContainer"; // ✅ Klassename für Dependency Resolution
  static readonly DEPENDENCIES = [ServicePlanner, ServiceValidator]; // ✅ Dependencies explizit definiert

  private static instance: ServiceContainer;
  private readonly instances = new Map<any, any>(); // Lagerhaus für Singletons
  private readonly servicePlans: Map<any, ServicePlan>;
  private readonly serviceValidator: IServiceValidator;

  constructor(servicePlans: Map<any, ServicePlan>, serviceValidator: IServiceValidator) {
    this.servicePlans = servicePlans;
    this.serviceValidator = serviceValidator;
  }

  static getInstance(servicePlans: Map<any, ServicePlan>, serviceValidator: IServiceValidator): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer(servicePlans, serviceValidator);
    }
    return ServiceContainer.instance;
  }

  /**
   * Service aus Lagerhaus holen oder neu erstellen
   */
  getService<T>(identifier: any): T {
    console.log(`[ServiceContainer] 🏪 Getting service: ${identifier.name || identifier}`);
    
    // Erst im Lagerhaus schauen (für Singletons)
    if (this.instances.has(identifier)) {
      console.log(`[ServiceContainer] ♻️ Returning cached singleton: ${identifier.name || identifier}`);
      return this.instances.get(identifier);
    }
    
    // Nicht da? Dann neu erstellen
    console.log(`[ServiceContainer] 🏗️ Creating new service: ${identifier.name || identifier}`);
    const service = this.createService(identifier);
    
    // Singleton? Dann ins Lagerhaus legen
    const plan = this.servicePlans.get(identifier);
    if (plan && plan.isSingleton) {
      console.log(`[ServiceContainer] 💾 Caching singleton: ${identifier.name || identifier}`);
      this.instances.set(identifier, service);
    }
    
    return service;
  }

  /**
   * Service mit Dependencies erstellen
   */
  createService<T>(identifier: any): T {
    console.log(`[ServiceContainer] 🏗️ Creating service: ${identifier.name || identifier}`);
    console.log(`[ServiceContainer] 🔍 Available service plans:`, Array.from(this.servicePlans.keys()).map(k => k.name || k));
    
    const plan = this.servicePlans.get(identifier);
    if (!plan) {
      console.error(`[ServiceContainer] ❌ No service plan found for ${identifier.name || identifier}`);
      console.error(`[ServiceContainer] 🔍 Available plans:`, Array.from(this.servicePlans.keys()).map(k => k.name || k));
      throw new Error(`No service plan found for ${identifier.name || identifier}`);
    }
    
    console.log(`[ServiceContainer] 📋 Service plan for ${identifier.name || identifier}:`, {
      dependencies: plan.dependencies.map(d => d.name || d),
      isSingleton: plan.isSingleton,
      serviceType: plan.serviceType
    });
    
    // Dependencies zuerst erstellen
    const dependencies = this.resolveDependencies(plan);
    
    console.log(`[ServiceContainer] 🔗 Resolved dependencies for ${identifier.name || identifier}:`, {
      count: dependencies.length,
      dependencies: dependencies.map(d => d.constructor.name)
    });
    
    // Service mit Dependencies erstellen
    const service = new plan.constructor(...dependencies);
    
    // Service-Erstellung validieren
    if (!this.serviceValidator.validateServiceCreation(service, identifier)) {
      this.serviceValidator.handleServiceCreationError(
        new Error(`Service creation validation failed for ${identifier.name || identifier}`),
        identifier
      );
      throw new Error(`Service creation validation failed for ${identifier.name || identifier}`);
    }
    
    console.log(`[ServiceContainer] ✅ Service created successfully: ${identifier.name || identifier}`);
    return service;
  }

  /**
   * Dependencies rekursiv auflösen
   */
  private resolveDependencies(plan: ServicePlan): any[] {
    console.log(`[ServiceContainer] 🔗 Resolving dependencies for: ${plan.constructor.name || plan.constructor}`);
    
    const dependencies: any[] = [];
    
    for (const dependency of plan.dependencies) {
      console.log(`[ServiceContainer] 🔍 Resolving dependency: ${dependency.name || dependency}`);
      
      try {
        const resolvedDependency = this.getService(dependency);
        dependencies.push(resolvedDependency);
        
        console.log(`[ServiceContainer] ✅ Dependency resolved: ${dependency.name || dependency} -> ${resolvedDependency.constructor.name}`);
      } catch (error) {
        console.error(`[ServiceContainer] ❌ Failed to resolve dependency ${dependency.name || dependency}:`, error);
        this.serviceValidator.handleServiceCreationError(error as Error, dependency);
        throw error;
      }
    }
    
    return dependencies;
  }

  /**
   * Alle Services erstellen
   */
  createAllServices(): void {
    console.log(`[ServiceContainer] 🏗️ Creating all services (${this.servicePlans.size} plans)`);
    
    const creationOrder = this.calculateCreationOrder();
    
    for (const serviceClass of creationOrder) {
      try {
        console.log(`[ServiceContainer] 🏗️ Creating service: ${serviceClass.name || serviceClass}`);
        this.getService(serviceClass);
        console.log(`[ServiceContainer] ✅ Service created: ${serviceClass.name || serviceClass}`);
      } catch (error) {
        console.error(`[ServiceContainer] ❌ Failed to create service ${serviceClass.name || serviceClass}:`, error);
        this.serviceValidator.handleServiceCreationError(error as Error, serviceClass);
        throw error;
      }
    }
    
    console.log(`[ServiceContainer] ✅ All services created successfully`);
  }

  /**
   * Erstellungsreihenfolge berechnen (Topological Sort)
   */
  private calculateCreationOrder(): any[] {
    console.log(`[ServiceContainer] 🔄 Calculating creation order`);
    
    const visited = new Set<any>();
    const result: any[] = [];
    
    for (const serviceClass of this.servicePlans.keys()) {
      this.topologicalSort(serviceClass, visited, result);
    }
    
    console.log(`[ServiceContainer] 🔄 Creation order:`, result.map(s => s.name || s));
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
   * Service aus Cache entfernen
   */
  disposeService(identifier: any): void {
    console.log(`[ServiceContainer] 🗑️ Disposing service: ${identifier.name || identifier}`);
    
    if (this.instances.has(identifier)) {
      this.instances.delete(identifier);
      console.log(`[ServiceContainer] ✅ Service disposed: ${identifier.name || identifier}`);
    } else {
      console.log(`[ServiceContainer] ℹ️ Service not cached: ${identifier.name || identifier}`);
    }
  }

  /**
   * Alle Services aus Cache entfernen
   */
  disposeAll(): void {
    console.log(`[ServiceContainer] 🗑️ Disposing all services (${this.instances.size} cached)`);
    
    this.instances.clear();
    console.log(`[ServiceContainer] ✅ All services disposed`);
  }

  /**
   * Prüfen ob Service im Cache ist
   */
  hasCachedService(identifier: any): boolean {
    return this.instances.has(identifier);
  }

  /**
   * Anzahl gecachter Services
   */
  getCachedServiceCount(): number {
    return this.instances.size;
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
}
