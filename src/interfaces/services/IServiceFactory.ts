// Basisklasse für alle Services mit Metadaten
export abstract class BaseService {
  abstract readonly API_NAME: string;
  abstract readonly SERVICE_TYPE: "singleton" | "factory";
}

// Generic service factory interface
export interface IServiceFactory {
  // Register a service constructor with its identifier
  registerService<T>(identifier: string, constructor: ServiceConstructor<T>): void;

  // Create a service instance by identifier
  createService<T>(identifier: string, ...args: any[]): T;

  // Check if a service is registered
  hasService(identifier: string): boolean;

  // Get all registered service identifiers
  getRegisteredServices(): string[];

  // Register all services in API
  registerAllServicesInAPI(): void;
}

// Type for service constructors
export type ServiceConstructor<T = any> = new (...args: any[]) => T;

// ✅ SERVICE_IDENTIFIERS entfernt - Klassen werden direkt als Identifier verwendet
