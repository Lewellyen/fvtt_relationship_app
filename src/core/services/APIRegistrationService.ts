import type { IAPIRegistrationService, IServiceManager, IServiceFactory, IServiceRegistrationManager } from "../../interfaces";
import { ServiceRegistrationManager } from "./ServiceRegistrationManager";
import { ServiceManager } from "../../services/ServiceManager";
// SERVICE_IDENTIFIERS wird nicht direkt verwendet, da ServiceRegistrationManager die Services verwaltet

/**
 * APIRegistrationService - Verantwortlich für API Registration
 * Single Responsibility: Nur Service Registration in Foundry Module API
 */
export class APIRegistrationService implements IAPIRegistrationService {
  // ✅ Metadaten für Service Registration
  static readonly API_NAME = "apiRegistrationService";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "APIRegistrationService";

  private readonly registrationManager: IServiceRegistrationManager;

  constructor(serviceManager?: IServiceManager, serviceFactory?: IServiceFactory) {
    this.serviceManager = serviceManager;
    this.serviceFactory = serviceFactory;
    this.registrationManager = new ServiceRegistrationManager();
  }

  private readonly serviceManager?: IServiceManager;
  private readonly serviceFactory?: IServiceFactory;

  /**
   * Registriert alle Services in der Module API
   */
  registerAllServicesInAPI(): void {
    const logger = (globalThis as any).relationshipApp?.logger;
    if (logger) {
      logger.info("[APIRegistrationService] Registering all services in API");
    } else {
      console.log("[APIRegistrationService] Registering all services in API");
    }

    if (!(globalThis as any).game?.modules?.get("relationship-app")?.api) {
      (globalThis as any).game.modules.get("relationship-app").api = {};
    }

    const moduleApi = (globalThis as any).game.modules.get("relationship-app").api;

    // ServiceManager zur Laufzeit holen
    const serviceManager = this.serviceManager || ServiceManager.getInstance();

    // ServiceManager für erweiterte Nutzung
    moduleApi.serviceManager = serviceManager;

    // ✅ Delegation an ServiceRegistrationManager mit Strategy Pattern
    this.registrationManager.registerAllServices(moduleApi, serviceManager);

    if (logger) {
      logger.info("[APIRegistrationService] All services registered with strategies");
    } else {
      console.log("[APIRegistrationService] All services registered with strategies");
    }
  }

  /**
   * Registriert einen einzelnen Service in der API
   */
  registerServiceInAPI(identifier: string, serviceConstructor: any, moduleApi: any): void {
    // Generische API-Registrierung
    this.registerServiceGenerically(identifier, serviceConstructor, moduleApi);
  }

  /**
   * Generische Service-Registrierung
   */
  private registerServiceGenerically(
    identifier: string,
    serviceConstructor: any,
    moduleApi: any
  ): void {
    // Metadaten aus der Klasse lesen
    const apiName = (serviceConstructor as any)?.API_NAME || identifier;
    const serviceType = (serviceConstructor as any)?.SERVICE_TYPE || "singleton";

    this.registerServiceWithConfig(apiName, serviceType, identifier, moduleApi);
  }

  /**
   * Service mit Konfiguration registrieren
   */
  private registerServiceWithConfig(
    apiName: string,
    type: "singleton" | "factory",
    identifier: string,
    moduleApi: any
  ): void {
    const serviceManager = this.serviceManager || ServiceManager.getInstance();

    if (type === "singleton") {
      // Für API: resolve() verwenden (mit Dependency Injection)
      moduleApi[apiName] = serviceManager.resolve(identifier);
    } else if (type === "factory") {
      moduleApi[apiName] = (...args: any[]) => {
        // Für Factory: getService() mit zusätzlichen Args verwenden
        return serviceManager.getService(identifier, undefined, ...args);
      };
    }
  }
}
