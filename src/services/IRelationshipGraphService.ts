import type { NodeData, EdgeData } from "../models/RelationsShipGraphModel";

export interface IRelationshipGraphService {
  getNodes(): NodeData[];
  getEdges(): EdgeData[];
  addNode(node: NodeData): Promise<void>;
  addEdge(edge: EdgeData): Promise<void>;
  updateNode(nodeId: string, updates: Partial<NodeData>): Promise<void>;
  removeNode(nodeId: string): Promise<void>;
  updateEdge(edgeId: string, updates: Partial<EdgeData>): Promise<void>;
  removeEdge(edgeId: string): Promise<void>;
}

export type { NodeData, EdgeData };
