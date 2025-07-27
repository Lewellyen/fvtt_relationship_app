<script lang="ts">
  import type { NodeData, EdgeData, CytoGraphNodeAttributes, CytoGraphEdgeAttributes } from "../global";
  import NodeEditor from './NodeEditor.svelte';
  import EdgeEditor from './EdgeEditor.svelte';

  // Props mit Svelte 5 Runes-Syntax
  const props = $props<{
    selectedNode?: NodeData | null;
    selectedEdge?: EdgeData | null;
    nodes?: NodeData[];
    onUpdate?: (data: any) => void;
  }>();

  // Local state
  let activeTab = $state<'basic' | 'visual' | 'permissions' | 'descriptions' | 'effects'>('basic');

  // Computed values
  const hasSelection = $derived(!!(props.selectedNode || props.selectedEdge));
  const isNode = $derived(!!props.selectedNode);
  const isEdge = $derived(!!props.selectedEdge);

  // Event handlers
  function handleTabClick(tab: 'basic' | 'visual' | 'permissions' | 'descriptions' | 'effects') {
    activeTab = tab;
  }

  function handleUpdate(data: any) {
    props.onUpdate?.(data);
  }

  // Handler für Node-Updates
  function handleNodeUpdate(nodeId: string, updates: Partial<CytoGraphNodeAttributes>) {
    if (props.onUpdate) {
      props.onUpdate({ type: 'node', nodeId, updates });
    }
  }

  // Handler für Edge-Updates
  function handleEdgeUpdate(edgeId: string, updates: Partial<CytoGraphEdgeAttributes>) {
    if (props.onUpdate) {
      props.onUpdate({ type: 'edge', edgeId, updates });
    }
  }
</script>

<div class="property-panel">
  {#if hasSelection}
    <!-- Header with selection info -->
    <div class="property-header">
      <div class="selection-info">
        <div class="selection-type">
          <i class="fas {isNode ? 'fa-circle' : 'fa-link'}"></i>
          {isNode ? 'Node' : 'Edge'} Properties
        </div>
        <div class="selection-name">
          {#if isNode}
            {props.selectedNode?.label?.value || props.selectedNode?.id || 'Unnamed Node'}
          {:else}
            {props.selectedEdge?.label?.value || `${props.selectedEdge?.source} → ${props.selectedEdge?.target}` || 'Unnamed Edge'}
          {/if}
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="tab-navigation">
      <button 
        class="tab-btn {activeTab === 'basic' ? 'active' : ''}"
        onclick={() => handleTabClick('basic')}
        title="Basic properties"
      >
        <i class="fas fa-info-circle"></i>
        <span class="tab-label">Basic</span>
      </button>
      <button 
        class="tab-btn {activeTab === 'visual' ? 'active' : ''}"
        onclick={() => handleTabClick('visual')}
        title="Visual settings"
      >
        <i class="fas fa-palette"></i>
        <span class="tab-label">Visual</span>
      </button>
      <button 
        class="tab-btn {activeTab === 'permissions' ? 'active' : ''}"
        onclick={() => handleTabClick('permissions')}
        title="Permissions"
      >
        <i class="fas fa-shield-alt"></i>
        <span class="tab-label">Permissions</span>
      </button>
      <button 
        class="tab-btn {activeTab === 'descriptions' ? 'active' : ''}"
        onclick={() => handleTabClick('descriptions')}
        title="Descriptions"
      >
        <i class="fas fa-file-alt"></i>
        <span class="tab-label">Descriptions</span>
      </button>
      {#if isEdge}
        <button 
          class="tab-btn {activeTab === 'effects' ? 'active' : ''}"
          onclick={() => handleTabClick('effects')}
          title="Relationship effects"
        >
          <i class="fas fa-magic"></i>
          <span class="tab-label">Effects</span>
        </button>
      {/if}
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      {#if isNode}
        <!-- Node Editor für alle Tabs -->
        <NodeEditor
          node={props.selectedNode}
          onUpdate={handleNodeUpdate}
        />
      {:else if isEdge}
        <!-- Edge Editor -->
        <EdgeEditor
          edge={props.selectedEdge}
          nodes={props.nodes}
          onUpdate={handleEdgeUpdate}
        />
      {/if}
    </div>

  {:else}
    <!-- No Selection State -->
    <div class="no-selection">
      <div class="no-selection-icon">
        <i class="fas fa-mouse-pointer"></i>
      </div>
      <h3>No Selection</h3>
      <p>Select a node or edge to edit its properties</p>
    </div>
  {/if}
</div>

<style>
  .property-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: white;
    border-left: 1px solid #dee2e6;
  }

  /* Header */
  .property-header {
    padding: 1rem;
    border-bottom: 1px solid #dee2e6;
  }

  .selection-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .selection-type {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #6c757d;
    font-weight: 500;
  }

  .selection-name {
    font-size: 1rem;
    font-weight: 600;
    color: #495057;
    word-break: break-word;
  }

  /* Tab Navigation */
  .tab-navigation {
    display: flex;
    border-bottom: 1px solid #dee2e6;
    overflow-x: auto;
  }

  .tab-btn {
    flex: 1;
    min-width: 80px;
    padding: 0.75rem 0.5rem;
    border: none;
    background: none;
    color: #6c757d;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    transition: all 0.2s;
  }

  .tab-btn:hover {
    background-color: #f8f9fa;
  }

  .tab-btn.active {
    color: #007bff;
    border-bottom: 2px solid #007bff;
    background-color: #f8f9fa;
  }

  .tab-btn i {
    font-size: 1rem;
  }

  .tab-label {
    font-weight: 500;
  }

  /* Tab Content */
  .tab-content {
    flex: 1;
    overflow-y: auto;
  }

  /* No Selection State */
  .no-selection {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
    color: #6c757d;
  }

  .no-selection-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .no-selection h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .no-selection p {
    margin: 0;
    font-size: 0.875rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .tab-navigation {
      flex-wrap: wrap;
    }

    .tab-btn {
      min-width: 60px;
      padding: 0.5rem 0.25rem;
      font-size: 0.7rem;
    }

    .tab-btn i {
      font-size: 0.875rem;
    }
  }
</style> 