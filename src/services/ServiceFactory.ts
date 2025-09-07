import type { IServiceFactory, ServiceConstructor } from "./IServiceFactory";
import { SERVICE_IDENTIFIERS } from "./IServiceFactory";
import { ServiceManager } from "./ServiceManager";

// Re-export SERVICE_IDENTIFIERS for convenience
export { SERVICE_IDENTIFIERS };
import { RelationshipGraphService } from "./RelationshipGraphService";
import { RelationshipGraphPersistenceService } from "./RelationshipGraphPersistenceService";
import { RelationshipGraphDemoDataService } from "./RelationshipGraphDemoDataService";
import { NotificationService } from "./NotificationService";
import { FoundryLogger } from "../core/services/FoundryLogger";
import { ConsoleErrorHandler } from "../core/services/ConsoleErrorHandler";
import { ModuleInitializer } from "../core/services/ModuleInitializer";
import { RegistrationService } from "./RegistrationService";
import { FoundryAdapter } from "../core/adapters/FoundryAdapter";

export class ServiceFactory implements IServiceFactory {
  private static instance: ServiceFactory;
  private readonly serviceRegistry = new Map<string, ServiceConstructor>();
  private crossCuttingServices: Map<string, any> = new Map();

  private constructor() {
    this.initializeCrossCuttingServices();
    this.registerDefaultServices();
  }

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  registerService<T>(identifier: string, constructor: ServiceConstructor<T>): void {
    this.serviceRegistry.set(identifier, constructor);
  }

  createService<T>(identifier: string, ...args: any[]): T {
    const ServiceConstructor = this.serviceRegistry.get(identifier);
    if (!ServiceConstructor) {
      throw new Error(
        `Service '${identifier}' is not registered. Available services: ${this.getRegisteredServices().join(", ")}`
      );
    }
    return new ServiceConstructor(...args) as T;
  }

  hasService(identifier: string): boolean {
    return this.serviceRegistry.has(identifier);
  }

  getRegisteredServices(): string[] {
    return Array.from(this.serviceRegistry.keys());
  }

  // Cross-Cutting Services sofort erstellen
  private initializeCrossCuttingServices(): void {
    // FoundryAdapter zuerst erstellen (keine Dependencies)
    const foundryAdapter = new FoundryAdapter();
    this.crossCuttingServices.set(SERVICE_IDENTIFIERS.FOUNDRY_ADAPTER, foundryAdapter);
    
    // Logger mit FoundryAdapter erstellen
    const logger = new FoundryLogger(foundryAdapter);
    this.crossCuttingServices.set(SERVICE_IDENTIFIERS.FOUNDRY_LOGGER, logger);
    
    // ErrorHandler mit Logger und FoundryAdapter erstellen
    const errorHandler = new ConsoleErrorHandler(logger, foundryAdapter);
    this.crossCuttingServices.set(SERVICE_IDENTIFIERS.CONSOLE_ERROR_HANDLER, errorHandler);
  }

  // Cross-Cutting Services sofort verfügbar
  getCrossCuttingService<T>(identifier: string): T {
    const service = this.crossCuttingServices.get(identifier);
    if (!service) {
      throw new Error(`Cross-cutting service '${identifier}' not initialized`);
    }
    return service as T;
  }

  // Register all services in ServiceManager
  registerAllServicesInServiceManager(serviceManager: ServiceManager): void {
    // Alle Services automatisch im ServiceManager registrieren
    for (const [identifier, ServiceConstructor] of this.serviceRegistry) {
      // Dependencies automatisch bestimmen
      const dependencies = this.getServiceDependencies(identifier);
      
      serviceManager.registerWithMetadata(identifier, ServiceConstructor, dependencies);
    }
  }

  // Service Dependencies automatisch bestimmen
  private getServiceDependencies(identifier: string): string[] {
    const dependencyMap: Record<string, string[]> = {
      [SERVICE_IDENTIFIERS.CONSOLE_ERROR_HANDLER]: [SERVICE_IDENTIFIERS.FOUNDRY_LOGGER, SERVICE_IDENTIFIERS.FOUNDRY_ADAPTER],
      [SERVICE_IDENTIFIERS.REGISTRATION_SERVICE]: [SERVICE_IDENTIFIERS.FOUNDRY_LOGGER, SERVICE_IDENTIFIERS.CONSOLE_ERROR_HANDLER],
      [SERVICE_IDENTIFIERS.MODULE_INITIALIZER]: [SERVICE_IDENTIFIERS.FOUNDRY_LOGGER, SERVICE_IDENTIFIERS.CONSOLE_ERROR_HANDLER, SERVICE_IDENTIFIERS.REGISTRATION_SERVICE],
      [SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH]: [SERVICE_IDENTIFIERS.FOUNDRY_LOGGER, SERVICE_IDENTIFIERS.CONSOLE_ERROR_HANDLER, SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_PERSISTENCE, SERVICE_IDENTIFIERS.FOUNDRY_ADAPTER],
      [SERVICE_IDENTIFIERS.NOTIFICATION]: [SERVICE_IDENTIFIERS.FOUNDRY_LOGGER, SERVICE_IDENTIFIERS.CONSOLE_ERROR_HANDLER, SERVICE_IDENTIFIERS.FOUNDRY_ADAPTER],
      [SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_DEMO_DATA]: [SERVICE_IDENTIFIERS.FOUNDRY_ADAPTER],
      [SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_PERSISTENCE]: [SERVICE_IDENTIFIERS.FOUNDRY_ADAPTER],
      // Neue Services automatisch ohne Dependencies
    };
    
    return dependencyMap[identifier] || [];
  }

  // Alle Services in API registrieren
  registerAllServicesInAPI(): void {
    const serviceManager = ServiceManager.getInstance();
    
    // Cross-Cutting Concerns direkt aus ServiceFactory holen
    const logger = this.getCrossCuttingService(SERVICE_IDENTIFIERS.FOUNDRY_LOGGER);
    const errorHandler = this.getCrossCuttingService(SERVICE_IDENTIFIERS.CONSOLE_ERROR_HANDLER);
    
    if (!(globalThis as any).game?.modules?.get("relationship-app")?.api) {
      (globalThis as any).game.modules.get("relationship-app").api = {};
    }

    const moduleApi = (globalThis as any).game.modules.get("relationship-app").api;

    // Cross-Cutting Concerns
    moduleApi.logger = logger;
    moduleApi.errorHandler = errorHandler;

    // ALLE Services generisch registrieren
    for (const [identifier, ServiceConstructor] of this.serviceRegistry) {
      // Skip Cross-Cutting Services (bereits registriert)
      if (identifier === SERVICE_IDENTIFIERS.FOUNDRY_LOGGER || 
          identifier === SERVICE_IDENTIFIERS.CONSOLE_ERROR_HANDLER) {
        continue;
      }

      // Generische API-Registrierung
      this.registerServiceGenerically(identifier, ServiceConstructor, moduleApi, serviceManager);
    }

    // ServiceManager für erweiterte Nutzung
    moduleApi.serviceManager = serviceManager;

    (logger as any).info(`✅ Relationship App: ${this.serviceRegistry.size} services registered in API`);
  }

  // Generische Service-Registrierung
  private registerServiceGenerically(identifier: string, ServiceConstructor: ServiceConstructor, moduleApi: any, serviceManager: ServiceManager): void {
    // Metadaten aus der Klasse lesen
    const apiName = (ServiceConstructor as any).API_NAME;
    const serviceType = (ServiceConstructor as any).SERVICE_TYPE;
    
    if (!apiName || !serviceType) {
      throw new Error(`Service ${identifier} missing API_NAME or SERVICE_TYPE metadata`);
    }
    
    this.registerServiceWithConfig(apiName, serviceType, identifier, moduleApi, serviceManager);
  }

  private registerServiceWithConfig(apiName: string, type: 'singleton' | 'factory', identifier: string, moduleApi: any, serviceManager: ServiceManager): void {
    if (type === 'singleton') {
      // Für API: resolve() verwenden (mit Dependency Injection)
      moduleApi[apiName] = serviceManager.resolve(identifier);
    } else if (type === 'factory') {
      moduleApi[apiName] = (...args: any[]) => {
        // Für Factory: getService() mit zusätzlichen Args verwenden
        return serviceManager.getService(identifier, undefined, ...args);
      };
    }
  }

  // Register default services
  private registerDefaultServices(): void {
    // Cross-Cutting Concerns
    this.registerService(SERVICE_IDENTIFIERS.FOUNDRY_LOGGER, FoundryLogger);
    this.registerService(SERVICE_IDENTIFIERS.CONSOLE_ERROR_HANDLER, ConsoleErrorHandler);
    this.registerService(SERVICE_IDENTIFIERS.FOUNDRY_ADAPTER, FoundryAdapter);
    
    // Core Services
    this.registerService(SERVICE_IDENTIFIERS.REGISTRATION_SERVICE, RegistrationService);
    this.registerService(SERVICE_IDENTIFIERS.MODULE_INITIALIZER, ModuleInitializer);
    
    // Business Services
    this.registerService(SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH, RelationshipGraphService);
    this.registerService(
      SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_PERSISTENCE,
      RelationshipGraphPersistenceService
    );
    this.registerService(
      SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_DEMO_DATA,
      RelationshipGraphDemoDataService
    );
    this.registerService(SERVICE_IDENTIFIERS.NOTIFICATION, NotificationService);
  }
}
