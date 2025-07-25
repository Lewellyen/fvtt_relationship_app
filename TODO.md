# To-Do-Liste: Relationship-Feature

## 1. Architektur & Grundstruktur
- [ ] RelationshipGraphDataModel implementieren (Knoten, Kanten, Metadaten)
- [ ] PersistenceService: Speichern/Laden in JournalEntryPage-Daten
- [ ] CytoscapeAdapter (RelationshipGraphCytoscapeService) für Visualisierung & Layout
- [ ] RelationshipManagerApp (extends ApplicationV2): Haupt-UI-Fenster
- [ ] Controller & Hooks: createJournalEntryPageHook, preUpdateJournalEntryPageHook, updateJournalEntryPageHook

## 2. Kern-Features (MVP)
- [ ] Knoten anlegen, benennen und verschieben (Drag & Drop)
- [ ] Beziehungen (Edges) erstellen mit Typ (Freund/Feind/Neutral) & Gewicht
- [ ] Hierarchie: Hauptknoten mit Unterknoten; Vorschläge für Art, Fraktion, Verhältnis, Farben
- [ ] Propagation: Änderungen von Verhältnis und Fraktion von Haupt- zu Unterknoten durchreichen
- [ ] Ausnahmen: Unterknoten als Ausnahme definieren (keine Propagation)
- [ ] Eingabe im Netzknoten (Graph) oder in Tabellenansicht
- [ ] Wechsel zwischen Tabellenansicht und Netzplan
- [ ] Inline-Bearbeitung: Beschreibung, Icon, Freigabestatus
- [ ] Nutzer kann Fraktionen anlegen und ändern
- [ ] Fraktionen und Knoten können Farben zugeordnet werden

## 3. Erweiterte Visualisierung
- [ ] Verschiedene Layout-Algorithmen per Dropdown (force-directed, grid)
- [ ] Gruppierung und Färbung nach Fraktion oder Status
- [ ] Pinning auf der Karte (Knotenpunkte auf Karten pinnen)
- [ ] Zoom-Levels und Filter (z. B. nur Freunde anzeigen)
- [ ] Animierte Übergänge bei Änderungen

## 4. Rechte & Freigabe
- [ ] Attribut "sichtbar für Spieler" pro Knoten und Kante (spotlight-out / gradual reveal)
- [ ] SL kann Informationen der Knoten für Spieler freigeben (schrittweise)
- [ ] Rollenspezifische Sichtbarkeit (GM only / Spieler)
- [ ] Snapshot-Export als JSON oder PNG

## 5. Usability & Customizing
- [ ] Drag-and-drop von Actors/Items in den Graph
- [ ] Context-Menüs (Rechtsklick: Details, Entfernen, Vertraulichkeit ändern)
- [ ] Custom Properties pro Knoten (Key/Value)

## 6. Konfiguration & Import/Export
- [ ] Import/Export von Graphen als JSON
- [ ] Konfigurationsseite für Default-Einstellungen (Farben, Layout, Sichtbarkeitsregeln)
- [ ] Globale Verwaltung mehrerer Graphen (pro Szene oder Welt)

## 7. Testing & Qualität
- [ ] Unit-Tests für DataModel und Services (Vitest)
- [ ] Integrationstests für das ApplicationV2 UI
- [ ] Linter und Type Coverage

## 8. Roadmap (Phasen)
- [ ] Phase 1 (MVP): Knoten/Kanten CRUD, Persistenz, Tabelle/Graph-Ansicht
- [ ] Phase 2: Erweiterte Layouts, Gruppen/Färbung, Hierarchie-Funktionen
- [ ] Phase 3: Karten-Pinning, Rechte-Feinsteuerung, Import/Export 