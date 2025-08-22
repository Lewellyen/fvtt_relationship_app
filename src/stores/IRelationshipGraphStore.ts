import type { NodeData, EdgeData } from "../global";

export interface IRelationshipGraphStore {
  // Core Data Stores
  nodes: NodeData[];
  edges: EdgeData[];

  // UI State Stores
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  isAddEdgeMode: boolean;
  isLoading: boolean;
  error: string | null;

  // History Stores
  canUndo: boolean;
  canRedo: boolean;

  // Modal Stores
  showExportModal: boolean;
  showImportModal: boolean;
  showShortcutsHelp: boolean;
  showSettingsModal: boolean;

  // Derived Stores
  selectedNode: () => NodeData | null;
  selectedEdge: () => EdgeData | null;
  graphStats: () => GraphStats;

  // Store Actions
  actions: {
    // Node Actions
    nodes: {
      add: (node: NodeData) => void;
      update: (nodeId: string, updates: Partial<NodeData>) => void;
      delete: (nodeId: string) => void;
      move: (nodeId: string, x: number, y: number) => void;
      replace: (newNodes: NodeData[]) => void;
    };

    // Edge Actions
    edges: {
      add: (edge: EdgeData) => void;
      update: (edgeId: string, updates: Partial<EdgeData>) => void;
      delete: (edgeId: string) => void;
      replace: (newEdges: EdgeData[]) => void;
    };

    // Selection Actions
    selection: {
      setNode: (nodeId: string | null) => void;
      setEdge: (edgeId: string | null) => void;
      clear: () => void;
    };

    // Mode Actions
    setAddEdgeMode: (enabled: boolean) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    // History Actions
    history: {
      updateButtons: (canUndoValue: boolean, canRedoValue: boolean) => void;
    };

    // Modal Actions
    modals: {
      showExport: () => void;
      hideExport: () => void;
      showImport: () => void;
      hideImport: () => void;
      showShortcutsHelp: () => void;
      hideShortcutsHelp: () => void;
      showSettingsModal: () => void;
      hideSettingsModal: () => void;
    };

    // Utility Actions
    reset: () => void;
  };
}

export interface GraphStats {
  nodeCount: number;
  edgeCount: number;
  averageConnections: number;
  isolatedNodes: number;
  maxDegree: number;
  minDegree: number;
}
