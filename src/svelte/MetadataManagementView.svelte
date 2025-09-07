<script lang="ts">
  console.log("MetadataManagementView");

  import { MODULE_ID, MODULE_METADATA_KEY } from '../constants';
  import { onMount } from 'svelte';
  import type { IDynamicFormConfig } from '../types/DynamicFormTypes';
  import { 
  createTextElement, 
  createSelectElement, 
  createMultiSelectElement,
  createBooleanElement, 
  createOptions 
} from '../utils/formWrappers';
  import DynamicDialogApp from '../applications/DynamicDialogApp';


  interface IMetadata {
    schemas: ISchema[]; // Array aller Schemas
  }

  interface ISchema {
    // Array aller Metadaten-Zeilen, die das Schema definieren
    rows: IMetadataRow[];
    
    // Liste aller verfügbaren Kategorien für die Gruppierung der Metadaten
    categories: string[];
    
    // Eindeutige ID des Schemas (für API-Zugriffe und interne Verarbeitung)
    id: string;
    
    // Technischer Name des Schemas (für API-Zugriffe und interne Verarbeitung)
    name: string;
    
    // Benutzerfreundlicher Anzeigename des Schemas
    label: string;
    
    // Detaillierte Beschreibung des Schemas und seiner Verwendung
    description: string;
    
    // Versionsnummer des Schemas (für Versionsverwaltung und Updates)
    version: string;
    
    // Name des Autors oder der Organisation, die das Schema erstellt hat
    author: string;
  }

  interface IMetadataRow {
    // Eindeutige ID für die Metadaten-Zeile
    id: string;
    
    // Technischer Name des Feldes (für API-Zugriffe und interne Verarbeitung)
    name: string;
    
    // Benutzerfreundlicher Anzeigename des Feldes
    label: string;
    
    // Aktueller Wert des Metadaten-Feldes
    value: any;
    
    // Datentyp des Feldes (z.B. 'string', 'number', 'boolean', 'select', 'textarea')
    type: string;
    
    // Gibt an, ob das Feld zwingend ausgefüllt werden muss
    required: boolean;
    
    // Standardwert, der verwendet wird, wenn kein Wert gesetzt ist
    default: any;
    
    // Verfügbare Optionen für Auswahlfelder (z.B. Dropdown-Listen)
    options: any[];
    
    // Platzhaltertext, der im Eingabefeld angezeigt wird
    placeholder: string;
    
    // Detaillierte Beschreibung des Feldes für Benutzer
    description: string;
    
    // Kategorie, in die das Feld eingeordnet wird (für Gruppierung)
    category: string;
  }

  // Hauptmetadaten-Objekt
  let metadata: IMetadata = $state({
    schemas: [],
  });

  // UI-State-Management
  let editingSchema: ISchema | null = $state(null);
  let editingRow: IMetadataRow | null = $state(null);
  let selectedSchemaId: string | null = $state(null);
  let isCreatingNewSchema: boolean = $state(false);
  let isCreatingNewRow: boolean = $state(false);
  let isLoading: boolean = $state(false);
  let errorMessage: string | null = $state(null);
  let successMessage: string | null = $state(null);
  // App-Instanz nicht mehr benötigt, da wir die statische show()-Methode verwenden

  // Neue Schema-Erstellung
  let newSchema: Partial<ISchema> = $state({
    name: '',
    label: '',
    description: '',
    author: '',
    version: '1.0.0',
    categories: [],
    rows: []
  });

  // Neue Zeilen-Erstellung
  let newRow: Partial<IMetadataRow> = $state({
    name: '',
    label: '',
    type: 'string',
    required: false,
    category: 'Allgemein',
    default: '',
    options: [],
    placeholder: '',
    description: ''
  });

  // Konstanten
  const FIELD_TYPES = [
    { value: 'string', label: 'Text' },
    { value: 'number', label: 'Zahl' },
    { value: 'boolean', label: 'Wahr/Falsch' },
    { value: 'select', label: 'Auswahl' },
    { value: 'textarea', label: 'Mehrzeiliger Text' }
  ];

  const DEFAULT_CATEGORIES = [
    'Allgemein',
    'Beziehungen',
    'Eigenschaften',
    'Notizen',
    'System'
  ];

  // Hilfsfunktionen
  function generateSchemaId(): string {
    return foundry.utils.randomID();
  }

  function generateRowId(): string {
    return foundry.utils.randomID();
  }

  function validateSchema(schema: Partial<ISchema>): string[] {
    const errors: string[] = [];
    if (!schema.name?.trim()) errors.push('Schema-Name ist erforderlich');
    if (!schema.label?.trim()) errors.push('Schema-Label ist erforderlich');
    return errors;
  }

  function validateMetadataRow(row: Partial<IMetadataRow>): string[] {
    const errors: string[] = [];
    if (!row.name?.trim()) errors.push('Feldname ist erforderlich');
    if (!row.label?.trim()) errors.push('Feldlabel ist erforderlich');
    if (!row.type) errors.push('Feldtyp ist erforderlich');
    return errors;
  }

  function getSchemaById(schemaId: string): ISchema | undefined {
    return metadata.schemas.find(s => s.id === schemaId);
  }

  function getRowById(schemaId: string, rowId: string): IMetadataRow | undefined {
    const schema = getSchemaById(schemaId);
    return schema?.rows.find(r => r.id === rowId);
  }

  function getCategoriesFromSchema(schema: ISchema): string[] {
    return [...new Set([...DEFAULT_CATEGORIES, ...schema.categories])];
  }

  // CRUD-Operationen für Schemas
  async function createSchema(schemaData: Partial<ISchema>): Promise<void> {
    const errors = validateSchema(schemaData);
    if (errors.length > 0) {
      errorMessage = errors.join(', ');
      return;
    }

    const newSchema: ISchema = {
      id: generateSchemaId(),
      rows: [],
      categories: Array.isArray(schemaData.categories) ? [...schemaData.categories] : [...DEFAULT_CATEGORIES],
      name: schemaData.name || '',
      label: schemaData.label || '',
      description: schemaData.description || '',
      version: schemaData.version || '1.0.0',
      author: schemaData.author || ''
    };
    
    metadata.schemas.push(newSchema);
    await saveMetadataToRegistry(metadata);
    
    // Reset form
    newSchema.name = '';
    newSchema.label = '';
    newSchema.description = '';
    newSchema.author = '';
    newSchema.version = '1.0.0';
    newSchema.categories = [];
    newSchema.rows = [];
    
    isCreatingNewSchema = false;
    successMessage = 'Schema erfolgreich erstellt';
    setTimeout(() => successMessage = null, 3000);
  }

  async function updateSchema(schemaId: string, updates: Partial<ISchema>): Promise<void> {
    const schemaIndex = metadata.schemas.findIndex(s => s.id === schemaId);
    if (schemaIndex === -1) return;

    const errors = validateSchema(updates);
    if (errors.length > 0) {
      errorMessage = errors.join(', ');
      return;
    }

    metadata.schemas[schemaIndex] = { ...metadata.schemas[schemaIndex], ...updates };
    await saveMetadataToRegistry(metadata);
    
    editingSchema = null;
    successMessage = 'Schema erfolgreich aktualisiert';
    setTimeout(() => successMessage = null, 3000);
  }

  async function deleteSchema(schemaId: string): Promise<void> {
    if (confirm('Sind Sie sicher, dass Sie dieses Schema löschen möchten?')) {
      metadata.schemas = metadata.schemas.filter(s => s.id !== schemaId);
      await saveMetadataToRegistry(metadata);
      
      if (selectedSchemaId === schemaId) {
        selectedSchemaId = null;
      }
      
      successMessage = 'Schema erfolgreich gelöscht';
      setTimeout(() => successMessage = null, 3000);
    }
  }

  async function duplicateSchema(schemaId: string): Promise<void> {
    const originalSchema = getSchemaById(schemaId);
    if (!originalSchema) return;

    const duplicatedSchema: ISchema = {
      ...originalSchema,
      id: generateSchemaId(),
      name: `${originalSchema.name}_copy`,
      label: `${originalSchema.label} (Kopie)`,
      version: '1.0.0'
    };

    metadata.schemas.push(duplicatedSchema);
    await saveMetadataToRegistry(metadata);
    
    successMessage = 'Schema erfolgreich dupliziert';
    setTimeout(() => successMessage = null, 3000);
  }

  // CRUD-Operationen für Metadaten-Zeilen
  async function addMetadataRow(schemaId: string, rowData: Partial<IMetadataRow>): Promise<void> {
    const errors = validateMetadataRow(rowData);
    if (errors.length > 0) {
      errorMessage = errors.join(', ');
      return;
    }

    const schema = getSchemaById(schemaId);
    if (!schema) return;
    
    const newRow: IMetadataRow = {
      id: generateRowId(),
      name: rowData.name || '',
      label: rowData.label || '',
      value: rowData.default || null,
      type: rowData.type || 'string',
      required: rowData.required || false,
      default: rowData.default || null,
      options: rowData.options || [],
      placeholder: rowData.placeholder || '',
      description: rowData.description || '',
      category: rowData.category || 'Allgemein'
    };
    
    schema.rows.push(newRow);
    await saveMetadataToRegistry(metadata);
    
    // Reset form
    newRow.name = '';
    newRow.label = '';
    newRow.type = 'string';
    newRow.required = false;
    newRow.category = 'Allgemein';
    newRow.default = '';
    newRow.options = [];
    newRow.placeholder = '';
    newRow.description = '';
    
    isCreatingNewRow = false;
    successMessage = 'Metadaten-Zeile erfolgreich hinzugefügt';
    setTimeout(() => successMessage = null, 3000);
  }

  async function updateMetadataRow(schemaId: string, rowId: string, updates: Partial<IMetadataRow>): Promise<void> {
    const schema = getSchemaById(schemaId);
    if (!schema) return;

    const rowIndex = schema.rows.findIndex(r => r.id === rowId);
    if (rowIndex === -1) return;

    const errors = validateMetadataRow(updates);
    if (errors.length > 0) {
      errorMessage = errors.join(', ');
      return;
    }

    schema.rows[rowIndex] = { ...schema.rows[rowIndex], ...updates };
    await saveMetadataToRegistry(metadata);
    
    editingRow = null;
    successMessage = 'Metadaten-Zeile erfolgreich aktualisiert';
    setTimeout(() => successMessage = null, 3000);
  }

  async function deleteMetadataRow(schemaId: string, rowId: string): Promise<void> {
    if (confirm('Sind Sie sicher, dass Sie diese Metadaten-Zeile löschen möchten?')) {
      const schema = getSchemaById(schemaId);
      if (!schema) return;

      schema.rows = schema.rows.filter(r => r.id !== rowId);
      await saveMetadataToRegistry(metadata);
      
      successMessage = 'Metadaten-Zeile erfolgreich gelöscht';
      setTimeout(() => successMessage = null, 3000);
    }
  }

  async function reorderMetadataRows(schemaId: string, rowIds: string[]): Promise<void> {
    const schema = getSchemaById(schemaId);
    if (!schema) return;

    const reorderedRows: IMetadataRow[] = [];
    for (const rowId of rowIds) {
      const row = schema.rows.find(r => r.id === rowId);
      if (row) reorderedRows.push(row);
    }

    schema.rows = reorderedRows;
    await saveMetadataToRegistry(metadata);
  }

  // UI-Hilfsfunktionen
  // Neue Schema-Erstellung
  async function startCreatingNewSchema(): Promise<void> {
    isCreatingNewSchema = true;
    editingSchema = null;
    
    const config = createSchemaFormConfig();
    const result = await DynamicDialogApp.show(config);
    
    if (result) {
      console.log('Neues Schema erstellt:', result);
      // Hier würde die Schema-Erstellung implementiert
    }
    
    isCreatingNewSchema = false;
  }

  // Schema-Bearbeitung starten
  async function startEditingSchema(schema: ISchema): Promise<void> {
    editingSchema = schema;
    isCreatingNewSchema = false;
    
    const config = createSchemaFormConfig();
    const result = await DynamicDialogApp.show(config);
    
    if (result) {
      console.log('Schema bearbeitet:', result);
      // Hier würde die Schema-Bearbeitung implementiert
    }
    
    editingSchema = null;
  }

  // Zeilen-Bearbeitung starten
  async function startEditingRow(schemaId: string, row: IMetadataRow): Promise<void> {
    editingRow = { ...row };
    isCreatingNewRow = false;
    
    const config = createRowFormConfig();
    const result = await DynamicDialogApp.show(config);
    
    if (result) {
      console.log('Metadaten-Zeile bearbeitet:', result);
      // Hier würde die Metadaten-Zeile-Bearbeitung implementiert
    }
    
    editingRow = null;
  }

  // Neue Zeilen-Erstellung
  async function startCreatingNewRow(schemaId: string): Promise<void> {
    isCreatingNewRow = true;
    editingRow = null;
    
    const config = createRowFormConfig();
    const result = await DynamicDialogApp.show(config);
    
    if (result) {
      console.log('Neue Metadaten-Zeile erstellt:', result);
      // Hier würde die Metadaten-Zeile-Erstellung implementiert
    }
    
    isCreatingNewRow = false;
  }

  

  // Schema auswählen
  function selectSchema(schemaId: string): void {
    selectedSchemaId = selectedSchemaId === schemaId ? null : schemaId;
  }

  // Separate Variablen für Formular-Bindings
  let schemaFormData = $derived(editingSchema || newSchema);
  let rowFormData = $derived(editingRow || newRow);
  
  // Schema-Formular mit Wrappern erstellen
  function createSchemaFormConfig() {
    let elements = [];
    
    elements.push(createTextElement('name', { 
      required: true, 
      placeholder: 'Technischer Name (z.B. character_metadata)',
      label: 'Name',
      description: 'Technischer Name für API-Zugriffe'
    }));
    
    elements.push(createTextElement('label', { 
      required: true, 
      placeholder: 'Anzeigename (z.B. Charakter-Metadaten)',
      label: 'Label',
      description: 'Benutzerfreundlicher Anzeigename'
    }));
    
    elements.push(createTextElement('description', { 
      multiline: true, 
      placeholder: 'Beschreibung des Schemas',
      label: 'Beschreibung',
      description: 'Detaillierte Beschreibung des Schemas'
    }));
    
    elements.push(createTextElement('version', { 
      default: '1.0.0', 
      placeholder: '1.0.0',
      label: 'Version',
      description: 'Versionsnummer des Schemas'
    }));
    
    elements.push(createTextElement('author', { 
      placeholder: 'Ihr Name',
      label: 'Autor',
      description: 'Name des Autors oder der Organisation'
    }));
    
    elements.push(createMultiSelectElement('categories', {
      options: DEFAULT_CATEGORIES,
      label: 'Kategorien',
      description: 'Verfügbare Kategorien für die Gruppierung der Metadaten'
    }));
    
    return {
      title: isCreatingNewSchema ? 'Neues Schema erstellen' : 'Schema bearbeiten',
      elements: elements,
      initialValues: editingSchema || {},
      submitLabel: isCreatingNewSchema ? 'Erstellen' : 'Aktualisieren',
      onSubmit: async (values: any) => {
        if (editingSchema) {
          await updateSchema(editingSchema.id, values);
        } else {
          await createSchema(values);
        }
        // Dialog wird automatisch geschlossen
      },
      onCancel: () => {
        // Dialog wird automatisch geschlossen
      }
    };
  }
  
  // Metadaten-Zeile Formular mit Wrappern erstellen
  function createRowFormConfig() {
    let elements = [];
    
    elements.push(createTextElement('name', { 
      required: true, 
      placeholder: 'Technischer Name (z.B. strength)',
      label: 'Name',
      description: 'Technischer Name für API-Zugriffe'
    }));
    
    elements.push(createTextElement('label', { 
      required: true, 
      placeholder: 'Anzeigename (z.B. Stärke)',
      label: 'Label',
      description: 'Benutzerfreundlicher Anzeigename'
    }));
    
    elements.push(createSelectElement('type', {
      required: true,
      options: createOptions('string', 'number', 'boolean', 'select', 'textarea'),
      label: 'Typ',
      description: 'Datentyp des Feldes'
    }));
    
    elements.push(createMultiSelectElement('category', {
      options: DEFAULT_CATEGORIES,
      label: 'Kategorie',
      description: 'Kategorie für die Gruppierung'
    }));
    
    elements.push(createTextElement('description', { 
      multiline: true, 
      placeholder: 'Beschreibung des Feldes',
      label: 'Beschreibung',
      description: 'Detaillierte Beschreibung des Feldes'
    }));
    
    elements.push(createTextElement('placeholder', { 
      placeholder: 'Platzhaltertext',
      label: 'Platzhalter',
      description: 'Text der im Eingabefeld angezeigt wird'
    }));
    
    elements.push(createTextElement('default', { 
      placeholder: 'Standardwert',
      label: 'Standardwert',
      description: 'Standardwert wenn kein Wert gesetzt ist'
    }));
    
    elements.push(createBooleanElement('required', {
      default: false,
      label: 'Pflichtfeld',
      description: 'Gibt an, ob das Feld zwingend ausgefüllt werden muss'
    }));
    
    // Options-Feld für Select-Typen
    elements.push(createTextElement('options', {
      multiline: true,
      placeholder: 'Option1, Option2, Option3 (kommagetrennt)',
      label: 'Verfügbare Optionen',
      description: 'Verfügbare Auswahlmöglichkeiten (kommagetrennt) - nur für Select-Felder relevant',
      showIf: (values) => values.type === 'select'
    }));
    
    return {
      title: isCreatingNewRow ? 'Neue Metadaten-Zeile erstellen' : 'Metadaten-Zeile bearbeiten',
      elements: elements,
      initialValues: editingRow || {},
      submitLabel: isCreatingNewRow ? 'Erstellen' : 'Aktualisieren',
      onSubmit: async (values: any) => {
        if (editingRow && selectedSchemaId) {
          await updateMetadataRow(selectedSchemaId, editingRow.id, values);
        } else if (selectedSchemaId) {
          await addMetadataRow(selectedSchemaId, values);
        }
        // Dialog wird automatisch geschlossen
      },
      onCancel: () => {
        // Dialog wird automatisch geschlossen
      }
    };
  }

  function addNewOption(): void {
    if (editingRow) {
      editingRow.options = [...(editingRow.options || []), ''];
    } else {
      newRow.options = [...(newRow.options || []), ''];
    }
  }

  function removeOption(index: number): void {
    if (editingRow && editingRow.options) {
      editingRow.options = editingRow.options.filter((_, i) => i !== index);
    } else if (newRow.options) {
      newRow.options = newRow.options.filter((_, i) => i !== index);
    }
  }

  function updateOption(index: number, value: string): void {
    if (editingRow && editingRow.options) {
      editingRow.options = editingRow.options.map((opt, i) => i === index ? value : opt);
    } else if (newRow.options) {
      newRow.options = newRow.options.map((opt, i) => i === index ? value : opt);
    }
  }

  // Bestehende Funktionen
  async function saveMetadataToRegistry(metadataParameter: IMetadata) {
    await game?.settings?.set(MODULE_ID as any, MODULE_METADATA_KEY as any, metadataParameter as any);
  }

  async function getMetadataFromRegistry() {
    return await game?.settings?.get(MODULE_ID as any, MODULE_METADATA_KEY as any);
  }

  async function loadMetadata() {
    const loaded = await getMetadataFromRegistry() as IMetadata;
    if (loaded && loaded.schemas) {
      // Sicherstellen, dass alle Schemata ein categories Array haben
      loaded.schemas.forEach(schema => {
        // Kategorien validieren und als echtes Array setzen
        if (!schema.categories || !Array.isArray(schema.categories)) {
          schema.categories = [...DEFAULT_CATEGORIES];
        } else {
          // Sicherstellen, dass es ein echtes Array ist (nicht Proxy)
          schema.categories = [...schema.categories];
        }
        
        // Rows validieren und als echtes Array setzen
        if (!schema.rows || !Array.isArray(schema.rows)) {
          schema.rows = [];
        } else {
          // Sicherstellen, dass es ein echtes Array ist (nicht Proxy)
          schema.rows = [...schema.rows];
        }
      });
      metadata = loaded;
    } else {
      // Fallback: Leere Metadaten initialisieren
      metadata = { schemas: [] };
    }
  }

  // Nur speichern wenn sich die Daten tatsächlich geändert haben
  $effect(() => {
    if (metadata && metadata.schemas !== undefined && metadata.schemas.length > 0) {
      // Verzögertes Speichern um Endlosschleifen zu vermeiden
      setTimeout(() => {
        saveMetadataToRegistry(metadata);
      }, 100);
    }
  })

  onMount(() => {
    loadMetadata();
    
    // Globaler Escape-Key-Listener für Modals
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (isCreatingNewSchema || editingSchema || isCreatingNewRow || editingRow)) {
        // Escape-Handling wird jetzt von DynamicDialogApp übernommen
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  })

</script>

<div class="metadata-container">
  <div class="metadata-header">
    <h1>Metadaten-Verwaltung</h1>
    <div class="header-actions">
      <button class="bright" onclick={() => startCreatingNewSchema()}>
        Neues Schema
      </button>
    </div>
  </div>

  {#if errorMessage}
    <div class="error-message">
      <span>{errorMessage}</span>
      <button class="close-btn" onclick={() => errorMessage = null}>×</button>
    </div>
  {/if}
  
  {#if successMessage}
    <div class="success-message">
      <span>{successMessage}</span>
      <button class="close-btn" onclick={() => successMessage = null}>×</button>
    </div>
  {/if}

  <div class="metadata-content">
    {#if isLoading}
      <p>Lade Schemas...</p>
    {:else if metadata.schemas.length === 0}
      <p>Keine Schemas vorhanden. Erstellen Sie Ihr erstes Schema.</p>
    {:else}
      {#each metadata.schemas as schema (schema.id)}
        <div class="schema-card {selectedSchemaId === schema.id ? 'selected' : ''}">
          <button class="schema-header" onclick={() => selectSchema(schema.id)}>
            <h3>{schema.label}</h3>
            <span class="version">v{schema.version}</span>
          </button>
          
          {#if selectedSchemaId === schema.id}
            <div class="schema-details">
              <p><strong>Beschreibung:</strong> {schema.description || 'Keine Beschreibung'}</p>
              <p><strong>Autor:</strong> {schema.author || 'Unbekannt'}</p>
              <p><strong>Kategorien:</strong> {schema.categories.join(', ')}</p>
              <p><strong>Metadaten-Zeilen:</strong> {schema.rows.length}</p>
              
              <div class="actions">
                <button onclick={() => startEditingSchema(schema)}>Bearbeiten</button>
                <button onclick={() => duplicateSchema(schema.id)}>Duplizieren</button>
                <button onclick={() => deleteSchema(schema.id)}>Löschen</button>
                <button class="bright" onclick={() => startCreatingNewRow(schema.id)}>Neue Zeile</button>
              </div>
              
              {#if schema.rows.length > 0}
                <div class="rows-section">
                  <h4>Metadaten-Zeilen</h4>
                  {#each schema.rows as row (row.id)}
                    <div class="row-item">
                      <div class="row-info">
                        <strong>{row.label}</strong> ({row.name}) - {row.type}
                        {#if row.required} - <em>Erforderlich</em>{/if}
                      </div>
                      <div class="row-actions">
                        <button onclick={() => startEditingRow(schema.id, row)}>Bearbeiten</button>
                        <button onclick={() => deleteMetadataRow(schema.id, row.id)}>Löschen</button>
                      </div>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  /* Gleiches Scrolling wie DynamicFormSheet */
  .metadata-container {
    height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    padding: 1rem;
    box-sizing: border-box;
  }

  .metadata-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-border-primary);
  }

  .header-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .metadata-header h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .metadata-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .schema-card {
    background: var(--color-background-secondary);
    border: 1px solid var(--color-border-primary);
    border-radius: 6px;
    overflow: hidden;
  }

  .schema-card.selected {
    border-color: var(--color-primary);
  }

  .schema-header {
    padding: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--color-background-primary);
    border-bottom: 1px solid var(--color-border-primary);
  }

  .schema-header:hover {
    background: var(--color-background-tertiary);
  }

  .schema-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .version {
    background: var(--color-info);
    color: var(--color-text-primary);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
  }

  .schema-details {
    padding: 1rem;
    background: var(--color-background-secondary);
  }

  .schema-details p {
    margin: 0.5rem 0;
    font-size: 0.9rem;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
    flex-wrap: wrap;
  }

  .rows-section {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border-primary);
  }

  .rows-section h4 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    font-weight: 600;
  }

  .row-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: var(--color-background-primary);
    border: 1px solid var(--color-border-primary);
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }

  .row-info {
    font-size: 0.9rem;
  }

  .row-actions {
    display: flex;
    gap: 0.5rem;
  }

  .error-message,
  .success-message {
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .error-message {
    background: var(--color-error-background);
    color: var(--color-error);
    border: 1px solid var(--color-error-border);
  }
  
  .success-message {
    background: var(--color-success-background);
    color: var(--color-success);
    border: 1px solid var(--color-success-border);
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: inherit;
    padding: 0;
    margin-left: 1rem;
  }

  .close-btn:hover {
    opacity: 0.7;
  }
</style>