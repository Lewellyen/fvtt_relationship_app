<script lang="ts">
  import type { NodeData, EdgeData } from "../global";
  
  // Props mit Svelte 5 Runes-Syntax
  const props = $props<{
    nodes: NodeData[];
    edges: EdgeData[];
    selectedNodeId?: string | null;
    selectedEdgeId?: string | null;
    onNodeClick?: (nodeId: string) => void;
    onEdgeClick?: (edgeId: string) => void;
    onAddNode?: () => void;
    onAddEdge?: () => void;
    onDelete?: () => void;
  }>();

  // Local state
  let searchTerm = $state('');
  let activeTab = $state<'nodes' | 'edges'>('nodes');
  let showOnlySelected = $state(false);
  let node: NodeData | null = $state(null);
  let edge: EdgeData | null = $state(null);

  // Computed values
  const filteredNodes = $derived(() => {
    if (!searchTerm && !showOnlySelected) return props.nodes;
    
    return props.nodes.filter((node: NodeData) => {
      const matchesSearch = !searchTerm || 
        node.label?.value?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSelection = !showOnlySelected || 
        props.selectedNodeId === node.id ||
        props.edges.some((edge: EdgeData) => 
          (edge.source === node.id || edge.target === node.id) && 
          props.selectedEdgeId === edge.id
        );
      
      return matchesSearch && matchesSelection;
    });
  }) as any;

  const filteredEdges = $derived(() => {
    if (!searchTerm && !showOnlySelected) return props.edges;
    
    return props.edges.filter((edge: EdgeData) => {
      const sourceNode = props.nodes.find((n: NodeData) => n.id === edge.source);
      const targetNode = props.nodes.find((n: NodeData) => n.id === edge.target);
      
      const matchesSearch = !searchTerm || 
        edge.label?.value?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        edge.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sourceNode?.label?.value?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        targetNode?.label?.value?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSelection = !showOnlySelected || props.selectedEdgeId === edge.id;
      
      return matchesSearch && matchesSelection;
    });
  }) as any;

  // Event handlers
  function handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    searchTerm = target.value;
  }

  function handleTabClick(tab: 'nodes' | 'edges') {
    activeTab = tab;
  }

  function handleToggleSelection() {
    showOnlySelected = !showOnlySelected;
  }

  function clearSearch() {
    searchTerm = '';
  }
</script>

<div class="sidebar-panel">
  <!-- Search and Filter Bar -->
  <div class="search-bar">
    <div class="search-input-wrapper">
      <i class="fas fa-search search-icon"></i>
      <input 
        type="text" 
        placeholder="Search nodes and edges..."
        value={searchTerm}
        oninput={handleSearchInput}
        class="search-input"
      />
      {#if searchTerm}
        <button class="clear-search" onclick={clearSearch} title="Clear search" aria-label="Clear search">
          <i class="fas fa-times"></i>
        </button>
      {/if}
    </div>
    <button 
      class="filter-btn {showOnlySelected ? 'active' : ''}" 
      onclick={handleToggleSelection}
      title="Show only selected elements"
      aria-label="Show only selected elements"
    >
      <i class="fas fa-filter"></i>
    </button>
  </div>

  <!-- Tab Navigation -->
  <div class="tab-navigation">
    <button 
      class="tab-btn {activeTab === 'nodes' ? 'active' : ''}"
      onclick={() => handleTabClick('nodes')}
    >
      <i class="fas fa-circle"></i>
      Nodes ({filteredNodes.length})
    </button>
    <button 
      class="tab-btn {activeTab === 'edges' ? 'active' : ''}"
      onclick={() => handleTabClick('edges')}
    >
      <i class="fas fa-link"></i>
      Edges ({filteredEdges.length})
    </button>
  </div>

  <!-- Content Area -->
  <div class="content-area">
    {#if activeTab === 'nodes'}
      <!-- Nodes Tab -->
      <div class="nodes-section">
        <div class="section-header">
          <h3>Nodes</h3>
          <button class="add-btn" onclick={() => props.onAddNode?.()} aria-label="Add node">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        
        <div class="items-list">
          {#if filteredNodes.length === 0}
            <div class="empty-state">
              <i class="fas fa-circle empty-icon"></i>
              <p>No nodes found</p>
              {#if searchTerm || showOnlySelected}
                <button class="clear-filters-btn" onclick={() => { searchTerm = ''; showOnlySelected = false; }}>
                  Clear filters
                </button>
              {/if}
            </div>
          {:else}
            {#each filteredNodes as node (node.id)}
              <div 
                class="item {props.selectedNodeId === node.id ? 'selected' : ''}"
                onclick={() => props.onNodeClick?.(node.id)}
                onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); props.onNodeClick?.(node.id); } }}
                role="button"
                tabindex="0"
                aria-label="Node {node.label?.value || node.id}"
              >
                <div class="item-color" style="background-color: {node.cytoScapeAttributes?.['background-color'] || '#999'}"></div>
                <div class="item-info">
                  <div class="item-label">{node.label?.value || node.id}</div>
                  <div class="item-meta">
                    <span class="item-position">({node.x}, {node.y})</span>
                    <span class="item-connections">
                      {props.edges.filter((e: EdgeData) => e.source === node.id || e.target === node.id).length} connections
                    </span>
                  </div>
                </div>
                <div class="item-actions">
                  <button class="action-btn" title="Edit node" aria-label="Edit node">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button 
                    class="action-btn delete-btn" 
                    title="Delete node" 
                    aria-label="Delete node"
                    onclick={(e) => { e.stopPropagation(); props.onDelete?.(); }}
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            {/each}
          {/if}
        </div>
      </div>
    {:else}
      <!-- Edges Tab -->
      <div class="edges-section">
        <div class="section-header">
          <h3>Edges</h3>
          <button class="add-btn" onclick={() => props.onAddEdge?.()} aria-label="Add edge">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        
        <div class="items-list">
          {#if filteredEdges.length === 0}
            <div class="empty-state">
              <i class="fas fa-link empty-icon"></i>
              <p>No edges found</p>
              {#if searchTerm || showOnlySelected}
                <button class="clear-filters-btn" onclick={() => { searchTerm = ''; showOnlySelected = false; }}>
                  Clear filters
                </button>
              {/if}
            </div>
          {:else}
            {#each filteredEdges as edge (edge.id)}
              <div 
                class="item {props.selectedEdgeId === edge.id ? 'selected' : ''}"
                onclick={() => props.onEdgeClick?.(edge.id)}
                onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); props.onEdgeClick?.(edge.id); } }}
                role="button"
                tabindex="0"
                aria-label="Edge from {props.nodes.find((n: NodeData) => n.id === edge.source)?.label?.value || edge.source} to {props.nodes.find((n: NodeData) => n.id === edge.target)?.label?.value || edge.target}"
              >
                <div class="item-color" style="background-color: {edge.cytoScapeAttributes?.['line-color'] || '#999'}"></div>
                <div class="item-info">
                  <div class="item-label">
                    {props.nodes.find((n: NodeData) => n.id === edge.source)?.label?.value || edge.source}
                    <i class="fas fa-arrow-right"></i>
                    {props.nodes.find((n: NodeData) => n.id === edge.target)?.label?.value || edge.target}
                  </div>
                  <div class="item-meta">
                    <span class="item-type">{edge.label?.value || 'No label'}</span>
                  </div>
                </div>
                <div class="item-actions">
                  <button class="action-btn" title="Edit edge" aria-label="Edit edge">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button 
                    class="action-btn delete-btn" 
                    title="Delete edge" 
                    aria-label="Delete edge"
                    onclick={(e) => { e.stopPropagation(); props.onDelete?.(); }}
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            {/each}
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .sidebar-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: white;
    border-right: 1px solid #dee2e6;
  }

  /* Search Bar */
  .search-bar {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    border-bottom: 1px solid #dee2e6;
  }

  .search-input-wrapper {
    position: relative;
    flex: 1;
  }

  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
    font-size: 0.875rem;
  }

  .search-input {
    width: 100%;
    padding: 0.5rem 0.75rem 0.5rem 2rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.2s;
  }

  .search-input:focus {
    border-color: #007bff;
  }

  .clear-search {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    transition: background-color 0.2s;
  }

  .clear-search:hover {
    background-color: #f8f9fa;
  }

  .filter-btn {
    padding: 0.5rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    background: white;
    color: #6c757d;
    cursor: pointer;
    transition: all 0.2s;
  }

  .filter-btn:hover {
    background-color: #f8f9fa;
  }

  .filter-btn.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }

  /* Tab Navigation */
  .tab-navigation {
    display: flex;
    border-bottom: 1px solid #dee2e6;
  }

  .tab-btn {
    flex: 1;
    padding: 0.75rem;
    border: none;
    background: none;
    color: #6c757d;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
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

  /* Content Area */
  .content-area {
    flex: 1;
    overflow-y: auto;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #dee2e6;
  }

  .section-header h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #495057;
  }

  .add-btn {
    width: 28px;
    height: 28px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    background: white;
    color: #007bff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .add-btn:hover {
    background-color: #007bff;
    color: white;
  }

  /* Items List */
  .items-list {
    padding: 0.5rem;
  }

  .item {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    margin-bottom: 0.25rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
  }

  .item:hover {
    background-color: #f8f9fa;
  }

  .item.selected {
    background-color: #e3f2fd;
    border-color: #2196f3;
  }

  .item-color {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 0.75rem;
    border: 1px solid #dee2e6;
  }

  .item-info {
    flex: 1;
    min-width: 0;
  }

  .item-label {
    font-weight: 500;
    font-size: 0.875rem;
    color: #495057;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-meta {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.25rem;
  }

  .item-position, .item-connections, .item-type {
    font-size: 0.75rem;
    color: #6c757d;
  }

  .item-actions {
    opacity: 0;
    transition: opacity 0.2s;
  }

  .item:hover .item-actions {
    opacity: 1;
  }

  .action-btn {
    width: 24px;
    height: 24px;
    border: none;
    background: none;
    color: #6c757d;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
  }

  .action-btn:hover {
    background-color: #e9ecef;
    color: #495057;
  }

  .delete-btn {
    color: #dc3545; /* Red color for delete button */
  }

  .delete-btn:hover {
    background-color: #f8d7da; /* Light red background on hover */
    color: #721c24; /* Darker red text on hover */
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 2rem 1rem;
    color: #6c757d;
  }

  .empty-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .empty-state p {
    margin: 0 0 1rem 0;
    font-size: 0.875rem;
  }

  .clear-filters-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    background: white;
    color: #007bff;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .clear-filters-btn:hover {
    background-color: #f8f9fa;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .search-bar {
      padding: 0.75rem;
    }
    
    .section-header {
      padding: 0.75rem;
    }
    
    .items-list {
      padding: 0.25rem;
    }
    
    .item {
      padding: 0.5rem;
    }
  }
</style> 