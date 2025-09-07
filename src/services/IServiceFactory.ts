// Basisklasse für alle Services mit Metadaten
export abstract class BaseService {
  abstract readonly API_NAME: string;
  abstract readonly SERVICE_TYPE: 'singleton' | 'factory';
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

// Service identifiers as constants
export const SERVICE_IDENTIFIERS = {
  // Cross-Cutting Concerns
  FOUNDRY_LOGGER: "FoundryLogger",
  CONSOLE_ERROR_HANDLER: "ConsoleErrorHandler",
  FOUNDRY_ADAPTER: "FoundryAdapter",
  
  // Core Services
  MODULE_INITIALIZER: "ModuleInitializer",
  REGISTRATION_SERVICE: "RegistrationService",
  
  // Business Services
  RELATIONSHIP_GRAPH: "RelationshipGraphService",
  RELATIONSHIP_GRAPH_PERSISTENCE: "RelationshipGraphPersistenceService",
  RELATIONSHIP_GRAPH_DEMO_DATA: "RelationshipGraphDemoDataService",
  NOTIFICATION: "NotificationService", // ✅ Test-Service hinzugefügt
} as const;

export type ServiceIdentifier = (typeof SERVICE_IDENTIFIERS)[keyof typeof SERVICE_IDENTIFIERS];
