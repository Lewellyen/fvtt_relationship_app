import type { ServicePlan } from "./ServicePlanner";
import type { IServiceValidator, ILogger, IServiceContainer } from "../../interfaces";

/**
 * ServiceFactory - Verantwortlich für Service Creation und Dependency Resolution
 *
 * Single Responsibility: Nur Service Creation + Dependency Resolution
 * Nutzt Container-Referenz für korrektes Caching (Singleton, Scoped, Transient)
 */
export class ServiceFactory {
  constructor(
    private logger: ILogger,
    private servicePlans: Map<any, ServicePlan>,
    private serviceValidator: IServiceValidator,
    private serviceContainer: IServiceContainer
  ) {}

  /**
   * Service mit Dependencies erstellen
   */
  createService<T>(ctor: new (...args: unknown[]) => T): T {
    this.writeLog("info", `[ServiceFactory] 🏗️ Creating service: ${ctor.name || ctor}`);

    const plan = this.servicePlans.get(ctor);
    if (!plan) {
      this.writeLog("error", `[ServiceFactory] ❌ No service plan found for ${ctor.name || ctor}`);
      throw new Error(`No service plan found for ${ctor.name || ctor}`);
    }

    this.writeLog("info", `[ServiceFactory] 📋 Service plan for ${ctor.name || ctor}:`, {
      dependencies: plan.dependencies.map((d) => d.name || d),
      isSingleton: plan.isSingleton,
      isScoped: plan.isScoped,
      isTransient: plan.isTransient,
      serviceType: plan.serviceType,
    });

    // Dependencies über Container auflösen (mit korrektem Caching!)
    const dependencies = this.resolveDependencies(plan);

    this.writeLog("info", `[ServiceFactory] 🔗 Resolved dependencies for ${ctor.name || ctor}:`, {
      count: dependencies.length,
      dependencies: dependencies.map((d) => d.constructor.name),
    });

    // Service mit Dependencies erstellen
    const service = new plan.constructor(...dependencies);

    // Service-Erstellung validieren
    if (!this.serviceValidator.validateServiceCreation(service, ctor)) {
      this.serviceValidator.handleServiceCreationError(
        new Error(`Service creation validation failed for ${ctor.name || ctor}`),
        ctor
      );
      throw new Error(`Service creation validation failed for ${ctor.name || ctor}`);
    }

    this.writeLog("info", `[ServiceFactory] ✅ Service created successfully: ${ctor.name || ctor}`);
    return service as T;
  }

  /**
   * Dependencies über Container auflösen (mit korrektem Caching!)
   */
  private resolveDependencies(plan: ServicePlan): any[] {
    this.writeLog(
      "info",
      `[ServiceFactory] 🔗 Resolving dependencies for: ${plan.constructor.name || plan.constructor}`
    );

    const dependencies: any[] = [];

    for (const dependency of plan.dependencies) {
      this.writeLog(
        "info",
        `[ServiceFactory] 🔍 Resolving dependency: ${dependency.name || dependency}`
      );

      try {
        // Container nutzen für korrektes Caching (Singleton, Scoped, Transient)
        const resolvedDependency = this.serviceContainer.getService(dependency);
        dependencies.push(resolvedDependency);

        this.writeLog(
          "info",
          `[ServiceFactory] ✅ Dependency resolved: ${dependency.name || dependency} -> ${(resolvedDependency as any).constructor.name}`
        );
      } catch (error) {
        this.writeLog(
          "error",
          `[ServiceFactory] ❌ Failed to resolve dependency ${dependency.name || dependency}:`,
          error
        );
        this.serviceValidator.handleServiceCreationError(error as Error, dependency);
        throw error;
      }
    }

    return dependencies;
  }

  private writeLog(modus: "info" | "warn" | "error" | "debug", message: string, ...args: any[]) {
    if (this.logger) {
      this.logger[modus](message, ...args);
    }
    // Kein Console-Fallback - Logger ist Pflicht
  }
}
