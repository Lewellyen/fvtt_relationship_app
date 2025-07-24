import type { NodeData, EdgeData } from "../global";

export interface IRelationshipGraphService {
  getNodes(): NodeData[];
  getEdges(): EdgeData[];
  getNode(nodeId: string): NodeData | undefined;
  getEdge(edgeId: string): EdgeData | undefined;
  getNodeByLabel(label: string): NodeData | undefined;
  getEdgeByLabel(label: string): EdgeData | undefined;
  getNodeByType(type: string): NodeData | undefined;
  getEdgeByType(type: string): EdgeData | undefined;
  getNodeById(id: string): NodeData | undefined;
  getEdgeById(id: string): EdgeData | undefined;
  addNode(node: NodeData): Promise<void>;
  addEdge(edge: EdgeData): Promise<void>;
  updateNode(nodeId: string, updates: Partial<NodeData>): Promise<void>;
  removeNode(nodeId: string): Promise<void>;
  updateEdge(edgeId: string, updates: Partial<EdgeData>): Promise<void>;
  removeEdge(edgeId: string): Promise<void>;  
}