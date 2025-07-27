<script lang="ts">
  import type { GraphComponentProps } from "../global";
  import GraphInfoPanel from './GraphInfoPanel.svelte';
  import GraphCanvas from './GraphCanvas.svelte';
  import GraphToolbar from './GraphToolbar.svelte';
  import SidebarPanel from './SidebarPanel.svelte';
  import PropertyPanel from './PropertyPanel.svelte';
  
  // Props mit Svelte 5 Runes-Syntax
  let { nodes, edges }: GraphComponentProps = $props();

  // State für ausgewählte Elemente
  let selectedNodeId = $state<string | null>(null);
  let selectedEdgeId = $state<string | null>(null);
  
  // Add Edge Mode State
  let isAddEdgeMode = $state(false);
  let edgeSourceNodeId = $state<string | null>(null);

  // Computed values für PropertyPanel
  const selectedNode = $derived(nodes.find(n => n.id === selectedNodeId) || null);
  const selectedEdge = $derived(edges.find(e => e.id === selectedEdgeId) || null);

  // Event Handlers
  function handleNodeClick(nodeId: string) {
    if (isAddEdgeMode) {
      // In Add Edge mode, select source or target node
      if (!edgeSourceNodeId) {
        // First click - select source node
        edgeSourceNodeId = nodeId;
        selectedNodeId = nodeId;
        console.log('Source node selected for edge:', nodeId);
      } else if (edgeSourceNodeId !== nodeId) {
        // Second click - select target node and create edge
        const targetNodeId = nodeId;
        createEdge(edgeSourceNodeId, targetNodeId);
        
        // Reset Add Edge mode
        isAddEdgeMode = false;
        edgeSourceNodeId = null;
        selectedNodeId = targetNodeId;
        selectedEdgeId = null;
        console.log('Edge created from', edgeSourceNodeId, 'to', targetNodeId);
      }
    } else {
      // Normal selection mode
      selectedNodeId = nodeId;
      selectedEdgeId = null;
      console.log('Node selected:', nodeId);
    }
  }

  function handleEdgeClick(edgeId: string) {
    selectedEdgeId = edgeId;
    selectedNodeId = null;
    console.log('Edge selected:', edgeId);
  }

  function handleCanvasClick() {
    selectedNodeId = null;
    selectedEdgeId = null;
    console.log('Canvas clicked - cleared selection');
  }

  // Toolbar Event Handlers
  function handleAddNode() {
    console.log('Add Node clicked');
    // TODO: Implement add node functionality
  }

  function handleAddEdge() {
    console.log('Add Edge clicked');
    isAddEdgeMode = !isAddEdgeMode;
    if (!isAddEdgeMode) {
      // Cancel add edge mode
      edgeSourceNodeId = null;
      selectedNodeId = null;
      selectedEdgeId = null;
    }
  }

  function handleDelete() {
    console.log('Delete clicked');
    
    // Check if something is selected
    if (!selectedNodeId && !selectedEdgeId) {
      console.log('Nothing selected to delete');
      return;
    }

    // Determine what to delete and show confirmation
    let itemToDelete: string;
    let itemType: string;
    
    if (selectedEdgeId) {
      const edge = edges.find(e => e.id === selectedEdgeId);
      itemToDelete = edge?.label?.value || `Edge ${selectedEdgeId}`;
      itemType = 'edge';
    } else if (selectedNodeId) {
      const node = nodes.find(n => n.id === selectedNodeId);
      itemToDelete = node?.label?.value || `Node ${selectedNodeId}`;
      itemType = 'node';
    } else {
      return;
    }

    // Show confirmation dialog
    const confirmed = confirm(`Are you sure you want to delete this ${itemType}: "${itemToDelete}"?`);
    
    if (confirmed) {
      if (selectedEdgeId) {
        // Delete selected edge
        edges = edges.filter(e => e.id !== selectedEdgeId);
        selectedEdgeId = null;
        console.log('Edge deleted:', selectedEdgeId);
      } else if (selectedNodeId) {
        // Delete selected node and all connected edges
        edges = edges.filter(e => e.source !== selectedNodeId && e.target !== selectedNodeId);
        nodes = nodes.filter(n => n.id !== selectedNodeId);
        selectedNodeId = null;
        console.log('Node and connected edges deleted:', selectedNodeId);
      }
    }
  }

  function handleSave() {
    console.log('Save clicked');
    // TODO: Implement save functionality
  }

  function handleExport() {
    console.log('Export clicked');
    // TODO: Implement export functionality
  }

  function handleUndo() {
    console.log('Undo clicked');
    // TODO: Implement undo functionality
  }

  function handleRedo() {
    console.log('Redo clicked');
    // TODO: Implement redo functionality
  }

  // Edge Creation Function
  function createEdge(sourceId: string, targetId: string) {
    const defaultPermissions = { 
      defaultLevel: 0,
      users: []
    };
    
    const newEdge = {
      id: foundry.utils.randomID(),
      source: sourceId,
      target: targetId,
      label: { 
        value: '',
        permissions: defaultPermissions
      },
      type: 'edge',
      globalPermissions: defaultPermissions,
      cytoScapeAttributes: {
        color: '#000000',
        'line-color': '#000000',
        width: 1,
        'line-style': 'solid',
        'curve-style': 'bezier',
        'target-arrow-shape': 'none',
        'font-size': 12,
        'font-weight': 'normal',
        opacity: 1,
        'z-index': 0
      }
    };
    
    // Add the new edge to the edges array
    edges = [...edges, newEdge];
    console.log('New edge created:', newEdge);
  }

  // Property Panel Event Handlers
  function handlePropertyUpdate(data: any) {
    console.log('Property update:', data);
    // TODO: Implement property update functionality
  }

  console.log("[RelationshipGraph] Props received:", { nodes, edges });
</script>

<div class="relationship-graph-editor">
  <!-- Toolbar -->
  <GraphToolbar 
    hasSelection={!!(selectedNodeId || selectedEdgeId)}
    isAddEdgeMode={isAddEdgeMode}
    onAddNode={handleAddNode}
    onAddEdge={handleAddEdge}
    onDelete={handleDelete}
    onSave={handleSave}
    onExport={handleExport}
    onUndo={handleUndo}
    onRedo={handleRedo}
    canUndo={false}
    canRedo={false}
  />

  <!-- Main Content -->
  <div class="main-content">
    <!-- Sidebar -->
    <SidebarPanel 
      {nodes}
      {edges}
      selectedNodeId={selectedNodeId}
      selectedEdgeId={selectedEdgeId}
      onNodeClick={handleNodeClick}
      onEdgeClick={handleEdgeClick}
      onAddNode={handleAddNode}
      onAddEdge={handleAddEdge}
      onDelete={handleDelete}
    />

    <!-- Canvas -->
    <div class="canvas-container">
      <GraphCanvas 
        {nodes} 
        {edges}
        selectedNodeId={selectedNodeId}
        selectedEdgeId={selectedEdgeId}
        isAddEdgeMode={isAddEdgeMode}
        edgeSourceNodeId={edgeSourceNodeId}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        onCanvasClick={handleCanvasClick}
        onDelete={handleDelete}
        width="100%"
        height="100%"
        interactive={true}
      />
    </div>

    <!-- Property Panel -->
    <PropertyPanel 
      selectedNode={selectedNode}
      selectedEdge={selectedEdge}
      {nodes}
      onUpdate={handlePropertyUpdate}
    />
  </div>
</div>

<style>
  .relationship-graph-editor {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #f8f9fa;
  }

  /* Main Content */
  .main-content {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  /* Canvas */
  .canvas-container {
    flex: 1;
    position: relative;
    background: #f8f9fa;
  }

</style>
