<script lang="ts">

  import type { IFormFieldDefinition } from '../types/DynamicFormTypes';
  
  const { element, value, error, onUpdate } = $props<{
    element: IFormFieldDefinition;
    value: unknown;
    error: string | undefined;
    onUpdate: (value: unknown) => void;
  }>();
  
  // Feldwert aktualisieren
  function updateValue(newValue: unknown) {
    onUpdate(newValue);
  }
  
  // Feldwert bei Blur aktualisieren
  function handleBlur(e: Event) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    updateValue(target.value);
  }
  
  // Checkbox-Wert aktualisieren
  function handleCheckboxChange(e: Event) {
    const target = e.target as HTMLInputElement;
    updateValue(target.checked);
  }
  
  // Select-Wert aktualisieren
  function handleSelectChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    updateValue(target.value);
  }
  
  // Multi-Select Funktionen
  function toggleSelection(optionValue: string, checked: boolean) {
    const currentValues = (value || []) as string[];
    let newValues: string[];
    
    if (checked) {
      // Option hinzufügen
      newValues = [...currentValues, optionValue];
    } else {
      // Option entfernen
      newValues = currentValues.filter(v => v !== optionValue);
    }
    
    updateValue(newValues);
  }
  
  // CSS-Klassen für Feldbreite
  const fieldWidthClass = $derived(`field-width-${element.ui?.width || 'full'}`);
  
  // CSS-Klassen für Fehlerzustand
  const fieldClasses = $derived([
    'form-field',
    fieldWidthClass,
    error ? 'has-error' : '',
    element.ui?.disabled ? 'disabled' : '',
    element.ui?.readonly ? 'readonly' : ''
  ].filter(Boolean).join(' '));
</script>

<!-- Text-Feld -->
{#if element.type === 'text'}
  <div class={fieldClasses}>
    <label for={element.id} class="field-label">
      {element.label}{element.required ? ' *' : ''}
    </label>
    <input 
      id={element.id}
      type="text"
      class="field-input"
      value={value || ''}
      placeholder={element.placeholder || ''}
      required={element.required || false}
      disabled={element.ui?.disabled || false}
      readonly={element.ui?.readonly || false}
      oninput={(e) => updateValue((e.target as HTMLInputElement).value)}
      onblur={handleBlur}
    />
    {#if element.description}
      <small class="field-description">{element.description}</small>
    {/if}
    {#if error}
      <div class="field-error">{error}</div>
    {/if}
  </div>

<!-- Textarea-Feld -->
{:else if element.type === 'textarea'}
  <div class={fieldClasses}>
    <label for={element.id} class="field-label">
      {element.label}{element.required ? ' *' : ''}
    </label>
    <textarea 
      id={element.id}
      class="field-textarea"
      rows={element.ui?.rows || 3}
      placeholder={element.placeholder || ''}
      required={element.required || false}
      disabled={element.ui?.disabled || false}
      readonly={element.ui?.readonly || false}
      oninput={(e) => updateValue((e.target as HTMLTextAreaElement).value)}
      onblur={handleBlur}
    >{value || ''}</textarea>
    {#if element.description}
      <small class="field-description">{element.description}</small>
    {/if}
    {#if error}
      <div class="field-error">{error}</div>
    {/if}
  </div>

<!-- Select-Feld -->
{:else if element.type === 'select'}
  <div class={fieldClasses}>
    <label for={element.id} class="field-label">
      {element.label}{element.required ? ' *' : ''}
    </label>
    <select 
      id={element.id}
      class="field-select"
      required={element.required || false}
      disabled={element.ui?.disabled || false}
      onchange={handleSelectChange}
    >
      <option value="">Bitte wählen...</option>
      {#each element.options || [] as option}
        {#if typeof option === 'string'}
          <option value={option} selected={value === option}>
            {option}
          </option>
        {:else}
          <option value={option.value} selected={value === option.value}>
            {option.label || option.value}
          </option>
        {/if}
      {/each}
    </select>
    {#if element.description}
      <small class="field-description">{element.description}</small>
    {/if}
    {#if error}
      <div class="field-error">{error}</div>
    {/if}
  </div>

<!-- Multi-Select-Feld -->
{:else if element.type === 'multiselect'}
  <div class={fieldClasses}>
    <div class="field-label">
      {element.label}{element.required ? ' *' : ''}
    </div>
    <div class="checkbox-group">
      {#each element.options || [] as option}
        {#if typeof option === 'string'}
          <label class="checkbox-option">
            <input 
              type="checkbox" 
              checked={(value || []).includes(option)}
              onchange={(e) => toggleSelection(option, (e.target as HTMLInputElement).checked)}
            />
            <span>{option}</span>
          </label>
        {:else}
          <label class="checkbox-option">
            <input 
              type="checkbox" 
              checked={(value || []).includes(option.value)}
              onchange={(e) => toggleSelection(option.value, (e.target as HTMLInputElement).checked)}
            />
            <span>{option.label || option.value}</span>
          </label>
        {/if}
      {/each}
    </div>
    {#if element.description}
      <small class="field-description">{element.description}</small>
    {/if}
    {#if error}
      <div class="field-error">{error}</div>
    {/if}
  </div>

<!-- Boolean-Feld -->
{:else if element.type === 'boolean'}
  <div class={fieldClasses}>
    <label class="field-label checkbox-label">
      <input 
        type="checkbox"
        id={element.id}
        class="field-checkbox"
        checked={value || false}
        disabled={element.ui?.disabled || false}
        onchange={handleCheckboxChange}
      />
      <span class="checkbox-text">
        {element.label}{element.required ? ' *' : ''}
      </span>
    </label>
    {#if element.description}
      <small class="field-description">{element.description}</small>
    {/if}
    {#if error}
      <div class="field-error">{error}</div>
    {/if}
  </div>

<!-- Number-Feld -->
{:else if element.type === 'number'}
  <div class={fieldClasses}>
    <label for={element.id} class="field-label">
      {element.label}{element.required ? ' *' : ''}
    </label>
    <input 
      id={element.id}
      type="number"
      class="field-input"
      value={value || ''}
      placeholder={element.placeholder || ''}
      required={element.required || false}
      min={element.validation?.min}
      max={element.validation?.max}
      disabled={element.ui?.disabled || false}
      readonly={element.ui?.readonly || false}
      oninput={(e) => updateValue(Number((e.target as HTMLInputElement).value))}
      onblur={handleBlur}
    />
    {#if element.description}
      <small class="field-description">{element.description}</small>
    {/if}
    {#if error}
      <div class="field-error">{error}</div>
    {/if}
  </div>

<!-- Date-Feld -->
{:else if element.type === 'date'}
  <div class={fieldClasses}>
    <label for={element.id} class="field-label">
      {element.label}{element.required ? ' *' : ''}
    </label>
    <input 
      id={element.id}
      type="date"
      class="field-input"
      value={value || ''}
      required={element.required || false}
      disabled={element.ui?.disabled || false}
      readonly={element.ui?.readonly || false}
      onchange={(e) => updateValue((e.target as HTMLInputElement).value)}
    />
    {#if element.description}
      <small class="field-description">{element.description}</small>
    {/if}
    {#if error}
      <div class="field-error">{error}</div>
    {/if}
  </div>

<!-- Color-Feld -->
{:else if element.type === 'color'}
  <div class={fieldClasses}>
    <label for={element.id} class="field-label">
      {element.label}{element.required ? ' *' : ''}
    </label>
    <div class="color-input-container">
      <input 
        id={element.id}
        type="color"
        class="field-color"
        value={value || '#000000'}
        required={element.required || false}
        disabled={element.ui?.disabled || false}
        onchange={(e) => updateValue((e.target as HTMLInputElement).value)}
      />
      <input 
        type="text"
        class="field-color-text"
        value={value || '#000000'}
        placeholder="#000000"
        required={element.required || false}
        disabled={element.ui?.disabled || false}
        readonly={element.ui?.readonly || false}
               oninput={(e) => updateValue((e.target as HTMLInputElement).value)}
       onblur={handleBlur}
      />
    </div>
    {#if element.description}
      <small class="field-description">{element.description}</small>
    {/if}
    {#if error}
      <div class="field-error">{error}</div>
    {/if}
  </div>

<!-- Unbekannter Feldtyp - Fallback zu Text -->
{:else}
  <div class={fieldClasses}>
    <label for={element.id} class="field-label">
      {element.label}{element.required ? ' *' : ''}
    </label>
    <input 
      id={element.id}
      type="text"
      class="field-input"
      value={value || ''}
      placeholder={element.placeholder || ''}
      required={element.required || false}
      disabled={element.ui?.disabled || false}
      readonly={element.ui?.readonly || false}
      oninput={(e) => updateValue((e.target as HTMLInputElement).value)}
      onblur={handleBlur}
    />
    {#if element.description}
      <small class="field-description">{element.description}</small>
    {/if}
    {#if error}
      <div class="field-error">{error}</div>
    {/if}
  </div>
{/if}

<style>
  .form-field {
    margin-bottom: 1rem;
  }
  
  .field-width-full {
    width: 100%;
  }
  
  .field-width-half {
    width: calc(50% - 0.5rem);
  }
  
  .field-width-third {
    width: calc(33.333% - 0.667rem);
  }
  
  .field-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--color-text-primary);
    font-size: 0.9rem;
  }
  
  .field-input,
  .field-textarea,
  .field-select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--color-border-primary);
    border-radius: 4px;
    font-size: 0.9rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  .field-input:focus,
  .field-textarea:focus,
  .field-select:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-alpha);
  }
  
  .field-textarea {
    min-height: 80px;
    resize: vertical;
    font-family: inherit;
  }
  
  .field-select {
    cursor: pointer;
  }
  
  /* Checkbox-Gruppe Styles */
  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    border: 1px solid var(--color-border-primary);
    border-radius: 4px;
    background: var(--color-background-primary);
  }
  
  .checkbox-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    transition: background-color 0.2s;
  }
  
  .checkbox-option:hover {
    background: var(--color-background-secondary);
  }
  
  .checkbox-option input[type="checkbox"] {
    margin: 0;
    accent-color: var(--color-primary);
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
  }
  
  .checkbox-option span {
    color: var(--color-text-primary);
    font-size: 0.9rem;
    cursor: pointer;
  }
  
  .field-checkbox {
    margin-right: 0.5rem;
    width: auto;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .checkbox-text {
    cursor: pointer;
  }
  
  .field-color-container {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  .field-color {
    width: 3rem;
    height: 2.5rem;
    padding: 0;
    border: 1px solid var(--color-border-primary);
    border-radius: 4px;
    cursor: pointer;
  }
  
  .field-color-text {
    flex: 1;
    font-family: monospace;
  }
  
  .field-description {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.8rem;
    line-height: 1.4;
  }
  
  .field-error {
    display: block;
    margin-top: 0.25rem;
    color: var(--color-error);
    font-size: 0.8rem;
    line-height: 1.4;
  }
  
  .has-error .field-input,
  .has-error .field-textarea,
  .has-error .field-select {
    border-color: var(--color-error);
  }
  
  .has-error .field-input:focus,
  .has-error .field-textarea:focus,
  .has-error .field-select:focus {
    border-color: var(--color-error);
    box-shadow: 0 0 0 2px var(--color-error-alpha);
  }
  
  .disabled .field-input,
  .disabled .field-textarea,
  .disabled .field-select,
  .disabled .field-checkbox {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .readonly .field-input,
  .readonly .field-textarea,
  .readonly .field-select {
    background-color: var(--color-background-secondary);
    cursor: not-allowed;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .field-width-half,
    .field-width-third {
      width: 100%;
    }
  }
</style>
