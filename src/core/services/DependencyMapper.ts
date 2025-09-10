import type { IServiceRegistry, IDependencyMapper } from "../../interfaces";
import { ServiceRegistry } from "../../services/ServiceRegistry";

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
  static readonly DEPENDENCIES = [ServiceRegistry]; // ✅ Dependencies explizit definiert

  private static instance: DependencyMapper;
  private readonly hardcodedDependencies = new Map<any, any[]>();
  private hardcodedDependenciesInitialized = false;

  constructor(private serviceRegistry: IServiceRegistry) {
    // Hardcoded Dependencies werden lazy initialisiert
  }

  static getInstance(serviceRegistry: IServiceRegistry): DependencyMapper {
    if (!DependencyMapper.instance) {
      DependencyMapper.instance = new DependencyMapper(serviceRegistry);
    }
    return DependencyMapper.instance;
  }

  /**
   * Dependency Graph für alle Services erstellen
   * Single Source of Truth: Holt Services von ServiceRegistry
   */
  buildDependencyGraph(): Map<any, any[]> {
    console.log(`[DependencyMapper] 🗺️ Building dependency graph`);
    
    // Hardcoded Dependencies lazy initialisieren
    this.initializeHardcodedDependencies();
    
    const graph = new Map();
    const allServices = this.serviceRegistry.getAllServices(); // ← Von ServiceRegistry
    
    console.log(`[DependencyMapper] 📋 Processing ${allServices.length} services from ServiceRegistry`);
    
    for (const ServiceClass of allServices) {
      console.log(`[DependencyMapper] 🔍 Analyzing dependencies for: ${ServiceClass.name || ServiceClass}`);
      
      const dependencies = this.extractDependencies(ServiceClass);
      graph.set(ServiceClass, dependencies);
      
      console.log(`[DependencyMapper] 🔗 Dependencies for ${ServiceClass.name || ServiceClass}:`, {
        count: dependencies.length,
        dependencies: dependencies.map(d => d.name || d)
      });
    }
    
    console.log(`[DependencyMapper] ✅ Dependency graph built with ${graph.size} services`);
    return graph;
  }

  /**
   * Dependencies für einen Service extrahieren
   */
  extractDependencies(serviceClass: any): any[] {
    console.log(`[DependencyMapper] 🔍 Extracting dependencies for: ${serviceClass.name || serviceClass}`);
    
    // 1. Versuche static readonly DEPENDENCIES zu extrahieren
    const staticDependencies = this.extractStaticDependencies(serviceClass);
    if (staticDependencies.length > 0) {
      console.log(`[DependencyMapper] 📋 Using static dependencies:`, staticDependencies.map(d => d.name || d));
      return staticDependencies;
    }

    // 2. Fallback: Hardcoded Dependencies (nur für Services ohne static DEPENDENCIES)
    const hardcodedDeps = this.getHardcodedDependencies(serviceClass);
    
    // ⚠️ WARNUNG: Service hat keine static readonly DEPENDENCIES!
    if (hardcodedDeps.length > 0) {
      console.warn(`[DependencyMapper] ⚠️ WARNING: Service '${serviceClass.name || serviceClass}' has no static readonly DEPENDENCIES! Using hardcoded fallback:`, hardcodedDeps.map(d => d.name || d));
      console.warn(`[DependencyMapper] ⚠️ Consider adding: static readonly DEPENDENCIES = [${hardcodedDeps.map(d => d.name || d).join(', ')}];`);
    } else {
      // ✅ Service hat keine Dependencies - das ist völlig in Ordnung!
      console.log(`[DependencyMapper] ✅ Service '${serviceClass.name || serviceClass}' has no dependencies - this is perfectly fine!`);
    }
    
    return hardcodedDeps;
  }

  /**
   * Dependencies aus static readonly DEPENDENCIES property extrahieren
   */
  private extractStaticDependencies(serviceClass: any): any[] {
    const className = serviceClass.CLASS_NAME || serviceClass.className || serviceClass.name || serviceClass;
    console.log(`[DependencyMapper] 📋 Checking static dependencies for: ${className}`);
    
    try {
      // Prüfe explizite static readonly DEPENDENCIES Definition
      if (serviceClass.DEPENDENCIES && Array.isArray(serviceClass.DEPENDENCIES)) {
        const filteredDependencies = serviceClass.DEPENDENCIES.filter(Boolean);
        console.log(`[DependencyMapper] 📋 Found static dependencies for ${className}:`, {
          original: serviceClass.DEPENDENCIES,
          filtered: filteredDependencies,
          count: filteredDependencies.length
        });
        return filteredDependencies;
      }

      console.log(`[DependencyMapper] 📋 No static dependencies found for: ${className}`);
      return [];
    } catch (error) {
      console.error(`[DependencyMapper] 📋 Error extracting static dependencies for ${className}:`, error);
      return [];
    }
  }

  /**
   * Hardcoded Dependencies als Fallback (nur für Services ohne static DEPENDENCIES)
   */
  private getHardcodedDependencies(serviceClass: any): any[] {
    // Versuche zuerst mit der aktuellen Klasse
    let dependencies = this.hardcodedDependencies.get(serviceClass) || [];
    
    // Falls nicht gefunden, versuche mit der ursprünglichen Klasse aus SERVICE_CONFIG
    if (dependencies.length === 0) {
      const serviceName = this.getServiceNameFromClass(serviceClass);
      if (serviceName) {
        const originalClass = this.serviceRegistry.getServiceConstructor(serviceName);
        dependencies = this.hardcodedDependencies.get(originalClass) || [];
      }
    }
    
    console.log(`[DependencyMapper] 🔧 Hardcoded dependencies for ${serviceClass.name || serviceClass}:`, {
      found: dependencies.length > 0,
      dependencies: dependencies.map(d => d.name || d)
    });
    return dependencies;
  }
  
  
  
  /**
   * Service-Name aus der Klasse ermitteln (für verkürzte Klassen)
   */
  private getServiceNameFromClass(serviceClass: any): string | null {
    // Durchlaufe alle Services und finde den passenden Namen
    const allServices = this.serviceRegistry.getAllServices();
    for (const serviceName of allServices) {
      const originalClass = this.serviceRegistry.getServiceConstructor(serviceName);
      if (originalClass === serviceClass) {
        return serviceName;
      }
    }
    return null;
  }

  /**
   * Hardcoded Dependencies initialisieren (nur für Services ohne static DEPENDENCIES)
   * TODO: Diese sollten aus einer Konfigurationsdatei kommen
   */
  private initializeHardcodedDependencies(): void {
    if (this.hardcodedDependenciesInitialized) {
      return; // Bereits initialisiert
    }
    
    console.log(`[DependencyMapper] 🔧 Initializing hardcoded dependencies (fallback only)`);
    
    // Services aus dem Registry extrahieren (jetzt String-Namen)
    const FoundryLogger = this.serviceRegistry.getServiceConstructor('FoundryLogger');
    const ConsoleErrorHandler = this.serviceRegistry.getServiceConstructor('ConsoleErrorHandler');
    const NotificationService = this.serviceRegistry.getServiceConstructor('NotificationService');
    const FoundryAdapter = this.serviceRegistry.getServiceConstructor('FoundryAdapter');
    const CSSManager = this.serviceRegistry.getServiceConstructor('CSSManager');
    const SvelteManager = this.serviceRegistry.getServiceConstructor('SvelteManager');
    const RegistrationService = this.serviceRegistry.getServiceConstructor('RegistrationService');
    const ModuleInitializer = this.serviceRegistry.getServiceConstructor('ModuleInitializer');
    const ServiceRegistrar = this.serviceRegistry.getServiceConstructor('ServiceRegistrar');
    const APIManager = this.serviceRegistry.getServiceConstructor('APIManager');
    const ServiceRegistry = this.serviceRegistry.getServiceConstructor('ServiceRegistry');

    // Hardcoded Dependencies mit den tatsächlichen Klassen setzen
    // (die verkürzten Namen werden zur Laufzeit verwendet)
    this.hardcodedDependencies.set(FoundryLogger, [FoundryAdapter]);
    this.hardcodedDependencies.set(ConsoleErrorHandler, [FoundryLogger, FoundryAdapter]);
    this.hardcodedDependencies.set(NotificationService, [FoundryAdapter, FoundryLogger]);
    
    this.hardcodedDependencies.set(CSSManager, [FoundryLogger]);
    this.hardcodedDependencies.set(SvelteManager, [FoundryLogger]);
    
    // KRITISCH: Hardcoded Dependencies mit den tatsächlichen Klassen setzen
    // (nicht mit verkürzten Namen, da diese nicht deterministisch sind!)
    this.hardcodedDependencies.set(CSSManager, [FoundryLogger]);
    this.hardcodedDependencies.set(SvelteManager, [FoundryLogger]);
    
    console.log(`[DependencyMapper] 🔧 Set hardcoded dependencies with original classes:`, {
      CSSManager: this.hardcodedDependencies.has(CSSManager),
      SvelteManager: this.hardcodedDependencies.has(SvelteManager)
    });
    
    // Debug: Log alle gesetzten Dependencies
    console.log(`[DependencyMapper] 🔧 Set hardcoded dependencies:`, {
      FoundryLogger: this.hardcodedDependencies.has(FoundryLogger),
      CSSManager: this.hardcodedDependencies.has(CSSManager),
      SvelteManager: this.hardcodedDependencies.has(SvelteManager)
    });
    
    
    this.hardcodedDependencies.set(RegistrationService, [FoundryLogger, ConsoleErrorHandler]);
    this.hardcodedDependencies.set(ModuleInitializer, [FoundryLogger, ConsoleErrorHandler, RegistrationService]);
    
    this.hardcodedDependencies.set(ServiceRegistrar, [ServiceRegistry]);
    this.hardcodedDependencies.set(APIManager, [
      ServiceRegistry, 
    ]);
    
    this.hardcodedDependenciesInitialized = true;
    console.log(`[DependencyMapper] ✅ Initialized ${this.hardcodedDependencies.size} hardcoded dependencies`);
  }

  /**
   * Zirkuläre Dependencies prüfen
   */
  checkCircularDependencies(dependencyGraph: Map<any, any[]>): boolean {
    console.log(`[DependencyMapper] 🔍 Checking for circular dependencies`);
    
    const visited = new Set<any>();
    const recursionStack = new Set<any>();
    
    for (const service of dependencyGraph.keys()) {
      if (this.hasCircularDependency(service, dependencyGraph, visited, recursionStack)) {
        console.error(`[DependencyMapper] ❌ Circular dependency detected!`);
        return true;
      }
    }
    
    console.log(`[DependencyMapper] ✅ No circular dependencies found`);
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
}
