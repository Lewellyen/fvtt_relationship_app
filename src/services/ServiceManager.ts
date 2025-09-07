import type { IServiceManager } from "./IServiceManager";
import type { IServiceFactory, IServiceMetadata } from "./IServiceFactory";
import { ServiceFactory } from "./ServiceFactory";

export class ServiceManager implements IServiceManager {
  private static instance: ServiceManager;
  private readonly serviceCache = new Map<string, Map<any, any>>();
  private readonly serviceRegistry = new Map<string, any>();
  private readonly instances = new Map<string, any>();

  private constructor(private readonly factory: IServiceFactory) {}

  static getInstance(factory: IServiceFactory = ServiceFactory.getInstance()): ServiceManager {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager(factory);
    }
    return ServiceManager.instance;
  }

  getService<T>(serviceIdentifier: string, cacheKey?: any, ...args: any[]): T {
    // If no cache key provided, create service directly
    if (cacheKey === undefined) {
      return this.factory.createService<T>(serviceIdentifier, ...args);
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
      service = this.factory.createService<T>(serviceIdentifier, ...args);
      serviceTypeCache.set(cacheKey, service);
    }
    return service;
  }

  disposeService(serviceIdentifier: string, cacheKey?: any): void {
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
  register<T>(identifier: string, factory: () => T, singleton: boolean = true, dependencies: string[] = []): void {
    this.serviceRegistry.set(identifier, {
      factory,
      singleton,
      dependencies
    });
  }

  registerWithMetadata<T>(identifier: string, ServiceConstructor: new (...args: any[]) => T, dependencies: string[] = []): void {
    const metadata = (ServiceConstructor as any) as IServiceMetadata;
    
    this.register(
      identifier,
      () => {
        const args = dependencies.map(dep => this.resolve(dep));
        return new ServiceConstructor(...args);
      },
      metadata.SERVICE_TYPE === 'singleton',
      dependencies
    );
  }

  resolve<T>(identifier: string): T {
    // Return existing instance if singleton
    if (this.instances.has(identifier)) {
      return this.instances.get(identifier);
    }

    const registration = this.serviceRegistry.get(identifier);
    if (!registration) {
      throw new Error(`Service '${identifier}' is not registered`);
    }

    // Resolve dependencies first
    const resolvedDependencies = registration.dependencies.map((dep: string) => this.resolve(dep));
    
    // Create instance with resolved dependencies
    const instance = registration.factory(...resolvedDependencies);

    // Cache if singleton
    if (registration.singleton) {
      this.instances.set(identifier, instance);
    }

    return instance;
  }

  isRegistered(identifier: string): boolean {
    return this.serviceRegistry.has(identifier);
  }

  getRegisteredServices(): string[] {
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
}
