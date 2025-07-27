import type { IRelationshipGraphService } from "./IRelationshipGraphService";

export interface IRelationshipGraphDemoDataService {
  createDemoData(service: IRelationshipGraphService): Promise<void>;
}
