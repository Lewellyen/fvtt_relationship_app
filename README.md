# WH40K Deathwatch

Ein Foundry VTT System für Warhammer 40K Deathwatch RPG.

## Voraussetzungen

- Python 3 mit installiertem `tkinter`
- Git CLI
- Foundry VTT v13 oder höher

## Installation

1. Kopiere das Verzeichnis `wh40k-deathwatch` in `Data/systems/` deines Foundry-Installationsordners.
2. Erstelle und aktiviere eine virtuelle Umgebung:
   ```bat
   python -m venv .venv
   .venv\Scripts\activate
   ```
3. Optional: Installiere weitere Python-Abhängigkeiten, falls benötigt.

## Release-Manager

Um einen neuen Release durchzuführen, starte die GUI über die `release.bat`:

```bat
release.bat
```

Die GUI automatisiert:
- Aktualisierung der Version in `scripts/constants.cjs`
- Aktualisierung von `system.json` und `package.json`
- Erzeugung eines Changelog-Eintrags und Release-Notes unter `docs/development/foundry/releases/`
- Entfernen von BOM-Markierungen in Projektdateien
- Git-Operationen (add, commit, tag, push)

## Nutzung

Starte `release.bat` und wähle in der GUI die gewünschten Schritte aus. 