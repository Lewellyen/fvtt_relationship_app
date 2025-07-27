import type { RelationshipGraphData } from "../global";

export interface IRelationshipGraphCytoscapeService {
  initialize(container: HTMLElement, graph: RelationshipGraphData): any;
  destroy(): void;
}
