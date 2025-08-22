# 🚀 Relationship Graph - Verbesserte Architektur (Controller + Store Pattern)

## 📋 Inhaltsverzeichnis
1. [Architektur-Übersicht](#1-architektur-übersicht)
2. [Controller Pattern](#2-controller-pattern)
3. [Store Pattern](#3-store-pattern)
4. [Datenfluss](#4-datenfluss)
5. [Event Handling](#5-event-handling)
6. [Implementierungsplan](#6-implementierungsplan)
7. [Best Practices](#7-best-practices)
8. [Code-Beispiele](#8-code-beispiele)

---

## 1. Architektur-Übersicht

### 🏗️ **Neue Schichtenarchitektur**

```
┌─────────────────────────────────────────────────────────────┐
│                    FOUNDRY LAYER                            │
├─────────────────────────────────────────────────────────────┤
│ JournalEntryPageRelationshipGraphSheet.ts                   │
│ ├── Foundry Integration                                     │
│ ├── Service Management                                       │
│ ├── Controller Initialization                               │
│ └── Props Passing to Controller                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CONTROLLER LAYER                         │
├─────────────────────────────────────────────────────────────┤
│ RelationshipGraphController.svelte                          │
│ ├── Svelte Store Management                                 │
│ ├── Event Handler Delegation                                │
│ ├── Data Transformation                                     │
│ ├── Business Logic                                          │
│ └── Foundry Communication                                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    STORE LAYER                              │
├─────────────────────────────────────────────────────────────┤
│ relationshipGraphStore.ts                                   │
│ ├── Core Data Stores (nodes, edges)                         │
│ ├── UI State Stores (selection, modes)                      │
│ ├── Derived Stores (computed values)                        │
│ ├── Store Actions (CRUD operations)                         │
│ └── Store Utilities (helpers, validators)                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    COMPONENT LAYER                          │
├─────────────────────────────────────────────────────────────┤
│ RelationshipGraphView/Edit.svelte                           │
│ ├── Subscribe to Stores                                     │
│ ├── Dispatch Events to Controller                           │
│ ├── Render Child Components                                 │
│ └── UI State Management                                     │
└─────────────────────────────────────────────────────────────┘
```

### 📊 **Komponenten-Hierarchie (Verbessert)**

```
JournalEntryPageRelationshipGraphSheet.ts (Foundry Sheet)
└── RelationshipGraphController.svelte (Controller)
    ├── RelationshipGraphView.svelte (View Mode)
    │   ├── CytoscapeGraph.svelte (Graph Rendering)
    │   ├── GraphInfoPanel.svelte (Info Display)
    │   └── ContextMenu.svelte (Right-click Menu)
    │
    └── RelationshipGraphEdit.svelte (Edit Mode)
        ├── GraphToolbar.svelte (Main Actions)
        ├── GraphCanvas.svelte (Graph Container)
        │   └── CytoscapeGraph.svelte (Graph Rendering)
        ├── SidebarPanel.svelte (Search/Filter)
        ├── PropertyPanel.svelte (Element Properties)
        │   ├── NodeEditor.svelte (Node Properties)
        │   ├── EdgeEditor.svelte (Edge Properties)
        │   ├── DescriptionEditor.svelte (Descriptions)
        │   ├── PermissionEditor.svelte (Permissions)
        │   ├── VisualSettings.svelte (Visual Properties)
        │   └── RelationshipEffectsEditor.svelte (Edge Effects)
        ├── ContextMenu.svelte (Right-click Menu)
        ├── KeyboardShortcuts.svelte (Global Shortcuts)
        ├── UndoRedoManager.svelte (History Management)
        ├── ExportSettings.svelte (Export Modal)
        ├── ImportSettings.svelte (Import Modal)
        ├── AutoSaveSettings.svelte (Auto-save Config)
        ├── KeyboardShortcutsHelp.svelte (Help Modal)
        ├── ThemeToggle.svelte (Theme Switch)
        ├── LoadingSpinner.svelte (Loading States)
        ├── PerformanceOptimizer.svelte (Performance)
        └── ErrorBoundary.svelte (Error Handling)
```

---

## 2. Controller Pattern

### 🎯 **Controller-Verantwortlichkeiten**

| Verantwortlichkeit | Beschreibung | Implementierung |
|-------------------|--------------|-----------------|
| **Store Management** | Initialisierung und Synchronisation der Svelte Stores | `initializeStore()`, `syncWithFoundry()` |
| **Event Delegation** | Weiterleitung von Events an Foundry Services | `handleNodeClick()`, `handleAddNode()` |
| **Data Transformation** | Konvertierung zwischen Foundry und Svelte Formaten | `transformNodeData()`, `transformEdgeData()` |
| **Business Logic** | Anwendungslogik und Validierung | `validateNode()`, `processGraphChanges()` |
| **Foundry Communication** | Kommunikation mit Foundry Services | `saveToDocument()`, `loadFromDocument()` |

### 🔧 **Controller Interface**

```typescript
interface RelationshipGraphController {
  // Store Management
  initializeStore(document: any): void;
  syncWithFoundry(): Promise<void>;
  
  // Event Handlers
  handleNodeClick(nodeId: string): void;
  handleEdgeClick(edgeId: string): void;
  handleAddNode(x: number, y: number): Promise<void>;
  handleAddEdge(sourceId: string, targetId: string): Promise<void>;
  handleDeleteNode(nodeId: string): Promise<void>;
  handleDeleteEdge(edgeId: string): Promise<void>;
  handleUpdateNode(nodeId: string, updates: Partial<NodeData>): Promise<void>;
  handleUpdateEdge(edgeId: string, updates: Partial<EdgeData>): Promise<void>;
  
  // Data Operations
  saveGraph(): Promise<void>;
  loadGraph(): Promise<void>;
  exportGraph(format: 'json' | 'png' | 'svg'): Promise<void>;
  importGraph(data: any): Promise<void>;
  
  // UI State Management
  setSelection(nodeId?: string, edgeId?: string): void;
  setAddEdgeMode(enabled: boolean): void;
  setLoading(loading: boolean): void;
  setError(error: string | null): void;
}
```

---

## 3. Service-Architektur

### 🔧 **Service Injection Pattern**

```
🔧 SERVICE INJECTION ARCHITECTURE
┌─────────────────────────────────────────────────────────────┐
│                    FOUNDRY VTT LAYER                        │
├─────────────────────────────────────────────────────────────┤
│ JournalEntryPageRelationshipGraphSheet.ts                   │
│ ├── ServiceManager Integration                              │
│ ├── Service Lifecycle Management                            │
│ ├── Service Injection Setup                                 │
│ └── Controller Initialization                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVICE MANAGER                          │
├─────────────────────────────────────────────────────────────┤
│ ServiceManager (Singleton)                                  │
│ ├── ServiceFactory (Creates Services)                       │
│ ├── Service Caching                                         │
│ ├── Dependency Injection                                    │
│ ├── Service Lifecycle Management                            │
│ └── Service Configuration                                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CORE SERVICES                            │
├─────────────────────────────────────────────────────────────┤
│ RelationshipGraphService (Data Management)                  │
│ ├── CRUD Operations (nodes, edges)                          │
│ ├── Data Transformation                                     │
│ ├── Graph State Management                                  │
│ └── Business Logic                                          │
│                                                             │
│ RelationshipGraphPersistenceService (Storage)              │
│ ├── Save/Load to Foundry Documents                          │
│ ├── Auto-save Functionality                                 │
│ ├── Export/Import Operations                                │
│ ├── Backup/Restore                                          │
│ └── Data Synchronisation                                    │
│                                                             │
│ RelationshipGraphValidationService (Validation)            │
│ ├── Node/Edge Validation                                    │
│ ├── Graph Structure Validation                              │
│ ├── Data Integrity Checks                                   │
│ ├── Error Reporting                                         │
│ └── Validation Rules Management                             │
│                                                             │
│ RelationshipGraphDemoDataService (Demo Data)               │
│ ├── Default Graph Data                                      │
│ ├── Sample Relationships                                     │
│ ├── Template Graphs                                         │
│ └── Data Generation                                         │
│                                                             │
│ RelationshipGraphCytoscapeService (Graph Rendering)        │
│ ├── Cytoscape Instance Management                           │
│ ├── Layout Management                                       │
│ ├── Style Management                                        │
│ ├── Event Handling                                          │
│ └── Performance Optimization                                │
│                                                             │
│ RelationshipGraphHistoryService (Undo/Redo)                │
│ ├── History Management                                      │
│ ├── State Snapshots                                         │
│ ├── Undo/Redo Operations                                    │
│ └── History Persistence                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CONTROLLER LAYER                         │
├─────────────────────────────────────────────────────────────┤
│ RelationshipGraphController.svelte                          │
│ ├── Injected Services                                       │
│ ├── Service Coordination                                    │
│ ├── Event Handler Delegation                                │
│ ├── Store Management                                        │
│ └── Business Logic Orchestration                            │
└─────────────────────────────────────────────────────────────┘
```

### 🎯 **Service-Verantwortlichkeiten**

| Service | Verantwortlichkeit | Dependencies | Injection |
|---------|-------------------|--------------|-----------|
| **RelationshipGraphService** | Graph Data Management | PersistenceService, ValidationService | Via Controller Props |
| **RelationshipGraphPersistenceService** | Data Storage | Foundry Document API | Via ServiceManager |
| **RelationshipGraphValidationService** | Data Validation | - | Via Controller Props |
| **RelationshipGraphDemoDataService** | Demo Data | - | Via Controller Props |
| **RelationshipGraphCytoscapeService** | Graph Rendering | - | Via Controller Props |
| **RelationshipGraphHistoryService** | Undo/Redo | GraphService | Via Controller Props |

### 🔧 **Service Injection Interface**

```typescript
// Service Injection Interface
interface ServiceInjection {
  graphService: IRelationshipGraphService;
  persistenceService: IRelationshipGraphPersistenceService;
  validationService: IRelationshipGraphValidationService;
  demoDataService: IRelationshipGraphDemoDataService;
  cytoscapeService: IRelationshipGraphCytoscapeService;
  historyService: IRelationshipGraphHistoryService;
}

// Controller mit Service Injection
interface RelationshipGraphController {
  // Injected Services
  services: ServiceInjection;
  
  // Store Management
  initializeStore(document: any): void;
  syncWithFoundry(): Promise<void>;
  
  // Event Handlers (delegieren an Services)
  handleNodeClick(nodeId: string): void;
  handleEdgeClick(edgeId: string): void;
  handleAddNode(x: number, y: number): Promise<void>;
  handleAddEdge(sourceId: string, targetId: string): Promise<void>;
  handleDeleteNode(nodeId: string): Promise<void>;
  handleDeleteEdge(edgeId: string): Promise<void>;
  handleUpdateNode(nodeId: string, updates: Partial<NodeData>): Promise<void>;
  handleUpdateEdge(edgeId: string, updates: Partial<EdgeData>): Promise<void>;
  
  // Service Coordination
  saveGraph(): Promise<void>;
  loadGraph(): Promise<void>;
  exportGraph(format: 'json' | 'png' | 'svg'): Promise<void>;
  importGraph(data: any): Promise<void>;
  
  // UI State Management
  setSelection(nodeId?: string, edgeId?: string): void;
  setAddEdgeMode(enabled: boolean): void;
  setLoading(loading: boolean): void;
  setError(error: string | null): void;
}
```

### 📋 **Service Lifecycle Management**

```typescript
// Foundry Sheet Service Management
class JournalEntryPageRelationshipGraphSheet {
  private services: ServiceInjection;
  
  async _onRender() {
    // 1. Service Manager holen
    const serviceManager = ServiceManager.getInstance();
    
    // 2. Services erstellen/injizieren
    this.services = {
      graphService: serviceManager.getService(SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH, this.document),
      persistenceService: serviceManager.getService(SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_PERSISTENCE),
      validationService: serviceManager.getService(SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_VALIDATION),
      demoDataService: serviceManager.getService(SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_DEMO_DATA),
      cytoscapeService: serviceManager.getService(SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_CYTOSCAPE),
      historyService: serviceManager.getService(SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_HISTORY)
    };
    
    // 3. Controller mit Services initialisieren
    this.svelteApp = mount(RelationshipGraphController, {
      target,
      props: {
        services: this.services,
        document: this.document,
        isView: this.isView
      }
    });
  }
  
  async _onClose() {
    // 4. Service Cleanup
    if (this.services) {
      await this.services.graphService.cleanup();
      await this.services.persistenceService.cleanup();
      // ... andere Services
    }
  }
}
```

### 🔧 **Service Interfaces**

```typescript
// Core Service Interfaces
interface IRelationshipGraphService {
  // CRUD Operations
  getNodes(): NodeData[];
  getEdges(): EdgeData[];
  addNode(node: NodeData): Promise<void>;
  updateNode(nodeId: string, updates: Partial<NodeData>): Promise<void>;
  deleteNode(nodeId: string): Promise<void>;
  addEdge(edge: EdgeData): Promise<void>;
  updateEdge(edgeId: string, updates: Partial<EdgeData>): Promise<void>;
  deleteEdge(edgeId: string): Promise<void>;
  
  // Data Management
  loadData(): Promise<void>;
  saveData(): Promise<void>;
  resetData(): Promise<void>;
  
  // Lifecycle
  cleanup(): Promise<void>;
}

interface IRelationshipGraphPersistenceService {
  // Storage Operations
  save(document: any, data: any): Promise<void>;
  load(document: any): Promise<any>;
  export(format: 'json' | 'png' | 'svg'): Promise<any>;
  import(data: any): Promise<void>;
  
  // Auto-save
  enableAutoSave(interval: number): void;
  disableAutoSave(): void;
  
  // Lifecycle
  cleanup(): Promise<void>;
}

interface IRelationshipGraphValidationService {
  // Validation Operations
  validateNode(node: NodeData): ValidationResult;
  validateEdge(edge: EdgeData): ValidationResult;
  validateGraph(nodes: NodeData[], edges: EdgeData[]): ValidationResult;
  
  // Validation Rules
  addValidationRule(rule: ValidationRule): void;
  removeValidationRule(ruleId: string): void;
  
  // Error Reporting
  getValidationErrors(): ValidationError[];
  clearValidationErrors(): void;
}

interface IRelationshipGraphDemoDataService {
  // Demo Data Operations
  getDemoData(): { nodes: NodeData[]; edges: EdgeData[] };
  createDemoData(service: IRelationshipGraphService): Promise<void>;
  getTemplates(): GraphTemplate[];
  createFromTemplate(templateId: string): Promise<{ nodes: NodeData[]; edges: EdgeData[] }>;
}

interface IRelationshipGraphCytoscapeService {
  // Cytoscape Management
  createInstance(container: HTMLElement, options: CytoscapeOptions): any;
  destroyInstance(): void;
  
  // Layout Management
  applyLayout(layout: string, options?: any): Promise<void>;
  getPositions(): { [key: string]: { x: number; y: number } };
  
  // Style Management
  updateStyles(styles: any[]): void;
  getStyles(): any[];
  
  // Event Handling
  on(event: string, handler: Function): void;
  off(event: string, handler: Function): void;
}

interface IRelationshipGraphHistoryService {
  // History Management
  saveSnapshot(): void;
  undo(): boolean;
  redo(): boolean;
  canUndo(): boolean;
  canRedo(): boolean;
  
  // History Configuration
  setMaxHistorySize(size: number): void;
  clearHistory(): void;
  
  // Lifecycle
  cleanup(): Promise<void>;
}

// Supporting Interfaces
interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

interface ValidationError {
  id: string;
  message: string;
  field?: string;
  severity: 'error' | 'warning';
}

interface ValidationWarning {
  id: string;
  message: string;
  field?: string;
}

interface ValidationRule {
  id: string;
  name: string;
  validate: (data: any) => ValidationResult;
}

interface GraphTemplate {
  id: string;
  name: string;
  description: string;
  nodes: NodeData[];
  edges: EdgeData[];
}

interface CytoscapeOptions {
  nodes: NodeData[];
  edges: EdgeData[];
  layout?: any;
  styles?: any[];
  interactions?: boolean;
}
```

---

## 4. Store Pattern

### 📦 **Store-Struktur**

```typescript
// Core Data Stores
export const nodes = writable<NodeData[]>([]);
export const edges = writable<EdgeData[]>([]);

// UI State Stores
export const selectedNodeId = writable<string | null>(null);
export const selectedEdgeId = writable<string | null>(null);
export const isAddEdgeMode = writable(false);
export const isLoading = writable(false);
export const error = writable<string | null>(null);
export const canUndo = writable(false);
export const canRedo = writable(false);

// Modal State Stores
export const showExportModal = writable(false);
export const showImportModal = writable(false);
export const showShortcutsHelp = writable(false);
export const showSettingsModal = writable(false);

// Derived Stores
export const selectedNode = derived(
  [nodes, selectedNodeId],
  ([$nodes, $selectedNodeId]) => 
    $nodes.find(n => n.id === $selectedNodeId) || null
);

export const selectedEdge = derived(
  [edges, selectedEdgeId],
  ([$edges, $selectedEdgeId]) => 
    $edges.find(e => e.id === $selectedEdgeId) || null
);

export const graphStats = derived(
  [nodes, edges],
  ([$nodes, $edges]) => ({
    nodeCount: $nodes.length,
    edgeCount: $edges.length,
    averageConnections: $nodes.length > 0 ? $edges.length / $nodes.length : 0
  })
);
```

### ⚡ **Store Actions**

```typescript
export const relationshipGraphStore = {
  // Core Data Actions
  nodes: {
    add: (node: NodeData) => nodes.update(current => [...current, node]),
    update: (nodeId: string, updates: Partial<NodeData>) => 
      nodes.update(current => current.map(n => n.id === nodeId ? { ...n, ...updates } : n)),
    delete: (nodeId: string) => {
      nodes.update(current => current.filter(n => n.id !== nodeId));
      edges.update(current => 
        current.filter(e => e.source !== nodeId && e.target !== nodeId)
      );
    },
    move: (nodeId: string, x: number, y: number) =>
      nodes.update(current => 
        current.map(n => n.id === nodeId ? { ...n, x, y } : n)
      ),
    replace: (newNodes: NodeData[]) => nodes.set(newNodes)
  },
  
  edges: {
    add: (edge: EdgeData) => edges.update(current => [...current, edge]),
    update: (edgeId: string, updates: Partial<EdgeData>) =>
      edges.update(current => 
        current.map(e => e.id === edgeId ? { ...e, ...updates } : e)
      ),
    delete: (edgeId: string) =>
      edges.update(current => current.filter(e => e.id !== edgeId)),
    replace: (newEdges: EdgeData[]) => edges.set(newEdges)
  },
  
  // UI State Actions
  selection: {
    setNode: (nodeId: string | null) => {
      selectedNodeId.set(nodeId);
      selectedEdgeId.set(null);
    },
    setEdge: (edgeId: string | null) => {
      selectedEdgeId.set(edgeId);
      selectedNodeId.set(null);
    },
    clear: () => {
      selectedNodeId.set(null);
      selectedEdgeId.set(null);
    }
  },
  
  // Mode Actions
  setAddEdgeMode: (enabled: boolean) => isAddEdgeMode.set(enabled),
  setLoading: (loading: boolean) => isLoading.set(loading),
  setError: (error: string | null) => error.set(error),
  
  // Modal Actions
  modals: {
    showExport: () => showExportModal.set(true),
    hideExport: () => showExportModal.set(false),
    showImport: () => showImportModal.set(true),
    hideImport: () => showImportModal.set(false),
    showShortcutsHelp: () => showShortcutsHelp.set(true),
    hideShortcutsHelp: () => showShortcutsHelp.set(false)
  },
  
  // Utility Actions
  reset: () => {
    nodes.set([]);
    edges.set([]);
    selectedNodeId.set(null);
    selectedEdgeId.set(null);
    isAddEdgeMode.set(false);
    isLoading.set(false);
    error.set(null);
  }
};
```

---

## 4. Datenfluss

### 🔄 **Verbesserter Datenfluss**

```
📊 IMPROVED DATA FLOW
┌─────────────────────────────────────────────────────────────┐
│                    FOUNDRY VTT LAYER                        │
├─────────────────────────────────────────────────────────────┤
│ JournalEntryPageRelationshipGraphSheet.ts                   │
│ ├── Lädt Daten via ServiceManager                           │
│ ├── Übergibt document als Props an Controller               │
│ └── Behandelt High-Level Events                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CONTROLLER LAYER                         │
├─────────────────────────────────────────────────────────────┤
│ RelationshipGraphController.svelte                          │
│ ├── Initialisiert Store mit Foundry-Daten                   │
│ ├── Transformiert Daten zwischen Formaten                   │
│ ├── Delegiert Events an Foundry Services                    │
│ └── Synchronisiert Store mit Foundry Document               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    STORE LAYER                              │
├─────────────────────────────────────────────────────────────┤
│ relationshipGraphStore.ts                                   │
│ ├── Reaktive Daten-Updates                                  │
│ ├── Computed Values (Derived Stores)                        │
│ ├── State Synchronisation                                   │
│ └── Action Dispatching                                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    COMPONENT LAYER                          │
├─────────────────────────────────────────────────────────────┤
│ Svelte Components                                           │
│ ├── Subscribe zu Stores                                     │
│ ├── Reaktive UI-Updates                                     │
│ ├── Event Dispatching an Controller                         │
│ └── Pure UI Logic                                           │
└─────────────────────────────────────────────────────────────┘
```

### 📋 **Datenfluss-Regeln**

1. **Unidirectional Data Flow**: Daten fließen nur in eine Richtung
2. **Single Source of Truth**: Store ist die einzige Datenquelle für Komponenten
3. **Immutable Updates**: Store-Updates sind immutable
4. **Event Delegation**: Events werden an Controller delegiert
5. **Reactive Updates**: Komponenten reagieren automatisch auf Store-Änderungen

---

## 5. Event Handling

### 🎯 **Event-Flow-Architektur**

```
🔄 EVENT FLOW ARCHITECTURE
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERACTION                         │
├─────────────────────────────────────────────────────────────┤
│ 1. User klickt Node/Edge                                    │
│ 2. CytoscapeGraph Component                                 │
│ 3. Event Handler in Component                               │
│ 4. Event Dispatch an Controller                             │
│ 5. Controller verarbeitet Business Logic                    │
│ 6. Controller aktualisiert Store                            │
│ 7. Store triggert reaktive Updates                          │
│ 8. Komponenten re-rendern automatisch                       │
│ 9. Controller synchronisiert mit Foundry                    │
└─────────────────────────────────────────────────────────────┘
```

### 📝 **Event-Handler-Mapping**

```typescript
// Controller Event Handlers
interface ControllerEventHandlers {
  // Selection Events
  onNodeClick: (nodeId: string) => void;
  onEdgeClick: (edgeId: string) => void;
  onCanvasClick: () => void;
  
  // CRUD Events
  onAddNode: (x: number, y: number) => Promise<void>;
  onAddEdge: (sourceId: string, targetId: string) => Promise<void>;
  onDeleteNode: (nodeId: string) => Promise<void>;
  onDeleteEdge: (edgeId: string) => Promise<void>;
  onUpdateNode: (nodeId: string, updates: Partial<NodeData>) => Promise<void>;
  onUpdateEdge: (edgeId: string, updates: Partial<EdgeData>) => Promise<void>;
  onMoveNode: (nodeId: string, x: number, y: number) => Promise<void>;
  
  // UI Events
  onSave: () => Promise<void>;
  onUndo: () => void;
  onRedo: () => void;
  onExport: (format: 'json' | 'png' | 'svg') => Promise<void>;
  onImport: (data: any) => Promise<void>;
  onToggleAddEdgeMode: () => void;
  onShowShortcutsHelp: () => void;
  onShowSettings: () => void;
}

// Component Props Interfaces
interface RelationshipGraphViewProps {
  eventHandlers: ControllerEventHandlers;
  nodes: NodeData[];
  edges: EdgeData[];
  // ❌ KEINE services - nur Controller braucht Services
}

interface RelationshipGraphEditProps {
  eventHandlers: ControllerEventHandlers;
  nodes: NodeData[];
  edges: EdgeData[];
  // ❌ KEINE services - nur Controller braucht Services
}
```

---

## 6. Implementierungsplan

### 🎯 **Phase 1: Foundation (Priorität 1)**
- [ ] **Service Interfaces**: Alle Service-Interfaces definieren
- [ ] **Service Implementation**: Core Services implementieren
- [ ] **Store Implementation**: `relationshipGraphStore.ts` erstellen
- [ ] **Controller Implementation**: `RelationshipGraphController.svelte` erstellen
- [ ] **Service Injection**: Service Injection Pattern implementieren
- [ ] **Store Actions**: CRUD-Operationen im Store implementieren
- [ ] **Derived Stores**: Computed values implementieren

### 🎯 **Phase 2: Integration (Priorität 2)**
- [ ] **Foundry Sheet Refactoring**: Service Injection Integration
- [ ] **Service Lifecycle Management**: Service Cleanup und Lifecycle
- [ ] **Component Refactoring**: Komponenten auf Store umstellen
- [ ] **Event Handler Implementation**: Controller Event Handlers
- [ ] **Data Synchronisation**: Store ↔ Foundry Synchronisation
- [ ] **Service Coordination**: Service-zu-Service Kommunikation

### 🎯 **Phase 3: Features (Priorität 3)**
- [ ] **CRUD Operations**: Vollständige CRUD-Funktionalität
- [ ] **Undo/Redo**: History Management im Store
- [ ] **Import/Export**: Store-basierte Import/Export
- [ ] **Validation**: Store-basierte Validierung

### 🎯 **Phase 4: Polish (Priorität 4)**
- [ ] **Performance Optimization**: Store-Optimierung
- [ ] **Error Handling**: Store-basierte Fehlerbehandlung
- [ ] **Loading States**: Store-basierte Loading States
- [ ] **Testing**: Store und Controller Tests

---

## 7. Best Practices

### ✅ **Architektur-Prinzipien**

1. **Single Responsibility Principle**: Jede Schicht hat eine klare Verantwortlichkeit
2. **Dependency Inversion**: Abhängigkeiten von Abstraktionen, nicht Implementierungen
3. **Event-Driven Architecture**: Lose Kopplung durch Events
4. **Immutable State**: Store-Updates sind immutable
5. **Reactive Programming**: Automatische Updates basierend auf State-Änderungen

### 🎯 **Svelte Best Practices**

1. **Store Composition**: Kleine, fokussierte Stores
2. **Derived Stores**: Computed values für Performance
3. **Store Actions**: Encapsulated State Mutations
4. **Type Safety**: Vollständige TypeScript-Unterstützung
5. **Error Boundaries**: Graceful Error Handling

### 🔧 **Performance Best Practices**

1. **Store Subscription**: Nur notwendige Stores subscriben
2. **Derived Store Caching**: Effiziente Computed Values
3. **Batch Updates**: Mehrere Store-Updates zusammenfassen
4. **Memory Management**: Store Cleanup bei Component Destruction
5. **Lazy Loading**: Stores nur bei Bedarf initialisieren

### 🧹 **Memory Management Best Practices**

1. **Store Reset**: Store bei Component Destruction zurücksetzen
2. **Service Cleanup**: Alle Services ordnungsgemäß aufräumen
3. **Event Listener Cleanup**: Event Listener entfernen
4. **Subscription Cleanup**: Store Subscriptions aufheben
5. **Cytoscape Instance Cleanup**: Cytoscape Instanzen zerstören

---

## 8. Code-Beispiele

### 🎯 **Controller Implementation (Service Injection)**

```typescript
// src/svelte/RelationshipGraphController.svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { relationshipGraphStore } from '../stores/relationshipGraphStore';
  import RelationshipGraphView from './RelationshipGraphView.svelte';
  import RelationshipGraphEdit from './RelationshipGraphEdit.svelte';
  import type { 
    NodeData, EdgeData, ServiceInjection,
    IRelationshipGraphService, IRelationshipGraphPersistenceService,
    IRelationshipGraphValidationService, IRelationshipGraphDemoDataService,
    IRelationshipGraphCytoscapeService, IRelationshipGraphHistoryService
  } from '../global';
  
  // Props mit Service Injection
  let { 
    services, document, isView 
  }: { 
    services: ServiceInjection; 
    document: any; 
    isView: boolean 
  } = $props();
  
  // Store Destructuring
  const { 
    nodes, edges, selectedNodeId, selectedEdgeId, 
    isAddEdgeMode, isLoading, error, selectedNode, selectedEdge 
  } = relationshipGraphStore;
  
  // Service Destructuring
  const {
    graphService,
    persistenceService,
    validationService,
    demoDataService,
    cytoscapeService,
    historyService
  } = services;
  
  // Get current store values for props
  const currentNodes = get(nodes);
  const currentEdges = get(edges);
  
  // Event Handlers mit Service Delegation
  const eventHandlers = {
    // Selection Events
    onNodeClick: (nodeId: string) => {
      relationshipGraphStore.selection.setNode(nodeId);
    },
    
    onEdgeClick: (edgeId: string) => {
      relationshipGraphStore.selection.setEdge(edgeId);
    },
    
    onCanvasClick: () => {
      relationshipGraphStore.selection.clear();
    },
    
    // CRUD Events (delegieren an Services)
    onAddNode: async (x: number, y: number) => {
      try {
        relationshipGraphStore.setLoading(true);
        
        // Validation
        const newNode = createNodeData(x, y);
        const validation = validationService.validateNode(newNode);
        if (!validation.isValid) {
          throw new Error(validation.errors[0]?.message || 'Invalid node data');
        }
        
        // Add to service
        await graphService.addNode(newNode);
        
        // Update store
        relationshipGraphStore.nodes.add(newNode);
        
        // Save to persistence
        await persistenceService.save(document, {
          nodes: graphService.getNodes(),
          edges: graphService.getEdges()
        });
        
        // Update history
        historyService.saveSnapshot();
        
      } catch (err) {
        relationshipGraphStore.setError(err.message);
      } finally {
        relationshipGraphStore.setLoading(false);
      }
    },
    
    onDeleteNode: async (nodeId: string) => {
      try {
        relationshipGraphStore.setLoading(true);
        
        // Delete from service
        await graphService.deleteNode(nodeId);
        
        // Update store
        relationshipGraphStore.nodes.delete(nodeId);
        
        // Save to persistence
        await persistenceService.save(document, {
          nodes: graphService.getNodes(),
          edges: graphService.getEdges()
        });
        
        // Update history
        historyService.saveSnapshot();
        
      } catch (err) {
        relationshipGraphStore.setError(err.message);
      } finally {
        relationshipGraphStore.setLoading(false);
      }
    },
    
    onAddEdge: async (sourceId: string, targetId: string) => {
      try {
        relationshipGraphStore.setLoading(true);
        
        const newEdge = createEdgeData(sourceId, targetId);
        const validation = validationService.validateEdge(newEdge);
        if (!validation.isValid) {
          throw new Error(validation.errors[0]?.message || 'Invalid edge data');
        }
        
        await graphService.addEdge(newEdge);
        relationshipGraphStore.edges.add(newEdge);
        
        await persistenceService.save(document, {
          nodes: graphService.getNodes(),
          edges: graphService.getEdges()
        });
        
        historyService.saveSnapshot();
        
      } catch (err) {
        relationshipGraphStore.setError(err.message);
      } finally {
        relationshipGraphStore.setLoading(false);
      }
    },
    
    onUpdateNode: async (nodeId: string, updates: Partial<NodeData>) => {
      try {
        relationshipGraphStore.setLoading(true);
        
        const updatedNode = { ...graphService.getNodes().find(n => n.id === nodeId), ...updates };
        const validation = validationService.validateNode(updatedNode);
        if (!validation.isValid) {
          throw new Error(validation.errors[0]?.message || 'Invalid node data');
        }
        
        await graphService.updateNode(nodeId, updates);
        relationshipGraphStore.nodes.update(nodeId, updates);
        
        await persistenceService.save(document, {
          nodes: graphService.getNodes(),
          edges: graphService.getEdges()
        });
        
        historyService.saveSnapshot();
        
      } catch (err) {
        relationshipGraphStore.setError(err.message);
      } finally {
        relationshipGraphStore.setLoading(false);
      }
    },
    
    // UI Events
    onToggleAddEdgeMode: () => {
      relationshipGraphStore.setAddEdgeMode(!$isAddEdgeMode);
    },
    
    onSave: async () => {
      try {
        relationshipGraphStore.setLoading(true);
        await persistenceService.save(document, {
          nodes: graphService.getNodes(),
          edges: graphService.getEdges()
        });
        relationshipGraphStore.setError(null);
      } catch (err) {
        relationshipGraphStore.setError(err.message);
      } finally {
        relationshipGraphStore.setLoading(false);
      }
    },
    
    onUndo: () => {
      if (historyService.canUndo()) {
        const previousState = historyService.undo();
        if (previousState) {
          relationshipGraphStore.nodes.replace(previousState.nodes);
          relationshipGraphStore.edges.replace(previousState.edges);
        }
      }
    },
    
    onRedo: () => {
      if (historyService.canRedo()) {
        const nextState = historyService.redo();
        if (nextState) {
          relationshipGraphStore.nodes.replace(nextState.nodes);
          relationshipGraphStore.edges.replace(nextState.edges);
        }
      }
    },
    
    onExport: async (format: 'json' | 'png' | 'svg') => {
      try {
        relationshipGraphStore.setLoading(true);
        const data = await persistenceService.export(format);
        // Handle export data (download, etc.)
      } catch (err) {
        relationshipGraphStore.setError(err.message);
      } finally {
        relationshipGraphStore.setLoading(false);
      }
    },
    
    onImport: async (data: any) => {
      try {
        relationshipGraphStore.setLoading(true);
        await persistenceService.import(data);
        
        // Reload data from service
        const serviceNodes = graphService.getNodes();
        const serviceEdges = graphService.getEdges();
        
        relationshipGraphStore.nodes.replace(serviceNodes);
        relationshipGraphStore.edges.replace(serviceEdges);
        
        historyService.saveSnapshot();
        
      } catch (err) {
        relationshipGraphStore.setError(err.message);
      } finally {
        relationshipGraphStore.setLoading(false);
      }
    }
  };
  
  // Lifecycle
  onMount(async () => {
    await initializeController();
  });
  
  onDestroy(() => {
    cleanupController();
  });
  
  // Controller Methods
  async function initializeController() {
    try {
      relationshipGraphStore.setLoading(true);
      
      // Load data from service
      await graphService.loadData();
      
      // Initialize store with service data
      const serviceNodes = graphService.getNodes();
      const serviceEdges = graphService.getEdges();
      
      if (serviceNodes.length === 0 && serviceEdges.length === 0) {
        // Load demo data if empty
        await demoDataService.createDemoData(graphService);
        const demoNodes = graphService.getNodes();
        const demoEdges = graphService.getEdges();
        
        relationshipGraphStore.nodes.replace(demoNodes);
        relationshipGraphStore.edges.replace(demoEdges);
      } else {
        relationshipGraphStore.nodes.replace(serviceNodes);
        relationshipGraphStore.edges.replace(serviceEdges);
      }
      
      // Initialize history
      historyService.saveSnapshot();
      
    } catch (err) {
      relationshipGraphStore.setError(err.message);
    } finally {
      relationshipGraphStore.setLoading(false);
    }
  }
  
  function cleanupController() {
    // Cleanup services
    graphService.cleanup();
    persistenceService.cleanup();
    validationService.cleanup();
    demoDataService.cleanup();
    cytoscapeService.cleanup();
    historyService.cleanup();
    
    // Reset store to initial state to prevent memory leaks
    // and ensure clean state for next component instance
    relationshipGraphStore.reset();
  }
  
  // Helper functions
  function createNodeData(x: number, y: number): NodeData {
    return {
      id: foundry.utils.randomID(),
      x,
      y,
      label: { value: `Node ${foundry.utils.randomID()}`, permissions: { defaultLevel: 0, users: [] } },
      type: { value: 'default', permissions: { defaultLevel: 0, users: [] } },
      cytoScapeAttributes: {
        'background-color': '#ffffff',
        'border-color': '#000000',
        'border-width': '1px',
        width: '60px',
        height: '60px',
        'font-size': '12px',
        color: '#000000',
        'text-valign': 'center',
        'text-halign': 'center'
      },
      globalPermissions: { defaultLevel: 0, users: [] }
    };
  }
  
  function createEdgeData(sourceId: string, targetId: string): EdgeData {
    return {
      id: foundry.utils.randomID(),
      source: sourceId,
      target: targetId,
      label: { value: 'Relationship', permissions: { defaultLevel: 0, users: [] } },
      type: 'default',
      cytoScapeAttributes: {
        'line-color': '#000000',
        'line-width': '1px',
        'line-style': 'solid',
        'curve-style': 'bezier',
        'target-arrow-color': '#000000',
        'target-arrow-shape': 'triangle'
      },
      globalPermissions: { defaultLevel: 0, users: [] }
    };
  }
</script>

{#if isView}
  <RelationshipGraphView 
    {eventHandlers}
    nodes={currentNodes}
    edges={currentEdges}
  />
{:else}
  <RelationshipGraphEdit 
    {eventHandlers}
    nodes={currentNodes}
    edges={currentEdges}
  />
{/if}
```

### 🎯 **Store Implementation (Service Integration)**

```typescript
// src/stores/relationshipGraphStore.ts
import { writable, derived, get } from 'svelte/store';
import type { NodeData, EdgeData } from '../global';

// Core Data Stores
export const nodes = writable<NodeData[]>([]);
export const edges = writable<EdgeData[]>([]);

// UI State Stores
export const selectedNodeId = writable<string | null>(null);
export const selectedEdgeId = writable<string | null>(null);
export const isAddEdgeMode = writable(false);
export const isLoading = writable(false);
export const error = writable<string | null>(null);

// History Stores (delegiert an HistoryService)
export const canUndo = writable(false);
export const canRedo = writable(false);

// Modal Stores
export const showExportModal = writable(false);
export const showImportModal = writable(false);
export const showShortcutsHelp = writable(false);
export const showSettingsModal = writable(false);

// Derived Stores
export const selectedNode = derived(
  [nodes, selectedNodeId],
  ([$nodes, $selectedNodeId]) => 
    $nodes.find(n => n.id === $selectedNodeId) || null
);

export const selectedEdge = derived(
  [edges, selectedEdgeId],
  ([$edges, $selectedEdgeId]) => 
    $edges.find(e => e.id === $selectedEdgeId) || null
);

export const graphStats = derived(
  [nodes, edges],
  ([$nodes, $edges]) => ({
    nodeCount: $nodes.length,
    edgeCount: $edges.length,
    averageConnections: $nodes.length > 0 ? $edges.length / $nodes.length : 0,
    isolatedNodes: $nodes.filter(n => 
      !$edges.some(e => e.source === n.id || e.target === n.id)
    ).length
  })
);

// Store Actions (delegieren an Services)
export const relationshipGraphStore = {
  // Core Data Actions (Service-basiert)
  nodes: {
    add: (node: NodeData) => {
      nodes.update(current => [...current, node]);
      // History wird vom HistoryService verwaltet
    },
    
    update: (nodeId: string, updates: Partial<NodeData>) => {
      nodes.update(current => 
        current.map(n => n.id === nodeId ? { ...n, ...updates } : n)
      );
    },
    
    delete: (nodeId: string) => {
      nodes.update(current => current.filter(n => n.id !== nodeId));
      edges.update(current => 
        current.filter(e => e.source !== nodeId && e.target !== nodeId)
      );
    },
    
    move: (nodeId: string, x: number, y: number) => {
      nodes.update(current => 
        current.map(n => n.id === nodeId ? { ...n, x, y } : n)
      );
    },
    
    replace: (newNodes: NodeData[]) => {
      nodes.set(newNodes);
    }
  },
  
  edges: {
    add: (edge: EdgeData) => {
      edges.update(current => [...current, edge]);
    },
    
    update: (edgeId: string, updates: Partial<EdgeData>) => {
      edges.update(current => 
        current.map(e => e.id === edgeId ? { ...e, ...updates } : e)
      );
    },
    
    delete: (edgeId: string) => {
      edges.update(current => current.filter(e => e.id !== edgeId));
    },
    
    replace: (newEdges: EdgeData[]) => {
      edges.set(newEdges);
    }
  },
  
  // UI State Actions
  selection: {
    setNode: (nodeId: string | null) => {
      selectedNodeId.set(nodeId);
      selectedEdgeId.set(null);
    },
    
    setEdge: (edgeId: string | null) => {
      selectedEdgeId.set(edgeId);
      selectedNodeId.set(null);
    },
    
    clear: () => {
      selectedNodeId.set(null);
      selectedEdgeId.set(null);
    }
  },
  
  // Mode Actions
  setAddEdgeMode: (enabled: boolean) => isAddEdgeMode.set(enabled),
  setLoading: (loading: boolean) => isLoading.set(loading),
  setError: (error: string | null) => error.set(error),
  
  // History Actions (delegiert an HistoryService)
  history: {
    updateButtons: (canUndoValue: boolean, canRedoValue: boolean) => {
      canUndo.set(canUndoValue);
      canRedo.set(canRedoValue);
    }
  },
  
  // Modal Actions
  modals: {
    showExport: () => showExportModal.set(true),
    hideExport: () => showExportModal.set(false),
    showImport: () => showImportModal.set(true),
    hideImport: () => showImportModal.set(false),
    showShortcutsHelp: () => showShortcutsHelp.set(true),
    hideShortcutsHelp: () => showShortcutsHelp.set(false),
    showSettingsModal: () => showSettingsModal.set(true),
    hideSettingsModal: () => showSettingsModal.set(false)
  },
  
  // Utility Actions
  reset: () => {
    nodes.set([]);
    edges.set([]);
    selectedNodeId.set(null);
    selectedEdgeId.set(null);
    isAddEdgeMode.set(false);
    isLoading.set(false);
    error.set(null);
    canUndo.set(false);
    canRedo.set(false);
  }
};

// Export store for easy access
export default relationshipGraphStore;
```

---

## 🤔 **Diskussionspunkte**

### **Offene Fragen**
1. **Store Persistence**: Wie synchronisierst du Store mit Foundry Document?
2. **Error Handling**: Wie behandelst du Fehler im Store?
3. **Performance**: Wie optimierst du Store-Updates bei großen Datenmengen?
4. **Testing**: Wie testest du Store und Controller?

### **Entscheidungen zu treffen**
1. **Store Library**: Sollen wir eine externe Store-Library verwenden?
2. **History Management**: Wie implementieren wir Undo/Redo?
3. **Error Boundaries**: Wie implementieren wir Error Boundaries?
4. **Performance Monitoring**: Wie überwachen wir Store-Performance?

### **Nächste Schritte**
1. **Store Implementation**: `relationshipGraphStore.ts` erstellen
2. **Controller Implementation**: `RelationshipGraphController.svelte` erstellen
3. **Component Refactoring**: Komponenten auf Store umstellen
4. **Testing**: Unit Tests für Store und Controller

---

## 📝 **Notizen**

### **Wichtige Entscheidungen**
- Controller Pattern für Business Logic
- Store Pattern für State Management
- Event-Driven Architecture für lose Kopplung
- Single Source of Truth: Store
- Immutable State Updates

### **Technische Constraints**
- Foundry VTT API Kompatibilität
- Svelte 5 Runes Syntax
- TypeScript Strict Mode
- Browser Kompatibilität

### **Performance Considerations**
- Store Subscription Optimization
- Derived Store Caching
- Batch Updates
- Memory Management
- Lazy Loading 