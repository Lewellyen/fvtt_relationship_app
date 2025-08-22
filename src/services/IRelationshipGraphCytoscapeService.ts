import type { RelationshipGraphData, NodeData, EdgeData } from "../global";

export interface IRelationshipGraphCytoscapeService {
  // Core Cytoscape Operations
  initialize(container: HTMLElement, graph: RelationshipGraphData): any;
  destroy(): void;

  // Graph Manipulation
  addNode(node: NodeData): void;
  updateNode(nodeId: string, updates: Partial<NodeData>): void;
  removeNode(nodeId: string): void;
  addEdge(edge: EdgeData): void;
  updateEdge(edgeId: string, updates: Partial<EdgeData>): void;
  removeEdge(edgeId: string): void;

  // Layout Management
  applyLayout(layoutName: string, options?: any): Promise<void>;
  getAvailableLayouts(): string[];
  getCurrentLayout(): string;

  // Interaction Management
  enablePanning(enabled: boolean): void;
  enableZooming(enabled: boolean): void;
  enableSelection(enabled: boolean): void;

  // Event Handling
  onNodeClick(callback: (nodeId: string) => void): void;
  onEdgeClick(callback: (edgeId: string) => void): void;
  onCanvasClick(callback: () => void): void;
  onNodeDrag(callback: (nodeId: string, x: number, y: number) => void): void;

  // Styling
  updateNodeStyle(nodeId: string, style: any): void;
  updateEdgeStyle(edgeId: string, style: any): void;
  updateGlobalStyle(style: any): void;

  // Performance
  enableAnimation(enabled: boolean): void;
  setAnimationDuration(duration: number): void;

  // Cleanup
  cleanup(): void;
}
