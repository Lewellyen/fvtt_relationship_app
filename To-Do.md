super — jetzt kommt der handfeste Umsetzungsplan. Kurz, sequenziell, mit klaren Checkpoints. Kein Code-Dump, nur To-dos, Definition-of-Done und Risiken.

# Roadmap (5 kompakte Etappen)

## Etappe 1 — Basis-Datenmodell & Custom-JournalPage

**Ziel:** `JournalEntryPage.system.graph` steht, validiert, initialisiert.

* Tasks

  * DataModel-Felder definieren: `version`, `nodes`, `edges`, `policy.visibility`.
  * Custom-JournalPage-Typ registrieren (nur Anzeige „leere Graph-Seite“).
  * Minimaler Migrationshaken: `version=1`.
* DoD

  * Neue Graph-Seite anlegen ⇒ `page.system.graph` hat Defaults.
  * `updateJournalEntryPage` feuert bei Änderungen an `system.graph`.

## Etappe 2 — Service-Layer & Queries (headless)

**Ziel:** Ein einziger Schreib-/Lese-Pfad + schnelle Abfragen.

* Tasks

  * `GraphService` (CRUD, tx/batch, get snapshot).
  * In-Memory-Indizes (byId, byType, byFaction, neighbors).
  * Cytoscape **headless** einhängen für: `neighbors(nodeId)`, `shortestPath(a,b)`, `filterBy(...)`.
* DoD

  * In Konsole/API: Node/Edge anlegen/lesen/löschen funktioniert.
  * 1k Nodes / 2k Edges: `neighbors()` < 50ms Median lokal.

## Etappe 3 — UI-Grundlagen (Svelte 5 + Tabelle)

**Ziel:** Sichtbarer Fortschritt, editierbar ohne Graph-Canvas.

* Tasks

  * Svelte-Mount im Sheet (View/Edit Toggle).
  * Tabellenansicht (Flowbite): Liste aller Nodes mit Kernfeldern.
  * Inline-Edit: Label, Relation, Factions (Multi-Select), NPC-Flag.
  * Suche/Filter (Text, Relation, Fraktionen).
* DoD

  * Änderungen in der Tabelle persistieren sofort in `system.graph`.
  * Zweiter Client sieht Updates via Hook.

## Etappe 4 — Sichtbarkeiten (D1/D2) & GM-UX

**Ziel:** Feldweise Freigabe per einfachem Toggle (Mapper macht den Rest).

* Tasks

  * **Policy-Section**: `policy.visibility[fieldPath]=boolean`.
  * UI-Toggles pro Feld/Block (Auge/ durchgestrichenes Auge).
  * „Als Spieler ansehen“-Preview.
  * View-Service filtert Spieler-Sicht.
* DoD

  * GM kann pro Feld toggeln; Spieleransicht zeigt exakt freigegebene Felder.
  * Batch-Toggle für „Beschreibung“ funktioniert.

## Etappe 5 — Graph-View & Layout

**Ziel:** Komfortable Graph-Bearbeitung, Layout stabil.

* Tasks

  * **Svelte-Flow** als Editor (Nodes/Edges draggen, add/remove).
  * **elkjs** Auto-Layout (Button „anordnen“; async).
  * Sync mit Service (UI ↔ DataModel).
* DoD

  * Knoten/Kanten im Canvas editierbar; Layout anwenden speichert Positionen.
  * Filter (Fraktion/Relation) wirkt im Canvas und in Tabelle konsistent.

---

# Prüfplan (kurz)

* **Unit:** Service CRUD, Policy-Filter, Indizes.
* **Integrations:** 2 Clients parallel (Update-Propagation).
* **Performance:** 500+ Nodes: Filter/Select < 100ms, elkjs-Layout asynchron erlaubt UI weiter.

# Risiken & Guardrails

* **Schema-Drift:** FieldPaths zentral registrieren (Mapper!), jede Änderung migrationspflichtig.
* **Leistung:** elkjs in Worker auslagern, Cytoscape headless nur für Queries nutzen.
* **Datenverlust:** `tx()` immer atomic; Etappe 2 direkt mit History-Hook (für späteres Undo).
* **UI-Komplexität:** Erst Tabelle stabilisieren (Etappe 3), dann Canvas (Etappe 5).

# Artefakt-Checkliste (Dateien/Module)

* `data/graph.schema.ts` (DataModel-Definition)
* `graph/service.ts` (CRUD, tx, indices)
* `graph/query.cyto.ts` (headless-Queries)
* `graph/policy.ts` (FieldPath-Registry, Mapper)
* `ui/Table.svelte` (Flowbite-Tabelle)
* `ui/Graph.svelte` (Svelte-Flow + elkjs)
* `ui/PreviewPlayer.svelte` (Spieler-Sicht)
* `app/JournalGraphSheet.ts` (AppV2-Sheet Bridge)

# Nächster konkret sinnvoller Schritt

Starte mit **Etappe 1**:

* Liste der **FieldPaths** festzurren (für Mapper & Toggles):
  `description.common`, `description.hidden`, `description.gmOnly`,
  `effects.friend`, `effects.enemy`, `effects.neutral`,
  `knowledge.general`, `knowledge.hidden`, `knowledge.secret`.
* DataModel-Skeleton anlegen (nur Felder + Defaults, noch keine Logik).

