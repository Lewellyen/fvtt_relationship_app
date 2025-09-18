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
  createService<T>(identifier: any): T {
    this.writeLog("info", `[ServiceFactory] 🏗️ Creating service: ${identifier.name || identifier}`);

    const plan = this.servicePlans.get(identifier);
    if (!plan) {
      this.writeLog(
        "error",
        `[ServiceFactory] ❌ No service plan found for ${identifier.name || identifier}`
      );
      throw new Error(`No service plan found for ${identifier.name || identifier}`);
    }

    this.writeLog(
      "info",
      `[ServiceFactory] 📋 Service plan for ${identifier.name || identifier}:`,
      {
        dependencies: plan.dependencies.map((d) => d.name || d),
        isSingleton: plan.isSingleton,
        isScoped: plan.isScoped,
        isTransient: plan.isTransient,
        serviceType: plan.serviceType,
      }
    );

    // Dependencies über Container auflösen (mit korrektem Caching!)
    const dependencies = this.resolveDependencies(plan);

    this.writeLog(
      "info",
      `[ServiceFactory] 🔗 Resolved dependencies for ${identifier.name || identifier}:`,
      {
        count: dependencies.length,
        dependencies: dependencies.map((d) => d.constructor.name),
      }
    );

    // Service mit Dependencies erstellen
    const service = new plan.constructor(...dependencies);

    // Service-Erstellung validieren
    if (!this.serviceValidator.validateServiceCreation(service, identifier)) {
      this.serviceValidator.handleServiceCreationError(
        new Error(`Service creation validation failed for ${identifier.name || identifier}`),
        identifier
      );
      throw new Error(`Service creation validation failed for ${identifier.name || identifier}`);
    }

    this.writeLog(
      "info",
      `[ServiceFactory] ✅ Service created successfully: ${identifier.name || identifier}`
    );
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
    } else {
      console[modus](message, ...args);
    }
  }
}
