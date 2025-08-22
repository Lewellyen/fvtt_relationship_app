# 🏗️ Relationship Graph - Komponentenarchitektur Konzept

## 📋 Inhaltsverzeichnis
1. [Komponenten-Hierarchie](#1-komponenten-hierarchie)
2. [Datenfluss-Konzept](#2-datenfluss-konzept)
3. [Service-Architektur](#3-service-architektur)
4. [State Management](#4-state-management)
5. [Event Flow](#5-event-flow)
6. [Props & Interfaces](#6-props--interfaces)
7. [Implementierungsplan](#7-implementierungsplan)
8. [Aktuelle Probleme](#8-aktuelle-probleme)
9. [Lösungsansätze](#9-lösungsansätze)

---

## 1. Komponenten-Hierarchie

```
JournalEntryPageRelationshipGraphSheet.ts (Foundry Sheet)
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

### Komponenten-Verantwortlichkeiten

| Komponente | Verantwortlichkeit | Props | Events |
|------------|-------------------|-------|--------|
| **JournalEntryPageRelationshipGraphSheet** | Foundry Integration, Service Management | - | CRUD Events |
| **RelationshipGraphView** | View Mode Container | `nodes`, `edges` | Selection Events |
| **RelationshipGraphEdit** | Edit Mode Container | `nodes`, `edges` | CRUD Events |
| **CytoscapeGraph** | Graph Rendering | `nodes`, `edges`, `callbacks` | Interaction Events |
| **GraphToolbar** | Main Actions | - | Action Events |
| **PropertyPanel** | Element Properties | `selectedNode`, `selectedEdge` | Property Update Events |
| **SidebarPanel** | Search/Filter | `nodes`, `edges` | Filter Events |

---

## 2. Datenfluss-Konzept

```
📊 DATA FLOW ARCHITECTURE
┌─────────────────────────────────────────────────────────────┐
│                    FOUNDRY VTT LAYER                        │
├─────────────────────────────────────────────────────────────┤
│ JournalEntryPageRelationshipGraphSheet.ts                   │
│ ├── Lädt Demo-Daten via ServiceManager                      │
│ ├── Übergibt nodes/edges als Props an Svelte               │
│ ├── Behandelt CRUD-Operationen                              │
│ └── Speichert Änderungen in Foundry Document                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    SVELTE COMPONENT LAYER                   │
├─────────────────────────────────────────────────────────────┤
│ RelationshipGraphView/Edit.svelte (Props: nodes, edges)     │
│ ├── State: selectedNodeId, selectedEdgeId                   │
│ ├── Events: onNodeClick, onEdgeClick, onDelete, etc.        │
│ ├── Delegiert an Child Components                           │
│ └── Emittiert Events an Foundry Sheet                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    UI COMPONENT LAYER                       │
├─────────────────────────────────────────────────────────────┤
│ CytoscapeGraph.svelte (Props: nodes, edges, callbacks)      │
│ ├── Rendert Graph via Cytoscape.js                          │
│ ├── Handles User Interactions                               │
│ ├── Emits Events an Parent                                  │
│ └── Manages Graph State                                     │
└─────────────────────────────────────────────────────────────┘
```

### Datenfluss-Regeln

1. **Top-Down Props**: Daten fließen von oben nach unten als Props
2. **Bottom-Up Events**: Events fließen von unten nach oben als Callbacks
3. **Single Source of Truth**: Foundry Document ist die einzige Datenquelle
4. **Immutable Updates**: Props werden nicht direkt modifiziert
5. **Event Delegation**: Events werden an Foundry Sheet delegiert

---

## 3. Service-Architektur

```
🔧 SERVICE ARCHITECTURE
┌─────────────────────────────────────────────────────────────┐
│                    SERVICE MANAGER                          │
├─────────────────────────────────────────────────────────────┤
│ ServiceManager (Singleton)                                  │
│ ├── ServiceFactory (Creates Services)                       │
│ ├── Service Caching                                         │
│ ├── Dependency Injection                                    │
│ └── Lifecycle Management                                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CORE SERVICES                            │
├─────────────────────────────────────────────────────────────┤
│ RelationshipGraphService (Data Management)                  │
│ ├── CRUD Operations (nodes, edges)                          │
│ ├── Data Validation                                         │
│ ├── State Management                                        │
│ └── Event Handling                                          │
│                                                             │
│ RelationshipGraphPersistenceService (Storage)              │
│ ├── Save/Load to Foundry Documents                          │
│ ├── Auto-save Functionality                                 │
│ ├── Export/Import Operations                                │
│ └── Backup/Restore                                          │
│                                                             │
│ RelationshipGraphValidationService (Validation)            │
│ ├── Node/Edge Validation                                    │
│ ├── Graph Structure Validation                              │
│ ├── Data Integrity Checks                                   │
│ └── Error Reporting                                         │
│                                                             │
│ RelationshipGraphDemoDataService (Demo Data)               │
│ ├── Default Graph Data                                      │
│ ├── Sample Relationships                                     │
│ └── Template Graphs                                         │
└─────────────────────────────────────────────────────────────┘
```

### Service-Verantwortlichkeiten

| Service | Verantwortlichkeit | Dependencies |
|---------|-------------------|--------------|
| **RelationshipGraphService** | Graph Data Management | PersistenceService, ValidationService |
| **RelationshipGraphPersistenceService** | Data Storage | Foundry Document API |
| **RelationshipGraphValidationService** | Data Validation | - |
| **RelationshipGraphDemoDataService** | Demo Data | - |

---

## 4. State Management

```
 STATE MANAGEMENT ARCHITECTURE
┌─────────────────────────────────────────────────────────────┐
│                    GLOBAL STATE (Foundry)                   │
├─────────────────────────────────────────────────────────────┤
│ Foundry Document (Persistent)                               │
│ ├── nodes: NodeData[]                                       │
│ ├── edges: EdgeData[]                                       │
│ ├── metadata: GraphMetadata                                 │
│ └── settings: GraphSettings                                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    COMPONENT STATE (Svelte)                 │
├─────────────────────────────────────────────────────────────┤
│ RelationshipGraphEdit.svelte                                │
│ ├── selectedNodeId: string | null                           │
│ ├── selectedEdgeId: string | null                           │
│ ├── isAddEdgeMode: boolean                                  │
│ ├── edgeSourceNodeId: string | null                         │
│ ├── showModals: { export, import, help, settings }          │
│ ├── canUndo/canRedo: boolean                                │
│ ├── isLoading: boolean                                      │
│ └── error: string | null                                    │
│                                                             │
│ CytoscapeGraph.svelte                                       │
│ ├── cy: Cytoscape Instance                                  │
│ ├── contextMenu: { visible, x, y, node, edge }              │
│ ├── previousNodes/previousEdges: Array                      │
│ └── isInitialized: boolean                                  │
└─────────────────────────────────────────────────────────────┘
```

### State-Regeln

1. **Persistent State**: Nur in Foundry Document
2. **UI State**: Lokal in Svelte Components
3. **Derived State**: Berechnet aus Props
4. **Temporary State**: Nur für UI-Interaktionen

---

## 5. Event Flow

```
🔄 EVENT FLOW ARCHITECTURE
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERACTION FLOW                    │
├─────────────────────────────────────────────────────────────┤
│ 1. User clicks node/edge                                    │
│ 2. CytoscapeGraph emits event                               │
│ 3. RelationshipGraphEdit handles event                      │
│ 4. Updates local state                                      │
│ 5. Calls Foundry Sheet method                               │
│ 6. Foundry Sheet updates service                            │
│ 7. Service saves to document                                │
│ 8. Props updated, re-render                                 │
└─────────────────────────────────────────────────────────────┘
```

### Event-Typen

| Event Type | Source | Target | Purpose |
|------------|--------|--------|---------|
| **Selection Events** | CytoscapeGraph | RelationshipGraphEdit | Element Selection |
| **CRUD Events** | RelationshipGraphEdit | Foundry Sheet | Data Modification |
| **UI Events** | Child Components | Parent Components | UI State Changes |
| **System Events** | Services | Components | Data Updates |

### Event-Handler Mapping

```typescript
// Event Handler Structure
interface EventHandlers {
  // Selection Events
  onNodeClick: (nodeId: string) => void;
  onEdgeClick: (edgeId: string) => void;
  onCanvasClick: () => void;
  
  // CRUD Events
  onAddNode: (x: number, y: number) => void;
  onAddEdge: (sourceId: string, targetId: string) => void;
  onDeleteNode: (nodeId: string) => void;
  onDeleteEdge: (edgeId: string) => void;
  onUpdateNode: (nodeId: string, updates: Partial<NodeData>) => void;
  onUpdateEdge: (edgeId: string, updates: Partial<EdgeData>) => void;
  
  // UI Events
  onPropertyUpdate: (data: PropertyUpdateData) => void;
  onContextMenuAction: (action: string, nodeId?: string, edgeId?: string) => void;
}
```

---

## 6. Props & Interfaces

### Core Interfaces

```typescript
// 📦 CORE DATA INTERFACES
interface NodeData {
  id: string;
  x: number;
  y: number;
  label: { value: string; permissions: Permission };
  type: { value: string; permissions: Permission };
  cytoScapeAttributes: CytoGraphNodeAttributes;
  globalPermissions: Permission;
  description?: string;
  metadata?: Record<string, any>;
}

interface EdgeData {
  id: string;
  source: string;
  target: string;
  label: { value: string; permissions: Permission };
  type: string;
  cytoScapeAttributes: CytoGraphEdgeAttributes;
  globalPermissions: Permission;
  description?: string;
  effects?: RelationshipEffect[];
  metadata?: Record<string, any>;
}

interface Permission {
  defaultLevel: number;
  users: Array<{ id: string; level: number }>;
}
```

### Component Props

```typescript
// 📦 COMPONENT PROPS INTERFACES
interface GraphComponentProps {
  nodes: NodeData[];
  edges: EdgeData[];
}

interface CytoscapeGraphProps extends GraphComponentProps {
  selectedNodeId?: string | null;
  selectedEdgeId?: string | null;
  width?: string;
  height?: string;
  interactive?: boolean;
  onNodeClick?: (nodeId: string) => void;
  onEdgeClick?: (edgeId: string) => void;
  onNodeDoubleClick?: (nodeId: string) => void;
  onEdgeDoubleClick?: (edgeId: string) => void;
  onNodePositionChange?: (nodeId: string, x: number, y: number) => void;
  onContextMenuAction?: (action: string, nodeId?: string, edgeId?: string, x?: number, y?: number) => void;
  onCytoscapeReady?: (cy: any) => void;
}

interface PropertyPanelProps {
  selectedNode: NodeData | null;
  selectedEdge: EdgeData | null;
  onPropertyUpdate: (data: PropertyUpdateData) => void;
}

interface GraphToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  isAddEdgeMode: boolean;
  onAddNode: () => void;
  onAddEdge: () => void;
  onDelete: () => void;
  onSave: () => void;
  onExport: () => void;
  onImport: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onShortcutsHelp: () => void;
}
```

---

## 7. Implementierungsplan

### Phase 1: Core Data Flow ✅ (Done)
- [x] Props-based data passing
- [x] Service initialization in Foundry Sheet
- [x] Basic component rendering
- [x] Endless loop fix

### Phase 2: CRUD Operations (Next)
- [ ] Add Node functionality
- [ ] Add Edge functionality
- [ ] Delete Node/Edge functionality
- [ ] Update Node/Edge properties
- [ ] Position updates
- [ ] Event handler implementation in Foundry Sheet

### Phase 3: Advanced Features
- [ ] Undo/Redo system
- [ ] Import/Export functionality
- [ ] Validation integration
- [ ] Auto-save system
- [ ] Context menu actions

### Phase 4: UI Polish
- [ ] Loading states
- [ ] Error handling
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Theme support

### Phase 5: Testing & Documentation
- [ ] Unit tests
- [ ] Integration tests
- [ ] User documentation
- [ ] Developer documentation

---

## 8. Aktuelle Probleme

### Identifizierte Probleme
1. **Endless Loop**: ✅ Behoben durch Props-basierten Datenfluss
2. **Service Dependencies**: Komplexe Service-Initialisierung in Komponenten
3. **Event Handling**: Unklare Event-Delegation
4. **State Management**: Vermischung von UI-State und Data-State
5. **Component Coupling**: Zu viele Abhängigkeiten zwischen Komponenten

### Technische Schulden
1. **Type Safety**: Fehlende TypeScript-Interfaces
2. **Error Handling**: Unvollständige Fehlerbehandlung
3. **Performance**: Ineffiziente Re-Renders
4. **Testing**: Fehlende Tests
5. **Documentation**: Unvollständige Dokumentation

---

## 9. Lösungsansätze

### Kurzfristige Lösungen
1. **Event Handler Implementation**: CRUD-Events im Foundry Sheet implementieren
2. **Props Interface Definition**: Saubere TypeScript-Interfaces definieren
3. **Component Decoupling**: Abhängigkeiten reduzieren
4. **Error Boundaries**: Fehlerbehandlung verbessern

### Langfristige Lösungen
1. **State Management Pattern**: Einheitliches State-Management
2. **Service Layer Optimization**: Service-Architektur optimieren
3. **Performance Optimization**: Re-Render-Optimierung
4. **Testing Strategy**: Umfassende Test-Suite

### Architektur-Prinzipien
1. **Single Responsibility**: Jede Komponente hat eine klare Verantwortlichkeit
2. **Dependency Inversion**: Abhängigkeiten von Abstraktionen, nicht Implementierungen
3. **Event-Driven**: Lose Kopplung durch Events
4. **Immutable Data**: Props werden nicht direkt modifiziert
5. **Composition over Inheritance**: Komposition bevorzugt

---

## 🤔 Diskussionspunkte

### Offene Fragen
1. **Event Handling**: Wie sollen CRUD-Events zwischen Komponenten und Foundry Sheet kommunizieren?
2. **State Persistence**: Wie wird der UI-State zwischen Sessions gespeichert?
3. **Performance**: Wie können wir Re-Renders bei großen Graphen optimieren?
4. **Error Handling**: Wie implementieren wir robuste Fehlerbehandlung?
5. **Testing**: Welche Testing-Strategie verwenden wir?

### Entscheidungen zu treffen
1. **Event Bus**: Sollen wir einen Event Bus für die Kommunikation verwenden?
2. **State Library**: Brauchen wir eine externe State-Management-Library?
3. **Service Pattern**: Welches Service-Pattern verwenden wir?
4. **Component Library**: Sollen wir eine interne Component Library erstellen?

### Nächste Schritte
1. **Props Interfaces**: Saubere TypeScript-Interfaces definieren
2. **Event Handlers**: CRUD-Events im Foundry Sheet implementieren
3. **Component Testing**: Erste Komponenten testen
4. **Documentation**: Architektur dokumentieren

---

## 📝 Notizen

### Wichtige Entscheidungen
- Props-basierter Datenfluss statt Service-Initialisierung in Komponenten
- Event-Delegation an Foundry Sheet für CRUD-Operationen
- Single Source of Truth: Foundry Document
- Immutable Props: Keine direkte Modifikation von Props

### Technische Constraints
- Foundry VTT API Kompatibilität
- Svelte 5 Runes Syntax
- TypeScript Strict Mode
- Browser Kompatibilität

### Performance Considerations
- Cytoscape.js Rendering Performance
- Large Graph Handling
- Memory Management
- Re-Render Optimization 