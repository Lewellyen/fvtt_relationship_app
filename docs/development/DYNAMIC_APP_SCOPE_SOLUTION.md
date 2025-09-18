# Dynamic App Scope Solution

## Problem

Die Dynamic Apps (`DynamicDialogApp`, `DynamicTableApp`) werden über statische `show()` Methoden aufgerufen und können **mehrfach parallel** existieren:

```typescript
// Problem: Mehrere Instanzen mit gleichem Scope
const dialog1 = DynamicDialogApp.show(config1); // Scope: "app-DynamicDialogApp"
const dialog2 = DynamicDialogApp.show(config2); // Scope: "app-DynamicDialogApp" ❌
const table1 = DynamicTableApp.show(config3);   // Scope: "app-DynamicTableApp"
const table2 = DynamicTableApp.show(config4);   // Scope: "app-DynamicTableApp" ❌
```

**Konflikt:** Alle Instanzen teilen sich den gleichen Scope, was zu Service-Interferenz führt.

## Lösung: Instance-basierte Scopes

### **1. Unique Instance IDs**

Jede App-Instanz bekommt eine **eindeutige ID** basierend auf:
- **Timestamp** (für Eindeutigkeit)
- **Random ID** (für zusätzliche Sicherheit)
- **App Type** (für Debugging)

```typescript
// Instance ID Generation
private generateInstanceId(): string {
  const timestamp = Date.now();
  const randomId = foundry.utils.randomID();
  return `${this.constructor.name}-${timestamp}-${randomId}`;
}
```

### **2. Instance-Scope Management**

```typescript
export default class DynamicDialogApp extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  private _instanceId?: string;
  private _instanceScope?: string;

  // Instance ID beim Erstellen generieren
  constructor() {
    super();
    this._instanceId = this.generateInstanceId();
    this._instanceScope = `instance-${this._instanceId}`;
  }

  private generateInstanceId(): string {
    const timestamp = Date.now();
    const randomId = foundry.utils.randomID();
    return `${this.constructor.name}-${timestamp}-${randomId}`;
  }

  // Services mit Instance-Scope
  private get svelteManager() {
    if (!this._instanceScope) throw new Error("Instance scope not set");
    return (this.#svelte ??= use(SvelteManager, this._instanceScope));
  }

  private get cssManager() {
    if (!this._instanceScope) throw new Error("Instance scope not set");
    return (this.#css ??= use(CSSManager, this._instanceScope));
  }
}
```

### **3. Scope-Management in _onRender**

```typescript
async _onRender(context: any, options: any) {
  this.logger.info(`[${this.constructor.name}] _onRender started`, { 
    instanceId: this._instanceId,
    context, 
    options 
  });

  // Instance-Scope setzen
  if (this._instanceScope) {
    setCurrentScope(this._instanceScope);
  }

  // ... Rest der Implementierung
}
```

### **4. Scope-Cleanup in _onClose**

```typescript
async _onClose(options: any) {
  this.logger.info(`[${this.constructor.name}] _onClose called`, { 
    instanceId: this._instanceId,
    options 
  });

  // Services unmounten
  await this.svelteManager.unmountApp(this.svelteApp);
  this.svelteApp = null;

  // Instance-Scope cleanup
  if (this._instanceScope) {
    disposeScopedServices(this._instanceScope);
    this.logger.info(`[${this.constructor.name}] Disposed instance scope: ${this._instanceScope}`);
  }

  return super._onClose(options);
}
```

## Vorteile der Instance-basierten Scopes

### **1. Eindeutige Isolation**
```typescript
// Jede Instanz hat ihren eigenen Scope
const dialog1 = DynamicDialogApp.show(config1); // Scope: "instance-DynamicDialogApp-1234567890-abc123"
const dialog2 = DynamicDialogApp.show(config2); // Scope: "instance-DynamicDialogApp-1234567891-def456"
const table1 = DynamicTableApp.show(config3);   // Scope: "instance-DynamicTableApp-1234567892-ghi789"
```

### **2. Keine Service-Interferenz**
- Jede Dialog-Instanz hat ihre eigenen SvelteManager/CSSManager
- Keine CSS-Konflikte zwischen verschiedenen Dialogen
- Keine Svelte-Component-Konflikte

### **3. Automatisches Cleanup**
- Services werden beim Schließen der Instanz entsorgt
- Keine Memory-Leaks durch verwaiste Instanzen
- Saubere Ressourcenverwaltung

### **4. Debugging-Freundlich**
- Eindeutige Instance-IDs für Logging
- Scope-Namen enthalten App-Typ und Timestamp
- Einfache Identifikation von Instanzen

## Implementierung

### **Schritt 1: DynamicDialogApp korrigieren**
```typescript
export default class DynamicDialogApp extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  private _instanceId?: string;
  private _instanceScope?: string;

  constructor() {
    super();
    this._instanceId = this.generateInstanceId();
    this._instanceScope = `instance-${this._instanceId}`;
  }

  private generateInstanceId(): string {
    const timestamp = Date.now();
    const randomId = foundry.utils.randomID();
    return `${this.constructor.name}-${timestamp}-${randomId}`;
  }

  // ... Rest der Implementierung
}
```

### **Schritt 2: DynamicTableApp korrigieren**
Gleiche Implementierung wie DynamicDialogApp.

### **Schritt 3: Scope-Strategien anpassen**

| App-Typ | Scope-Strategie | Beispiel |
|---------|----------------|----------|
| **JournalEntryPage** | `page-${pageId}` | `page-journal-entry-123` |
| **Main Applications** | `app-${appId}` | `app-MetadataManagementApplication` |
| **Dynamic Apps** | `instance-${instanceId}` | `instance-DynamicDialogApp-1234567890-abc123` |

## Migration

### **Vorher (statisch):**
```typescript
// ❌ Alle Instanzen teilen sich den gleichen Scope
const app1 = new DynamicDialogApp(); // Scope: "app-DynamicDialogApp"
const app2 = new DynamicDialogApp(); // Scope: "app-DynamicDialogApp" ❌
```

### **Nachher (instance-basiert):**
```typescript
// ✅ Jede Instanz hat ihren eigenen Scope
const app1 = new DynamicDialogApp(); // Scope: "instance-DynamicDialogApp-1234567890-abc123"
const app2 = new DynamicDialogApp(); // Scope: "instance-DynamicDialogApp-1234567891-def456"
```

## Nächste Schritte

1. **DynamicDialogApp** auf Instance-Scopes umstellen
2. **DynamicTableApp** auf Instance-Scopes umstellen
3. **Tests** für multiple Instanzen
4. **Dokumentation** aktualisieren
