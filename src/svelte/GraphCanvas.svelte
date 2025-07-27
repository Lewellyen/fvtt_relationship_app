<script lang="ts">
  import type { NodeData, EdgeData } from "../global";
  import CytoscapeGraph from './CytoscapeGraph.svelte';
  
  // Props mit Svelte 5 Runes-Syntax
  const props = $props<{
    nodes: NodeData[];
    edges: EdgeData[];
    selectedNodeId?: string | null;
    selectedEdgeId?: string | null;
    isAddEdgeMode?: boolean;
    edgeSourceNodeId?: string | null;
    onNodeClick?: (nodeId: string) => void;
    onEdgeClick?: (edgeId: string) => void;
    onNodeDoubleClick?: (nodeId: string) => void;
    onEdgeDoubleClick?: (edgeId: string) => void;
    onCanvasClick?: () => void;
    onDelete?: () => void;
    width?: string;
    height?: string;
    interactive?: boolean;
  }>();

  // Default values
  const width = props.width ?? "100%";
  const height = props.height ?? "100%";
  const interactive = props.interactive ?? true;

  // Canvas state
  let isDragging = $state(false);
  let dragStartPos = $state({ x: 0, y: 0 });
  let canvasRef: HTMLDivElement;

  // Event handlers
  function handleCanvasClick(event: MouseEvent) {
    // Only trigger if clicking directly on canvas, not on nodes/edges
    if (event.target === canvasRef) {
      props.onCanvasClick?.();
    }
  }

  function handleNodeClick(nodeId: string) {
    props.onNodeClick?.(nodeId);
  }

  function handleEdgeClick(edgeId: string) {
    props.onEdgeClick?.(edgeId);
  }

  function handleNodeDoubleClick(nodeId: string) {
    props.onNodeDoubleClick?.(nodeId);
  }

  function handleEdgeDoubleClick(edgeId: string) {
    props.onEdgeDoubleClick?.(edgeId);
  }

  // Mouse event handlers for canvas interactions
  function handleMouseDown(event: MouseEvent) {
    if (event.target === canvasRef) {
      isDragging = true;
      dragStartPos = { x: event.clientX, y: event.clientY };
    }
  }

  function handleMouseMove(event: MouseEvent) {
    if (isDragging) {
      // TODO: Implement canvas panning
      console.log('Canvas dragging:', event.clientX - dragStartPos.x, event.clientY - dragStartPos.y);
    }
  }

  function handleMouseUp() {
    isDragging = false;
  }

  // Keyboard shortcuts
  function handleKeyDown(event: KeyboardEvent) {
    if (!interactive) return;

    switch (event.key) {
      case 'Delete':
      case 'Backspace':
        // Delete selected elements
        if (props.onDelete) {
          event.preventDefault();
          props.onDelete();
        }
        break;
      case 'Escape':
        // Clear selection
        if (props.onCanvasClick) {
          event.preventDefault();
          props.onCanvasClick();
        }
        break;
      case 'n':
      case 'N':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          // TODO: Add new node
          console.log('Ctrl+N pressed - Add new node');
        }
        break;
      case 'e':
      case 'E':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          // TODO: Add new edge
          console.log('Ctrl+E pressed - Add new edge');
        }
        break;
      case 's':
      case 'S':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          // TODO: Save graph
          console.log('Ctrl+S pressed - Save graph');
        }
        break;
    }
  }

  // Lifecycle
  $effect(() => {
    if (interactive) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  });
</script>

<div 
  class="graph-canvas"
  bind:this={canvasRef}
  style="width: {width}; height: {height};"
  onclick={handleCanvasClick}
  onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCanvasClick(e as any); } }}
  role="button"
  tabindex="0"
  aria-label="Graph canvas"
  onmousedown={handleMouseDown}
  onmousemove={handleMouseMove}
  onmouseup={handleMouseUp}
  onmouseleave={handleMouseUp}
>
  <!-- Cytoscape Graph -->
  <CytoscapeGraph 
    nodes={props.nodes}
    edges={props.edges}
    selectedNodeId={props.selectedNodeId}
    selectedEdgeId={props.selectedEdgeId}
    onNodeClick={handleNodeClick}
    onEdgeClick={handleEdgeClick}
    onNodeDoubleClick={handleNodeDoubleClick}
    onEdgeDoubleClick={handleEdgeDoubleClick}
    width="100%"
    height="100%"
    interactive={interactive}
  />

  <!-- Canvas Overlay for additional UI elements -->
  <div class="canvas-overlay">
    <!-- Zoom Controls -->
    <div class="zoom-controls">
      <button class="zoom-btn" title="Zoom In (Ctrl++)" aria-label="Zoom In">
        <i class="fas fa-plus"></i>
      </button>
      <button class="zoom-btn" title="Zoom Out (Ctrl+-)" aria-label="Zoom Out">
        <i class="fas fa-minus"></i>
      </button>
      <button class="zoom-btn" title="Reset Zoom (Ctrl+0)" aria-label="Reset Zoom">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <!-- Selection Info -->
    <div class="selection-info" class:hidden={!interactive}>
      <span class="selection-text">
        {#if props.nodes.length > 0}
          {props.nodes.length} nodes, {props.edges.length} edges
        {:else}
          No elements
        {/if}
        {#if props.selectedNodeId}
          <br><span class="selected-item">Selected: Node "{props.nodes.find((n: NodeData) => n.id === props.selectedNodeId)?.label?.value || props.selectedNodeId}"</span>
        {:else if props.selectedEdgeId}
          <br><span class="selected-item">Selected: Edge "{props.edges.find((e: EdgeData) => e.id === props.selectedEdgeId)?.label?.value || props.selectedEdgeId}"</span>
        {/if}
      </span>
    </div>

    <!-- Loading Indicator -->
    <div class="loading-indicator" class:hidden={true}>
      <div class="spinner"></div>
      <span>Loading...</span>
    </div>

    <!-- Add Edge Mode Indicator -->
    {#if props.isAddEdgeMode}
      <div class="add-edge-mode-indicator">
        <div class="mode-badge">
          <i class="fas fa-link"></i>
          <span>Add Edge Mode</span>
        </div>
        {#if props.edgeSourceNodeId}
          <div class="source-node-info">
            <span>Source selected. Click target node to create edge.</span>
          </div>
        {:else}
          <div class="source-node-info">
            <span>Click a node to select source.</span>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .graph-canvas {
    position: relative;
    background: #f8f9fa;
    border-radius: 4px;
    overflow: hidden;
    cursor: default;
  }

  /* Canvas Overlay */
  .canvas-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 10;
  }

  /* Zoom Controls */
  .zoom-controls {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    pointer-events: auto;
  }

  .zoom-btn {
    width: 32px;
    height: 32px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    background: white;
    color: #495057;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .zoom-btn:hover {
    background: #f8f9fa;
    border-color: #adb5bd;
  }

  .zoom-btn:active {
    background: #e9ecef;
  }

  /* Selection Info */
  .selection-info {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    font-size: 0.875rem;
    pointer-events: auto;
  }

  .selection-info.hidden {
    display: none;
  }

  .selection-text {
    font-weight: 500;
  }

  .selected-item {
    color: #3498db;
    font-weight: 600;
  }

  /* Loading Indicator */
  .loading-indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    pointer-events: auto;
  }

  .loading-indicator.hidden {
    display: none;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Add Edge Mode Indicator */
  .add-edge-mode-indicator {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(0, 123, 255, 0.9);
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    pointer-events: auto;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    z-index: 20;
  }

  .mode-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .mode-badge i {
    font-size: 1rem;
  }

  .source-node-info {
    font-size: 0.8rem;
    opacity: 0.9;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .zoom-controls {
      top: 0.5rem;
      right: 0.5rem;
    }

    .zoom-btn {
      width: 28px;
      height: 28px;
    }

    .selection-info {
      bottom: 0.5rem;
      left: 0.5rem;
      font-size: 0.75rem;
    }
  }
</style> 