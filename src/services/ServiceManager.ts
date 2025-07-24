import type { IServiceManager } from "./IServiceManager";
import type { IServiceFactory } from "./IServiceFactory";
import { ServiceFactory } from "./ServiceFactory";

export class ServiceManager implements IServiceManager {
  private static instance: ServiceManager;
  private readonly serviceCache = new Map<string, Map<any, any>>();

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
  }
}
