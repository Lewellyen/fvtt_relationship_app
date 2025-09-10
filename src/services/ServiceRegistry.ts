import type { IServiceRegistry } from "../interfaces/index";

/**
 * ServiceRegistry - Reine Registry für Service-Klassen
 * 
 * Verantwortlichkeit: Service-Klassen erfassen und registrieren
 * Single Source of Truth für alle Service-Konstruktoren
 */
export class ServiceRegistry implements IServiceRegistry {
  static readonly API_NAME = "serviceRegistry";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "ServiceRegistry"; // ✅ Klassename für Dependency Resolution

  private static instance: ServiceRegistry;
  private readonly serviceRegistry = new Map<any, any>();

  private constructor() {}

  static getInstance(): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  /**
   * EINZIGER Eingangspunkt für Services
   * Registriert alle Services aus einer Service-Quelle
   */
  registerAllServices(serviceSource: any[]): void {
    console.log(`[ServiceRegistry] 📚 Registering ${serviceSource.length} services from source`);
    
    for (const serviceConfig of serviceSource) {
      const serviceName = serviceConfig.name;
      const serviceClass = serviceConfig.class;
      console.log(`[ServiceRegistry] 📝 Registering service: ${serviceName}`);
      this.registerService(serviceClass, serviceClass);
    }
    
    console.log(`[ServiceRegistry] ✅ All services registered. Total: ${this.serviceRegistry.size}`);
  }

  /**
   * Einzelnen Service registrieren
   */
  registerService(identifier: any, constructor: any): void {
    console.log(`[ServiceRegistry] 🔍 Debug - identifier:`, identifier);
    console.log(`[ServiceRegistry] 🔍 Debug - constructor:`, constructor);
    
    if (!identifier) {
      console.error(`[ServiceRegistry] ❌ Identifier is undefined!`);
      return;
    }
    
    const serviceName = identifier.CLASS_NAME || identifier.className || identifier.name || identifier;
    console.log(`[ServiceRegistry] 📝 Registering service: ${serviceName}`);
    this.serviceRegistry.set(identifier, constructor);
  }

  /**
   * Service-Konstruktor abrufen
   */
  getServiceConstructor(identifier: any): any {
    const constructor = this.serviceRegistry.get(identifier);
    console.log(`[ServiceRegistry] 🔍 Getting constructor for: ${identifier.name || identifier}`, {
      found: !!constructor,
      constructor: constructor?.name || constructor
    });
    return constructor;
  }

  /**
   * Alle registrierten Services abrufen
   * Wird von anderen Klassen verwendet (Single Source of Truth)
   */
  getAllServices(): any[] {
    const services = Array.from(this.serviceRegistry.keys());
    console.log(`[ServiceRegistry] 📋 Providing ${services.length} services to other classes`);
    return services;
  }

  /**
   * Prüfen ob Service registriert ist
   */
  hasService(identifier: any): boolean {
    return this.serviceRegistry.has(identifier);
  }

  /**
   * Anzahl registrierter Services
   */
  getServiceCount(): number {
    return this.serviceRegistry.size;
  }

  /**
   * Registry leeren (für Tests)
   */
  clear(): void {
    console.log(`[ServiceRegistry] 🗑️ Clearing registry (${this.serviceRegistry.size} services)`);
    this.serviceRegistry.clear();
  }
}
