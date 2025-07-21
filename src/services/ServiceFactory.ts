import type { IRelationshipGraphService } from './RelationshipGraphService';
import { RelationshipGraphService } from './RelationshipGraphService';

export interface IServiceFactory {
  createRelationshipGraphService(document: any): IRelationshipGraphService;
}

export class ServiceFactory implements IServiceFactory {
  createRelationshipGraphService(document: any): IRelationshipGraphService {
    return new RelationshipGraphService(document);
  }
}
