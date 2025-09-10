import type { IServiceRegistrationManager, IServiceRegistrationStrategy } from "../../interfaces";
import { SingletonServiceStrategy } from "./SingletonServiceStrategy";
import { FactoryServiceStrategy } from "./FactoryServiceStrategy";
import { TransientServiceStrategy } from "./TransientServiceStrategy";
// SERVICE_IDENTIFIERS nicht mehr nötig - Metadaten werden aus Service-Klassen gelesen

/**
 * ServiceRegistrationManager - Verantwortlich für Service Registration Strategy Management
 * Single Responsibility: Nur Service Registration Strategy Management
 */
export class ServiceRegistrationManager implements IServiceRegistrationManager {
  // ✅ Metadaten für Service Registration
  static readonly API_NAME = "serviceRegistrationManager";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "ServiceRegistrationManager"; // ✅ Klassename für Dependency Resolution

  private strategies = new Map<string, IServiceRegistrationStrategy>();

  constructor() {
    // Standard Strategies registrieren
    this.addStrategy("singleton", new SingletonServiceStrategy());
    this.addStrategy("factory", new FactoryServiceStrategy());
    this.addStrategy("transient", new TransientServiceStrategy());
  }

  /**
   * Registriert alle Services mit entsprechenden Strategies
   * Metadaten werden automatisch aus Service-Klassen gelesen
   */
  registerAllServices(moduleApi: any, serviceManager: any): void {
    const logger = (globalThis as any).relationshipApp?.logger;
    if (logger) {
      logger.info("[ServiceRegistrationManager] Registering all services with strategies");
    } else {
      console.log("[ServiceRegistrationManager] Registering all services with strategies");
    }

    // ✅ Services aus ServiceManager holen (statt hardcoded Map)
    const serviceFactory = (globalThis as any).game?.modules?.get("relationship-app")?.api
      ?.serviceFactory;
    if (!serviceFactory) {
      throw new Error("ServiceFactory not available");
    }

    // Alle registrierten Services durchgehen
    const registeredServices = serviceFactory.getRegisteredServices();
    for (const identifier of registeredServices) {
      // Service Type aus Service-Klasse lesen
      const serviceType = this.getServiceType(identifier, serviceFactory);

      // Service registrieren
      this.registerService(identifier, serviceType, moduleApi, serviceManager);
    }
  }

  /**
   * Registriert einen einzelnen Service mit Strategy
   */
  registerService(
    identifier: string,
    serviceType: string,
    moduleApi: any,
    serviceManager: any
  ): void {
    const strategy = this.strategies.get(serviceType);
    if (!strategy) {
      const logger = (globalThis as any).relationshipApp?.logger;
      if (logger) {
        logger.warn(
          `[ServiceRegistrationManager] No strategy found for service type: ${serviceType}`
        );
      } else {
        console.warn(
          `[ServiceRegistrationManager] No strategy found for service type: ${serviceType}`
        );
      }
      return;
    }

    // API Name aus Service Constructor lesen oder Identifier verwenden
    const apiName = this.getApiName(identifier);
    strategy.register(apiName, identifier, moduleApi, serviceManager);
  }

  /**
   * Fügt eine neue Strategy hinzu
   */
  addStrategy(serviceType: string, strategy: IServiceRegistrationStrategy): void {
    this.strategies.set(serviceType, strategy);
  }

  /**
   * Holt den API Name für einen Service aus der Service-Klasse
   */
  private getApiName(identifier: string): string {
    // ✅ API Name aus Service-Klasse lesen
    const serviceFactory = (globalThis as any).game?.modules?.get("relationship-app")?.api
      ?.serviceFactory;
    if (!serviceFactory) {
      return identifier; // Fallback
    }

    const ServiceConstructor = this.getServiceConstructor(identifier, serviceFactory);
    return ServiceConstructor?.API_NAME || identifier;
  }

  /**
   * Holt den Service Type für einen Service aus der Service-Klasse
   */
  private getServiceType(identifier: string, serviceFactory: any): string {
    const ServiceConstructor = this.getServiceConstructor(identifier, serviceFactory);
    return ServiceConstructor?.SERVICE_TYPE || "singleton";
  }

  /**
   * Holt den Service Constructor für einen Identifier
   */
  private getServiceConstructor(identifier: string, serviceFactory: any): any {
    // Service Constructor aus ServiceFactory holen
    return (serviceFactory as any).serviceRegistry?.get(identifier);
  }
}
