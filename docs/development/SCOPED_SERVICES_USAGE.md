# Scoped Services Usage - Relationship App

## Übersicht

Die folgenden Services sind als **Scoped Services** implementiert und benötigen einen Scope-Parameter:

- **SvelteManager** - Page-spezifische Svelte Component Management
- **CSSManager** - Page-spezifische CSS-Loading Management  
- **GraphService** - Page-spezifische Beziehungsgraph-Logik

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
// ✅ Korrekt - mit Page-Scope
const pageId = this.document.id;
const scope = `page-${pageId}`;

// Services im Page-Scope abrufen
const graphService = serviceContainer.getService(GraphService, scope);
const svelteManager = serviceContainer.getService(SvelteManager, scope);
const cssManager = serviceContainer.getService(CSSManager, scope);
```

## Scope-Management

### **Scope-Erstellung:**
```typescript
// Page-spezifischer Scope
const pageId = this.document.id;
const scope = `page-${pageId}`;

// ServiceContainer Scope setzen
serviceContainer.setCurrentScope(scope);
```

### **Service-Abruf:**
```typescript
// Expliziter Scope
const graphService = serviceContainer.getService(GraphService, scope);

// Oder aktueller Scope (wenn setCurrentScope() verwendet)
const graphService = serviceContainer.getService(GraphService);
```

### **Scope-Cleanup:**
```typescript
// Beim Schließen der Seite
async _onClose(options: any) {
  const pageId = this.document.id;
  const scope = `page-${pageId}`;
  
  // Scoped Services entsorgen
  serviceContainer.disposeScopedServices(scope);
  
  await super._onClose(options);
}
```

## Vorteile der Scoped Services

### **1. Page-Isolation**
- Jede JournalEntryPage hat ihre eigene Service-Instanz
- Keine Interferenz zwischen verschiedenen Seiten
- Saubere Trennung der Zustände

### **2. Memory Management**
- Services werden automatisch entsorgt beim Scope-Ende
- Keine Memory-Leaks durch verwaiste Instanzen
- Bessere Performance bei vielen Seiten

### **3. State Management**
- Page-spezifische Zustände bleiben isoliert
- CSS-Loading pro Seite getrennt
- Svelte-Apps pro Seite getrennt

## Implementierungsbeispiel

### **JournalEntryPageRelationshipGraphSheet.ts:**

```typescript
export default class JournalEntryPageRelationshipGraphSheet extends foundry.applications.sheets
  .journal.JournalEntryPageHandlebarsSheet {
  
  private get serviceContainer() {
    return (globalThis as any).relationshipApp?.serviceContainer;
  }

  async _onRender(context: any, options: any) {
    // Page-Scope setzen
    const pageId = this.document.id;
    const scope = `page-${pageId}`;
    this.serviceContainer.setCurrentScope(scope);

    // Scoped Services abrufen
    const graphService = this.serviceContainer.getService(GraphService, scope);
    const svelteManager = this.serviceContainer.getService(SvelteManager, scope);
    const cssManager = this.serviceContainer.getService(CSSManager, scope);

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
    this.serviceContainer.disposeScopedServices(scope);

    await super._onClose(options);
  }
}
```

## Service-Typ Übersicht

| Service | Typ | Scope | Begründung |
|---------|-----|-------|------------|
| **FoundryLogger** | `singleton` | Global | Zentrale Logging-Instanz |
| **ConsoleErrorHandler** | `singleton` | Global | Zentrale Error-Handling-Instanz |
| **FoundryAdapter** | `singleton` | Global | Zentrale API-Abstraktion |
| **NotificationService** | `singleton` | Global | Zentrale Notification-Instanz |
| **SvelteManager** | `scoped` | Page | Page-spezifische Svelte-Apps |
| **CSSManager** | `scoped` | Page | Page-spezifische CSS-Loading |
| **GraphService** | `scoped` | Page | Page-spezifische Graph-Instanzen |

## Migration Checklist

- [x] SvelteManager auf `scoped` umgestellt
- [x] CSSManager auf `scoped` umgestellt  
- [x] GraphService auf `scoped` umgestellt
- [ ] JournalEntryPageRelationshipGraphSheet anpassen
- [ ] Scope-Management implementieren
- [ ] Scope-Cleanup implementieren
- [ ] Tests anpassen
