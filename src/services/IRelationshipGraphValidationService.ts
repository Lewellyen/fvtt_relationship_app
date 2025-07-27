import type { RelationshipGraphData } from "../global";

export interface IRelationshipGraphValidationService {
  validateGraph(graph: RelationshipGraphData): boolean;
}
