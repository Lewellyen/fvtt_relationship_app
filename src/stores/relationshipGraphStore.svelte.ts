import type { GraphStats } from "./IRelationshipGraphStore";
import { CytoscapeCRUDService } from "../services/CytoscapeCRUDService";

// Create a store class to manage all state
class RelationshipGraphStore {
  // Core Data Stores using Svelte 5 Runes
  cytoscapeService = $state<CytoscapeCRUDService | null>(null);
  graphJournalId = $state<string | null>(null);

  // UI State Stores
  selectedNodeId = $state<string | null>(null);
  selectedEdgeId = $state<string | null>(null);
  isAddEdgeMode = $state(false);
  isLoading = $state(false);
  error = $state<string | null>(null);

  // Filter Stores
  currentFilters = $state<{
    groups?: string[];
    types?: string[];
    minImportance?: number;
    factions?: string[];
    locations?: string[];
    searchTerm?: string;
  }>({});

  // History Stores
  canUndo = $state(false);
  canRedo = $state(false);

  // Modal Stores
  showExportModal = $state(false);
  showImportModal = $state(false);
  showShortcutsHelpModal = $state(false);
  showSettingsModal = $state(false);

  // Constructor without $effect (effects should be in components)
  constructor() {
    // No effects here - they should be in components that use this store
  }

  // Derived Stores using Svelte 5 Runes
  get selectedNode() {
    if (!this.cytoscapeService) return null;
    return this.cytoscapeService.getNode(this.selectedNodeId || "");
  }

  get selectedEdge() {
    if (!this.cytoscapeService) return null;
    return this.cytoscapeService.getEdge(this.selectedEdgeId || "");
  }

  get graphStats(): GraphStats {
    if (!this.cytoscapeService) {
      return {
        nodeCount: 0,
        edgeCount: 0,
        averageConnections: 0,
        isolatedNodes: 0,
        maxDegree: 0,
        minDegree: 0,
      };
    }

    const nodes = this.cytoscapeService.getAllNodes();
    const edges = this.cytoscapeService.getAllEdges();
    const nodeCount = nodes.length;
    const edgeCount = edges.length;
    const averageConnections = nodeCount > 0 ? edgeCount / nodeCount : 0;

    // Calculate isolated nodes
    const isolatedNodes = nodes.filter((node) => {
      const nodeEdges = edges.filter(
        (edge) => edge.data("source") === node.id() || edge.data("target") === node.id()
      );
      return nodeEdges.length === 0;
    }).length;

    // Calculate degree statistics
    const nodeDegrees = nodes.map((node) => {
      const nodeEdges = edges.filter(
        (edge) => edge.data("source") === node.id() || edge.data("target") === node.id()
      );
      return nodeEdges.length;
    });

    const maxDegree = nodeDegrees.length > 0 ? Math.max(...nodeDegrees) : 0;
    const minDegree = nodeDegrees.length > 0 ? Math.min(...nodeDegrees) : 0;

    return {
      nodeCount,
      edgeCount,
      averageConnections,
      isolatedNodes,
      maxDegree,
      minDegree,
    };
  }

  // Initialization
  async initialize(graphJournalUuid: string) {
    this.setLoading(true);
    this.setError(null);

    try {
      this.graphJournalId = graphJournalUuid;
      this.cytoscapeService = new CytoscapeCRUDService(graphJournalUuid);
      await this.cytoscapeService.initialize();
      console.log("Cytoscape Service initialized successfully");
    } catch (error) {
      this.setError(`Failed to initialize graph: ${error}`);
      console.error("Initialization error:", error);
    } finally {
      this.setLoading(false);
    }
  }

  // Node Actions
  async addNode(nodeData: any) {
    if (!this.cytoscapeService) return;

    try {
      await this.cytoscapeService.addNode(nodeData);
      console.log(`Node added: ${nodeData.name}`);
    } catch (error) {
      this.setError(`Failed to add node: ${error}`);
    }
  }

  async updateNode(nodeId: string, updates: any) {
    if (!this.cytoscapeService) return;

    try {
      await this.cytoscapeService.updateNode(nodeId, updates);
      console.log(`Node updated: ${nodeId}`);
    } catch (error) {
      this.setError(`Failed to update node: ${error}`);
    }
  }

  async deleteNode(nodeId: string) {
    if (!this.cytoscapeService) return;

    try {
      await this.cytoscapeService.removeNode(nodeId);

      // Auto-clear selection when nodes are deleted
      if (this.selectedNodeId === nodeId) {
        this.selectedNodeId = null;
      }

      console.log(`Node deleted: ${nodeId}`);
    } catch (error) {
      this.setError(`Failed to delete node: ${error}`);
    }
  }

  // Edge Actions
  async addEdge(sourceId: string, targetId: string, edgeData: any) {
    if (!this.cytoscapeService) return;

    try {
      await this.cytoscapeService.addEdge(sourceId, targetId, edgeData);
      console.log(`Edge added: ${sourceId} -> ${targetId}`);
    } catch (error) {
      this.setError(`Failed to add edge: ${error}`);
    }
  }

  async updateEdge(edgeId: string, updates: any) {
    if (!this.cytoscapeService) return;

    try {
      await this.cytoscapeService.updateEdge(edgeId, updates);
      console.log(`Edge updated: ${edgeId}`);
    } catch (error) {
      this.setError(`Failed to update edge: ${error}`);
    }
  }

  async deleteEdge(edgeId: string) {
    if (!this.cytoscapeService) return;

    try {
      await this.cytoscapeService.removeEdge(edgeId);

      // Auto-clear selection when edges are deleted
      if (this.selectedEdgeId === edgeId) {
        this.selectedEdgeId = null;
      }

      console.log(`Edge deleted: ${edgeId}`);
    } catch (error) {
      this.setError(`Failed to delete edge: ${error}`);
    }
  }

  // Filter Actions
  applyFilters(filters: any) {
    if (!this.cytoscapeService) return [];

    this.currentFilters = filters;
    return this.cytoscapeService.filterByComplexCriteria(filters);
  }

  filterByGroup(groupName: string) {
    if (!this.cytoscapeService) return [];
    return this.cytoscapeService.filterByGroup(groupName);
  }

  filterByType(nodeType: string) {
    if (!this.cytoscapeService) return [];
    return this.cytoscapeService.filterByType(nodeType);
  }

  searchByName(searchTerm: string) {
    if (!this.cytoscapeService) return [];
    return this.cytoscapeService.searchByName(searchTerm);
  }

  // Selection Actions
  setNode(nodeId: string | null) {
    this.selectedNodeId = nodeId;
    this.selectedEdgeId = null;
  }

  setEdge(edgeId: string | null) {
    this.selectedEdgeId = edgeId;
    this.selectedNodeId = null;
  }

  clearSelection() {
    this.selectedNodeId = null;
    this.selectedEdgeId = null;
  }

  // Mode Actions
  setAddEdgeMode(enabled: boolean) {
    this.isAddEdgeMode = enabled;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;

    // Disable interactions while loading
    if (loading) {
      this.isAddEdgeMode = false;
    }
  }

  setError(errorMessage: string | null) {
    this.error = errorMessage;

    // Log error changes
    if (errorMessage) {
      console.error("Relationship Graph Error:", errorMessage);
    }
  }

  // History Actions
  updateHistoryButtons(canUndoValue: boolean, canRedoValue: boolean) {
    this.canUndo = canUndoValue;
    this.canRedo = canRedoValue;
  }

  // Modal Actions
  showExport() {
    this.showExportModal = true;
  }

  hideExport() {
    this.showExportModal = false;
  }

  showImport() {
    this.showImportModal = true;
  }

  hideImport() {
    this.showImportModal = false;
  }

  showShortcutsHelp() {
    this.showShortcutsHelpModal = true;
  }

  hideShortcutsHelp() {
    this.showShortcutsHelpModal = false;
  }

  showSettings() {
    this.showSettingsModal = true;
  }

  hideSettings() {
    this.showSettingsModal = false;
  }

  // Layout Actions
  async applyLayout(layoutName: string) {
    if (!this.cytoscapeService) return;

    try {
      this.setLoading(true);
      await this.cytoscapeService.applyLayout(layoutName);
      console.log(`Layout applied: ${layoutName}`);
    } catch (error) {
      this.setError(`Failed to apply layout: ${error}`);
    } finally {
      this.setLoading(false);
    }
  }

  // Export/Import Actions
  exportElements() {
    if (!this.cytoscapeService) return null;
    return this.cytoscapeService.exportElements();
  }

  importElements(elements: any) {
    if (!this.cytoscapeService) return;

    try {
      this.cytoscapeService.importElements(elements);
      console.log("Elements imported successfully");
    } catch (error) {
      this.setError(`Failed to import elements: ${error}`);
    }
  }

  // Utility Actions
  reset() {
    this.cytoscapeService = null;
    this.graphJournalId = null;
    this.selectedNodeId = null;
    this.selectedEdgeId = null;
    this.isAddEdgeMode = false;
    this.isLoading = false;
    this.error = null;
    this.canUndo = false;
    this.canRedo = false;
    this.currentFilters = {};
    this.showExportModal = false;
    this.showImportModal = false;
    this.showShortcutsHelpModal = false;
    this.showSettingsModal = false;
  }

  // Getter für Cytoscape-Instanz
  getCytoscape() {
    return this.cytoscapeService?.getCytoscape() || null;
  }
}

// Create singleton instance
export const relationshipGraphStore = new RelationshipGraphStore();

// Export for backward compatibility
export default relationshipGraphStore;
