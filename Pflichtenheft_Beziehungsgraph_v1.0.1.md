# Pflichtenheft v1.0.1 – Beziehungsgraph

## A. Visualisierung & UI
- **A1 (Graph):** *Svelte-Flow* für Editor/Interaktion + *elkjs* fürs Auto-Layout; *Cytoscape (headless)* als schnelle Query/Filter-Engine.
- **A2 (Tabelle):** Svelte + Flowbite-Table.
- **A3 (UI-Stack):** Svelte 5 (Runes) + Tailwind.

## B. Datenmodell & Persistenz
- **Ort:** `JournalEntryPage.system.graph`  
  (Custom-JournalPage mit eigenem **DataModel**, das Foundry automatisch nach `system.*` mappt.)
- **Validierung/Defaults/Migrationen:** über Foundry **DataModel** (`foundry.data.fields.*`) – bereits enthalten.
- **Events/Sync:** Änderungen kommen über `updateJournalEntryPage` mit `changes.system.graph.*`.

### System-Schema (Shape)
```ts
// system.graph
{
  version: number,                  // Migrationstreiber
  nodes: Record<string, NodeData>,  // siehe C
  edges: Record<string, EdgeData>,  // optional typisiert
  policy?: Record<string, NodePolicy> // D1: visibility pro Node
}
```

### DataModel (Beispiel-Felder – ohne Implementierungsdetails)
- `version: NumberField({ initial: 1 })`
- `nodes: ObjectField({ initial: {} })`
- `edges: ObjectField({ initial: {} })`
- `policy: ObjectField({ initial: {} })`

## C. Knoten/Edges/Vererbung
- **C1:** Mehrfach-Fraktionen via `node.factions: string[]` (MUST).
- **C2:** Verhältnis (FFN) als Enum `friend|enemy|neutral` (Skalierter Score = Future Feature).
- **C3:** **Hybrid-Vererbung**: Lazy-View standard, optionales Materialisieren (Batch-Apply), `parentId`, `inherit`.

## D. Feldweise Freigabe (D1/D2)
- **D1 (Modell):** **Policy-Section** mit `policy.visibility: Record<FieldPath, boolean>`;  
  UI: **einfacher Toggle je Feld** (+ Batch pro Block). Mapper erledigt FieldPath-Pflege im Hintergrund.
- **D2 (Durchsetzung):** **Filter im View-Service** (Spieler bekommen nur gefilterte Sichten).

## E. Suche/Filter & Indizes
- **Hybrid:** Graph-Queries über **Cytoscape (headless)**; ansonsten In-Memory-Indizes (Maps/Sets) + leichte Fuzzy-Textsuche.

## F. Pinning
- **Foundry-native Journal-Pins** (ein Pin pro Szene im MVP).  
  Optional: Koordinaten-Cache in `system.graph.nodes[id].pins[sceneId]`.

## G–I. Future Features
- **G (Undo/Redo), H (Kollab), I (Import/Export):** als **Future Features** vorgesehen.

## Qualität & Tests
- **Unit-Tests:** CRUD, Vererbung (Lazy/Materialize), Freigabe-Filter.  
- **Integrations-Tests:** Zwei Clients, Update-Propagation.  
- **Performance:** 500+ Nodes / 1000+ Edges mit flüssigem Pan/Zoom/Filter.

## Akzeptanzkriterien (Auszug)
- Beim Anlegen einer Graph-Page sind **Defaults** sofort in `page.system.graph` vorhanden.  
- Änderungen an Knoten/Freigaben sind nach `updateJournalEntryPage` unter `system.graph` nachvollziehbar.  
- Ein zweiter Client sieht Änderungen über den `updateJournalEntryPage`-Hook (Pfad `system.graph`).

---

**Stand:** v1.0.1 (Persistenz im `document.system.graph`, nicht mehr in Flags)
