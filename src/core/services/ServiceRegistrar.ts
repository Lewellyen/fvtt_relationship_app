import type { IServiceRegistrar, IServiceContainer, ILogger } from "../../interfaces";
import { ServiceContainer } from "../../services/ServiceContainer";
import { FoundryLogger } from "./FoundryLogger";

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
  static readonly DEPENDENCIES = [ServiceContainer, FoundryLogger]; // ✅ Dependencies explizit definiert

  private static instance: ServiceRegistrar;
  private readonly serviceLocator = new Map<any, () => any>();

  constructor(
    private serviceContainer: IServiceContainer,
    private logger: ILogger
  ) {}

  static getInstance(serviceContainer: IServiceContainer, logger: ILogger): ServiceRegistrar {
    if (!ServiceRegistrar.instance) {
      ServiceRegistrar.instance = new ServiceRegistrar(serviceContainer, logger);
    }
    return ServiceRegistrar.instance;
  }

  /**
   * Alle Services registrieren
   */
  registerAllServices(): void {
    this.writeLog("info", `[ServiceRegistrar] 📝 Registering all services`);
    
    const servicePlans = this.serviceContainer.getAllServicePlans();
    this.writeLog("info", `[ServiceRegistrar] 📋 Registering ${servicePlans.size} services`);
    
    for (const [serviceClass, plan] of servicePlans) {
      this.registerService(serviceClass, plan);
    }
    
    this.writeLog("info", `[ServiceRegistrar] ✅ All services registered`);
  }

  /**
   * Einzelnen Service registrieren
   */
  registerService(serviceClass: any, plan: any): void {
    this.writeLog("info", `[ServiceRegistrar] 📝 Registering service: ${serviceClass.name || serviceClass}`);
    
    // Factory-Funktion erstellen, die Service aus Container holt
    const serviceFactory = () => {
      this.writeLog("info", `[ServiceRegistrar] 🏭 Factory called for: ${serviceClass.name || serviceClass}`);
      return this.serviceContainer.getService(serviceClass);
    };
    
    // Service sowohl mit Klasse als auch mit String-Namen registrieren
    this.serviceLocator.set(serviceClass, serviceFactory);
    this.serviceLocator.set(serviceClass.name, serviceFactory);
    this.writeLog("info", `[ServiceRegistrar] ✅ Service registered: ${serviceClass.name || serviceClass} (both class and string)`);
  }

  /**
   * Service über ServiceContainer abrufen
   */
  getService<T>(identifier: any): T {
    this.writeLog("info", `[ServiceRegistrar] 🔍 Getting service: ${identifier.name || identifier}`);
    
    const factory = this.serviceLocator.get(identifier);
    if (!factory) {
      throw new Error(`Service ${identifier.name || identifier} not registered`);
    }
    
    const service = factory();
    this.writeLog("info", `[ServiceRegistrar] ✅ Service retrieved: ${identifier.name || identifier}`);
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
    this.writeLog("info", `[ServiceRegistrar] 🗑️ Unregistering service: ${identifier.name || identifier}`);
    
    if (this.serviceLocator.has(identifier)) {
      this.serviceLocator.delete(identifier);
      this.writeLog("info", `[ServiceRegistrar] ✅ Service unregistered: ${identifier.name || identifier}`);
    } else {
      this.writeLog("info", `[ServiceRegistrar] ℹ️ Service not registered: ${identifier.name || identifier}`);
    }
  }

  /**
   * Alle Services aus Registrierung entfernen
   */
  unregisterAll(): void {
    this.writeLog("info", `[ServiceRegistrar] 🗑️ Unregistering all services (${this.serviceLocator.size} registered)`);
    
    this.serviceLocator.clear();
    this.writeLog("info", `[ServiceRegistrar] ✅ All services unregistered`);
  }

  /**
   * Service Discovery - Services auffindbar machen
   */
  enableServiceDiscovery(): void {
    this.writeLog("info", `[ServiceRegistrar] 🔍 Enabling service discovery`);
    
    // ServiceContainer in globalThis verfügbar machen
    (globalThis as any).relationshipApp = (globalThis as any).relationshipApp || {};
    (globalThis as any).relationshipApp.serviceLocator = this;
    
    this.writeLog("info", `[ServiceRegistrar] ✅ Service discovery enabled`);
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

  private writeLog(modus: "info" | "warn" | "error" | "debug", message: string, ...args: any[]) {
    if (this.logger) {
      this.logger[modus](message, ...args);
    } else {
      console[modus](message, ...args);
    }
  }
}
