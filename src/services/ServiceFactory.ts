import type { IServiceFactory, ServiceConstructor } from "../interfaces/index";
import { ServiceManager } from "../services/ServiceManager";
// import type { ServiceConstructorWithDependencies } from "../decorators/index";

// ✅ Factory-Klassen werden über SERVICE_CONFIG in index.ts definiert

// Alle Factories entfernt - ServiceFactory macht alles selbst
// CSSManagerFactory entfernt - ServiceFactory löst Dependencies über getServiceDependencies auf
// ✅ Alle Services über Service Index importieren
import { SERVICE_CONFIG } from "../services/index";
import type { IAPIRegistrationService, ICrossCuttingServiceManager } from "../interfaces";

// ✅ Imports für hardcoded Dependencies
import { FoundryLogger } from "../core/services/FoundryLogger";
import { ConsoleErrorHandler } from "../core/services/ConsoleErrorHandler";
import { NotificationService } from "./NotificationService";
import { CSSManager } from "../core/services/CSSManager";
import { SvelteManager } from "../core/services/SvelteManager";
import { RelationshipGraphService } from "./RelationshipGraphService";
import { RelationshipGraphPersistenceService } from "./RelationshipGraphPersistenceService";
import { RelationshipGraphDemoDataService } from "./RelationshipGraphDemoDataService";
import { RelationshipGraphAnalysisService } from "../core/services/RelationshipGraphAnalysisService";
import { RelationshipGraphCRUDService } from "../core/services/RelationshipGraphCRUDService";
import { RelationshipGraphDemoService } from "../core/services/RelationshipGraphDemoService";
import { RegistrationService } from "./RegistrationService";
import { ModuleInitializer } from "../core/services/ModuleInitializer";
import { ServiceLocator } from "../core/services/ServiceLocator";
import { APIRegistrationService } from "../core/services/APIRegistrationService";
import { CrossCuttingServiceManager } from "../core/services/CrossCuttingServiceManager";
import { ServiceRegistrationManager } from "../core/services/ServiceRegistrationManager";
import { RelationshipGraphDataManager } from "../core/services/RelationshipGraphDataManager";
import { FoundryAdapter } from "../core/adapters/FoundryAdapter";

export class ServiceFactory implements IServiceFactory {
  // ✅ Metadaten für API-Registrierung
  static readonly API_NAME = "serviceFactory";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "ServiceFactory";

  private static instance: ServiceFactory;
  private readonly serviceRegistry = new Map<any, ServiceConstructor>();

  // ✅ Dependency Injection - Abhängigkeiten von Interfaces
  private readonly apiRegistrationService: IAPIRegistrationService;
  private readonly crossCuttingServiceManager: ICrossCuttingServiceManager;

  private constructor() {
    // ✅ Services werden direkt erstellt (circular dependency vermeiden)
    // Diese Services werden über SERVICE_CONFIG registriert
    this.crossCuttingServiceManager = {} as ICrossCuttingServiceManager;
    this.apiRegistrationService = {} as IAPIRegistrationService;

    // Cross-Cutting Services sind bereits global verfügbar, nicht neu erstellen
    this.registerDefaultServices();
  }

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  registerService(identifier: any, constructor: any): void {
    // ✅ Nur ServiceRegistry Map verwenden (für ServiceManager)
    this.serviceRegistry.set(identifier, constructor);
  }

  createService<T>(identifier: any): T {
    // ✅ Service über ServiceManager erstellen (mit DI)
    const serviceManager = ServiceManager.getInstance();
    return serviceManager.resolve<T>(identifier);
  }

  hasService(identifier: any): boolean {
    return this.serviceRegistry.has(identifier);
  }

  getRegisteredServices(): any[] {
    return Array.from(this.serviceRegistry.keys());
  }

  // ✅ Delegation an CrossCuttingServiceManager
  private initializeCrossCuttingServices(): void {
    this.crossCuttingServiceManager.initializeCrossCuttingServices();
  }

  // ✅ Delegation an CrossCuttingServiceManager
  getCrossCuttingService<T>(identifier: string): T {
    return this.crossCuttingServiceManager.getCrossCuttingService<T>(identifier);
  }

  // Register all services in ServiceManager
  registerAllServicesInServiceManager(serviceManager: ServiceManager): void {
    console.log(`[ServiceFactory] 🚀 Starting registration of ${this.serviceRegistry.size} services in ServiceManager`);
    
    // Alle Services automatisch im ServiceManager registrieren
    for (const [identifier, ServiceConstructor] of this.serviceRegistry) {
      console.log(`[ServiceFactory] 🔧 Processing service: ${identifier.name || identifier}`);
      console.log(`[ServiceFactory] 🏗️ ServiceConstructor:`, ServiceConstructor);
      
      // Dependencies automatisch bestimmen
      const dependencies = this.getServiceDependencies(identifier);
      
      console.log(`[ServiceFactory] 🔗 Dependencies for ${identifier.name || identifier}:`, {
        count: dependencies.length,
        dependencies: dependencies.map((d) => ({
          name: d.name || d,
          type: typeof d,
          isClass: typeof d === 'function',
          constructor: d
        }))
      });

      // ServiceManager Registration mit detailliertem Log
      console.log(`[ServiceFactory] 📝 Registering in ServiceManager:`, {
        identifier: identifier.name || identifier,
        ServiceConstructor: ServiceConstructor.name || ServiceConstructor,
        dependencies: dependencies.map(d => d.name || d)
      });
      
      serviceManager.registerWithMetadata(identifier, ServiceConstructor, dependencies);
      
      console.log(`[ServiceFactory] ✅ Successfully registered ${identifier.name || identifier}`);
      console.log(`[ServiceFactory] ─────────────────────────────────────────`);
    }
    
    console.log(`[ServiceFactory] 🎉 Completed registration of all services in ServiceManager`);
  }

  // Service Dependencies automatisch bestimmen
  private getServiceDependencies(identifier: any): any[] {
    console.log(`[ServiceFactory] 🔍 Resolving dependencies for: ${identifier.name || identifier}`);
    
    // ✅ Hardcoded Dependencies für Services die @Inject verwenden
    const hardcodedDependencies = this.getHardcodedDependencies(identifier);
    console.log(`[ServiceFactory] 🔧 Hardcoded dependencies found:`, {
      count: hardcodedDependencies.length,
      dependencies: hardcodedDependencies.map(d => d.name || d)
    });
    
    if (hardcodedDependencies.length > 0) {
      console.log(`[ServiceFactory] ✅ Using hardcoded dependencies for ${identifier.name || identifier}`);
      return hardcodedDependencies;
    }

    // Fallback: Decorator-Dependencies (funktioniert nur zur Laufzeit)
    const decoratorDependencies = this.getDecoratorDependencies(identifier);
    console.log(`[ServiceFactory] 🎭 Decorator dependencies found:`, {
      count: decoratorDependencies.length,
      dependencies: decoratorDependencies.map(d => d.name || d)
    });
    
    console.log(`[ServiceFactory] ✅ Using decorator dependencies for ${identifier.name || identifier}`);
    return decoratorDependencies;
  }

  // Hardcoded Dependencies für Services mit @Inject
  private getHardcodedDependencies(identifier: any): any[] {
    console.log(`[ServiceFactory] 🔧 Checking hardcoded dependencies for: ${identifier.name || identifier}`);
    
    const dependencyMap = new Map<any, any[]>([
      // Core Services
      [FoundryLogger, [FoundryAdapter]],
      [ConsoleErrorHandler, [FoundryLogger, FoundryAdapter]],
      [NotificationService, [FoundryAdapter, FoundryLogger]],

      // CSS & UI Services
      [CSSManager, [FoundryLogger]],
      [SvelteManager, [FoundryLogger]],

      // Business Services
      [
        RelationshipGraphService,
        [RelationshipGraphPersistenceService, RelationshipGraphDemoDataService, FoundryLogger],
      ],
      [RelationshipGraphPersistenceService, [FoundryAdapter]],
      [RelationshipGraphDemoDataService, [FoundryAdapter]],

      // Analysis Services
      [RelationshipGraphAnalysisService, [RelationshipGraphDataManager]],
      [
        RelationshipGraphCRUDService,
        [RelationshipGraphDataManager, RelationshipGraphPersistenceService, FoundryAdapter],
      ],
      [
        RelationshipGraphDemoService,
        [RelationshipGraphDataManager, RelationshipGraphPersistenceService],
      ],

      // Registration Services
      [RegistrationService, [FoundryLogger, ConsoleErrorHandler]],
      [ModuleInitializer, [FoundryLogger, ConsoleErrorHandler, RegistrationService]],

      // Service Management
      [ServiceLocator, [ServiceManager]],
      [APIRegistrationService, [ServiceManager, ServiceFactory, ServiceRegistrationManager]],
      [
        CrossCuttingServiceManager,
        [FoundryAdapter, FoundryLogger, ConsoleErrorHandler, NotificationService],
      ],
      [ServiceRegistrationManager, []],
    ]);

    const dependencies = dependencyMap.get(identifier) || [];
    console.log(`[ServiceFactory] 🔧 Hardcoded dependency lookup result:`, {
      identifier: identifier.name || identifier,
      found: dependencies.length > 0,
      dependencies: dependencies.map(d => d.name || d)
    });
    
    return dependencies;
  }

  // Decorator-Dependencies aus Service-Klasse lesen
  private getDecoratorDependencies(identifier: any): any[] {
    console.log(`[ServiceFactory] 🎭 Checking decorator dependencies for: ${identifier.name || identifier}`);
    
    const ServiceConstructor = this.getServiceConstructor(
      identifier
    ) as ServiceConstructorWithDependencies;
    
    console.log(`[ServiceFactory] 🎭 ServiceConstructor analysis:`, {
      identifier: identifier.name || identifier,
      hasConstructor: !!ServiceConstructor,
      hasDependencies: !!(ServiceConstructor && ServiceConstructor.__dependencies),
      dependencies: ServiceConstructor?.__dependencies,
      dependenciesCount: ServiceConstructor?.__dependencies?.length || 0
    });

    if (ServiceConstructor && ServiceConstructor.__dependencies) {
      // Leere Einträge entfernen (für Parameter ohne Decorator)
      const filteredDependencies = ServiceConstructor.__dependencies.filter(Boolean);
      console.log(`[ServiceFactory] 🎭 Filtered decorator dependencies:`, {
        original: ServiceConstructor.__dependencies,
        filtered: filteredDependencies,
        count: filteredDependencies.length
      });
      return filteredDependencies;
    }
    
    console.log(`[ServiceFactory] 🎭 No decorator dependencies found for ${identifier.name || identifier}`);
    return [];
  }

  // Service Constructor für Identifier holen
  private getServiceConstructor(identifier: any): any {
    const constructor = this.serviceRegistry.get(identifier);
    console.log(`[ServiceFactory] 🔍 ServiceConstructor lookup:`, {
      identifier: identifier.name || identifier,
      found: !!constructor,
      constructor: constructor?.name || constructor
    });
    return constructor;
  }

  // ✅ getHardcodedDependencies entfernt - nur noch @Inject Decorators

  // ✅ Services in global API registrieren
  registerAllServicesInAPI(): void {
    console.log(`[ServiceFactory] 🌐 Starting API registration of ${this.serviceRegistry.size} services`);
    
    // ServiceManager holen
    const serviceManager = ServiceManager.getInstance();

    // Module API holen
    const moduleApi = (globalThis as any).game?.modules?.get("relationship-app")?.api;
    if (!moduleApi) {
      console.warn("[ServiceFactory] ⚠️ Module API not available yet - trying to create it");

      // Versuche die API manuell zu erstellen
      const module = (globalThis as any).game?.modules?.get("relationship-app");
      if (module) {
        console.log("[ServiceFactory] 🔧 Module found, creating API object");
        module.api = {};
        const newModuleApi = module.api;

        // Alle Services in API registrieren
        for (const [identifier, ServiceConstructor] of this.serviceRegistry) {
          this.registerServiceInAPI(identifier, ServiceConstructor, newModuleApi, serviceManager);
        }
        console.log("[ServiceFactory] ✅ Services registered in manually created API");
        return;
      } else {
        console.error("[ServiceFactory] ❌ Module 'relationship-app' not found!");
        return;
      }
    }

    console.log("[ServiceFactory] 🌐 Module API found, registering services");
    // Alle Services in API registrieren
    for (const [identifier, ServiceConstructor] of this.serviceRegistry) {
      this.registerServiceInAPI(identifier, ServiceConstructor, moduleApi, serviceManager);
    }
    console.log("[ServiceFactory] ✅ All services registered in API");
  }

  // Service in API registrieren
  private registerServiceInAPI(
    identifier: any,
    ServiceConstructor: any,
    moduleApi: any,
    serviceManager: ServiceManager
  ): void {
    const apiName = ServiceConstructor.API_NAME;
    const serviceType = ServiceConstructor.SERVICE_TYPE;

    console.log(`[ServiceFactory] 🌐 Registering service in API:`, {
      identifier: identifier.name || identifier,
      apiName,
      serviceType,
      hasApiName: !!apiName,
      hasServiceType: !!serviceType
    });

    if (!apiName || !serviceType) {
      console.warn(
        `[ServiceFactory] ⚠️ Service ${identifier.name || identifier} missing API_NAME or SERVICE_TYPE metadata`
      );
      return;
    }

    if (serviceType === "singleton") {
      console.log(`[ServiceFactory] 🌐 Registering singleton service: ${apiName}`);
      // Für API: resolve() verwenden (mit Dependency Injection)
      const instance = serviceManager.resolve(identifier);
      moduleApi[apiName] = instance;
      console.log(`[ServiceFactory] ✅ Singleton service registered: ${apiName} -> ${instance.constructor.name}`);
    } else if (serviceType === "factory") {
      console.log(`[ServiceFactory] 🌐 Registering factory service: ${apiName}`);
      moduleApi[apiName] = () => {
        console.log(`[ServiceFactory] 🏭 Factory called for: ${apiName}`);
        // Für Factory: getService() verwenden
        const instance = serviceManager.getService(identifier, undefined);
        console.log(`[ServiceFactory] ✅ Factory service created: ${apiName} -> ${instance.constructor.name}`);
        return instance;
      };
      console.log(`[ServiceFactory] ✅ Factory service registered: ${apiName}`);
    }
  }

  // Generische Service-Registrierung
  private registerServiceGenerically(
    identifier: string,
    ServiceConstructor: ServiceConstructor,
    moduleApi: any,
    serviceManager: ServiceManager
  ): void {
    // Metadaten aus der Klasse lesen
    const apiName = (ServiceConstructor as any).API_NAME;
    const serviceType = (ServiceConstructor as any).SERVICE_TYPE;

    if (!apiName || !serviceType) {
      throw new Error(`Service ${identifier} missing API_NAME or SERVICE_TYPE metadata`);
    }

    this.registerServiceWithConfig(apiName, serviceType, identifier, moduleApi, serviceManager);
  }

  private registerServiceWithConfig(
    apiName: string,
    type: "singleton" | "factory",
    identifier: string,
    moduleApi: any,
    serviceManager: ServiceManager
  ): void {
    if (type === "singleton") {
      // Für API: resolve() verwenden (mit Dependency Injection)
      moduleApi[apiName] = serviceManager.resolve(identifier);
    } else if (type === "factory") {
      moduleApi[apiName] = () => {
        // Für Factory: getService() verwenden
        return serviceManager.getService(identifier, undefined);
      };
    }
  }

  // ✅ Register all services from Service Index
  private registerDefaultServices(): void {
    // ServiceManager und ServiceFactory manuell registrieren (zirkuläre Abhängigkeiten vermeiden)
    this.registerService(ServiceManager, ServiceManager);
    this.registerService(ServiceFactory, ServiceFactory);

    // Alle anderen Services automatisch aus SERVICE_CONFIG registrieren
    // Klassen werden direkt als Identifier verwendet
    for (const ServiceClass of SERVICE_CONFIG) {
      this.registerService(ServiceClass, ServiceClass);
    }
  }
}
