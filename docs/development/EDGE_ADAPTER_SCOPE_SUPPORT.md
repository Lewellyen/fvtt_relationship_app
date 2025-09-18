# Edge Adapter - Scope und Transient Support

## Übersicht

Der EdgeAdapter (`use` Funktion) unterstützt jetzt **Scope-Parameter** und **alle Service-Typen** (Singleton, Transient, Scoped).

## Erweiterte use-Funktion

### **Vorher (nur Singleton):**
```typescript
// ❌ Nur Singleton Services
const logger = use(FoundryLogger);
const adapter = use(FoundryAdapter);
```

### **Nachher (alle Service-Typen):**
```typescript
// ✅ Alle Service-Typen mit Scope-Support
const logger = use(FoundryLogger); // Singleton
const adapter = use(FoundryAdapter); // Singleton
const graphService = use(GraphService, "page-123"); // Scoped
const dataProcessor = use(DataProcessor); // Transient
```

## Scope-Management Funktionen

### **1. setCurrentScope()**
```typescript
import { setCurrentScope } from "../core/edge/appContext";

// Aktuellen Scope setzen
setCurrentScope("page-123");

// Services verwenden (verwendet aktuellen Scope)
const graphService = use(GraphService); // Verwendet "page-123"
const svelteManager = use(SvelteManager); // Verwendet "page-123"
```

### **2. disposeScopedServices()**
```typescript
import { disposeScopedServices } from "../core/edge/appContext";

// Scope-Cleanup
disposeScopedServices("page-123");
```

### **3. getScopedServiceCount()**
```typescript
import { getScopedServiceCount } from "../core/edge/appContext";

// Scope-Informationen
const serviceCount = getScopedServiceCount("page-123");
console.log(`Services in scope: ${serviceCount}`);
```

## Verwendung in JournalEntryPageRelationshipGraphSheet

### **Aktuelle Implementierung (zu korrigieren):**
```typescript
// ❌ Aktuell - ohne Scope
const graphService: GraphService = use(GraphService);
const svelteManager = this.svelteManager; // Getter
const cssManager = this.cssManager; // Getter
```

### **Korrigierte Implementierung (mit Scope):**
```typescript
import { use, setCurrentScope, disposeScopedServices } from "../core/edge/appContext";

export default class JournalEntryPageRelationshipGraphSheet extends foundry.applications.sheets
  .journal.JournalEntryPageHandlebarsSheet {
  
  async _onRender(context: any, options: any) {
    // Page-Scope setzen
    const pageId = this.document.id;
    const scope = `page-${pageId}`;
    setCurrentScope(scope);

    // Scoped Services abrufen
    const graphService = use(GraphService, scope);
    const svelteManager = use(SvelteManager, scope);
    const cssManager = use(CSSManager, scope);

    // Services verwenden
    await graphService.init(this.document);
    bindFoundrySync(this.document, graphService);

    await super._onRender(context, options);

    // CSS laden
    await cssManager.loadCSS("path/to/page-specific.css");

    // Svelte App mounten
    this.svelteApp = await svelteManager.mountGraphComponent(
      this.element as HTMLElement,
      this.document,
      !this.isView
    );
  }

  async _onClose(options: any) {
    // Scope-Cleanup
    const pageId = this.document.id;
    const scope = `page-${pageId}`;
    disposeScopedServices(scope);

    await super._onClose(options);
  }
}
```

## Service-Typ Unterstützung

### **Singleton Services** ✅
```typescript
// Keine Änderung - funktioniert wie vorher
const logger = use(FoundryLogger);
const adapter = use(FoundryAdapter);
const notificationService = use(NotificationService);
```

### **Transient Services** ✅
```typescript
// Neue Instanz bei jedem Aufruf
const processor1 = use(DataProcessor);
const processor2 = use(DataProcessor);
// processor1 !== processor2 (verschiedene Instanzen)
```

### **Scoped Services** ✅
```typescript
// Expliziter Scope
const graphService = use(GraphService, "page-123");
const svelteManager = use(SvelteManager, "page-123");

// Oder aktueller Scope (wenn setCurrentScope() verwendet)
setCurrentScope("page-123");
const graphService = use(GraphService); // Verwendet "page-123"
const svelteManager = use(SvelteManager); // Verwendet "page-123"
```

## Migration Guide

### **Schritt 1: Imports erweitern**
```typescript
// Vorher
import { use } from "../core/edge/appContext";

// Nachher
import { use, setCurrentScope, disposeScopedServices } from "../core/edge/appContext";
```

### **Schritt 2: Scope-Management hinzufügen**
```typescript
// Page-Scope setzen
const pageId = this.document.id;
const scope = `page-${pageId}`;
setCurrentScope(scope);
```

### **Schritt 3: Services mit Scope abrufen**
```typescript
// Scoped Services mit explizitem Scope
const graphService = use(GraphService, scope);
const svelteManager = use(SvelteManager, scope);
const cssManager = use(CSSManager, scope);
```

### **Schritt 4: Scope-Cleanup implementieren**
```typescript
// Beim Schließen der Seite
disposeScopedServices(scope);
```

## Vorteile der Erweiterung

### **1. Vollständige Service-Typ Unterstützung**
- **Singleton**: Infrastructure Services
- **Transient**: Stateless Services
- **Scoped**: Page-spezifische Services

### **2. Einheitliche API**
- Alle Service-Typen über `use()` Funktion
- Scope-Management über Edge-Adapter
- Konsistente Verwendung in Foundry-Klassen

### **3. Bessere Isolation**
- Page-spezifische Services
- Automatisches Scope-Cleanup
- Keine Memory-Leaks

## Zusammenfassung

Der EdgeAdapter unterstützt jetzt:
- ✅ **Scope-Parameter** für Scoped Services
- ✅ **Transient Services** (neue Instanz bei jedem Aufruf)
- ✅ **Singleton Services** (wie vorher)
- ✅ **Scope-Management** Funktionen
- ✅ **Scope-Cleanup** Funktionen

Alle Service-Typen können jetzt über die `use()` Funktion verwendet werden! 🎯
