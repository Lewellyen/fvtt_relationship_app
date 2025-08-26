<script lang="ts">
  console.log("MetadataManagementView");

  import { MODULE_ID, MODULE_METADATA_KEY } from '../constants';
  import { onMount } from 'svelte';

  interface IMetadata {
    schemas: ISchema[]; // Array aller Schemas
  }

  interface ISchema {
    // Array aller Metadaten-Zeilen, die das Schema definieren
    rows: IMetadataRow[];
    
    // Liste aller verfügbaren Kategorien für die Gruppierung der Metadaten
    categories: string[];
    
    // Eindeutige ID des Schemas
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

  // Neue Schema-Erstellung
  let newSchema: Partial<ISchema> = $state({
    name: '',
    label: '',
    description: '',
    author: '',
    version: '1.0.0'
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
      categories: [...DEFAULT_CATEGORIES],
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
  function startEditingSchema(schema: ISchema): void {
    editingSchema = { ...schema };
    isCreatingNewSchema = false;
  }

  function startEditingRow(row: IMetadataRow): void {
    editingRow = { ...row };
    isCreatingNewRow = false;
  }

  function cancelEditing(): void {
    editingSchema = null;
    editingRow = null;
    isCreatingNewSchema = false;
    isCreatingNewRow = false;
    errorMessage = null;
  }

  // Separate Variablen für Formular-Bindings
  let schemaFormData = $derived(editingSchema || newSchema);
  let rowFormData = $derived(editingRow || newRow);

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
      metadata = loaded;
    }
  }

  $effect(() => {
    if (metadata && metadata.schemas !== undefined) {
      saveMetadataToRegistry(metadata);
    }
  })

  onMount(() => {
    loadMetadata();
    
    // Globaler Escape-Key-Listener für Modals
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (isCreatingNewSchema || editingSchema || isCreatingNewRow || editingRow)) {
        cancelEditing();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  })

</script>

<div class="metadata-management-view">
  <h1>Metadaten-Verwaltung</h1>
  
  <!-- Fehlermeldungen und Erfolgsmeldungen -->
  {#if errorMessage}
    <div class="error-message">
      {errorMessage}
      <button onclick={() => errorMessage = null} class="close-btn" aria-label="Fehlermeldung schließen">×</button>
    </div>
  {/if}
  
  {#if successMessage}
    <div class="success-message">
      {successMessage}
      <button onclick={() => successMessage = null} class="close-btn" aria-label="Erfolgsmeldung schließen">×</button>
    </div>
  {/if}

  <!-- Schema-Verwaltung -->
  <div class="section">
    <div class="section-header">
      <h2>Schemas</h2>
      <button 
        class="btn btn-primary" 
        onclick={() => {
          isCreatingNewSchema = true;
          editingSchema = null;
          errorMessage = null;
        }}
        aria-label="Neues Metadaten-Schema erstellen"
      >
        Neues Schema erstellen
      </button>
    </div>

    <!-- Schema-Liste -->
    <div class="schema-list">
      {#each metadata.schemas as schema (schema.id)}
        <div class="schema-item {selectedSchemaId === schema.id ? 'selected' : ''}">
          <div class="schema-header" role="button" tabindex="0" onclick={() => selectedSchemaId = selectedSchemaId === schema.id ? null : schema.id} onkeydown={(e) => e.key === 'Enter' && (selectedSchemaId = selectedSchemaId === schema.id ? null : schema.id)}>
            <h3>{schema.label}</h3>
            <span class="schema-name">({schema.name})</span>
            <span class="schema-version">v{schema.version}</span>
          </div>
          
          {#if selectedSchemaId === schema.id}
            <div class="schema-details">
              <p><strong>Beschreibung:</strong> {schema.description}</p>
              <p><strong>Autor:</strong> {schema.author}</p>
              <p><strong>Kategorien:</strong> {schema.categories.join(', ')}</p>
              <p><strong>Metadaten-Zeilen:</strong> {schema.rows.length}</p>
              
              <div class="schema-actions">
                <button class="btn btn-secondary" onclick={() => startEditingSchema(schema)} aria-label="Schema {schema.label} bearbeiten">
                  Bearbeiten
                </button>
                <button class="btn btn-secondary" onclick={() => duplicateSchema(schema.id)} aria-label="Schema {schema.label} duplizieren">
                  Duplizieren
                </button>
                <button class="btn btn-danger" onclick={() => deleteSchema(schema.id)} aria-label="Schema {schema.label} löschen">
                  Löschen
                </button>
              </div>

              <!-- Metadaten-Zeilen für dieses Schema -->
              <div class="metadata-rows-section">
                <div class="section-header">
                  <h4>Metadaten-Zeilen</h4>
                  <button 
                    class="btn btn-primary" 
                    onclick={() => {
                      isCreatingNewRow = true;
                      editingRow = null;
                      errorMessage = null;
                    }}
                    aria-label="Neue Metadaten-Zeile zum Schema {schema.label} hinzufügen"
                  >
                    Neue Zeile hinzufügen
                  </button>
                </div>

                <div class="metadata-rows-list">
                  {#each schema.rows as row (row.id)}
                    <div class="metadata-row-item">
                      <div class="row-header">
                        <span class="row-label">{row.label}</span>
                        <span class="row-name">({row.name})</span>
                        <span class="row-type">{row.type}</span>
                        {#if row.required}<span class="required-badge">Pflicht</span>{/if}
                      </div>
                      
                      <div class="row-actions">
                        <button class="btn btn-small btn-secondary" onclick={() => startEditingRow(row)} aria-label="Metadaten-Zeile {row.label} bearbeiten">
                          Bearbeiten
                        </button>
                        <button class="btn btn-small btn-danger" onclick={() => deleteMetadataRow(schema.id, row.id)} aria-label="Metadaten-Zeile {row.label} löschen">
                          Löschen
                        </button>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Schema-Erstellung/Bearbeitung Modal -->
  {#if isCreatingNewSchema || editingSchema}
    <div class="modal-overlay" role="dialog" aria-modal="true" tabindex="-1" aria-labelledby="schema-modal-title">
      <div class="modal" role="region" aria-label="Modal-Inhalt">
        <h3 id="schema-modal-title">{editingSchema ? 'Schema bearbeiten' : 'Neues Schema erstellen'}</h3>
        
        <form onsubmit={(e) => { e.preventDefault(); editingSchema ? updateSchema(editingSchema.id, editingSchema) : createSchema(newSchema); }}>
          <div class="form-group">
            <label for="schema-name">Name *</label>
            <input 
              id="schema-name"
              type="text" 
              bind:value={schemaFormData.name}
              placeholder="Technischer Name (z.B. character_metadata)"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="schema-label">Label *</label>
            <input 
              id="schema-label"
              type="text" 
              bind:value={schemaFormData.label}
              placeholder="Anzeigename (z.B. Charakter-Metadaten)"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="schema-description">Beschreibung</label>
            <textarea 
              id="schema-description"
              bind:value={schemaFormData.description}
              placeholder="Beschreibung des Schemas"
            ></textarea>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="schema-version">Version</label>
              <input 
                id="schema-version"
                type="text" 
                bind:value={schemaFormData.version}
                placeholder="1.0.0"
              />
            </div>
            
            <div class="form-group">
              <label for="schema-author">Autor</label>
              <input 
                id="schema-author"
                type="text" 
                bind:value={schemaFormData.author}
                placeholder="Ihr Name"
              />
            </div>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" aria-label={editingSchema ? 'Schema aktualisieren' : 'Schema erstellen'}>
              {editingSchema ? 'Aktualisieren' : 'Erstellen'}
            </button>
            <button type="button" class="btn btn-secondary" onclick={cancelEditing} aria-label="Schema-Erstellung abbrechen">
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}

  <!-- Metadaten-Zeile Erstellung/Bearbeitung Modal -->
  {#if isCreatingNewRow || editingRow}
    <div class="modal-overlay" role="dialog" aria-modal="true" tabindex="-1" aria-labelledby="row-modal-title">
      <div class="modal" role="region" aria-label="Modal-Inhalt">
        <h3 id="row-modal-title">{editingRow ? 'Metadaten-Zeile bearbeiten' : 'Neue Metadaten-Zeile erstellen'}</h3>
        
        <form onsubmit={(e) => { 
          e.preventDefault();
          if (editingRow && selectedSchemaId) {
            updateMetadataRow(selectedSchemaId, editingRow.id, editingRow);
          } else if (selectedSchemaId) {
            addMetadataRow(selectedSchemaId, newRow);
          }
        }}>
          <div class="form-row">
            <div class="form-group">
              <label for="row-name">Name *</label>
              <input 
                id="row-name"
                type="text" 
                bind:value={rowFormData.name}
                placeholder="Technischer Name (z.B. strength)"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="row-label">Label *</label>
              <input 
                id="row-label"
                type="text" 
                bind:value={rowFormData.label}
                placeholder="Anzeigename (z.B. Stärke)"
                required
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="row-type">Typ *</label>
              <select 
                id="row-type"
                bind:value={rowFormData.type}
                required
              >
                {#each FIELD_TYPES as type}
                  <option value={type.value}>{type.label}</option>
                {/each}
              </select>
            </div>
            
            <div class="form-group">
              <label for="row-category">Kategorie</label>
              <select 
                id="row-category"
                bind:value={rowFormData.category}
              >
                {#each DEFAULT_CATEGORIES as category}
                  <option value={category}>{category}</option>
                {/each}
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label for="row-description">Beschreibung</label>
            <textarea 
              id="row-description"
              bind:value={rowFormData.description}
              placeholder="Beschreibung des Feldes"
            ></textarea>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="row-placeholder">Platzhalter</label>
              <input 
                id="row-placeholder"
                type="text" 
                bind:value={rowFormData.placeholder}
                placeholder="Platzhaltertext"
              />
            </div>
            
            <div class="form-group">
              <label for="row-default">Standardwert</label>
              <input 
                id="row-default"
                type="text" 
                bind:value={rowFormData.default}
                placeholder="Standardwert"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                bind:checked={rowFormData.required}
              />
              Pflichtfeld
            </label>
          </div>
          
          {#if rowFormData.type === 'select'}
            <div class="form-group">
              <label for="options-container">Auswahloptionen</label>
              <div id="options-container">
                {#each (rowFormData.options || []) as option, index}
                <div class="option-row">
                  <input 
                    type="text" 
                    value={(rowFormData.options || [])[index] || ''}
                    oninput={(e) => updateOption(index, (e.target as HTMLInputElement).value)}
                    placeholder="Option {index + 1}"
                  />
                  <button type="button" class="btn btn-small btn-danger" onclick={() => removeOption(index)} aria-label="Option {index + 1} entfernen">
                    Entfernen
                  </button>
                </div>
              {/each}
              <button type="button" class="btn btn-secondary" onclick={addNewOption} aria-label="Neue Auswahloption hinzufügen">
                Option hinzufügen
              </button>
              </div>
            </div>
          {/if}
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" aria-label={editingRow ? 'Metadaten-Zeile aktualisieren' : 'Metadaten-Zeile erstellen'}>
              {editingRow ? 'Aktualisieren' : 'Erstellen'}
            </button>
            <button type="button" class="btn btn-secondary" onclick={cancelEditing} aria-label="Metadaten-Zeile-Erstellung abbrechen">
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}
</div>

<style>
  .metadata-management-view {
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    color: #2c3e50;
    margin-bottom: 2rem;
    text-align: center;
  }

  .section {
    margin-bottom: 2rem;
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .section-header h2 {
    margin: 0;
    color: #34495e;
  }

  .schema-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .schema-item {
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    overflow: hidden;
  }

  .schema-item.selected {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  .schema-header {
    padding: 1rem;
    background: #f8f9fa;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .schema-header:hover {
    background: #e9ecef;
  }

  .schema-header h3 {
    margin: 0;
    color: #2c3e50;
  }

  .schema-name {
    color: #6c757d;
    font-family: monospace;
    font-size: 0.9em;
  }

  .schema-version {
    background: #17a2b8;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8em;
  }

  .schema-details {
    padding: 1rem;
    border-top: 1px solid #dee2e6;
  }

  .schema-details p {
    margin: 0.5rem 0;
    color: #495057;
  }

  .schema-actions {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .metadata-rows-section {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #dee2e6;
  }

  .metadata-rows-section h4 {
    margin: 0 0 1rem 0;
    color: #34495e;
  }

  .metadata-rows-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .metadata-row-item {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .row-header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .row-label {
    font-weight: 500;
    color: #2c3e50;
  }

  .row-name {
    color: #6c757d;
    font-family: monospace;
    font-size: 0.9em;
  }

  .row-type {
    background: #6f42c1;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8em;
  }

  .required-badge {
    background: #dc3545;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8em;
  }

  .row-actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
  }

  .btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .btn-primary {
    background: #007bff;
    color: white;
  }

  .btn-primary:hover {
    background: #0056b3;
  }

  .btn-secondary {
    background: #6c757d;
    color: white;
  }

  .btn-secondary:hover {
    background: #545b62;
  }

  .btn-danger {
    background: #dc3545;
    color: white;
  }

  .btn-danger:hover {
    background: #c82333;
  }

  .btn-small {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal h3 {
    margin: 0 0 1.5rem 0;
    color: #2c3e50;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #495057;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .form-group textarea {
    min-height: 80px;
    resize: vertical;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .checkbox-label input[type="checkbox"] {
    width: auto;
  }

  .option-row {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    align-items: center;
  }

  .option-row input {
    flex: 1;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #dee2e6;
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
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  .success-message {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
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

  @media (max-width: 768px) {
    .form-row {
      grid-template-columns: 1fr;
    }
    
    .schema-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
    
    .schema-actions {
      flex-direction: column;
    }
    
    .row-actions {
      flex-direction: column;
    }
  }
</style>
