export interface RelationshipNode {
  id: string;
  actorUuid?: string;
  label?: string;
}

export interface RelationshipEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  label?: string;
}

export interface RelationshipGraph {
  nodes: RelationshipNode[];
  edges: RelationshipEdge[];
}
