import type { IRelationshipGraphService, IDocument } from "./RelationshipGraphService";
import { RelationshipGraphService } from "./RelationshipGraphService";

export interface IServiceFactory {
  createRelationshipGraphService(document: IDocument): IRelationshipGraphService;
}

export class ServiceFactory implements IServiceFactory {
  createRelationshipGraphService(document: IDocument): IRelationshipGraphService {
    return new RelationshipGraphService(document);
  }
}
