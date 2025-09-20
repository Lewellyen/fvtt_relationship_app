import type {
  IServiceRegistry,
  IDependencyMapper,
  IServicePlanner,
  ILogger,
} from "../../interfaces";
import type { ServiceConstructor } from "../../types/ServiceTypes";

/**
 * ServicePlanner - Service Baupläne mit Dependencies erstellen
 *
 * Boot-Service: Wird nur während des Boot-Prozesses verwendet
 * Keine statischen Singletons, keine Registrierung in SERVICE_CONFIG
 * Side-effect-freier Konstruktor
 */
export class ServicePlanner implements IServicePlanner {
  constructor(
    private logger: ILogger,
    private serviceRegistry: IServiceRegistry,
    private dependencyMapper: IDependencyMapper
  ) {
    // Side-effect-freier Konstruktor
  }

  /**
   * Service Baupläne für alle Services erstellen
   * Single Source of Truth: Holt Services von ServiceRegistry
   */
  createServicePlans(): Map<ServiceConstructor, ServicePlan> {
    this.logger.info(`[ServicePlanner] 📋 Creating service plans`);

    const plans = new Map<ServiceConstructor, ServicePlan>();
    const allServices = this.serviceRegistry.getAllServices(); // ← Von ServiceRegistry
    const dependencyGraph = this.dependencyMapper.buildDependencyGraph();

    this.logger.info(
      `[ServicePlanner] 📋 Processing ${allServices.length} services from ServiceRegistry`
    );

    for (const ServiceClass of allServices) {
      this.logger.info(
        `[ServicePlanner] 📝 Creating plan for: ${ServiceClass.name || ServiceClass}`
      );

      const plan = this.createServicePlan(ServiceClass, dependencyGraph);
      plans.set(ServiceClass, plan);

      this.logger.info(
        `[ServicePlanner] 📋 Plan created for ${ServiceClass.name || ServiceClass}:`,
        {
          dependencies: plan.dependencies.map((d) => d.name || d),
          resolutionOrder: plan.resolutionOrder.map((d) => d.name || d),
          isSingleton: plan.isSingleton,
        }
      );
    }

    this.logger.info(`[ServicePlanner] ✅ Created ${plans.size} service plans`);
    return plans;
  }

  /**
   * Einzelnen Service-Plan erstellen
   */
  private createServicePlan(
    serviceClass: ServiceConstructor,
    dependencyGraph: Map<ServiceConstructor, ServiceConstructor[]>
  ): ServicePlan {
    const dependencies = dependencyGraph.get(serviceClass) || [];
    const resolutionOrder = this.calculateResolutionOrder(serviceClass, dependencyGraph);

    return {
      constructor: serviceClass,
      dependencies: dependencies,
      resolutionOrder: resolutionOrder,
      isSingleton: this.isSingleton(serviceClass),
      isTransient: this.isTransient(serviceClass),
      isScoped: this.isScoped(serviceClass),
      apiName: this.getApiName(serviceClass),
      serviceType: this.getServiceType(serviceClass),
    };
  }

  /**
   * Resolution Order berechnen (Topological Sort)
   */
  private calculateResolutionOrder(
    serviceClass: ServiceConstructor,
    dependencyGraph: Map<ServiceConstructor, ServiceConstructor[]>
  ): ServiceConstructor[] {
    this.logger.info(
      `[ServicePlanner] 🔄 Calculating resolution order for: ${serviceClass.name || serviceClass}`
    );

    const visited = new Set<ServiceConstructor>();
    const resolutionOrder: ServiceConstructor[] = [];

    this.topologicalSort(serviceClass, dependencyGraph, visited, resolutionOrder);

    this.logger.info(
      `[ServicePlanner] 🔄 Resolution order for ${serviceClass.name || serviceClass}:`,
      resolutionOrder.map((s) => s.name || s)
    );

    return resolutionOrder;
  }

  private topologicalSort(
    service: ServiceConstructor,
    graph: Map<ServiceConstructor, ServiceConstructor[]>,
    visited: Set<ServiceConstructor>,
    result: ServiceConstructor[]
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
  private isSingleton(serviceClass: ServiceConstructor): boolean {
    const serviceType = (serviceClass as any).SERVICE_TYPE;
    return serviceType === "singleton" || serviceType === undefined;
  }

  /**
   * Prüfen ob Service ein Transient ist
   */
  private isTransient(serviceClass: ServiceConstructor): boolean {
    const serviceType = (serviceClass as any).SERVICE_TYPE;
    return serviceType === "transient";
  }

  /**
   * Prüfen ob Service ein Scoped ist
   */
  private isScoped(serviceClass: ServiceConstructor): boolean {
    const serviceType = (serviceClass as any).SERVICE_TYPE;
    return serviceType === "scoped";
  }

  /**
   * API Name aus Service-Klasse extrahieren
   */
  private getApiName(serviceClass: ServiceConstructor): string {
    return (serviceClass as any).API_NAME || serviceClass.name || serviceClass.toString();
  }

  /**
   * Service Type aus Service-Klasse extrahieren
   */
  private getServiceType(serviceClass: ServiceConstructor): string {
    return (serviceClass as any).SERVICE_TYPE || "singleton";
  }

  /**
   * Service-Plan für einen Service abrufen
   */
  getServicePlan(
    serviceClass: ServiceConstructor,
    plans: Map<ServiceConstructor, ServicePlan>
  ): ServicePlan | undefined {
    return plans.get(serviceClass);
  }

  /**
   * Alle Service-Pläne validieren
   */
  validateServicePlans(plans: Map<ServiceConstructor, ServicePlan>): ValidationResult {
    this.logger.info(`[ServicePlanner] 🔍 Validating ${plans.size} service plans`);

    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    };

    for (const [serviceClass, plan] of plans) {
      // Prüfe ob alle Dependencies verfügbar sind
      for (const dependency of plan.dependencies) {
        if (!this.serviceRegistry.hasService(dependency)) {
          result.isValid = false;
          result.errors.push(
            `Dependency ${dependency.name || dependency} not found for service ${serviceClass.name || serviceClass}`
          );
        }
      }

      // Prüfe ob API Name gesetzt ist
      if (!plan.apiName) {
        result.warnings.push(
          `No API_NAME defined for service ${serviceClass.name || serviceClass}`
        );
      }
    }

    this.logger.info(`[ServicePlanner] 🔍 Validation result:`, {
      isValid: result.isValid,
      errors: result.errors.length,
      warnings: result.warnings.length,
    });

    return result;
  }
}

/**
 * Service Plan Interface
 */
export interface ServicePlan {
  constructor: ServiceConstructor;
  dependencies: ServiceConstructor[];
  resolutionOrder: ServiceConstructor[];
  isSingleton: boolean;
  isTransient: boolean;
  isScoped: boolean;
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
