import type { IServiceValidator, ILogger } from "../../interfaces";
import type { ServicePlan, ValidationResult } from "./ServicePlanner";
import { FoundryLogger } from "./FoundryLogger";

/**
 * ServiceValidator - Service-Erstellung validieren
 * 
 * Verantwortlichkeit: Service-Erstellung validieren und Fehler prüfen
 * Single Responsibility: Nur Service Validation
 */
export class ServiceValidator implements IServiceValidator {
  static readonly API_NAME = "serviceValidator";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "ServiceValidator";
  static readonly DEPENDENCIES = [FoundryLogger]; // ✅ Dependencies explizit definiert - FoundryLogger bereits an erster Stelle

  private static instance: ServiceValidator;

  private constructor(private logger: ILogger) {}

  static getInstance(logger: ILogger): ServiceValidator {
    if (!ServiceValidator.instance) {
      ServiceValidator.instance = new ServiceValidator(logger);
    }
    return ServiceValidator.instance;
  }

  /**
   * Dependency Graph validieren
   */
  validateDependencyGraph(dependencyGraph: Map<any, any[]>): ValidationResult {
    this.writeLog("info", `[ServiceValidator] 🔍 Validating dependency graph with ${dependencyGraph.size} services`);
    
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
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
          result.errors.push(`Service ${service.name || service} depends on unknown service ${dependency.name || dependency}`);
        }
      }
    }

    this.writeLog("info", `[ServiceValidator] 🔍 Dependency graph validation result:`, {
      isValid: result.isValid,
      errors: result.errors.length,
      warnings: result.warnings.length
    });

    return result;
  }

  /**
   * Service-Pläne validieren
   */
  validateServicePlans(servicePlans: Map<any, ServicePlan>): ValidationResult {
    this.writeLog("info", `[ServiceValidator] 🔍 Validating ${servicePlans.size} service plans`);
    
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
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

    this.writeLog("info", `[ServiceValidator] 🔍 Service plans validation result:`, {
      isValid: result.isValid,
      errors: result.errors.length,
      warnings: result.warnings.length
    });

    return result;
  }

  /**
   * Einzelnen Service-Plan validieren
   */
  private validateServicePlan(serviceClass: any, plan: ServicePlan): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    // Prüfe Constructor
    if (!plan.constructor || typeof plan.constructor !== 'function') {
      result.isValid = false;
      result.errors.push(`Invalid constructor for service ${serviceClass.name || serviceClass}`);
    }

    // Prüfe Dependencies
    if (!Array.isArray(plan.dependencies)) {
      result.isValid = false;
      result.errors.push(`Dependencies must be an array for service ${serviceClass.name || serviceClass}`);
    }

    // Prüfe Resolution Order
    if (!Array.isArray(plan.resolutionOrder)) {
      result.isValid = false;
      result.errors.push(`Resolution order must be an array for service ${serviceClass.name || serviceClass}`);
    }

    // Prüfe API Name
    if (!plan.apiName || typeof plan.apiName !== 'string') {
      result.warnings.push(`No valid API_NAME for service ${serviceClass.name || serviceClass}`);
    }

    // Prüfe Service Type
    if (!['singleton', 'factory', 'transient'].includes(plan.serviceType)) {
      result.warnings.push(`Invalid service type '${plan.serviceType}' for service ${serviceClass.name || serviceClass}`);
    }

    return result;
  }

  /**
   * Service-Erstellung validieren
   */
  validateServiceCreation(service: any, identifier: any): boolean {
    this.writeLog("info", `[ServiceValidator] 🔍 Validating service creation for: ${identifier.name || identifier}`);
    
    if (!service) {
      this.writeLog("error", `[ServiceValidator] ❌ Service is null or undefined for ${identifier.name || identifier}`);
      return false;
    }

    if (typeof service !== 'object') {
      this.writeLog("error", `[ServiceValidator] ❌ Service is not an object for ${identifier.name || identifier}`);
      return false;
    }

    this.writeLog("info", `[ServiceValidator] ✅ Service creation valid for ${identifier.name || identifier}`);
    return true;
  }

  /**
   * Zirkuläre Dependencies prüfen
   */
  checkCircularDependencies(dependencyGraph: Map<any, any[]>): boolean {
    this.writeLog("info", `[ServiceValidator] 🔍 Checking for circular dependencies`);
    
    const visited = new Set<any>();
    const recursionStack = new Set<any>();
    
    for (const service of dependencyGraph.keys()) {
      if (this.hasCircularDependency(service, dependencyGraph, visited, recursionStack)) {
        this.writeLog("error", `[ServiceValidator] ❌ Circular dependency detected starting from ${service.name || service}`);
        return true;
      }
    }
    
    this.writeLog("info", `[ServiceValidator] ✅ No circular dependencies found`);
    return false;
  }

  private hasCircularDependency(
    service: any, 
    graph: Map<any, any[]>, 
    visited: Set<any>, 
    recursionStack: Set<any>
  ): boolean {
    if (recursionStack.has(service)) {
      this.writeLog("error", `[ServiceValidator] ❌ Circular dependency detected: ${service.name || service} is in recursion stack`);
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
    this.writeLog("info", `[ServiceValidator] 🔍 Validating service container`);
    
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    if (!serviceContainer) {
      result.isValid = false;
      result.errors.push("Service container is null or undefined");
      return result;
    }

    if (typeof serviceContainer.getService !== 'function') {
      result.isValid = false;
      result.errors.push("Service container missing getService method");
    }

    if (typeof serviceContainer.createService !== 'function') {
      result.isValid = false;
      result.errors.push("Service container missing createService method");
    }

    this.writeLog("info", `[ServiceValidator] 🔍 Service container validation result:`, {
      isValid: result.isValid,
      errors: result.errors.length,
      warnings: result.warnings.length
    });

    return result;
  }

  /**
   * Fehlerbehandlung für Service-Erstellung
   */
  handleServiceCreationError(error: Error, identifier: any): void {
    this.writeLog("error", `[ServiceValidator] ❌ Service creation error for ${identifier.name || identifier}:`, error);
    
    // Hier könnte man Error Reporting, Logging, etc. hinzufügen
    this.writeLog("error", `Service creation failed for ${identifier.name || identifier}:`, error);
  }

  private writeLog(modus: "info" | "warn" | "error" | "debug", message: string, ...args: any[]) {
    if (this.logger) {
      this.logger[modus](message, ...args);
    } else {
      console[modus](message, ...args);
    }
  }
}
