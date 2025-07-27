import type { IDocument, RelationshipGraphData } from "../global";

export interface IRelationshipGraphPersistenceService {
  load(document: IDocument): Promise<RelationshipGraphData>;
  save(document: IDocument, data: Partial<RelationshipGraphData> | object): Promise<void>;
}
