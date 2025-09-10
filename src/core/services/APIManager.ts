import type { IAPIManager, IServiceContainer } from "../../interfaces";
import { ServiceContainer } from "../../services/ServiceContainer";

/**
 * APIManager - Services in globaler API verfügbar machen
 * 
 * Verantwortlichkeit: Services in globaler API verfügbar machen
 * Single Responsibility: Nur API Registration
 */
export class APIManager implements IAPIManager {
  static readonly API_NAME = "apiManager";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "APIManager"; // ✅ Klassename für Dependency Resolution
  static readonly DEPENDENCIES = [ServiceContainer]; // ✅ Dependencies explizit definiert

  private static instance: APIManager;
  private readonly registeredServices = new Map<string, any>();

  constructor(private serviceContainer: IServiceContainer) {}

  static getInstance(serviceContainer: IServiceContainer): APIManager {
    if (!APIManager.instance) {
      APIManager.instance = new APIManager(serviceContainer);
    }
    return APIManager.instance;
  }

  /**
   * Services in globaler API registrieren
   */
  registerInGlobalAPI(): void {
    console.log(`[APIManager] 🌐 Registering services in global API`);
    
    const moduleApi = this.getModuleAPI();
    if (!moduleApi) {
      console.error(`[APIManager] ❌ Module API not available`);
      return;
    }
    
    const servicePlans = this.serviceContainer.getAllServicePlans();
    console.log(`[APIManager] 📋 Registering ${servicePlans.size} services in API`);
    
    for (const [serviceClass, plan] of servicePlans) {
      this.registerServiceInAPI(serviceClass, plan, moduleApi);
    }
    
    console.log(`[APIManager] ✅ All services registered in global API`);
    console.log(`[APIManager] 📊 Final registered services count: ${this.registeredServices.size}`);
  }


  /**
   * Einzelnen Service in API registrieren
   */
  private registerServiceInAPI(serviceClass: any, plan: any, moduleApi: any): void {
    const apiName = plan.apiName;
    const serviceType = plan.serviceType;
    
    console.log(`[APIManager] 🌐 Registering service in API:`, {
      service: serviceClass.name || serviceClass,
      apiName,
      serviceType
    });
    
    if (!apiName || !serviceType) {
      console.warn(`[APIManager] ⚠️ Service ${serviceClass.name || serviceClass} missing API_NAME or SERVICE_TYPE`);
      return;
    }
    
    try {
      if (serviceType === "singleton") {
        // Singleton: Sofort Service-Instanz registrieren
        const serviceInstance = this.serviceContainer.getService(serviceClass);
        moduleApi[apiName] = serviceInstance;
        this.registeredServices.set(apiName, serviceInstance);
        
        console.log(`[APIManager] ✅ Singleton service registered: ${apiName} -> ${serviceInstance.constructor.name}`);
        console.log(`[APIManager] 📊 Registered services count: ${this.registeredServices.size}`);
      } else if (serviceType === "factory") {
        // Factory: Factory-Funktion registrieren
        moduleApi[apiName] = () => {
          console.log(`[APIManager] 🏭 Factory called for: ${apiName}`);
          return this.serviceContainer.getService(serviceClass);
        };
        
        console.log(`[APIManager] ✅ Factory service registered: ${apiName}`);
      } else if (serviceType === "transient") {
        // Transient: Factory-Funktion registrieren (jeder Aufruf erstellt neue Instanz)
        moduleApi[apiName] = () => {
          console.log(`[APIManager] 🏭 Transient factory called for: ${apiName}`);
          return this.serviceContainer.createService(serviceClass);
        };
        
        console.log(`[APIManager] ✅ Transient service registered: ${apiName}`);
      } else {
        console.warn(`[APIManager] ⚠️ Unknown service type '${serviceType}' for ${apiName}`);
      }
    } catch (error) {
      console.error(`[APIManager] ❌ Failed to register service ${apiName}:`, error);
    }
  }

  /**
   * Module API abrufen oder erstellen
   */
  private getModuleAPI(): any {
    let moduleApi = (globalThis as any).game?.modules?.get("relationship-app")?.api;
    
    if (!moduleApi) {
      console.log(`[APIManager] 🔧 Module API not available, creating it`);
      
      const module = (globalThis as any).game?.modules?.get("relationship-app");
      if (module) {
        module.api = {};
        moduleApi = module.api;
        console.log(`[APIManager] ✅ Module API created`);
      } else {
        console.error(`[APIManager] ❌ Module 'relationship-app' not found`);
        return null;
      }
    }
    
    return moduleApi;
  }

  /**
   * Service aus API entfernen
   */
  unregisterFromAPI(apiName: string): void {
    console.log(`[APIManager] 🗑️ Unregistering service from API: ${apiName}`);
    
    const moduleApi = this.getModuleAPI();
    if (moduleApi && moduleApi[apiName]) {
      delete moduleApi[apiName];
      this.registeredServices.delete(apiName);
      console.log(`[APIManager] ✅ Service unregistered from API: ${apiName}`);
    } else {
      console.log(`[APIManager] ℹ️ Service not found in API: ${apiName}`);
    }
  }

  /**
   * Alle Services aus API entfernen
   */
  unregisterAllFromAPI(): void {
    console.log(`[APIManager] 🗑️ Unregistering all services from API (${this.registeredServices.size} registered)`);
    
    const moduleApi = this.getModuleAPI();
    if (moduleApi) {
      for (const apiName of this.registeredServices.keys()) {
        delete moduleApi[apiName];
      }
    }
    
    this.registeredServices.clear();
    console.log(`[APIManager] ✅ All services unregistered from API`);
  }

  /**
   * API Metadaten generieren
   */
  generateAPIMetadata(): APIMetadata {
    console.log(`[APIManager] 📊 Generating API metadata`);
    
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
    
    console.log(`[APIManager] 📊 API metadata generated:`, {
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
