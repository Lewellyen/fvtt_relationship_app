<script lang="ts">
  import type { ITableColumnDefinition, ITableState } from '../types/DynamicTableTypes';
  
  const { columns, tableState, onSort, onFilter, onToggleSelectAll } = $props<{
    columns: ITableColumnDefinition[];
    tableState: ITableState;
    onSort: (columnName: string) => void;
    onFilter: (columnName: string, value: any) => void;
    onToggleSelectAll: () => void;
  }>();
  
  // Filter-Werte für jede Spalte
  let columnFilters = $state<Record<string, any>>({});
  
  // Filter setzen
  function setColumnFilter(columnName: string, value: any) {
    columnFilters[columnName] = value;
    onFilter(columnName, value);
  }
  
  // Filter zurücksetzen
  function clearColumnFilter(columnName: string) {
    delete columnFilters[columnName];
    onFilter(columnName, undefined);
  }
  
  // Sortierung-Indikator
  function getSortIcon(columnName: string): string {
    if (tableState.sortColumn !== columnName) return '↕️';
    return tableState.sortDirection === 'asc' ? '↑' : '↓';
  }
  
  // Spaltenbreite
  function getColumnWidth(column: ITableColumnDefinition): string {
    if (column.width) {
      return typeof column.width === 'number' ? `${column.width}px` : column.width;
    }
    return 'auto';
  }
  
  // Spalten-spezifische Filter-Optionen
  function getFilterOptions(column: ITableColumnDefinition) {
    if (column.filterOptions) {
      return column.filterOptions;
    }
    
    // Automatische Optionen aus Spalten-Daten generieren
    if (column.type === 'select' && column.options) {
      return column.options;
    }
    
    return [];
  }
</script>

<thead class="table-header">
  <tr class="header-row">
    <!-- Auswahl-Spalte -->
    <th class="header-cell select-column">
      <input 
        type="checkbox" 
        class="select-all-checkbox"
        checked={tableState.selectAll}
        onchange={onToggleSelectAll}
        title="Alle auswählen/abwählen"
      />
    </th>
    
    <!-- Spalten-Header -->
    {#each columns as column}
      <th 
        class="header-cell {column.sortable ? 'sortable' : ''} {column.filterable ? 'filterable' : ''}"
        style="width: {getColumnWidth(column)}; min-width: {column.minWidth || 100}px; max-width: {column.maxWidth || 'none'};"
      >
        <div class="header-content">
          <!-- Spalten-Titel -->
          {#if column.sortable}
            <button 
              class="column-title clickable"
              onclick={() => onSort(column.name)}
              onkeydown={(e) => e.key === 'Enter' && onSort(column.name)}
              title={column.description || column.label}
            >
              <span class="title-text">{column.label}</span>
              {#if column.required}
                <span class="required-indicator">*</span>
              {/if}
              <span class="sort-icon">{getSortIcon(column.name)}</span>
            </button>
          {:else}
            <div 
              class="column-title"
              title={column.description || column.label}
            >
              <span class="title-text">{column.label}</span>
              {#if column.required}
                <span class="required-indicator">*</span>
              {/if}
            </div>
          {/if}
          
          <!-- Filter-Bereich -->
          {#if column.filterable}
            <div class="filter-container">
              {#if column.type === 'select' || column.type === 'multiselect'}
                <!-- Dropdown-Filter -->
                <select 
                  class="filter-select"
                  value={columnFilters[column.name] || ''}
                  onchange={(e) => setColumnFilter(column.name, (e.target as HTMLSelectElement).value || undefined)}
                >
                  <option value="">Alle</option>
                  {#each getFilterOptions(column) as option}
                    {#if typeof option === 'string'}
                      <option value={option}>{option}</option>
                    {:else}
                      <option value={option.value}>{option.label || option.value}</option>
                    {/if}
                  {/each}
                </select>
              {:else if column.type === 'boolean'}
                <!-- Boolean-Filter -->
                <select 
                  class="filter-select"
                  value={columnFilters[column.name] || ''}
                  onchange={(e) => setColumnFilter(column.name, (e.target as HTMLSelectElement).value || undefined)}
                >
                  <option value="">Alle</option>
                  <option value="true">Ja</option>
                  <option value="false">Nein</option>
                </select>
              {:else if column.type === 'number'}
                <!-- Number-Filter -->
                <div class="number-filter">
                  <input 
                    type="number" 
                    class="filter-input"
                    placeholder="Min"
                    value={columnFilters[column.name + '_min'] || ''}
                    onchange={(e) => setColumnFilter(column.name + '_min', (e.target as HTMLInputElement).value || undefined)}
                  />
                  <input 
                    type="number" 
                    class="filter-input"
                    placeholder="Max"
                    value={columnFilters[column.name + '_max'] || ''}
                    onchange={(e) => setColumnFilter(column.name + '_max', (e.target as HTMLInputElement).value || undefined)}
                  />
                </div>
              {:else}
                <!-- Text-Filter -->
                <div class="text-filter">
                  <input 
                    type="text" 
                    class="filter-input"
                    placeholder="Filter..."
                    value={columnFilters[column.name] || ''}
                    oninput={(e) => setColumnFilter(column.name, (e.target as HTMLInputElement).value || undefined)}
                  />
                  {#if columnFilters[column.name]}
                    <button 
                      type="button" 
                      class="filter-clear"
                      onclick={() => clearColumnFilter(column.name)}
                      title="Filter zurücksetzen"
                    >
                      ×
                    </button>
                  {/if}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </th>
    {/each}
    
    <!-- Aktionen-Spalte -->
    <th class="header-cell actions-column">
      Aktionen
    </th>
  </tr>
</thead>

<style>
  .table-header {
    background: var(--color-background-secondary);
    border-bottom: 2px solid var(--color-border-primary);
  }
  
  .header-row {
    height: auto;
  }
  
  .header-cell {
    padding: 0.5rem;
    text-align: left;
    vertical-align: top;
    border-right: 1px solid var(--color-border-primary);
    background: var(--color-background-secondary);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  
  .header-cell:last-child {
    border-right: none;
  }
  
  .select-column {
    width: 3rem;
    min-width: 3rem;
    text-align: center;
  }
  
  .actions-column {
    width: 8rem;
    min-width: 8rem;
    text-align: center;
  }
  
  .header-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .column-title {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-weight: 600;
    color: var(--color-text-primary);
    font-size: 0.9rem;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    width: 100%;
    text-align: left;
  }
  
  .column-title.clickable {
    cursor: pointer;
    user-select: none;
  }
  
  .column-title.clickable:hover {
    color: var(--color-primary);
  }
  
  .title-text {
    flex: 1;
  }
  
  .required-indicator {
    color: var(--color-error);
    font-weight: bold;
  }
  
  .sort-icon {
    font-size: 0.8rem;
    opacity: 0.7;
  }
  
  .filter-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .filter-select,
  .filter-input {
    width: 100%;
    padding: 0.25rem;
    border: 1px solid var(--color-border-primary);
    border-radius: 3px;
    font-size: 0.8rem;
    background: var(--color-background-primary);
    color: var(--color-text-primary);
  }
  
  .filter-select:focus,
  .filter-input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 1px var(--color-primary-alpha);
  }
  
  .number-filter {
    display: flex;
    gap: 0.25rem;
  }
  
  .number-filter .filter-input {
    flex: 1;
  }
  
  .text-filter {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .text-filter .filter-input {
    padding-right: 1.5rem;
  }
  
  .filter-clear {
    position: absolute;
    right: 0.25rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    padding: 0;
    width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .filter-clear:hover {
    color: var(--color-text-primary);
  }
  
  .select-all-checkbox {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    accent-color: var(--color-primary);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .header-cell {
      padding: 0.25rem;
    }
    
    .column-title {
      font-size: 0.8rem;
    }
    
    .filter-select,
    .filter-input {
      font-size: 0.7rem;
      padding: 0.2rem;
    }
    
    .number-filter {
      flex-direction: column;
    }
  }
  
  /* Hover-Effekte */
  .header-cell.sortable:hover {
    background: var(--color-background-primary);
  }
  
  .header-cell.filterable:hover {
    background: var(--color-background-primary);
  }
</style>
