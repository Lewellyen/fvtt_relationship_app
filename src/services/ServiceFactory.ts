import type { IServiceFactory, ServiceConstructor } from "./IServiceFactory";
import { SERVICE_IDENTIFIERS } from "./IServiceFactory";

// Re-export SERVICE_IDENTIFIERS for convenience
export { SERVICE_IDENTIFIERS };
import { RelationshipGraphService } from "./RelationshipGraphService";
import { RelationshipGraphPersistenceService } from "./RelationshipGraphPersistenceService";
import { RelationshipGraphCytoscapeService } from "./RelationshipGraphCytoscapeService";
import { RelationshipGraphDemoDataService } from "./RelationshipGraphDemoDataService";

export class ServiceFactory implements IServiceFactory {
  private static instance: ServiceFactory;
  private readonly serviceRegistry = new Map<string, ServiceConstructor>();

  private constructor() {
    this.registerDefaultServices();
  }

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  registerService<T>(identifier: string, constructor: ServiceConstructor<T>): void {
    this.serviceRegistry.set(identifier, constructor);
  }

  createService<T>(identifier: string, ...args: any[]): T {
    const ServiceConstructor = this.serviceRegistry.get(identifier);
    if (!ServiceConstructor) {
      throw new Error(
        `Service '${identifier}' is not registered. Available services: ${this.getRegisteredServices().join(", ")}`
      );
    }
    return new ServiceConstructor(...args) as T;
  }

  hasService(identifier: string): boolean {
    return this.serviceRegistry.has(identifier);
  }

  getRegisteredServices(): string[] {
    return Array.from(this.serviceRegistry.keys());
  }

  // Register default services
  private registerDefaultServices(): void {
    this.registerService(SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH, RelationshipGraphService);
    this.registerService(
      SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_PERSISTENCE,
      RelationshipGraphPersistenceService
    );
    this.registerService(
      SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_CYTOSCAPE,
      RelationshipGraphCytoscapeService
    );
    this.registerService(
      SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_DEMO_DATA,
      RelationshipGraphDemoDataService
    );
  }
}
