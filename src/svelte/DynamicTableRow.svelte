<script lang="ts">
  import type { ITableRowData, ITableColumnDefinition, ITableState } from '../types/DynamicTableTypes';
  import DynamicTableCell from './DynamicTableCell.svelte';
  
  const { row, columns, tableState, errors, onEdit, onSave, onDelete, onCancel, onToggleSelection } = $props<{
    row: ITableRowData;
    columns: ITableColumnDefinition[];
    tableState: ITableState;
    errors: Record<string, string>;
    onEdit: (rowId: string) => void;
    onSave: (rowId: string) => void;
    onDelete: (rowId: string) => void;
    onCancel: (rowId: string) => void;
    onToggleSelection: (rowId: string) => void;
  }>();
  
  // Zeilen-Status
  const isSelected = $derived(tableState.selectedRows.includes(row.id));
  const isEditing = $derived(row._editing || false);
  const isNew = $derived(row._new || false);
  const isModified = $derived(row._modified || false);
  
  // Zeilen-Klassen
  const rowClasses = $derived([
    'table-row',
    isSelected ? 'selected' : '',
    isEditing ? 'editing' : '',
    isNew ? 'new' : '',
    isModified ? 'modified' : '',
    row._deleted ? 'deleted' : ''
  ].filter(Boolean).join(' '));
  
  // Zeile bearbeiten
  function handleEdit() {
    onEdit(row.id);
  }
  
  // Zeile speichern
  function handleSave() {
    onSave(row.id);
  }
  
  // Zeile löschen
  function handleDelete() {
    if (confirm('Möchten Sie diese Zeile wirklich löschen?')) {
      onDelete(row.id);
    }
  }
  
  // Zeile abbrechen
  function handleCancel() {
    onCancel(row.id);
  }
  
  // Auswahl umschalten
  function handleToggleSelection() {
    onToggleSelection(row.id);
  }
  
  // Zeilen-Daten aktualisieren
  function updateCellValue(columnName: string, value: any) {
    // Diese Funktion wird von DynamicTableCell aufgerufen
    // Die Daten werden über die Parent-Komponente aktualisiert
  }
</script>

<tr class={rowClasses}>
  <!-- Auswahl-Spalte -->
  <td class="table-cell select-cell">
    <input 
      type="checkbox" 
      class="row-checkbox"
      checked={isSelected}
      onchange={handleToggleSelection}
    />
  </td>
  
  <!-- Daten-Spalten -->
  {#each columns as column}
    <td class="table-cell data-cell">
      <DynamicTableCell 
        {row}
        {column}
        {isEditing}
        {errors}
        onUpdate={(value) => updateCellValue(column.name, value)}
      />
    </td>
  {/each}
  
  <!-- Aktionen-Spalte -->
  <td class="table-cell actions-cell">
    <div class="row-actions">
      {#if isEditing}
        <!-- Bearbeitungs-Modus -->
        <button 
          type="button" 
          class="btn btn-sm btn-success"
          onclick={handleSave}
          title="Speichern"
        >
          <span class="icon">✓</span>
        </button>
        <button 
          type="button" 
          class="btn btn-sm btn-secondary"
          onclick={handleCancel}
          title="Abbrechen"
        >
          <span class="icon">×</span>
        </button>
      {:else}
        <!-- Anzeige-Modus -->
        <button 
          type="button" 
          class="btn btn-sm btn-primary"
          onclick={handleEdit}
          title="Bearbeiten"
        >
          <span class="icon">✏️</span>
        </button>
        <button 
          type="button" 
          class="btn btn-sm btn-danger"
          onclick={handleDelete}
          title="Löschen"
        >
          <span class="icon">🗑️</span>
        </button>
      {/if}
    </div>
  </td>
</tr>

<style>
  .table-row {
    border-bottom: 1px solid var(--color-border-primary);
    transition: all 0.2s ease;
  }
  
  .table-row:hover {
    background: var(--color-background-secondary);
  }
  
  .table-row.selected {
    background: var(--color-primary-alpha);
  }
  
  .table-row.editing {
    background: var(--color-warning-alpha);
  }
  
  .table-row.new {
    background: var(--color-success-alpha);
  }
  
  .table-row.modified {
    background: var(--color-info-alpha);
  }
  
  .table-row.deleted {
    background: var(--color-error-alpha);
    opacity: 0.6;
  }
  
  .table-cell {
    padding: 0.5rem;
    vertical-align: top;
    border-right: 1px solid var(--color-border-primary);
  }
  
  .table-cell:last-child {
    border-right: none;
  }
  
  .select-cell {
    width: 3rem;
    min-width: 3rem;
    text-align: center;
  }
  
  .data-cell {
    min-width: 100px;
  }
  
  .actions-cell {
    width: 8rem;
    min-width: 8rem;
    text-align: center;
  }
  
  .row-checkbox {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    accent-color: var(--color-primary);
  }
  
  .row-actions {
    display: flex;
    gap: 0.25rem;
    justify-content: center;
    align-items: center;
  }
  
  .btn {
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--color-border-primary);
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2rem;
  }
  
  .btn-sm {
    padding: 0.2rem 0.4rem;
    font-size: 0.7rem;
    min-width: 1.8rem;
    height: 1.8rem;
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
  
  .btn-success {
    background: var(--color-success);
    color: white;
    border-color: var(--color-success);
  }
  
  .btn-success:hover:not(:disabled) {
    background: var(--color-success-hover);
  }
  
  .btn-danger {
    background: var(--color-error);
    color: white;
    border-color: var(--color-error);
  }
  
  .btn-danger:hover:not(:disabled) {
    background: var(--color-error-hover);
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .icon {
    font-size: 0.8rem;
    line-height: 1;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .table-cell {
      padding: 0.25rem;
    }
    
    .row-actions {
      flex-direction: column;
      gap: 0.1rem;
    }
    
    .btn-sm {
      min-width: 1.5rem;
      height: 1.5rem;
      font-size: 0.6rem;
    }
  }
  
  /* Animationen */
  .table-row {
    animation: fadeIn 0.3s ease-in;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Fokus-Management */
  .table-row:focus-within {
    outline: 2px solid var(--color-primary);
    outline-offset: -2px;
  }
</style>
