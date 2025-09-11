import type { IServiceRegistry, IDependencyMapper, ILogger } from "../../interfaces";
import { ServiceRegistry } from "../../services/ServiceRegistry";
import { FoundryLogger } from "./FoundryLogger";

/**
 * DependencyMapper - Dependencies aus static readonly DEPENDENCIES extrahieren und mappen
 * 
 * Verantwortlichkeit: Dependencies aus static readonly DEPENDENCIES Property extrahieren
 * Single Responsibility: Nur Dependency Mapping
 */
export class DependencyMapper implements IDependencyMapper {
  static readonly API_NAME = "dependencyMapper";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "DependencyMapper";
  static readonly DEPENDENCIES = [FoundryLogger, ServiceRegistry]; // ✅ Dependencies explizit definiert

  private static instance: DependencyMapper;
  private readonly hardcodedDependencies = new Map<any, any[]>();
  private hardcodedDependenciesInitialized = false;

  constructor(private logger: ILogger, private serviceRegistry: IServiceRegistry) {
    // Hardcoded Dependencies werden lazy initialisiert
  }

  static getInstance(logger: ILogger, serviceRegistry: IServiceRegistry): DependencyMapper {
    if (!DependencyMapper.instance) {
      DependencyMapper.instance = new DependencyMapper(logger, serviceRegistry);
    }
    return DependencyMapper.instance;
  }

  /**
   * Dependency Graph für alle Services erstellen
   * Single Source of Truth: Holt Services von ServiceRegistry
   */
  buildDependencyGraph(): Map<any, any[]> {
    this.writeLog("info", `[DependencyMapper] 🗺️ Building dependency graph`);
    
    const graph = new Map();
    const allServices = this.serviceRegistry.getAllServices(); // ← Von ServiceRegistry
    
    this.writeLog("info", `[DependencyMapper] 📋 Processing ${allServices.length} services from ServiceRegistry`);
    
    for (const ServiceClass of allServices) {
      this.writeLog("debug", `[DependencyMapper] 🔍 Analyzing dependencies for: ${ServiceClass.name || ServiceClass}`);
      
      const dependencies = this.extractDependencies(ServiceClass);
      graph.set(ServiceClass, dependencies);
      
      this.writeLog("debug", `[DependencyMapper] 🔗 Dependencies for ${ServiceClass.name || ServiceClass}:`, {
        count: dependencies.length,
        dependencies: dependencies.map(d => d.name || d)
      });
    }
    
    this.writeLog("info", `[DependencyMapper] ✅ Dependency graph built with ${graph.size} services`);
    return graph;
  }

  /**
   * Dependencies für einen Service extrahieren
   */
  extractDependencies(serviceClass: any): any[] {
    this.writeLog("debug", `[DependencyMapper] 🔍 Extracting dependencies for: ${serviceClass.name || serviceClass}`);
    
    // 1. Versuche static readonly DEPENDENCIES zu extrahieren
    const staticDependencies = this.extractStaticDependencies(serviceClass);
    if (staticDependencies !== null) {
      this.writeLog("debug", `[DependencyMapper] 📋 Using static dependencies:`, staticDependencies.map(d => d.name || d));
      return staticDependencies;
    } else {
      throw new Error(`[DependencyMapper] ❌ Service '${serviceClass.name || serviceClass}' has no static readonly DEPENDENCIES!`);
    }
  }

  /**
   * Dependencies aus static readonly DEPENDENCIES property extrahieren
   */
  private extractStaticDependencies(serviceClass: any): any[] | null {
    const className = serviceClass.CLASS_NAME || serviceClass.className || serviceClass.name || serviceClass;
    this.writeLog("debug", `[DependencyMapper] 📋 Checking static dependencies for: ${className}`);
    
    try {
      // Prüfe explizite static readonly DEPENDENCIES Definition
      if (serviceClass.DEPENDENCIES && Array.isArray(serviceClass.DEPENDENCIES)) {
        const filteredDependencies = serviceClass.DEPENDENCIES.filter(Boolean);
        this.writeLog("debug", `[DependencyMapper] 📋 Found static dependencies for ${className}:`, {
          original: serviceClass.DEPENDENCIES,
          filtered: filteredDependencies,
          count: filteredDependencies.length
        });
        return filteredDependencies;
      }

      this.writeLog("debug", `[DependencyMapper] 📋 No static dependencies found for: ${className}`);
      return [];
    } catch (error) {
      this.writeLog("error", `[DependencyMapper] 📋 Error extracting static dependencies for ${className}:`, error);
      return [];
    }
  }

  /**
   * Zirkuläre Dependencies prüfen
   */
  checkCircularDependencies(dependencyGraph: Map<any, any[]>): boolean {
    this.writeLog("info", `[DependencyMapper] 🔍 Checking for circular dependencies`);
    
    const visited = new Set<any>();
    const recursionStack = new Set<any>();
    
    for (const service of dependencyGraph.keys()) {
      if (this.hasCircularDependency(service, dependencyGraph, visited, recursionStack)) {
        this.writeLog("error", `[DependencyMapper] ❌ Circular dependency detected!`);
        return true;
      }
    }
    
    this.writeLog("info", `[DependencyMapper] ✅ No circular dependencies found`);
    return false;
  }

  private hasCircularDependency(
    service: any, 
    graph: Map<any, any[]>, 
    visited: Set<any>, 
    recursionStack: Set<any>
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

  private writeLog(modus: "info" | "warn" | "error" | "debug", message: string, ...args: any[]) {
    if (this.logger) {
      this.logger[modus](message, ...args);
    } else {
      console[modus](message, ...args);
    }
  }
}
