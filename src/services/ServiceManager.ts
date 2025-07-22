import { ServiceFactory, type IServiceFactory } from "./ServiceFactory";
import type { IRelationshipGraphService, IDocument } from "./RelationshipGraphService";

export interface IServiceManager {
  getRelationshipGraphService(document: IDocument): IRelationshipGraphService;
  disposeRelationshipGraphService(document: IDocument): void;
  disposeAll(): void;
}

export class ServiceManager implements IServiceManager {
  private static instance: ServiceManager;
  private readonly relationshipGraphServices = new Map<IDocument, IRelationshipGraphService>();

  private constructor(private readonly factory: IServiceFactory) {}

  static getInstance(factory: IServiceFactory = ServiceFactory.getInstance()): ServiceManager {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager(factory);
    }
    return ServiceManager.instance;
  }

  getRelationshipGraphService(document: IDocument): IRelationshipGraphService {
    let service = this.relationshipGraphServices.get(document);
    if (!service) {
      service = this.factory.createRelationshipGraphService(document);
      this.relationshipGraphServices.set(document, service);
    }
    return service;
  }

  disposeRelationshipGraphService(document: IDocument): void {
    this.relationshipGraphServices.delete(document);
  }

  disposeAll(): void {
    this.relationshipGraphServices.clear();
  }
}
