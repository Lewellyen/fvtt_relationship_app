<script lang="ts">
  import type { IDynamicTableConfig, ITableState, IBulkAction } from '../types/DynamicTableTypes';
  
  const { config, tableState, totalCount, onAddRow, onGlobalSearch, onBulkAction } = $props<{
    config: IDynamicTableConfig;
    tableState: ITableState;
    totalCount: number;
    onAddRow: () => void;
    onGlobalSearch: (searchTerm: string) => void;
    onBulkAction: (actionId: string) => void;
  }>();
  
  // Globale Suche
  let searchTerm = $state('');
  
  // Suche ausführen
  function handleSearch() {
    onGlobalSearch(searchTerm);
  }
  
  // Suche zurücksetzen
  function clearSearch() {
    searchTerm = '';
    onGlobalSearch('');
  }
  
  // Enter-Taste für Suche
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }
  
  // Bulk-Aktionen filtern (nur verfügbare anzeigen)
  const availableBulkActions = $derived(() => {
    if (!config.bulkActions || !config.allowBulkActions) return [];
    
    const selectedRows = tableState.selectedRows;
    return config.bulkActions.filter((action: IBulkAction) => 
      !action.enabled || action.enabled(selectedRows.map((id: string) => ({ id } as any)))
    );
  });
  
  // Ausgewählte Zeilen-Info
  const selectedCount = $derived(tableState.selectedRows.length);
</script>

<div class="table-toolbar">
  <!-- Linke Seite: Aktionen -->
  <div class="toolbar-left">
    {#if config.allowAdd}
      <button 
        type="button" 
        class="btn btn-primary"
        onclick={onAddRow}
        title="Neue Zeile hinzufügen"
      >
        <span class="icon">+</span>
        Hinzufügen
      </button>
    {/if}
    
    {#if config.allowBulkActions && selectedCount > 0}
      <div class="bulk-actions">
        <span class="bulk-info">
          {selectedCount} von {totalCount} ausgewählt
        </span>
        
        {#each availableBulkActions() as action}
          <button 
            type="button" 
            class="btn btn-secondary"
            onclick={() => onBulkAction(action.id)}
            title={action.label}
          >
            {#if action.icon}
              <span class="icon">{action.icon}</span>
            {/if}
            {action.label}
          </button>
        {/each}
      </div>
    {/if}
  </div>
  
  <!-- Rechte Seite: Suche und Filter -->
  <div class="toolbar-right">
    {#if config.allowFiltering}
      <div class="search-container">
        <input 
          type="text" 
          class="search-input"
          placeholder="Suchen..."
          bind:value={searchTerm}
          onkeydown={handleKeydown}
          oninput={handleSearch}
        />
        {#if searchTerm}
          <button 
            type="button" 
            class="btn btn-icon"
            onclick={clearSearch}
            title="Suche zurücksetzen"
          >
            <span class="icon">×</span>
          </button>
        {/if}
        <button 
          type="button" 
          class="btn btn-icon"
          onclick={handleSearch}
          title="Suchen"
        >
          <span class="icon">🔍</span>
        </button>
      </div>
    {/if}
    
    <!-- Spalten-Management -->
    <div class="column-management">
      <button 
        type="button" 
        class="btn btn-secondary"
        title="Spalten verwalten"
      >
        <span class="icon">⚙️</span>
        Spalten
      </button>
    </div>
    
    <!-- Import/Export -->
    {#if config.allowImport || config.allowExport}
      <div class="import-export">
        {#if config.allowImport}
          <button 
            type="button" 
            class="btn btn-secondary"
            title="Daten importieren"
          >
            <span class="icon">📥</span>
            Import
          </button>
        {/if}
        
        {#if config.allowExport}
          <button 
            type="button" 
            class="btn btn-secondary"
            title="Daten exportieren"
          >
            <span class="icon">📤</span>
            Export
          </button>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .table-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: var(--color-background-secondary);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
    gap: 1rem;
  }
  
  .toolbar-left,
  .toolbar-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .toolbar-right {
    flex-wrap: wrap;
  }
  
  .btn {
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--color-background-primary);
    color: var(--color-text-primary);
  }
  
  .btn:hover:not(:disabled) {
    background: var(--color-background-secondary);
    border-color: var(--color-primary);
  }
  
  .btn-primary {
    background: var(--color-primary);
    color: var(--color-text-primary);
    border-color: var(--color-primary);
  }
  
  .btn-primary:hover:not(:disabled) {
    background: var(--color-primary-hover);
  }
  
  .btn-secondary {
    background: var(--color-background-primary);
    color: var(--color-text-primary);
  }
  
  .btn-icon {
    padding: 0.5rem;
    min-width: 2.5rem;
    justify-content: center;
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .icon {
    font-size: 1rem;
    line-height: 1;
  }
  
  .bulk-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: var(--color-background-primary);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius);
  }
  
  .bulk-info {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    margin-right: 0.5rem;
  }
  
  .search-container {
    display: flex;
    align-items: center;
    background: var(--color-background-primary);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius);
    overflow: hidden;
  }
  
  .search-input {
    padding: 0.5rem;
    border: none;
    background: transparent;
    color: var(--color-text-primary);
    font-size: 0.9rem;
    min-width: 200px;
  }
  
  .search-input:focus {
    outline: none;
  }
  
  .search-input::placeholder {
    color: var(--color-text-secondary);
  }
  
  .column-management,
  .import-export {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .table-toolbar {
      flex-direction: column;
      align-items: stretch;
    }
    
    .toolbar-left,
    .toolbar-right {
      justify-content: center;
    }
    
    .search-input {
      min-width: 150px;
    }
  }
  
  @media (max-width: 480px) {
    .toolbar-left,
    .toolbar-right {
      flex-wrap: wrap;
    }
    
    .search-input {
      min-width: 120px;
    }
    
    .bulk-actions {
      flex-wrap: wrap;
    }
  }
</style>
