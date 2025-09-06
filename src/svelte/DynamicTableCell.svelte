<script lang="ts">
  import type { ITableRowData, ITableColumnDefinition } from '../types/DynamicTableTypes';
  import DynamicFormField from './DynamicFormField.svelte';
  
  const { row, column, isEditing, errors, onUpdate } = $props<{
    row: ITableRowData;
    column: ITableColumnDefinition;
    isEditing: boolean;
    errors: Record<string, string>;
    onUpdate: (value: any) => void;
  }>();
  
  // Zellen-Wert
  const cellValue = $derived(row[column.name]);
  
  // Zellen-Fehler
  const cellError = $derived(errors[`${row.id}-${column.name}`]);
  
  // Zellen-Status
  const hasError = $derived(!!cellError);
  const isRequired = $derived(column.required || false);
  const isReadonly = $derived(column.ui?.readonly || false);
  const isDisabled = $derived(column.ui?.disabled || false);
  
  // Zellen-Klassen
  const cellClasses = $derived([
    'table-cell-content',
    hasError ? 'has-error' : '',
    isRequired ? 'required' : '',
    isReadonly ? 'readonly' : '',
    isDisabled ? 'disabled' : '',
    isEditing ? 'editing' : 'display'
  ].filter(Boolean).join(' '));
  
  // Wert für Anzeige formatieren
  function formatDisplayValue(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    
    // Custom-Renderer verwenden, falls vorhanden
    if (column.renderer) {
      return column.renderer(value, row);
    }
    
    // Typ-spezifische Formatierung
    switch (column.type) {
      case 'boolean':
        return value ? 'Ja' : 'Nein';
      case 'date':
        return value ? new Date(value).toLocaleDateString() : '';
      case 'number':
        return typeof value === 'number' ? value.toString() : '';
      case 'multiselect':
        if (Array.isArray(value)) {
          return value.join(', ');
        }
        return '';
      case 'select':
        if (column.options) {
          const option = column.options.find((opt: any) => 
            (typeof opt === 'string' ? opt : opt.value) === value
          );
          if (option) {
            return typeof option === 'string' ? option : (option.label || option.value);
          }
        }
        return value || '';
      default:
        return value.toString();
    }
  }
  
  // Wert aktualisieren
  function handleValueUpdate(newValue: any) {
    onUpdate(newValue);
  }
  
  // Click-to-Edit (nur im Display-Modus)
  function handleCellClick() {
    if (!isEditing && !isReadonly && !isDisabled) {
      // Diese Funktion wird von der Parent-Komponente aufgerufen
      // Hier könnten wir einen Edit-Modus für einzelne Zellen implementieren
    }
  }
  
  // Keyboard-Handler für Accessibility
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCellClick();
    }
  }
</script>

{#if !isEditing && !isReadonly && !isDisabled}
  <button 
    class={cellClasses} 
    onclick={handleCellClick}
    onkeydown={handleKeydown}
    title="Klicken zum Bearbeiten"
  >
    {#if isEditing}
      <!-- Bearbeitungs-Modus: DynamicFormField verwenden -->
      <div class="cell-edit-mode">
        <DynamicFormField 
          element={{
            ...column,
            value: cellValue,
            ui: {
              ...column.ui,
              width: 'full'
            }
          }}
          value={cellValue}
          error={cellError}
          onUpdate={handleValueUpdate}
        />
      </div>
    {:else}
      <!-- Anzeige-Modus: Formatierter Wert -->
      <div class="cell-display-mode">
        <span class="cell-value {column.type}" title={cellValue}>
          {formatDisplayValue(cellValue)}
        </span>
        {#if isRequired && !cellValue}
          <span class="required-indicator" title="Pflichtfeld">*</span>
        {/if}
      </div>
    {/if}
    
    <!-- Fehler-Anzeige -->
    {#if hasError}
      <div class="cell-error" title={cellError}>
        {cellError}
      </div>
    {/if}
  </button>
{:else}
  <div 
    class={cellClasses}
  >
    {#if isEditing}
      <!-- Bearbeitungs-Modus: DynamicFormField verwenden -->
      <div class="cell-edit-mode">
        <DynamicFormField 
          element={{
            ...column,
            value: cellValue,
            ui: {
              ...column.ui,
              width: 'full'
            }
          }}
          value={cellValue}
          error={cellError}
          onUpdate={handleValueUpdate}
        />
      </div>
    {:else}
      <!-- Anzeige-Modus: Formatierter Wert -->
      <div class="cell-display-mode">
        <span class="cell-value {column.type}" title={cellValue}>
          {formatDisplayValue(cellValue)}
        </span>
        {#if isRequired && !cellValue}
          <span class="required-indicator" title="Pflichtfeld">*</span>
        {/if}
      </div>
    {/if}
    
    <!-- Fehler-Anzeige -->
    {#if hasError}
      <div class="cell-error" title={cellError}>
        {cellError}
      </div>
    {/if}
  </div>
{/if}

<style>
  .table-cell-content {
    position: relative;
    min-height: 2rem;
    padding: 0.25rem;
    border-radius: 3px;
    transition: all 0.2s ease;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
  }
  
  .table-cell-content:hover {
    background: var(--color-background-secondary);
  }
  
  .table-cell-content.editing {
    background: var(--color-warning-alpha);
    border: 1px solid var(--color-warning);
  }
  
  .table-cell-content.has-error {
    background: var(--color-error-alpha);
    border: 1px solid var(--color-error);
  }
  
  .table-cell-content.required {
    border-left: 3px solid var(--color-primary);
  }
  
  .table-cell-content.readonly {
    background: var(--color-background-secondary);
    opacity: 0.8;
  }
  
  .table-cell-content.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .cell-edit-mode {
    width: 100%;
  }
  
  .cell-display-mode {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    min-height: 1.5rem;
  }
  
  .cell-value {
    flex: 1;
    color: var(--color-text-primary);
    font-size: 0.9rem;
    line-height: 1.4;
    word-break: break-word;
  }
  
  .required-indicator {
    color: var(--color-error);
    font-weight: bold;
    font-size: 0.8rem;
  }
  
  .cell-error {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-error);
    color: white;
    font-size: 0.7rem;
    padding: 0.25rem;
    border-radius: 3px;
    z-index: 10;
    margin-top: 0.25rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  /* Spezielle Formatierung für verschiedene Datentypen */
  .cell-value.boolean {
    font-weight: 600;
  }
  
  .cell-value.number {
    text-align: right;
    font-family: monospace;
  }
  
  .cell-value.date {
    font-family: monospace;
  }
  
  .cell-value.multiselect {
    font-style: italic;
  }
  
  /* Hover-Effekte für Click-to-Edit */
  .table-cell-content:not(.readonly):not(.disabled):not(.editing) {
    cursor: pointer;
  }
  
  .table-cell-content:not(.readonly):not(.disabled):not(.editing):hover {
    background: var(--color-primary-alpha);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .table-cell-content {
      padding: 0.2rem;
      min-height: 1.5rem;
    }
    
    .cell-value {
      font-size: 0.8rem;
    }
    
    .cell-error {
      font-size: 0.6rem;
      padding: 0.2rem;
    }
  }
  
  /* Animationen */
  .table-cell-content {
    animation: cellFadeIn 0.2s ease-in;
  }
  
  @keyframes cellFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  /* Fokus-Management */
  .table-cell-content:focus-within {
    outline: 2px solid var(--color-primary);
    outline-offset: -2px;
  }
  
  /* Truncation für lange Texte */
  .cell-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .table-cell-content:hover .cell-value {
    white-space: normal;
    word-break: break-word;
  }
</style>
