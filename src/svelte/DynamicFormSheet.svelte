<script lang="ts">

  import type { IDynamicFormConfig, IFormFieldDefinition } from '../types/DynamicFormTypes';
  import DynamicFormField from './DynamicFormField.svelte';
  
  const { config, onSubmit, onCancel } = $props<{ 
    config: IDynamicFormConfig;
    onSubmit: (values: Record<string, any>) => void;
    onCancel: () => void;
  }>();
  
  // Lokaler State für alle Formularwerte
  let formValues = $state<Record<string, any>>({});
  let errors = $state<Record<string, string>>({});
  let isSubmitting = $state(false);
  
  // Standardwerte für Konfiguration
  const defaultConfig = {
    submitLabel: 'Speichern',
    cancelLabel: 'Abbrechen',
    showCancelButton: true,
    modalSize: 'medium',
    embedding: {
      mode: 'embedded',
      zIndex: 1000,
      animation: 'fade'
    },
    validation: {
      location: 'child',
      timing: 'onSubmit'
    },
    styling: {
      theme: 'foundry',
      inheritParentStyles: true
    }
  };
  
  // Konfiguration mit Standardwerten zusammenführen
  const mergedConfig = $derived({
    ...defaultConfig,
    ...config,
    embedding: { ...defaultConfig.embedding, ...config.embedding },
    validation: { ...defaultConfig.validation, ...config.validation },
    styling: { ...defaultConfig.styling, ...config.styling }
  });
  
  // Initialisierung der Werte
  $effect(() => {
    if (config.initialValues) {
      formValues = { ...config.initialValues };
    } else {
      // Standardwerte aus den Elementen setzen
      const defaults: Record<string, any> = {};
      config.elements.forEach((element: IFormFieldDefinition) => {
        if (element.default !== undefined) {
          defaults[element.name] = element.default;
        }
      });
      formValues = defaults;
    }
    
    // Scroll zum ersten Feld nach der Initialisierung
    scrollToFirstField();
  });
  
  // Feldwert aktualisieren
  function updateFieldValue(fieldName: string, value: any) {
    formValues = { ...formValues, [fieldName]: value };
    
    // Validierung bei Änderung
    if (mergedConfig.validation.timing === 'onChange') {
      validateField(fieldName);
    }
    
    // Zwischenwerte an Parent senden
    if (mergedConfig.state?.shareIntermediateValues && mergedConfig.state?.onIntermediateUpdate) {
      mergedConfig.state.onIntermediateUpdate(formValues);
    }
  }
  
  // Einzelnes Feld validieren
  function validateField(fieldName: string) {
    const element = config.elements.find((e: IFormFieldDefinition) => e.name === fieldName);
    if (!element) return;
    
    const fieldErrors: string[] = [];
    
    // Pflichtfeld-Validierung
    if (element.required && (!formValues[fieldName] || formValues[fieldName] === '')) {
      fieldErrors.push(`${element.label} ist erforderlich`);
    }
    
    // Pattern-Validierung
    if (element.validation?.pattern && formValues[fieldName]) {
      const regex = new RegExp(element.validation.pattern);
      if (!regex.test(formValues[fieldName])) {
        fieldErrors.push(`${element.label} entspricht nicht dem erwarteten Format`);
      }
    }
    
    // Min/Max-Validierung für Zahlen
    if (element.type === 'number' && formValues[fieldName] !== undefined) {
      const numValue = Number(formValues[fieldName]);
      if (element.validation?.min !== undefined && numValue < element.validation.min) {
        fieldErrors.push(`${element.label} muss mindestens ${element.validation.min} sein`);
      }
      if (element.validation?.max !== undefined && numValue > element.validation.max) {
        fieldErrors.push(`${element.label} darf maximal ${element.validation.max} sein`);
      }
    }
    
    // Custom-Validierung
    if (element.validation?.custom) {
      const customError = element.validation.custom(formValues[fieldName]);
      if (customError) fieldErrors.push(customError);
    }
    
    if (fieldErrors.length > 0) {
      errors[fieldName] = fieldErrors.join(', ');
      // Scroll zum ersten Feld mit Fehler
      scrollToField(fieldName);
    } else {
      delete errors[fieldName];
      errors = { ...errors };
    }
  }
  
  // Alle Felder validieren
  function validateAllFields(): boolean {
    config.elements.forEach((element: IFormFieldDefinition) => validateField(element.name));
    return Object.keys(errors).length === 0;
  }
  
  // Scroll zu einem bestimmten Feld
  function scrollToField(fieldName: string) {
    const fieldElement = document.querySelector(`[data-field-name="${fieldName}"]`);
    if (fieldElement) {
      // Einfaches scrollIntoView für den form-container
      fieldElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
      
      // Fokus auf das Feld setzen
      const inputElement = fieldElement.querySelector('input, textarea, select') as HTMLElement;
      if (inputElement) {
        setTimeout(() => {
          inputElement.focus();
        }, 300); // Warten bis Scroll abgeschlossen ist
      }
    }
  }
  
  // Scroll zum ersten sichtbaren Feld beim Laden
  function scrollToFirstField() {
    const firstVisibleField = config.elements.find((element: IFormFieldDefinition) => 
      !element.showIf || element.showIf(formValues)
    );
    if (firstVisibleField) {
      setTimeout(() => {
        scrollToField(firstVisibleField.name);
      }, 100);
    }
  }
  

  
  // Formular absenden
  async function handleSubmit(e: Event) {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Alle Felder validieren
    if (!validateAllFields()) {
      // Scroll zum ersten Feld mit Fehler
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        scrollToField(firstErrorField);
      }
      return; // Fehler vorhanden
    }
    
    isSubmitting = true;
    
    try {
      // Callback-Funktion aufrufen, falls vorhanden
      if (config.onSubmit) {
        await config.onSubmit(formValues);
      } else if (onSubmit) {
        // Nur aufrufen, wenn config.onSubmit nicht vorhanden ist
        await onSubmit(formValues);
      }
      
      // Erfolgreich - Modal schließen
      closeModal();
    } catch (error) {
      console.error('Fehler beim Absenden des Formulars:', error);
      // Fehlerbehandlung hier implementieren
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
  
  // Keyboard-Navigation für bessere UX
  function handleKeyNavigation(e: KeyboardEvent) {
    if (e.key === 'Enter' && e.ctrlKey) {
      // Ctrl+Enter zum Absenden
      e.preventDefault();
      handleSubmit(e);
    }
  }
  
  // CSS-Klassen basierend auf Konfiguration
  const formClasses = $derived([
    'dynamic-form-sheet',
    `form-size-${mergedConfig.modalSize}`,
    `theme-${mergedConfig.styling.theme}`,
    mergedConfig.styling.customClasses?.container || ''
  ].filter(Boolean).join(' '));
</script>

<svelte:window onkeydown={handleKeydown} onkeyup={handleKeyNavigation} />

<!-- Embedded Form Container -->
<div class="form-container {formClasses}">
  <!-- Header -->
  <div class="form-header">
    <h3 class="form-title">{mergedConfig.title}</h3>
    {#if mergedConfig.description}
      <p class="form-description">{mergedConfig.description}</p>
    {/if}
  </div>
  
  <!-- Formular -->
  <form class="dynamic-form" onsubmit={handleSubmit}>
    <!-- Dynamische Felder -->
    {#each config.elements as element (element.id)}
      {#if !element.showIf || element.showIf(formValues)}
        <div data-field-name={element.name} class="field-container">
          <DynamicFormField 
            {element}
            value={formValues[element.name]}
            error={errors[element.name]}
            onUpdate={(value) => updateFieldValue(element.name, value)}
          />
        </div>
      {/if}
    {/each}
    
    <!-- Aktions-Buttons -->
    <div class="form-actions">
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
  .form-container {
    background: var(--color-background-primary);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius);
    padding: 1rem;
  }
  
  .form-header {
    border-bottom: 1px solid var(--color-border-primary);
    padding: 1rem;
    background: var(--color-background-secondary);
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    margin: -1rem -1rem 1rem -1rem;
  }
  
  .form-title {
    color: var(--color-text-primary);
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  .form-description {
    color: var(--color-text-secondary);
    margin: 0.5rem 0 0 0;
    font-size: 0.9rem;
  }
  

  
  .field-container {
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
  }
  
  .field-container:focus-within {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: var(--border-radius);
    padding: 0.5rem;
    margin: 0.5rem -0.5rem 1.5rem -0.5rem;
  }
  
  .form-actions {
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
  .dynamic-dialog-app::-webkit-scrollbar {
    width: 12px;
  }
  
  .dynamic-dialog-app::-webkit-scrollbar-track {
    background: var(--color-background-secondary);
    border-radius: 6px;
  }
  
  .dynamic-dialog-app::-webkit-scrollbar-thumb {
    background: var(--color-border-primary);
    border-radius: 6px;
  }
  
  .dynamic-dialog-app::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary);
  }
  
  /* Fokus-Indikator für bessere Accessibility */
  .field-container:focus-within :global(.field-label) {
    color: var(--color-primary);
    font-weight: 600;
  }
  
  /* Smooth Transitions für alle interaktiven Elemente */
  .form-container * {
    transition: border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
  }
</style>
