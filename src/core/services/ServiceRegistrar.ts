import type { IServiceRegistrar, IServiceContainer } from "../../interfaces";
import { ServiceContainer } from "../../services/ServiceContainer";

/**
 * ServiceRegistrar - Services registrieren und verfügbar machen
 * 
 * Verantwortlichkeit: Services registrieren und verfügbar machen
 * Single Responsibility: Nur Service Registration
 */
export class ServiceRegistrar implements IServiceRegistrar {
  static readonly API_NAME = "serviceRegistrar";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "ServiceRegistrar"; // ✅ Klassename für Dependency Resolution
  static readonly DEPENDENCIES = [ServiceContainer]; // ✅ Dependencies explizit definiert

  private static instance: ServiceRegistrar;
  private readonly serviceLocator = new Map<any, () => any>();

  constructor(private serviceContainer: IServiceContainer) {}

  static getInstance(serviceContainer: IServiceContainer): ServiceRegistrar {
    if (!ServiceRegistrar.instance) {
      ServiceRegistrar.instance = new ServiceRegistrar(serviceContainer);
    }
    return ServiceRegistrar.instance;
  }

  /**
   * Alle Services registrieren
   */
  registerAllServices(): void {
    console.log(`[ServiceRegistrar] 📝 Registering all services`);
    
    const servicePlans = this.serviceContainer.getAllServicePlans();
    console.log(`[ServiceRegistrar] 📋 Registering ${servicePlans.size} services`);
    
    for (const [serviceClass, plan] of servicePlans) {
      this.registerService(serviceClass, plan);
    }
    
    console.log(`[ServiceRegistrar] ✅ All services registered`);
  }

  /**
   * Einzelnen Service registrieren
   */
  registerService(serviceClass: any, plan: any): void {
    console.log(`[ServiceRegistrar] 📝 Registering service: ${serviceClass.name || serviceClass}`);
    
    // Factory-Funktion erstellen, die Service aus Container holt
    const serviceFactory = () => {
      console.log(`[ServiceRegistrar] 🏭 Factory called for: ${serviceClass.name || serviceClass}`);
      return this.serviceContainer.getService(serviceClass);
    };
    
    this.serviceLocator.set(serviceClass, serviceFactory);
    console.log(`[ServiceRegistrar] ✅ Service registered: ${serviceClass.name || serviceClass}`);
  }

  /**
   * Service über ServiceContainer abrufen
   */
  getService<T>(identifier: any): T {
    console.log(`[ServiceRegistrar] 🔍 Getting service: ${identifier.name || identifier}`);
    
    const factory = this.serviceLocator.get(identifier);
    if (!factory) {
      throw new Error(`Service ${identifier.name || identifier} not registered`);
    }
    
    const service = factory();
    console.log(`[ServiceRegistrar] ✅ Service retrieved: ${identifier.name || identifier}`);
    return service;
  }

  /**
   * Prüfen ob Service registriert ist
   */
  hasService(identifier: any): boolean {
    return this.serviceLocator.has(identifier);
  }

  /**
   * Alle registrierten Services abrufen
   */
  getRegisteredServices(): any[] {
    return Array.from(this.serviceLocator.keys());
  }

  /**
   * Service aus Registrierung entfernen
   */
  unregisterService(identifier: any): void {
    console.log(`[ServiceRegistrar] 🗑️ Unregistering service: ${identifier.name || identifier}`);
    
    if (this.serviceLocator.has(identifier)) {
      this.serviceLocator.delete(identifier);
      console.log(`[ServiceRegistrar] ✅ Service unregistered: ${identifier.name || identifier}`);
    } else {
      console.log(`[ServiceRegistrar] ℹ️ Service not registered: ${identifier.name || identifier}`);
    }
  }

  /**
   * Alle Services aus Registrierung entfernen
   */
  unregisterAll(): void {
    console.log(`[ServiceRegistrar] 🗑️ Unregistering all services (${this.serviceLocator.size} registered)`);
    
    this.serviceLocator.clear();
    console.log(`[ServiceRegistrar] ✅ All services unregistered`);
  }

  /**
   * Service Discovery - Services auffindbar machen
   */
  enableServiceDiscovery(): void {
    console.log(`[ServiceRegistrar] 🔍 Enabling service discovery`);
    
    // ServiceContainer in globalThis verfügbar machen
    (globalThis as any).relationshipApp = (globalThis as any).relationshipApp || {};
    (globalThis as any).relationshipApp.serviceLocator = this;
    
    console.log(`[ServiceRegistrar] ✅ Service discovery enabled`);
  }

  /**
   * Service Metadaten abrufen
   */
  getServiceMetadata(identifier: any): any {
    const plan = this.serviceContainer.getServicePlan(identifier);
    if (!plan) {
      return null;
    }
    
    return {
      apiName: plan.apiName,
      serviceType: plan.serviceType,
      isSingleton: plan.isSingleton,
      dependencies: plan.dependencies.map(d => d.name || d),
      isRegistered: this.hasService(identifier)
    };
  }

  /**
   * Alle Service Metadaten abrufen
   */
  getAllServiceMetadata(): Map<any, any> {
    const metadata = new Map();
    const servicePlans = this.serviceContainer.getAllServicePlans();
    
    for (const [serviceClass, plan] of servicePlans) {
      metadata.set(serviceClass, this.getServiceMetadata(serviceClass));
    }
    
    return metadata;
  }
}
