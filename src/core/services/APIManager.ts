import type { IAPIManager, IServiceContainer, ILogger } from "../../interfaces";

/**
 * APIManager - Services in globaler API verfügbar machen
 * 
 * Boot-Service: Wird nur während des Boot-Prozesses verwendet
 * Lazy Service-Exposition mit Getter-Memoization
 * Side-effect-freier Konstruktor
 */
export class APIManager implements IAPIManager {
  private readonly registeredServices = new Map<string, any>();

  constructor(
    private logger: ILogger,
    private serviceContainer: IServiceContainer
  ) {
    // Side-effect-freier Konstruktor
  }

  /**
   * Services in globaler API registrieren
   */
  registerInGlobalAPI(): void {
    this.logger.info(`[APIManager] 🌐 Registering services in global API (lazy)`);
    
    const moduleApi = this.getModuleAPI();
    if (!moduleApi) {
      this.logger.error(`[APIManager] ❌ Module API not available`);
      return;
    }
    
    const servicePlans = this.serviceContainer.getAllServicePlans();
    this.logger.info(`[APIManager] 📋 Registering ${servicePlans.size} services in API (lazy)`);
    
    for (const [serviceClass, plan] of servicePlans) {
      this.registerServiceInAPI(serviceClass, plan, moduleApi);
    }
    
    this.logger.info(`[APIManager] ✅ All services registered in global API (lazy)`);
    this.logger.info(`[APIManager] 📊 Final registered services count: ${this.registeredServices.size}`);
  }


  /**
   * Service in API registrieren - LAZY mit Getter-Memoization
   */
  private registerServiceInAPI(serviceClass: any, plan: any, moduleApi: any): void {
    const apiName = plan.apiName || serviceClass.API_NAME || serviceClass.name;
    const serviceType = plan.serviceType || serviceClass.SERVICE_TYPE;
    
    this.logger.info(`[APIManager] 🌐 Registering service in API:`, {
      service: serviceClass.name || serviceClass,
      apiName,
      serviceType
    });
    
    if (!apiName) {
      this.logger.warn(`[APIManager] ⚠️ Service has no API name: ${serviceClass.name || serviceClass}`);
      return;
    }

    try {
      // Lazy Getter mit Memoization für alle Service-Typen
      Object.defineProperty(moduleApi, apiName, {
        configurable: true,
        enumerable: true,
        get: () => {
          // Service erst beim ersten Zugriff erstellen
          const instance = this.serviceContainer.getService(serviceClass);
          // Memoization: Getter durch Wert ersetzen
          Object.defineProperty(moduleApi, apiName, { 
            value: instance, 
            enumerable: true, 
            configurable: false 
          });
          return instance;
        }
      });

      // Factory für Services mit create-Methode
      if (typeof serviceClass.prototype.create === 'function') {
        moduleApi[apiName] = (...args: unknown[]) => {
          const service: any = this.serviceContainer.getService(serviceClass);
          return service.create(...args);
        };
      }

      this.registeredServices.set(apiName, serviceClass);
      this.logger.info(`[APIManager] ✅ Service registered in API (lazy): ${apiName}`);
    } catch (error) {
      this.logger.error(`[APIManager] ❌ Failed to register service ${apiName}:`, error);
    }
  }

  /**
   * Module API abrufen oder erstellen
   */
  private getModuleAPI(): any {
    let moduleApi = (globalThis as any).game?.modules?.get("relationship-app")?.api;
    
    if (!moduleApi) {
      this.logger.info( `[APIManager] 🔧 Module API not available, creating it`);
      
      const module = (globalThis as any).game?.modules?.get("relationship-app");
      if (module) {
        module.api = {};
        moduleApi = module.api;
        this.logger.info( `[APIManager] ✅ Module API created`);
      } else {
        this.logger.error( `[APIManager] ❌ Module 'relationship-app' not found`);
        return null;
      }
    }
    
    return moduleApi;
  }

  /**
   * Service aus API entfernen
   */
  unregisterFromAPI(apiName: string): void {
    this.logger.info( `[APIManager] 🗑️ Unregistering service from API: ${apiName}`);
    
    const moduleApi = this.getModuleAPI();
    if (moduleApi && moduleApi[apiName]) {
      delete moduleApi[apiName];
      this.registeredServices.delete(apiName);
      this.logger.info( `[APIManager] ✅ Service unregistered from API: ${apiName}`);
    } else {
      this.logger.info( `[APIManager] ℹ️ Service not found in API: ${apiName}`);
    }
  }

  /**
   * Alle Services aus API entfernen
   */
  unregisterAllFromAPI(): void {
    this.logger.info( `[APIManager] 🗑️ Unregistering all services from API (${this.registeredServices.size} registered)`);
    
    const moduleApi = this.getModuleAPI();
    if (moduleApi) {
      for (const apiName of this.registeredServices.keys()) {
        delete moduleApi[apiName];
      }
    }
    
    this.registeredServices.clear();
    this.logger.info( `[APIManager] ✅ All services unregistered from API`);
  }

  /**
   * API Metadaten generieren
   */
  generateAPIMetadata(): APIMetadata {
    this.logger.info( `[APIManager] 📊 Generating API metadata`);
    
    const metadata: APIMetadata = {
      moduleId: "relationship-app",
      version: "0.14.0",
      services: new Map(),
      totalServices: this.registeredServices.size
    };
    
    const servicePlans = this.serviceContainer.getAllServicePlans();
    
    for (const [serviceClass, plan] of servicePlans) {
      metadata.services.set(plan.apiName, {
        serviceClass: serviceClass.name || serviceClass,
        apiName: plan.apiName,
        serviceType: plan.serviceType,
        isSingleton: plan.isSingleton,
        dependencies: plan.dependencies.map(d => d.name || d),
        isRegistered: this.registeredServices.has(plan.apiName)
      });
    }
    
    this.logger.info( `[APIManager] 📊 API metadata generated:`, {
      totalServices: metadata.totalServices,
      services: Array.from(metadata.services.keys())
    });
    
    return metadata;
  }

  /**
   * API Status abrufen
   */
  getAPIStatus(): APIStatus {
    const moduleApi = this.getModuleAPI();
    
    return {
      isAvailable: !!moduleApi,
      registeredServices: this.registeredServices.size,
      serviceNames: Array.from(this.registeredServices.keys()),
      moduleId: "relationship-app"
    };
  }

  /**
   * Service aus API abrufen
   */
  getServiceFromAPI(apiName: string): any {
    const moduleApi = this.getModuleAPI();
    if (!moduleApi) {
      return null;
    }
    
    return moduleApi[apiName];
  }

  /**
   * Alle Services aus API abrufen
   */
  getAllServicesFromAPI(): Map<string, any> {
    const moduleApi = this.getModuleAPI();
    if (!moduleApi) {
      return new Map();
    }
    
    const services = new Map();
    for (const [apiName, service] of this.registeredServices) {
      services.set(apiName, service);
    }
    
    return services;
  }

}

/**
 * API Metadata Interface
 */
export interface APIMetadata {
  moduleId: string;
  version: string;
  services: Map<string, ServiceMetadata>;
  totalServices: number;
}

/**
 * Service Metadata Interface
 */
export interface ServiceMetadata {
  serviceClass: string;
  apiName: string;
  serviceType: string;
  isSingleton: boolean;
  dependencies: string[];
  isRegistered: boolean;
}

/**
 * API Status Interface
 */
export interface APIStatus {
  isAvailable: boolean;
  registeredServices: number;
  serviceNames: string[];
  moduleId: string;
}
