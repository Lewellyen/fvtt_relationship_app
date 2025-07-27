# TODO: Relationship Graph Editor - Dateneingabemaske

## 🎯 Ziel: Moderne, benutzerfreundliche Dateneingabemaske für Relationship Graph

---

## 📋 Phase 1: Grundstruktur & Layout ✅ ABGESCHLOSSEN
- [x] **1.1** RelationshipGraphEdit.svelte erweitern (Layout mit Sidebar + Canvas + Property Panel)
- [x] **1.2** GraphToolbar.svelte erstellen (Add Node, Add Edge, Delete, Save, Export)
- [x] **1.3** GraphCanvas.svelte erstellen (Cytoscape + Interaktionen)
- [x] **1.4** SidebarPanel.svelte erstellen (Node/Edge Listen)
- [x] **1.5** PropertyPanel.svelte erstellen (Detail-Eingaben Container)

## 📋 Phase 2: Node Management ✅ ABGESCHLOSSEN
- [x] **2.1** NodeEditor.svelte erstellen (Node-spezifische Eingaben)
- [x] **2.2** Node List in Sidebar implementieren
- [x] **2.3** Add Node Funktionalität
- [x] **2.4** Node Selection & Highlighting
- [x] **2.5** Node Deletion

## 📋 Phase 3: Edge Management
- [x] **3.1** EdgeEditor.svelte erstellen (Edge-spezifische Eingaben)
- [x] **3.2** Edge List in Sidebar implementieren
- [x] **3.3** Add Edge Funktionalität (Drag & Drop)
- [x] **3.4** Edge Selection & Highlighting
- [x] **3.5** Edge Deletion

## 📋 Phase 4: Visual Settings
- [ ] **4.1** VisualSettings.svelte erstellen (Cytoscape-Attribute)
- [ ] **4.2** Color Picker für Hintergrundfarbe
- [ ] **4.3** Color Picker für Rahmenfarbe
- [ ] **4.4** Size Controls (Breite, Höhe)
- [ ] **4.5** Shape Selector (Ellipse, Rechteck, etc.)
- [ ] **4.6** Font Settings (Größe, Familie, Gewicht)

## 📋 Phase 5: Permissions & Metadata
- [ ] **5.1** PermissionEditor.svelte erstellen
- [ ] **5.2** User Level Permissions
- [ ] **5.3** Description Management
- [ ] **5.4** Relationship Effects
- [ ] **5.5** Metadata Fields (Type, Category, etc.)

## 📋 Phase 6: Interaktivität & UX
- [ ] **6.1** Drag & Drop für Node Positionierung
- [ ] **6.2** Context Menus (Rechtsklick)
- [ ] **6.3** Keyboard Shortcuts
- [ ] **6.4** Undo/Redo Funktionalität
- [ ] **6.5** Search & Filter in Sidebar

## 📋 Phase 7: Data Persistence
- [ ] **7.1** Save Funktionalität
- [ ] **7.2** Auto-save
- [ ] **7.3** Export Funktionalität (JSON, PNG, SVG)
- [ ] **7.4** Import Funktionalität
- [ ] **7.5** Validation & Error Handling

## 📋 Phase 8: Polish & Optimization
- [ ] **8.1** Responsive Design
- [ ] **8.2** Dark/Light Mode
- [ ] **8.3** Loading States
- [ ] **8.4** Error Boundaries
- [ ] **8.5** Performance Optimization

---

## 🚀 Aktueller Status: Phase 3 - Edge Management
**Nächste Aufgabe:** 4.1 VisualSettings.svelte erstellen

**✅ Phase 1 Abgeschlossen:**
- Moderne Layout-Struktur mit Toolbar, Sidebar, Canvas und Property Panel
- GraphToolbar mit allen notwendigen Aktionen (Add, Delete, Save, Export, Undo/Redo)
- GraphCanvas mit Cytoscape-Integration und Interaktionen
- SidebarPanel mit Search, Filter und Tabbed Interface
- PropertyPanel mit Tabbed Interface für verschiedene Eigenschaftsbereiche
- Vollständige Komponenten-Architektur implementiert

**✅ Phase 2 Abgeschlossen:**
- NodeEditor.svelte mit umfassenden Node-Eigenschaften (Label, Position, Form, Farben, Rahmen, Text)
- Integration der NodeEditor in PropertyPanel für Node-Bearbeitung
- Node List in Sidebar mit Search und Filter Funktionalität
- Node Selection & Highlighting im Canvas und Sidebar
- Add Node Funktionalität in Toolbar und Sidebar
- Node Deletion Funktionalität

**✅ Phase 3.1 Abgeschlossen:**
- EdgeEditor.svelte mit umfassenden Edge-Eigenschaften (Label, Source/Target, Line Color, Width, Style, Curve Style, Arrow Shape, Font Settings)
- Integration der EdgeEditor in PropertyPanel für Edge-Bearbeitung
- Edge-spezifische Eigenschaften wie Source/Target Node Selection, Line Styling, Arrow Shapes

**✅ Phase 3.2 Abgeschlossen:**
- Edge List in SidebarPanel vollständig implementiert
- Edge Items mit Source → Target Anzeige und Farbindikatoren
- Edge Selection & Highlighting in Sidebar
- Search und Filter Funktionalität für Edges
- Keyboard Accessibility für Edge Items

**✅ Phase 3.3 Abgeschlossen:**
- Add Edge Funktionalität mit Click-to-Select Modus implementiert
- Visual Feedback für Add Edge Mode im Canvas und Toolbar
- Edge Creation mit Source/Target Node Selection
- Automatic Edge Creation nach Target Selection
- Mode Reset nach Edge Creation oder Cancel

**✅ Phase 3.4 Abgeschlossen:**
- Edge Selection & Highlighting in Cytoscape implementiert
- Visual Selection Feedback für Nodes und Edges
- Selection State Synchronisation zwischen Komponenten
- Selection Info Display im Canvas mit ausgewählten Elementen
- Props-Weiterleitung für selectedNodeId und selectedEdgeId

**✅ Phase 3.5 Abgeschlossen:**
- Edge Deletion Funktionalität vollständig implementiert
- Delete-Button in Toolbar für ausgewählte Elemente
- Delete-Buttons in Sidebar für Node- und Edge-Items
- Keyboard-Shortcut (Delete/Backspace) für schnelles Löschen
- Bestätigungsdialog für sicheres Löschen
- Automatisches Löschen verbundener Edges beim Node-Löschen

---

## 📝 Notizen:
- Alle Komponenten verwenden Svelte 5 Runes
- Tailwind CSS für Styling
- TypeScript für Type Safety
- Foundry VTT Integration beachten
- Cytoscape für Graph Visualisierung 