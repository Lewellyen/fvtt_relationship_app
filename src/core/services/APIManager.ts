import type { IAPIManager, IServiceContainer, ILogger } from "../../interfaces";
import { ServiceContainer } from "../../services/ServiceContainer";
import { FoundryLogger } from "./FoundryLogger";

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
  static readonly DEPENDENCIES = [ServiceContainer, FoundryLogger]; // ✅ Dependencies explizit definiert

  private static instance: APIManager;
  private readonly registeredServices = new Map<string, any>();

  constructor(
    private serviceContainer: IServiceContainer,
    private logger: ILogger
  ) {}

  static getInstance(serviceContainer: IServiceContainer, logger: ILogger): APIManager {
    if (!APIManager.instance) {
      APIManager.instance = new APIManager(serviceContainer, logger);
    }
    return APIManager.instance;
  }

  /**
   * Services in globaler API registrieren
   */
  registerInGlobalAPI(): void {
    this.writeLog("info", `[APIManager] 🌐 Registering services in global API`);
    
    const moduleApi = this.getModuleAPI();
    if (!moduleApi) {
      this.writeLog("error", `[APIManager] ❌ Module API not available`);
      return;
    }
    
    const servicePlans = this.serviceContainer.getAllServicePlans();
    this.writeLog("info", `[APIManager] 📋 Registering ${servicePlans.size} services in API`);
    
    for (const [serviceClass, plan] of servicePlans) {
      this.registerServiceInAPI(serviceClass, plan, moduleApi);
    }
    
    this.writeLog("info", `[APIManager] ✅ All services registered in global API`);
    this.writeLog("info", `[APIManager] 📊 Final registered services count: ${this.registeredServices.size}`);
  }


  /**
   * Einzelnen Service in API registrieren
   */
  private registerServiceInAPI(serviceClass: any, plan: any, moduleApi: any): void {
    const apiName = plan.apiName;
    const serviceType = plan.serviceType;
    
    this.writeLog("info", `[APIManager] 🌐 Registering service in API:`, {
      service: serviceClass.name || serviceClass,
      apiName,
      serviceType
    });
    
    if (!apiName || !serviceType) {
      this.writeLog("warn", `[APIManager] ⚠️ Service ${serviceClass.name || serviceClass} missing API_NAME or SERVICE_TYPE`);
      return;
    }
    
    try {
      if (serviceType === "singleton") {
        // Singleton: Sofort Service-Instanz registrieren
        const serviceInstance = this.serviceContainer.getService(serviceClass);
        moduleApi[apiName] = serviceInstance;
        this.registeredServices.set(apiName, serviceInstance);
        
        this.writeLog("info", `[APIManager] ✅ Singleton service registered: ${apiName} -> ${(serviceInstance as any).constructor.name}`);
        this.writeLog("info", `[APIManager] 📊 Registered services count: ${this.registeredServices.size}`);
      } else if (serviceType === "factory") {
        // Factory: Factory-Funktion registrieren
        moduleApi[apiName] = () => {
          this.writeLog("info", `[APIManager] 🏭 Factory called for: ${apiName}`);
          return this.serviceContainer.getService(serviceClass);
        };
        
        this.writeLog("info", `[APIManager] ✅ Factory service registered: ${apiName}`);
      } else if (serviceType === "transient") {
        // Transient: Factory-Funktion registrieren (jeder Aufruf erstellt neue Instanz)
        moduleApi[apiName] = () => {
          this.writeLog("info", `[APIManager] 🏭 Transient factory called for: ${apiName}`);
          return this.serviceContainer.createService(serviceClass);
        };
        
        this.writeLog("info", `[APIManager] ✅ Transient service registered: ${apiName}`);
      } else {
        this.writeLog("warn", `[APIManager] ⚠️ Unknown service type '${serviceType}' for ${apiName}`);
      }
    } catch (error) {
      this.writeLog("error", `[APIManager] ❌ Failed to register service ${apiName}:`, error);
    }
  }

  /**
   * Module API abrufen oder erstellen
   */
  private getModuleAPI(): any {
    let moduleApi = (globalThis as any).game?.modules?.get("relationship-app")?.api;
    
    if (!moduleApi) {
      this.writeLog("info", `[APIManager] 🔧 Module API not available, creating it`);
      
      const module = (globalThis as any).game?.modules?.get("relationship-app");
      if (module) {
        module.api = {};
        moduleApi = module.api;
        this.writeLog("info", `[APIManager] ✅ Module API created`);
      } else {
        this.writeLog("error", `[APIManager] ❌ Module 'relationship-app' not found`);
        return null;
      }
    }
    
    return moduleApi;
  }

  /**
   * Service aus API entfernen
   */
  unregisterFromAPI(apiName: string): void {
    this.writeLog("info", `[APIManager] 🗑️ Unregistering service from API: ${apiName}`);
    
    const moduleApi = this.getModuleAPI();
    if (moduleApi && moduleApi[apiName]) {
      delete moduleApi[apiName];
      this.registeredServices.delete(apiName);
      this.writeLog("info", `[APIManager] ✅ Service unregistered from API: ${apiName}`);
    } else {
      this.writeLog("info", `[APIManager] ℹ️ Service not found in API: ${apiName}`);
    }
  }

  /**
   * Alle Services aus API entfernen
   */
  unregisterAllFromAPI(): void {
    this.writeLog("info", `[APIManager] 🗑️ Unregistering all services from API (${this.registeredServices.size} registered)`);
    
    const moduleApi = this.getModuleAPI();
    if (moduleApi) {
      for (const apiName of this.registeredServices.keys()) {
        delete moduleApi[apiName];
      }
    }
    
    this.registeredServices.clear();
    this.writeLog("info", `[APIManager] ✅ All services unregistered from API`);
  }

  /**
   * API Metadaten generieren
   */
  generateAPIMetadata(): APIMetadata {
    this.writeLog("info", `[APIManager] 📊 Generating API metadata`);
    
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
    
    this.writeLog("info", `[APIManager] 📊 API metadata generated:`, {
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

  private writeLog(modus: "info" | "warn" | "error" | "debug", message: string, ...args: any[]) {
    if (this.logger) {
      this.logger[modus](message, ...args);
    } else {
      console[modus](message, ...args);
    }
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
