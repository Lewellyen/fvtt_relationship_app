<script lang="ts">
  // Props mit Svelte 5 Runes-Syntax
  const props = $props<{
    hasSelection: boolean;
    isAddEdgeMode?: boolean;
    onAddNode?: () => void;
    onAddEdge?: () => void;
    onDelete?: () => void;
    onSave?: () => void;
    onExport?: () => void;
    onUndo?: () => void;
    onRedo?: () => void;
    canUndo?: boolean;
    canRedo?: boolean;
  }>();

  // Default values
  const hasSelection = props.hasSelection ?? false;
  const canUndo = props.canUndo ?? false;
  const canRedo = props.canRedo ?? false;
</script>

<div class="graph-toolbar">
  <!-- Left Section: Graph Actions -->
  <div class="toolbar-section">
    <button 
      class="btn btn-primary" 
      onclick={() => props.onAddNode?.()}
      title="Add new node (N)"
    >
      <i class="fas fa-plus"></i>
      <span class="btn-text">Add Node</span>
    </button>
    
    <button 
      class="btn {props.isAddEdgeMode ? 'btn-primary' : 'btn-secondary'}" 
      onclick={() => props.onAddEdge?.()}
      title="Add new edge (E)"
    >
      <i class="fas fa-link"></i>
      <span class="btn-text">{props.isAddEdgeMode ? 'Cancel Edge' : 'Add Edge'}</span>
    </button>
    
    <button 
      class="btn btn-danger" 
      disabled={!hasSelection}
      onclick={() => props.onDelete?.()}
      title="Delete selected elements (Delete)"
    >
      <i class="fas fa-trash"></i>
      <span class="btn-text">Delete</span>
    </button>
  </div>

  <!-- Center Section: Edit Actions -->
  <div class="toolbar-section">
    <button 
      class="btn btn-outline" 
      disabled={!canUndo}
      onclick={() => props.onUndo?.()}
      title="Undo last action (Ctrl+Z)"
    >
      <i class="fas fa-undo"></i>
      <span class="btn-text">Undo</span>
    </button>
    
    <button 
      class="btn btn-outline" 
      disabled={!canRedo}
      onclick={() => props.onRedo?.()}
      title="Redo last action (Ctrl+Y)"
    >
      <i class="fas fa-redo"></i>
      <span class="btn-text">Redo</span>
    </button>
  </div>

  <!-- Right Section: File Actions -->
  <div class="toolbar-section">
    <button 
      class="btn btn-success" 
      onclick={() => props.onSave?.()}
      title="Save graph (Ctrl+S)"
    >
      <i class="fas fa-save"></i>
      <span class="btn-text">Save</span>
    </button>
    
    <div class="dropdown">
      <button 
        class="btn btn-info dropdown-toggle" 
        title="Export graph"
      >
        <i class="fas fa-download"></i>
        <span class="btn-text">Export</span>
        <i class="fas fa-chevron-down"></i>
      </button>
      <div class="dropdown-menu">
        <button class="dropdown-item" onclick={() => props.onExport?.()}>
          <i class="fas fa-file-code"></i>
          Export as JSON
        </button>
        <button class="dropdown-item">
          <i class="fas fa-file-image"></i>
          Export as PNG
        </button>
        <button class="dropdown-item">
          <i class="fas fa-file-image"></i>
          Export as SVG
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .graph-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: white;
    border-bottom: 1px solid #dee2e6;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    gap: 1rem;
  }

  .toolbar-section {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    white-space: nowrap;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-primary {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: #0056b3;
    border-color: #0056b3;
  }

  .btn-secondary {
    background-color: #6c757d;
    color: white;
    border-color: #6c757d;
  }

  .btn-secondary:hover:not(:disabled) {
    background-color: #545b62;
    border-color: #545b62;
  }

  .btn-success {
    background-color: #28a745;
    color: white;
    border-color: #28a745;
  }

  .btn-success:hover:not(:disabled) {
    background-color: #1e7e34;
    border-color: #1e7e34;
  }

  .btn-danger {
    background-color: #dc3545;
    color: white;
    border-color: #dc3545;
  }

  .btn-danger:hover:not(:disabled) {
    background-color: #c82333;
    border-color: #c82333;
  }

  .btn-info {
    background-color: #17a2b8;
    color: white;
    border-color: #17a2b8;
  }

  .btn-info:hover:not(:disabled) {
    background-color: #138496;
    border-color: #138496;
  }

  .btn-outline {
    background-color: transparent;
    color: #007bff;
    border-color: #007bff;
  }

  .btn-outline:hover:not(:disabled) {
    background-color: #007bff;
    color: white;
  }

  /* Dropdown */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;
    display: none;
    min-width: 160px;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    background-color: white;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  .dropdown:hover .dropdown-menu {
    display: block;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem 1rem;
    border: none;
    background: none;
    color: #495057;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .dropdown-item:hover {
    background-color: #f8f9fa;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .btn-text {
      display: none;
    }
    
    .btn {
      padding: 0.5rem;
    }
    
    .toolbar-section {
      gap: 0.25rem;
    }
  }
</style> 