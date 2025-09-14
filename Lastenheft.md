# Lastenheft – „Beziehungsgraph“ (aktualisiert)

## 1. Ziel & Nutzen
Der Spielleiter (SL) möchte Beziehungsnetze (Personen/Orte/Gegenstände, Fraktionen, Verhältnis zur Heldengruppe) **übersichtlich pflegen**, **auf Karten verorten** und **Informationen schrittweise für Spieler freigeben** – wahlweise im **Netzplan** oder in einer **Tabellenansicht**. Unterknoten sollen Eigenschaften vom Hauptknoten **vererben**, mit Ausnahmen (z. B. Verräter/Spion).

## 2. Geltungsbereich
- Eine Graph-Seite je JournalPage (Single Source of Truth).
- Sicht für SL und Spieler (mit Freigabe-Logik).
- Foundry-VTT-v13 kompatibel (Journal, Szenen/Karten, Benutzerrollen).

## 3. Begriffe
- **Knoten (Node):** Eintrag (Person/NPC, Ort, Gegenstand), besitzt Felder.
- **Hauptknoten / Unterknoten:** Hierarchie. Hauptknoten vererbt Werte nach unten.
- **Fraktion:** Kategorie (mehrfach möglich, farblich markiert).
- **Verhältnis (FFN):** Stellung des Knotens zur Heldengruppe (Freund/Feind/Neutral) – Info im Knoten.
- **Freigabe Info für Spieler:** Feldweise Sichtbarkeitsfreigabe.
- **Pin:** Knoten ist auf einer Szene/Map verankert (ein Pin pro Szene).

## 4. Benutzer & Rechte
- **SL:** darf alles anlegen/ändern/löschen, Fraktionen verwalten, Infos freigeben.
- **Spieler:** sehen nur freigegebene Informationen.
- **Benutzerbezogene Rechte:** später.

## 5. Funktionale Anforderungen

### 5.1 Knoten-Datenfelder
- **Stammdaten:** Name, Art, NPC-Flag, Fraktion(en), Verhältnis, Bild/Icon.
- **Beschreibung:** Allgemein, Verborgen, Nur SL (Textfelder).
- **Auswirkung im Spiel:** Freund/Feind/Neutral (Texte).
- **Wissen:** Allgemeinwissen, Verborgenes Wissen, Geheimwissen (Texte).
- **Verbindungen zu:** andere Knoten.

### 5.2 Bearbeitung & Ansichten
- Eingabe im Knoten oder in Tabelle.
- Wechsel Netz/Tabelle jederzeit.
- Hauptknoten/Unterknoten: Vererbung von Fraktion(en)/Verhältnis, Ausnahme möglich.
- Fraktionen: Anlegen/ändern, Farben, Mehrfachzuweisung.
- Knoten pinnen: ein Pin pro Szene.
- Freigabe feldweise.

### 5.3 Suchen/Filtern
- Filter nach Art, Fraktion(en), Verhältnis, Text.
- Suche nach Name.

### 5.4 Import/Export
- JSON Import/Export.

## 6. Nicht-funktionale Anforderungen
- **Usability:** Wechsel Netz/Tabelle ohne Datenverlust.
- **Performance:** >=500 Knoten performant.
- **Sicherheit/Rechte:** nur freigegebene Infos sichtbar.
- **Konsistenz:** deterministische Vererbung/Ausnahmen.
- **Kompatibilität:** Foundry v13.
- **Robustheit:** Undo/Redo.

## 7. Akzeptanzkriterien (Auszug)
- Feldfreigabe wirkt sofort für Spieler.
- Mehrfachfraktionen pro Knoten.
- Verhältnisänderung vererbt nach unten, außer „Ausnahme“.
- Pin je Szene sichtbar.
- Fraktionen frei definierbar/farbig.
- Getrennte Texte für FFN-Auswirkungen.
- Wissen als Textfelder.

## 8. Priorisierung (MoSCoW)
- **MUST:** Mehrfachfraktionen, Freigaben, Netz/Tabelle, Vererbung+Ausnahme, Pinnen, Filter/Suche, JSON-Export.
- **SHOULD:** Undo/Redo, Edge-Typ/Label, Batch-Freigabe.
- **COULD:** Vorlagen, Änderungsprotokoll, Schnell-Freigabe.
- **WON’T:** Benutzerrechte, mehrere Pins pro Szene, Realtime-Kollaboration.
