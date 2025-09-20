import type { IServiceRegistry, IDependencyMapper, ILogger } from "../../interfaces";
import type { ServiceConstructor } from "../../types/ServiceTypes";

/**
 * DependencyMapper - Dependencies aus static readonly DEPENDENCIES extrahieren und mappen
 *
 * Boot-Service: Wird nur während des Boot-Prozesses verwendet
 * Keine statischen Singletons, keine Registrierung in SERVICE_CONFIG
 * Side-effect-freier Konstruktor
 */
export class DependencyMapper implements IDependencyMapper {
  constructor(
    private logger: ILogger,
    private serviceRegistry: IServiceRegistry
  ) {
    // Side-effect-freier Konstruktor
  }

  /**
   * Dependency Graph für alle Services erstellen
   * Single Source of Truth: Holt Services von ServiceRegistry
   */
  buildDependencyGraph(): Map<ServiceConstructor, ServiceConstructor[]> {
    this.logger.info(`[DependencyMapper] 🗺️ Building dependency graph`);

    const graph = new Map<ServiceConstructor, ServiceConstructor[]>();
    const allServices = this.serviceRegistry.getAllServices(); // ← Von ServiceRegistry

    this.logger.info(
      `[DependencyMapper] 📋 Processing ${allServices.length} services from ServiceRegistry`
    );

    for (const ServiceClass of allServices) {
      this.logger.debug(
        `[DependencyMapper] 🔍 Analyzing dependencies for: ${ServiceClass.name || ServiceClass}`
      );

      const dependencies = this.extractDependencies(ServiceClass);
      graph.set(ServiceClass, dependencies);

      this.logger.debug(
        `[DependencyMapper] 🔗 Dependencies for ${ServiceClass.name || ServiceClass}:`,
        {
          count: dependencies.length,
          dependencies: dependencies.map((d) => d.name || d),
        }
      );
    }

    this.logger.info(`[DependencyMapper] ✅ Dependency graph built with ${graph.size} services`);
    return graph;
  }

  /**
   * Dependencies für einen Service extrahieren
   */
  extractDependencies(serviceClass: ServiceConstructor): ServiceConstructor[] {
    this.logger.debug(
      `[DependencyMapper] 🔍 Extracting dependencies for: ${serviceClass.name || serviceClass}`
    );

    // Strict: fehlende static DEPENDENCIES ⇒ Fehler
    const staticDependencies = this.extractStaticDependencies(serviceClass);
    if (staticDependencies !== null) {
      this.logger.debug(
        `[DependencyMapper] 📋 Using static dependencies:`,
        staticDependencies.map((d) => d.name || d)
      );
      return staticDependencies;
    } else {
      throw new Error(
        `[DependencyMapper] ❌ Service '${serviceClass.name || serviceClass}' has no static readonly DEPENDENCIES!`
      );
    }
  }

  /**
   * Dependencies aus static readonly DEPENDENCIES property extrahieren
   */
  private extractStaticDependencies(serviceClass: ServiceConstructor): ServiceConstructor[] | null {
    const className =
      (serviceClass as any).CLASS_NAME ||
      (serviceClass as any).className ||
      serviceClass.name ||
      serviceClass;
    this.logger.debug(`[DependencyMapper] 📋 Checking static dependencies for: ${className}`);

    try {
      // Prüfe explizite static readonly DEPENDENCIES Definition
      if ((serviceClass as any).DEPENDENCIES && Array.isArray((serviceClass as any).DEPENDENCIES)) {
        const filteredDependencies = (serviceClass as any).DEPENDENCIES.filter(Boolean);
        this.logger.debug(`[DependencyMapper] 📋 Found static dependencies for ${className}:`, {
          original: (serviceClass as any).DEPENDENCIES,
          filtered: filteredDependencies,
          count: filteredDependencies.length,
        });
        return filteredDependencies;
      }

      this.logger.debug(`[DependencyMapper] 📋 No static dependencies found for: ${className}`);
      return [];
    } catch (error) {
      this.logger.error(
        `[DependencyMapper] 📋 Error extracting static dependencies for ${className}:`,
        error
      );
      return [];
    }
  }

  /**
   * Zirkuläre Dependencies prüfen
   */
  checkCircularDependencies(
    dependencyGraph: Map<ServiceConstructor, ServiceConstructor[]>
  ): boolean {
    this.logger.info(`[DependencyMapper] 🔍 Checking for circular dependencies`);

    const visited = new Set<ServiceConstructor>();
    const recursionStack = new Set<ServiceConstructor>();

    for (const service of dependencyGraph.keys()) {
      if (this.hasCircularDependency(service, dependencyGraph, visited, recursionStack)) {
        this.logger.error(`[DependencyMapper] ❌ Circular dependency detected!`);
        return true;
      }
    }

    this.logger.info(`[DependencyMapper] ✅ No circular dependencies found`);
    return false;
  }

  private hasCircularDependency(
    service: ServiceConstructor,
    graph: Map<ServiceConstructor, ServiceConstructor[]>,
    visited: Set<ServiceConstructor>,
    recursionStack: Set<ServiceConstructor>
  ): boolean {
    if (recursionStack.has(service)) {
      return true; // Zirkuläre Abhängigkeit gefunden
    }

    if (visited.has(service)) {
      return false; // Bereits besucht, kein Zirkel
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
}
