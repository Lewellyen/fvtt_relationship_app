import type { IServiceManager } from "./IServiceManager";
import { ServiceFactory } from "./ServiceFactory";

export class ServiceManager implements IServiceManager {
  // ✅ Metadaten für API-Registrierung
  static readonly API_NAME = "serviceManager";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "ServiceManager";

  private static instance: ServiceManager;
  private readonly serviceCache = new Map<string, Map<any, any>>();
  private readonly serviceRegistry = new Map<any, any>();
  private readonly instances = new Map<any, any>();

  public constructor() {
    // ServiceManager registriert sich selbst in seiner eigenen Registry
    this.register("ServiceManager", () => this, true, []);
  }

  static getInstance(): ServiceManager {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager();
    }
    return ServiceManager.instance;
  }

  getService<T>(serviceIdentifier: any, cacheKey?: any): T {
    // ServiceFactory zur Laufzeit holen
    const factory = ServiceFactory.getInstance();

    // If no cache key provided, create service directly
    if (cacheKey === undefined) {
      return factory.createService<T>(serviceIdentifier);
    }

    // Get or create service cache for this service type
    let serviceTypeCache = this.serviceCache.get(serviceIdentifier);
    if (!serviceTypeCache) {
      serviceTypeCache = new Map<any, T>();
      this.serviceCache.set(serviceIdentifier, serviceTypeCache);
    }

    // Get cached service or create new one
    let service = serviceTypeCache.get(cacheKey);
    if (!service) {
      service = factory.createService<T>(serviceIdentifier);
      serviceTypeCache.set(cacheKey, service);
    }
    return service;
  }

  disposeService(serviceIdentifier: any, cacheKey?: any): void {
    const serviceTypeCache = this.serviceCache.get(serviceIdentifier);
    if (serviceTypeCache && cacheKey !== undefined) {
      serviceTypeCache.delete(cacheKey);
    }
  }

  disposeAll(): void {
    this.serviceCache.clear();
    this.instances.clear();
  }

  // DI Container Funktionalität hinzufügen
  register<T>(
    identifier: any,
    factory: () => T,
    singleton: boolean = true,
    dependencies: any[] = []
  ): void {
    console.log(`[ServiceManager] 📝 Registering service:`, {
      identifier: identifier.name || identifier,
      singleton,
      dependenciesCount: dependencies.length,
      dependencies: dependencies.map(d => d.name || d),
      factoryType: typeof factory
    });
    
    this.serviceRegistry.set(identifier, {
      factory,
      singleton,
      dependencies,
    });
    
    console.log(`[ServiceManager] ✅ Service registered successfully: ${identifier.name || identifier}`);
    console.log(`[ServiceManager] 📊 Registry size: ${this.serviceRegistry.size}`);
  }

  registerWithMetadata<T>(
    identifier: any,
    ServiceConstructor: new (...args: any[]) => T,
    dependencies: any[] = []
  ): void {
    console.log(`[ServiceManager] 📋 Registering with metadata:`, {
      identifier: identifier.name || identifier,
      ServiceConstructor: ServiceConstructor.name || ServiceConstructor,
      dependenciesCount: dependencies.length,
      dependencies: dependencies.map(d => d.name || d),
      metadata: {
        API_NAME: (ServiceConstructor as any).API_NAME,
        SERVICE_TYPE: (ServiceConstructor as any).SERVICE_TYPE
      }
    });

    const metadata = ServiceConstructor as any;

    this.register(
      identifier,
      () => {
        console.log(`[ServiceManager] 🏭 Creating instance of ${identifier.name || identifier}`);
        console.log(`[ServiceManager] 🔗 Resolving dependencies for ${identifier.name || identifier}:`, {
          dependencies: dependencies.map(d => d.name || d)
        });
        
        const args = dependencies.map((dep) => {
          console.log(`[ServiceManager] 🔍 Resolving dependency: ${dep.name || dep}`);
          const resolved = this.resolve(dep);
          console.log(`[ServiceManager] ✅ Resolved dependency ${dep.name || dep}:`, {
            type: typeof resolved,
            constructor: (resolved as any).constructor.name
          });
          return resolved;
        });
        
        console.log(`[ServiceManager] 🏗️ Creating instance with resolved dependencies:`, {
          identifier: identifier.name || identifier,
          argsCount: args.length,
          args: args.map(arg => (arg as any).constructor.name)
        });
        
        const instance = new ServiceConstructor(...args);
        console.log(`[ServiceManager] ✅ Instance created successfully: ${identifier.name || identifier}`);
        return instance;
      },
      metadata.SERVICE_TYPE === "singleton",
      dependencies
    );
  }

  resolve<T>(identifier: any): T {
    console.log(`[ServiceManager] 🔍 Resolving service: ${identifier.name || identifier}`);
    
    // Return existing instance if singleton
    if (this.instances.has(identifier)) {
      console.log(`[ServiceManager] ♻️ Returning cached singleton instance: ${identifier.name || identifier}`);
      return this.instances.get(identifier);
    }

    const registration = this.serviceRegistry.get(identifier);
    if (!registration) {
      console.error(`[ServiceManager] ❌ Service not registered: ${identifier.name || identifier}`);
      console.error(`[ServiceManager] 📋 Available services:`, Array.from(this.serviceRegistry.keys()).map(k => k.name || k));
      throw new Error(`Service '${identifier}' is not registered`);
    }

    console.log(`[ServiceManager] 📋 Service registration found:`, {
      identifier: identifier.name || identifier,
      singleton: registration.singleton,
      dependenciesCount: registration.dependencies.length,
      dependencies: registration.dependencies.map((d: any) => d.name || d)
    });

    // Resolve dependencies first
    console.log(`[ServiceManager] 🔗 Resolving dependencies for ${identifier.name || identifier}:`);
    const resolvedDependencies = registration.dependencies.map((dep: any) => {
      console.log(`[ServiceManager] 🔍 Resolving dependency: ${dep.name || dep}`);
      const resolved = this.resolve(dep);
      console.log(`[ServiceManager] ✅ Dependency resolved: ${dep.name || dep} -> ${(resolved as any).constructor.name}`);
      return resolved;
    });

    console.log(`[ServiceManager] 🏗️ Creating instance with resolved dependencies:`, {
      identifier: identifier.name || identifier,
      dependencies: resolvedDependencies.map((d: any) => d.constructor.name)
    });

    // Create instance with resolved dependencies
    const instance = registration.factory(...resolvedDependencies);

    // Cache if singleton
    if (registration.singleton) {
      console.log(`[ServiceManager] 💾 Caching singleton instance: ${identifier.name || identifier}`);
      this.instances.set(identifier, instance);
    }

    console.log(`[ServiceManager] ✅ Service resolved successfully: ${identifier.name || identifier}`);
    return instance;
  }

  isRegistered(identifier: any): boolean {
    return this.serviceRegistry.has(identifier);
  }

  getRegisteredServices(): any[] {
    return Array.from(this.serviceRegistry.keys());
  }

  // Service Replacement für externe Module
  replaceService<T>(identifier: string, newInstance: T): void {
    if (!this.isRegistered(identifier)) {
      throw new Error(`Service '${identifier}' is not registered`);
    }

    // Alte Instanz aus Cache entfernen
    this.instances.delete(identifier);

    // Neue Instanz setzen
    this.instances.set(identifier, newInstance);
  }

  // Service Factory Replacement
  replaceServiceFactory<T>(identifier: string, newFactory: () => T): void {
    if (!this.isRegistered(identifier)) {
      throw new Error(`Service '${identifier}' is not registered`);
    }

    const registration = this.serviceRegistry.get(identifier);
    registration.factory = newFactory;

    // Alte Instanz aus Cache entfernen
    this.instances.delete(identifier);
  }

  // Service availability check
  hasService(serviceIdentifier: any): boolean {
    const factory = ServiceFactory.getInstance();
    return factory.hasService(serviceIdentifier);
  }
}
