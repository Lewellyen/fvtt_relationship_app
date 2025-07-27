import type { RelationshipGraphData } from "../global";
import type { IRelationshipGraphValidationService } from "./IRelationshipGraphValidationService";

export class RelationshipGraphValidationService implements IRelationshipGraphValidationService {
  validateGraph(graph: RelationshipGraphData): boolean {
    return Array.isArray(graph.nodes) && Array.isArray(graph.edges);
  }
}
