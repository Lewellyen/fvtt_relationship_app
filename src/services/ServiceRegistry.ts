import type { IServiceRegistry, ILogger } from "../interfaces/index";
import { FoundryLogger } from "../core/services/FoundryLogger";

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
  static readonly DEPENDENCIES = [FoundryLogger]; // ✅ Keine Dependencies erforderlich

  private static instance: ServiceRegistry;
  private readonly serviceRegistry = new Map<any, any>();

  constructor(private logger: ILogger) {}

  static getInstance(logger: ILogger): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry(logger);
    }
    return ServiceRegistry.instance;
  }

  /**
   * EINZIGER Eingangspunkt für Services
   * Registriert alle Services aus einer Service-Quelle
   */
  registerAllServices(serviceSource: any[]): void {
    this.writeLog(
      "info",
      `[ServiceRegistry] 📚 Registering ${serviceSource.length} services from source`
    );

    for (const serviceConfig of serviceSource) {
      const serviceName =
        serviceConfig.name.CLASS_NAME ||
        serviceConfig.name.className ||
        serviceConfig.name.name ||
        serviceConfig.name;
      const serviceClass = serviceConfig.class;
      this.writeLog("info", `[ServiceRegistry] 📝 Registering service: ${serviceName}`);
      this.registerService(serviceClass, serviceClass);
    }

    this.writeLog(
      "info",
      `[ServiceRegistry] ✅ All services registered. Total: ${this.serviceRegistry.size}`
    );
  }

  /**
   * Einzelnen Service registrieren
   */
  registerService(identifier: any, constructor: any): void {
    this.writeLog("debug", `[ServiceRegistry] 🔍 Debug - identifier:`, identifier);
    this.writeLog("debug", `[ServiceRegistry] 🔍 Debug - constructor:`, constructor);

    if (!identifier) {
      this.writeLog("error", `[ServiceRegistry] ❌ Identifier is undefined!`);
      return;
    }

    const serviceName =
      identifier.CLASS_NAME || identifier.className || identifier.name || identifier;
    this.writeLog("info", `[ServiceRegistry] 📝 Registering service: ${serviceName}`);
    this.serviceRegistry.set(identifier, constructor);
  }

  /**
   * Service-Konstruktor abrufen
   */
  getServiceConstructor(identifier: any): any {
    const constructor = this.serviceRegistry.get(identifier);
    this.writeLog(
      "debug",
      `[ServiceRegistry] 🔍 Getting constructor for: ${identifier.name || identifier}`,
      {
        found: !!constructor,
        constructor: constructor?.name || constructor,
      }
    );
    return constructor;
  }

  /**
   * Alle registrierten Services abrufen
   * Wird von anderen Klassen verwendet (Single Source of Truth)
   */
  getAllServices(): any[] {
    const services = Array.from(this.serviceRegistry.keys());
    this.writeLog(
      "info",
      `[ServiceRegistry] 📋 Providing ${services.length} services to other classes`
    );
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
    this.writeLog(
      "info",
      `[ServiceRegistry] 🗑️ Clearing registry (${this.serviceRegistry.size} services)`
    );
    this.serviceRegistry.clear();
  }

  private writeLog(modus: "info" | "warn" | "error" | "debug", message: string, ...args: any[]) {
    if (this.logger) {
      this.logger[modus](message, ...args);
    } else {
      console[modus](message, ...args);
    }
  }
}
