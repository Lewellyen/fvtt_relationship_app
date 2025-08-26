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
}

// Type for service constructors
export type ServiceConstructor<T = any> = new (...args: any[]) => T;

// Service identifiers as constants
export const SERVICE_IDENTIFIERS = {
  RELATIONSHIP_GRAPH: "RelationshipGraphService",
  RELATIONSHIP_GRAPH_PERSISTENCE: "RelationshipGraphPersistenceService",
  RELATIONSHIP_GRAPH_DEMO_DATA: "RelationshipGraphDemoDataService",
} as const;

export type ServiceIdentifier = (typeof SERVICE_IDENTIFIERS)[keyof typeof SERVICE_IDENTIFIERS];
