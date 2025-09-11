import type { IServiceRegistry, IDependencyMapper, IServicePlanner, ILogger } from "../../interfaces";
import { ServiceRegistry } from "../../services/ServiceRegistry";
import { DependencyMapper } from "./DependencyMapper";
import { FoundryLogger } from "./FoundryLogger";

/**
 * ServicePlanner - Service Baupläne mit Dependencies erstellen
 * 
 * Verantwortlichkeit: Service Baupläne mit Dependencies erstellen
 * Single Responsibility: Nur Service Planning
 */
export class ServicePlanner implements IServicePlanner {
  static readonly API_NAME = "servicePlanner";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "ServicePlanner";
  static readonly DEPENDENCIES = [FoundryLogger, ServiceRegistry, DependencyMapper]; // ✅ Dependencies explizit definiert

  private static instance: ServicePlanner;

  constructor(
    private logger: ILogger,
    private serviceRegistry: IServiceRegistry,
    private dependencyMapper: IDependencyMapper
  ) {}

  static getInstance(logger: ILogger, serviceRegistry: IServiceRegistry, dependencyMapper: IDependencyMapper): ServicePlanner {
    if (!ServicePlanner.instance) {
      ServicePlanner.instance = new ServicePlanner(logger, serviceRegistry, dependencyMapper);
    }
    return ServicePlanner.instance;
  }

  /**
   * Service Baupläne für alle Services erstellen
   * Single Source of Truth: Holt Services von ServiceRegistry
   */
  createServicePlans(): Map<any, ServicePlan> {
    this.writeLog("info", `[ServicePlanner] 📋 Creating service plans`);
    
    const plans = new Map();
    const allServices = this.serviceRegistry.getAllServices(); // ← Von ServiceRegistry
    const dependencyGraph = this.dependencyMapper.buildDependencyGraph();
    
    this.writeLog("info", `[ServicePlanner] 📋 Processing ${allServices.length} services from ServiceRegistry`);
    
    for (const ServiceClass of allServices) {
      this.writeLog("info", `[ServicePlanner] 📝 Creating plan for: ${ServiceClass.name || ServiceClass}`);
      
      const plan = this.createServicePlan(ServiceClass, dependencyGraph);
      plans.set(ServiceClass, plan);
      
      this.writeLog("info", `[ServicePlanner] 📋 Plan created for ${ServiceClass.name || ServiceClass}:`, {
        dependencies: plan.dependencies.map(d => d.name || d),
        resolutionOrder: plan.resolutionOrder.map(d => d.name || d),
        isSingleton: plan.isSingleton
      });
    }
    
    this.writeLog("info", `[ServicePlanner] ✅ Created ${plans.size} service plans`);
    return plans;
  }

  /**
   * Einzelnen Service-Plan erstellen
   */
  private createServicePlan(serviceClass: any, dependencyGraph: Map<any, any[]>): ServicePlan {
    const dependencies = dependencyGraph.get(serviceClass) || [];
    const resolutionOrder = this.calculateResolutionOrder(serviceClass, dependencyGraph);
    
    return {
      constructor: serviceClass,
      dependencies: dependencies,
      resolutionOrder: resolutionOrder,
      isSingleton: this.isSingleton(serviceClass),
      apiName: this.getApiName(serviceClass),
      serviceType: this.getServiceType(serviceClass)
    };
  }

  /**
   * Resolution Order berechnen (Topological Sort)
   */
  private calculateResolutionOrder(serviceClass: any, dependencyGraph: Map<any, any[]>): any[] {
    this.writeLog("info", `[ServicePlanner] 🔄 Calculating resolution order for: ${serviceClass.name || serviceClass}`);
    
    const visited = new Set<any>();
    const resolutionOrder: any[] = [];
    
    this.topologicalSort(serviceClass, dependencyGraph, visited, resolutionOrder);
    
    this.writeLog("info", `[ServicePlanner] 🔄 Resolution order for ${serviceClass.name || serviceClass}:`, 
      resolutionOrder.map(s => s.name || s));
    
    return resolutionOrder;
  }

  private topologicalSort(
    service: any, 
    graph: Map<any, any[]>, 
    visited: Set<any>, 
    result: any[]
  ): void {
    if (visited.has(service)) {
      return;
    }
    
    visited.add(service);
    
    const dependencies = graph.get(service) || [];
    for (const dependency of dependencies) {
      this.topologicalSort(dependency, graph, visited, result);
    }
    
    result.push(service);
  }

  /**
   * Prüfen ob Service ein Singleton ist
   */
  private isSingleton(serviceClass: any): boolean {
    const serviceType = serviceClass.SERVICE_TYPE;
    return serviceType === "singleton" || serviceType === undefined;
  }

  /**
   * API Name aus Service-Klasse extrahieren
   */
  private getApiName(serviceClass: any): string {
    return serviceClass.API_NAME || serviceClass.name || serviceClass.toString();
  }

  /**
   * Service Type aus Service-Klasse extrahieren
   */
  private getServiceType(serviceClass: any): string {
    return serviceClass.SERVICE_TYPE || "singleton";
  }

  /**
   * Service-Plan für einen Service abrufen
   */
  getServicePlan(serviceClass: any, plans: Map<any, ServicePlan>): ServicePlan | undefined {
    return plans.get(serviceClass);
  }

  /**
   * Alle Service-Pläne validieren
   */
  validateServicePlans(plans: Map<any, ServicePlan>): ValidationResult {
    this.writeLog("info", `[ServicePlanner] 🔍 Validating ${plans.size} service plans`);
    
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };
    
    for (const [serviceClass, plan] of plans) {
      // Prüfe ob alle Dependencies verfügbar sind
      for (const dependency of plan.dependencies) {
        if (!this.serviceRegistry.hasService(dependency)) {
          result.isValid = false;
          result.errors.push(`Dependency ${dependency.name || dependency} not found for service ${serviceClass.name || serviceClass}`);
        }
      }
      
      // Prüfe ob API Name gesetzt ist
      if (!plan.apiName) {
        result.warnings.push(`No API_NAME defined for service ${serviceClass.name || serviceClass}`);
      }
    }
    
    this.writeLog("info", `[ServicePlanner] 🔍 Validation result:`, {
      isValid: result.isValid,
      errors: result.errors.length,
      warnings: result.warnings.length
    });
    
    return result;
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
 * Service Plan Interface
 */
export interface ServicePlan {
  constructor: any;
  dependencies: any[];
  resolutionOrder: any[];
  isSingleton: boolean;
  apiName: string;
  serviceType: string;
}

/**
 * Validation Result Interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
