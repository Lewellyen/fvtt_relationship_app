# Aufbau

| Name / Bezeichnung                    | Adolfo von Grauberg                                              | Freigabe Info für Spieler |
|---------------------------------------|------------------------------------------------------------------|---------------------------|
| Art (Person / Ort / Gegenstand)       | Person / NPC                                                     | [x]                       |
| Fraktion                              | Adel, unabhängig                                                 | [x]                       |
| Verhältnis (Freund / Feind / Neutral) | Neutral                                                          | [ ]                       |
| Bild / Icon (für Karte?)              | ![Bild / Icon](path/to/icon.jpg)                                 | [x]                       |
| Beschreibung                          | Allgemein: "Text"                                               | [ ]                       |
|                                       | Verborgen: "Text"                                               | [ ]                       |
|                                       | nur SL: "Text"                                                  |                           |
| Auswirkung im Spiel                   | Freund: halbes Banner Kämpfer; Sichere Handelswege (Einkommen +5 D) | [ ]                    |
|                                       | Feind: Überfälle (Einkommen −5 D)                                 | [ ]                       |
|                                       | Neutral: keine Auswirkung                                        | [ ]                       |
| Verbindung zu:                        | Allgemeinwissen                                                  | [ ]                       |
|                                       | Verborgenes Wissen                                               | [ ]                       |
|                                       | Geheimwissen                                                     | [ ]                       |

## Bedienung – Wunschliste

*(was geht geht, was nicht... naja wenn man lange genug weint schläft man auch mal ein) :P*

- Eingabe im Netzknoten oder in Tabelle
- Wechsel zwischen Tabellenansicht und Netzplan
- Hauptknotenpunkte mit "Unternoten" – beim Anlegen werden Art, Fraktion, Verhältnis, Farben als Vorschlag übernommen (Änderung möglich)
- Änderung von Verhältnis und Fraktion werden vom Hauptknotenpunkt nach unten durchgereicht
- Unterknoten dürfen "als Ausnahme" definiert werden – d. h. es werden keine Änderungen von oben durchgereicht (z. B. Verräter / Spion im Gefolge)
- Nutzer (ich ;)) darf Fraktionen anlegen und ändern
- Fraktionen bzw. Knoten dürfen Farben zugeordnet werden
- Knotenpunkte können auf Karten "gepinnt" werden
- SL darf die Informationen der Knoten für Spieler freigeben, idealerweise Stück für Stück

## Feature-Plan

1. Architektur & Module
   - RelationshipGraphDataModel (Knoten, Kanten, Metadaten)
   - PersistenceService: Speichern/Laden in Foundry World-Settings oder Actor-Daten
   - CytoscapeAdapter (RelationshipGraphCytoscapeService): Visualisierung & Layout
   - RelationshipManagerApp (extends ApplicationV2): Haupt-UI-Fenster
   - Controller & Hooks: createActorHook, preUpdateActorHook, updateActorHook

2. Kern-Features (MVP)
   - Knoten anlegen, benennen und verschieben (Drag & Drop)
   - Beziehungen (Edges) erstellen mit Typ (Freund/Feind/Neutral) & Gewicht
   - Hierarchie: Hauptknoten mit Unterknoten; beim Anlegen werden Art, Fraktion, Verhältnis, Farben vorgeschlagen
   - Propagation: Änderungen von Verhältnis und Fraktion werden von Hauptknoten zu Unterknoten durchgereicht
   - Ausnahmen: Unterknoten können als Ausnahme definiert werden, d. h. keine Propagation
   - Eingabe wahlweise im Netzknoten (Graph) oder in Tabellenansicht
   - Wechsel zwischen Tabellenansicht und Netzplan
   - Inline-Bearbeitung von Eigenschaften: Beschreibung, Icon, Freigabestatus
   - Nutzer darf Fraktionen anlegen und ändern
   - Fraktionen und Knoten können Farben zugeordnet werden
   - Einbettung als Sidebar-Tab im Actor-Sheet

3. Erweiterte Visualisierung
   - Verschiedene Layout-Algorithmen per Dropdown (force-directed, grid)
   - Gruppierung und Färbung nach Fraktion oder Status
   - Pinning auf der Karte (Knotenpunkte können auf Karten gepinnt werden)
   - Zoom-Levels und Filter (z. B. nur Freunde anzeigen)
   - Animierte Übergänge bei Änderungen

4. Rechte & Freigabe
   - Attribut "sichtbar für Spieler" pro Knoten und Kante (spotlight-out / gradual reveal)
   - SL darf die Informationen der Knoten für Spieler freigeben, idealerweise schrittweise
   - Rollenspezifische Sichtbarkeit (GM only / Spieler)
   - Snapshot-Export als JSON oder PNG

5. Usability & Customizing
   - Drag-and-drop von Actors/Items in den Graph
   - Context-Menüs (Rechtsklick → Details, Entfernen, "Vertraulichkeit ändern")
   - Custom Properties pro Knoten (Key/Value)

6. Konfiguration & Import/Export
   - Import/Export von Graphen als JSON
   - Konfigurationsseite für Default-Einstellungen (Farben, Layout, Sichtbarkeitsregeln)
   - Globale Verwaltung mehrerer Graphen (pro Szene oder Welt)

7. Testing & Qualität
   - Unit-Tests für DataModel und Services (Vitest)
   - Integrationstests für das ApplicationV2 UI
   - Linter und Type Coverage

8. Roadmap
   - Phase 1 (MVP): Knoten/Kanten CRUD, Persistenz, Tabelle/Graph-Ansicht
   - Phase 2: Erweiterte Layouts, Gruppen/Färbung, Hierarchie-Funktionen
   - Phase 3: Karten-Pinning, Rechte-Feinsteuerung, Import/Export
