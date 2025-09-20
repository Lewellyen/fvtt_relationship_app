import type { IServiceValidator, ILogger } from "../../interfaces";
import type { ServicePlan, ValidationResult } from "./ServicePlanner";
import type { ServiceConstructor } from "../../types/ServiceTypes";

/**
 * ServiceValidator - Service-Erstellung validieren
 *
 * Boot-Service: Wird nur während des Boot-Prozesses verwendet
 * Keine statischen Singletons, keine Registrierung in SERVICE_CONFIG
 * Side-effect-freier Konstruktor
 */
export class ServiceValidator implements IServiceValidator {
  constructor(private logger: ILogger) {
    // Side-effect-freier Konstruktor
  }

  /**
   * Dependency Graph validieren
   */
  validateDependencyGraph(
    dependencyGraph: Map<ServiceConstructor, ServiceConstructor[]>
  ): ValidationResult {
    this.logger.info(
      `[ServiceValidator] 🔍 Validating dependency graph with ${dependencyGraph.size} services`
    );

    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    };

    // Prüfe zirkuläre Dependencies
    if (this.checkCircularDependencies(dependencyGraph)) {
      result.isValid = false;
      result.errors.push("Circular dependencies detected in dependency graph");
    }

    // Prüfe fehlende Dependencies
    for (const [service, dependencies] of dependencyGraph) {
      for (const dependency of dependencies) {
        if (!dependencyGraph.has(dependency)) {
          result.isValid = false;
          result.errors.push(
            `Service ${service.name || service} depends on unknown service ${dependency.name || dependency}`
          );
        }
      }
    }

    this.logger.info(`[ServiceValidator] 🔍 Dependency graph validation result:`, {
      isValid: result.isValid,
      errors: result.errors.length,
      warnings: result.warnings.length,
    });

    return result;
  }

  /**
   * Service-Pläne validieren
   */
  validateServicePlans(servicePlans: Map<ServiceConstructor, ServicePlan>): ValidationResult {
    this.logger.info(`[ServiceValidator] 🔍 Validating ${servicePlans.size} service plans`);

    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    };

    for (const [serviceClass, plan] of servicePlans) {
      // Prüfe Service-Plan
      const planValidation = this.validateServicePlan(serviceClass, plan);
      if (!planValidation.isValid) {
        result.isValid = false;
        result.errors.push(...planValidation.errors);
      }
      result.warnings.push(...planValidation.warnings);
    }

    this.logger.info(`[ServiceValidator] 🔍 Service plans validation result:`, {
      isValid: result.isValid,
      errors: result.errors.length,
      warnings: result.warnings.length,
    });

    return result;
  }

  /**
   * Einzelnen Service-Plan validieren
   */
  private validateServicePlan(
    serviceClass: ServiceConstructor,
    plan: ServicePlan
  ): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    };

    // Prüfe Constructor
    if (!plan.constructor || typeof plan.constructor !== "function") {
      result.isValid = false;
      result.errors.push(`Invalid constructor for service ${serviceClass.name || serviceClass}`);
    }

    // Prüfe Dependencies
    if (!Array.isArray(plan.dependencies)) {
      result.isValid = false;
      result.errors.push(
        `Dependencies must be an array for service ${serviceClass.name || serviceClass}`
      );
    }

    // Prüfe Resolution Order
    if (!Array.isArray(plan.resolutionOrder)) {
      result.isValid = false;
      result.errors.push(
        `Resolution order must be an array for service ${serviceClass.name || serviceClass}`
      );
    }

    // Prüfe API Name
    if (!plan.apiName || typeof plan.apiName !== "string") {
      result.warnings.push(`No valid API_NAME for service ${serviceClass.name || serviceClass}`);
    }

    // Prüfe Service Type
    if (!["singleton", "factory", "transient", "scoped"].includes(plan.serviceType)) {
      result.warnings.push(
        `Invalid service type '${plan.serviceType}' for service ${serviceClass.name || serviceClass}`
      );
    }

    // Prüfe ob alle Dependencies in Registry sind
    // Hinweis: Diese Prüfung wird in der ServicePlanner.validateServicePlan() gemacht
    // Hier nur eine Warnung wenn Dependencies leer sind aber erwartet werden
    if (
      plan.dependencies.length === 0 &&
      (serviceClass as any).DEPENDENCIES &&
      (serviceClass as any).DEPENDENCIES.length > 0
    ) {
      result.warnings.push(
        `Service ${serviceClass.name || serviceClass} has DEPENDENCIES defined but no dependencies were resolved`
      );
    }

    // Warnung wenn DEPENDENCIES fehlt
    if ((serviceClass as any).DEPENDENCIES === undefined) {
      result.warnings.push(
        `Service ${serviceClass.name || serviceClass} has no DEPENDENCIES property defined. This should be explicitly declared as an empty array if no dependencies are needed.`
      );
    }

    return result;
  }

  /**
   * Service-Erstellung validieren
   */
  validateServiceCreation(service: unknown, ctor: new (...args: unknown[]) => unknown): boolean {
    this.logger.info(`[ServiceValidator] 🔍 Validating service creation for: ${ctor.name || ctor}`);

    if (!service) {
      this.logger.error(
        `[ServiceValidator] ❌ Service is null or undefined for ${ctor.name || ctor}`
      );
      return false;
    }

    if (typeof service !== "object") {
      this.logger.error(`[ServiceValidator] ❌ Service is not an object for ${ctor.name || ctor}`);
      return false;
    }

    this.logger.info(`[ServiceValidator] ✅ Service creation valid for ${ctor.name || ctor}`);
    return true;
  }

  /**
   * Zirkuläre Dependencies prüfen
   */
  checkCircularDependencies(
    dependencyGraph: Map<ServiceConstructor, ServiceConstructor[]>
  ): boolean {
    this.logger.info(`[ServiceValidator] 🔍 Checking for circular dependencies`);

    const visited = new Set<ServiceConstructor>();
    const recursionStack = new Set<ServiceConstructor>();

    for (const service of dependencyGraph.keys()) {
      if (this.hasCircularDependency(service, dependencyGraph, visited, recursionStack)) {
        this.logger.error(
          `[ServiceValidator] ❌ Circular dependency detected starting from ${service.name || service}`
        );
        return true;
      }
    }

    this.logger.info(`[ServiceValidator] ✅ No circular dependencies found`);
    return false;
  }

  private hasCircularDependency(
    service: ServiceConstructor,
    graph: Map<ServiceConstructor, ServiceConstructor[]>,
    visited: Set<ServiceConstructor>,
    recursionStack: Set<ServiceConstructor>
  ): boolean {
    if (recursionStack.has(service)) {
      this.logger.error(
        `[ServiceValidator] ❌ Circular dependency detected: ${service.name || service} is in recursion stack`
      );
      return true;
    }

    if (visited.has(service)) {
      return false;
    }

    visited.add(service);
    recursionStack.add(service);

    const dependencies = graph.get(service) || [];
    for (const dependency of dependencies) {
      if (this.hasCircularDependency(dependency, graph, visited, recursionStack)) {
        return true;
      }
    }

    recursionStack.delete(service);
    return false;
  }

  /**
   * Service-Container validieren
   */
  validateServiceContainer(serviceContainer: any): ValidationResult {
    this.logger.info(`[ServiceValidator] 🔍 Validating service container`);

    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    };

    if (!serviceContainer) {
      result.isValid = false;
      result.errors.push("Service container is null or undefined");
      return result;
    }

    if (typeof serviceContainer.getService !== "function") {
      result.isValid = false;
      result.errors.push("Service container missing getService method");
    }

    if (typeof serviceContainer.createService !== "function") {
      result.isValid = false;
      result.errors.push("Service container missing createService method");
    }

    this.logger.info(`[ServiceValidator] 🔍 Service container validation result:`, {
      isValid: result.isValid,
      errors: result.errors.length,
      warnings: result.warnings.length,
    });

    return result;
  }

  /**
   * Fehlerbehandlung für Service-Erstellung
   */
  handleServiceCreationError(error: Error, ctor: new (...args: unknown[]) => any): void {
    this.logger.error(
      `[ServiceValidator] ❌ Service creation error for ${ctor.name || ctor}:`,
      error
    );

    // Hier könnte man Error Reporting, Logging, etc. hinzufügen
    this.logger.error(`Service creation failed for ${ctor.name || ctor}:`, error);
  }
}
