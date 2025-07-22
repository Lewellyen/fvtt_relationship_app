import type { IRelationshipGraphService, IDocument } from "./RelationshipGraphService";
import { RelationshipGraphService } from "./RelationshipGraphService";

export interface IServiceFactory {
  createRelationshipGraphService(document: IDocument): IRelationshipGraphService;
}

export class ServiceFactory implements IServiceFactory {
  private static instance: ServiceFactory;

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  createRelationshipGraphService(document: IDocument): IRelationshipGraphService {
    return new RelationshipGraphService(document);
  }
}
