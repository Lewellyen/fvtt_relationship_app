<script lang="ts">
  import type { IDynamicTableConfig, ITableRowData, ITableState, ITableColumnDefinition } from '../types/DynamicTableTypes';
  import DynamicTableToolbar from './DynamicTableToolbar.svelte';
  import DynamicTableHeader from './DynamicTableHeader.svelte';
  import DynamicTableRow from './DynamicTableRow.svelte';
  
  const { config, onSubmit, onCancel } = $props<{ 
    config: IDynamicTableConfig;
    onSubmit: (data: ITableRowData[]) => void;
    onCancel: () => void;
  }>();
  
  // Lokaler State für Tabellendaten
  let tableData = $state<ITableRowData[]>([]);
  let tableState = $state<ITableState>({
    sortColumn: undefined,
    sortDirection: 'asc',
    filters: {},
    globalSearch: '',
    selectedRows: [],
    selectAll: false,
    currentPage: 1,
    pageSize: config.pageSize || 50,
    columnOrder: [],
    hiddenColumns: [],
    columnWidths: {}
  });
  
  let errors = $state<Record<string, string>>({});
  let isSubmitting = $state(false);
  
  // Standardwerte für Konfiguration
  const defaultConfig = {
    submitLabel: 'Speichern',
    cancelLabel: 'Abbrechen',
    showCancelButton: true,
    tableSize: 'medium',
    allowAdd: true,
    allowEdit: true,
    allowDelete: true,
    allowBulkActions: true,
    allowSorting: true,
    allowFiltering: true,
    allowColumnResize: true,
    enablePagination: true,
    pageSize: 50,
    styling: {
      theme: 'foundry',
      inheritParentStyles: true
    },
    validation: {
      location: 'cell',
      timing: 'onSubmit',
      allowInvalidSubmit: false
    }
  };
  
  // Konfiguration mit Standardwerten zusammenführen
  const mergedConfig = $derived({
    ...defaultConfig,
    ...config,
    styling: { ...defaultConfig.styling, ...config.styling },
    validation: { ...defaultConfig.validation, ...config.validation }
  });
  
  // Gefilterte und sortierte Daten
  const processedData = $derived(() => {
    let data = [...tableData];
    
    // Globale Suche anwenden
    if (tableState.globalSearch) {
      const searchTerm = tableState.globalSearch.toLowerCase();
      data = data.filter((row: ITableRowData) => {
        return config.columns.some((column: ITableColumnDefinition) => {
          const value = row[column.name];
          return value && value.toString().toLowerCase().includes(searchTerm);
        });
      });
    }
    
    // Spalten-spezifische Filter anwenden
    Object.entries(tableState.filters).forEach(([columnName, filterValue]) => {
      if (filterValue !== undefined && filterValue !== '') {
        data = data.filter((row: ITableRowData) => {
          const value = row[columnName];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(filterValue.toLowerCase());
          }
          return value === filterValue;
        });
      }
    });
    
    // Sortierung anwenden
    if (tableState.sortColumn) {
      const column = config.columns.find((c: ITableColumnDefinition) => c.name === tableState.sortColumn);
      if (column) {
        data.sort((a: ITableRowData, b: ITableRowData) => {
          const aVal = a[tableState.sortColumn!];
          const bVal = b[tableState.sortColumn!];
          
          let comparison = 0;
          if (aVal < bVal) comparison = -1;
          else if (aVal > bVal) comparison = 1;
          
          return tableState.sortDirection === 'desc' ? -comparison : comparison;
        });
      }
    }
    
    // Pagination anwenden
    if (mergedConfig.enablePagination) {
      const startIndex = (tableState.currentPage - 1) * tableState.pageSize;
      const endIndex = startIndex + tableState.pageSize;
      data = data.slice(startIndex, endIndex);
    }
    
    return data;
  });
  
  // Sichtbare Spalten
  const visibleColumns = $derived(() => {
    return config.columns
      .filter((column: ITableColumnDefinition) => !tableState.hiddenColumns.includes(column.name))
      .sort((a: ITableColumnDefinition, b: ITableColumnDefinition) => (a.order || 0) - (b.order || 0));
  });
  
  // Gesamtanzahl der Items (automatisch aktualisiert)
  const totalItems = $derived(tableData.length);
  
  // Initialisierung der Daten - nur einmal beim Mount
  let isInitialized = $state(false);
  
  $effect(() => {
    if (!isInitialized && config.initialData) {
      tableData = config.initialData.map(row => ({
        ...row,
        id: row.id || foundry.utils.randomID()
      }));
      
      // Spalten-Reihenfolge initialisieren
      tableState.columnOrder = config.columns.map(c => c.name);
      
      // Versteckte Spalten initialisieren
      tableState.hiddenColumns = config.columns
        .filter(c => c.visible === false)
        .map(c => c.name);
      
      // Spaltenbreiten initialisieren
      config.columns.forEach(column => {
        if (column.width && typeof column.width === 'number') {
          tableState.columnWidths[column.name] = column.width;
        }
      });
      
      // Gesamtanzahl wird automatisch über $derived aktualisiert
      
      isInitialized = true;
    }
  });
  
  // Neue Zeile hinzufügen
  function addRow() {
    const newRow: ITableRowData = {
      id: foundry.utils.randomID(),
      _new: true,
      _editing: true
    };
    
    // Standardwerte aus Spalten-Definitionen setzen
    config.columns.forEach((column: ITableColumnDefinition) => {
      if (column.default !== undefined) {
        newRow[column.name] = column.default;
      }
    });
    
    tableData = [...tableData, newRow];
    // totalItems wird automatisch über $derived aktualisiert
  }
  
  // Zeile bearbeiten
  function editRow(rowId: string) {
    tableData = tableData.map(row => 
      row.id === rowId ? { ...row, _editing: true } : row
    );
  }
  
  // Zeile speichern
  function saveRow(rowId: string) {
    tableData = tableData.map(row => 
      row.id === rowId ? { ...row, _editing: false, _new: false, _modified: true } : row
    );
  }
  
  // Zeile löschen
  function deleteRow(rowId: string) {
    tableData = tableData.filter(row => row.id !== rowId);
    tableState.selectedRows = tableState.selectedRows.filter(id => id !== rowId);
    // totalItems wird automatisch über $derived aktualisiert
  }
  
  // Zeile abbrechen
  function cancelRow(rowId: string) {
    const row = tableData.find(r => r.id === rowId);
    if (row?._new) {
      // Neue Zeile komplett entfernen
      tableData = tableData.filter(r => r.id !== rowId);
    } else {
      // Bearbeitung abbrechen
      tableData = tableData.map(r => 
        r.id === rowId ? { ...r, _editing: false } : r
      );
    }
  }
  
  // Zeilen-Auswahl
  function toggleRowSelection(rowId: string) {
    if (tableState.selectedRows.includes(rowId)) {
      tableState.selectedRows = tableState.selectedRows.filter(id => id !== rowId);
    } else {
      tableState.selectedRows = [...tableState.selectedRows, rowId];
    }
    tableState.selectAll = tableState.selectedRows.length === totalItems;
  }
  
  // Alle Zeilen auswählen/abwählen
  function toggleSelectAll() {
    if (tableState.selectAll) {
      tableState.selectedRows = [];
    } else {
      tableState.selectedRows = tableData.map(row => row.id);
    }
    tableState.selectAll = !tableState.selectAll;
  }
  
  // Sortierung
  function sortBy(columnName: string) {
    if (tableState.sortColumn === columnName) {
      tableState.sortDirection = tableState.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      tableState.sortColumn = columnName;
      tableState.sortDirection = 'asc';
    }
  }
  
  // Filter setzen
  function setFilter(columnName: string, value: any) {
    tableState.filters = { ...tableState.filters, [columnName]: value };
  }
  
  // Globale Suche
  function setGlobalSearch(searchTerm: string) {
    tableState.globalSearch = searchTerm;
  }
  
  // Bulk-Aktionen
  function executeBulkAction(actionId: string) {
    const selectedRows = tableData.filter(row => tableState.selectedRows.includes(row.id));
    const action = config.bulkActions?.find(a => a.id === actionId);
    
    if (action && action.enabled?.(selectedRows) !== false) {
      if (action.confirmMessage) {
        if (confirm(action.confirmMessage)) {
          action.action(selectedRows);
        }
      } else {
        action.action(selectedRows);
      }
    }
  }
  
  // Alle Felder validieren
  function validateAllRows(): boolean {
    errors = {};
    let hasErrors = false;
    
    tableData.forEach((row: ITableRowData) => {
      config.columns.forEach((column: ITableColumnDefinition) => {
        if (column.required && (!row[column.name] || row[column.name] === '')) {
          errors[`${row.id}-${column.name}`] = `${column.label} ist erforderlich`;
          hasErrors = true;
        }
      });
    });
    
    return !hasErrors;
  }
  
  // Formular absenden
  async function handleSubmit(e: Event) {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Alle Zeilen validieren
    if (!validateAllRows()) {
      return;
    }
    
    isSubmitting = true;
    
    try {
      // Callback-Funktion aufrufen
      if (config.onSubmit) {
        await config.onSubmit(tableData);
      } else if (onSubmit) {
        await onSubmit(tableData);
      }
      
      // Erfolgreich - Modal schließen
      closeModal();
    } catch (error) {
      console.error('Fehler beim Absenden der Tabelle:', error);
    } finally {
      isSubmitting = false;
    }
  }
  
  // Modal schließen
  function closeModal() {
    if (config.onCancel) {
      config.onCancel();
    }
    if (onCancel) {
      onCancel();
    }
  }
  
  // Escape-Key-Handler
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }
  
  // CSS-Klassen basierend auf Konfiguration
  const tableClasses = $derived([
    'dynamic-table-sheet',
    `table-size-${mergedConfig.tableSize}`,
    `theme-${mergedConfig.styling.theme}`,
    mergedConfig.styling.customClasses?.container || ''
  ].filter(Boolean).join(' '));
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Table Container -->
<div class="table-container {tableClasses}">
  <!-- Header -->
  <div class="table-header">
    <h3 class="table-title">{mergedConfig.title}</h3>
    {#if mergedConfig.description}
      <p class="table-description">{mergedConfig.description}</p>
    {/if}
  </div>
  
  <!-- Toolbar -->
  <DynamicTableToolbar 
    {config}
    {tableState}
    totalCount={totalItems}
    onAddRow={addRow}
    onGlobalSearch={setGlobalSearch}
    onBulkAction={executeBulkAction}
  />
  
  <!-- Table -->
  <form class="dynamic-table" onsubmit={handleSubmit}>
    <div class="table-wrapper">
      <table class="data-table">
        <!-- Table Header -->
        <DynamicTableHeader 
          columns={visibleColumns}
          {tableState}
          onSort={sortBy}
          onFilter={setFilter}
          onToggleSelectAll={toggleSelectAll}
        />
        
        <!-- Table Body -->
        <tbody>
          {#each processedData() as row (row.id)}
            <DynamicTableRow 
              {row}
              columns={visibleColumns()}
              {tableState}
              {errors}
              onEdit={editRow}
              onSave={saveRow}
              onDelete={deleteRow}
              onCancel={cancelRow}
              onToggleSelection={toggleRowSelection}
            />
          {/each}
        </tbody>
      </table>
    </div>
    
    <!-- Pagination -->
    {#if mergedConfig.enablePagination && totalItems > tableState.pageSize}
      <div class="table-pagination">
        <div class="pagination-info">
          Zeige {((tableState.currentPage - 1) * tableState.pageSize) + 1} bis 
          {Math.min(tableState.currentPage * tableState.pageSize, totalItems)} 
          von {totalItems} Einträgen
        </div>
        <div class="pagination-controls">
          <button 
            type="button" 
            class="btn btn-secondary"
            disabled={tableState.currentPage === 1}
            onclick={() => tableState.currentPage = Math.max(1, tableState.currentPage - 1)}
          >
            Vorherige
          </button>
          <span class="pagination-page">
            Seite {tableState.currentPage} von {Math.ceil(totalItems / tableState.pageSize)}
          </span>
          <button 
            type="button" 
            class="btn btn-secondary"
            disabled={tableState.currentPage >= Math.ceil(totalItems / tableState.pageSize)}
            onclick={() => tableState.currentPage = Math.min(Math.ceil(totalItems / tableState.pageSize), tableState.currentPage + 1)}
          >
            Nächste
          </button>
        </div>
      </div>
    {/if}
    
    <!-- Actions -->
    <div class="table-actions">
      <button 
        type="submit" 
        class="btn btn-primary"
        disabled={isSubmitting}
      >
        {#if isSubmitting}
          <span class="spinner"></span>
        {/if}
        {mergedConfig.submitLabel}
      </button>
      
      {#if mergedConfig.showCancelButton}
        <button 
          type="button" 
          class="btn btn-secondary" 
          onclick={closeModal}
          disabled={isSubmitting}
        >
          {mergedConfig.cancelLabel}
        </button>
      {/if}
    </div>
  </form>
</div>

<style>
  /* Foundry VTT CSS-Variablen verwenden */
  .table-container {
    background: var(--color-background-primary);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius);
    padding: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .table-header {
    border-bottom: 1px solid var(--color-border-primary);
    padding: 1rem;
    background: var(--color-background-secondary);
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    margin: -1rem -1rem 1rem -1rem;
  }
  
  .table-title {
    color: var(--color-text-primary);
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  .table-description {
    color: var(--color-text-secondary);
    margin: 0.5rem 0 0 0;
    font-size: 0.9rem;
  }
  
  .table-wrapper {
    flex: 1;
    overflow: auto;
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius);
  }
  
  .data-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--color-background-primary);
  }
  
  .table-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-top: 1px solid var(--color-border-primary);
    background: var(--color-background-secondary);
  }
  
  .pagination-info {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
  }
  
  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .pagination-page {
    color: var(--color-text-primary);
    font-size: 0.9rem;
  }
  
  .table-actions {
    border-top: 1px solid var(--color-border-primary);
    padding: 1rem;
    background: var(--color-background-secondary);
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    margin: 1rem -1rem -1rem -1rem;
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
  
  .btn-secondary:hover:not(:disabled) {
    background: var(--color-background-secondary);
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .spinner {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Scroll-Indikator für bessere UX */
  .table-wrapper::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  
  .table-wrapper::-webkit-scrollbar-track {
    background: var(--color-background-secondary);
    border-radius: 6px;
  }
  
  .table-wrapper::-webkit-scrollbar-thumb {
    background: var(--color-border-primary);
    border-radius: 6px;
  }
  
  .table-wrapper::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary);
  }
</style>
