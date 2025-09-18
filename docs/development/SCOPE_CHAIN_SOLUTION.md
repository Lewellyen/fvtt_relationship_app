# Scope Chain Solution

## Problem

Aktuell haben Dynamic Apps ihre eigenen Instance-Scopes, aber es gibt keine automatische Cleanup-Beziehung zu ihren Parent-Apps. Wenn eine Parent-App geschlossen wird, bleiben die Dynamic Apps "verwaist".

## Lösung: Scope Chain

### **Konzept: Hierarchische Scope-Struktur**

```
Parent App (app-MetadataManagementApplication)
├── Dynamic Dialog 1 (instance-DynamicDialogApp-123-abc)
├── Dynamic Dialog 2 (instance-DynamicDialogApp-456-def)
└── Dynamic Table (instance-DynamicTableApp-789-ghi)
```

**Wenn Parent geschlossen wird → Alle Child-Scopes werden automatisch aufgeräumt**

### **1. Scope Chain Interface**

```typescript
interface IScopeChain {
  parentScope?: string;
  childScopes: Set<string>;
  addChildScope(scope: string): void;
  removeChildScope(scope: string): void;
  disposeAllChildScopes(): void;
}
```

### **2. ServiceContainer erweitern**

```typescript
export class ServiceContainer implements IServiceContainer {
  private scopeChains = new Map<string, IScopeChain>();
  
  // Scope Chain Management
  createScopeChain(parentScope: string): IScopeChain {
    const chain: IScopeChain = {
      parentScope,
      childScopes: new Set(),
      addChildScope: (scope: string) => chain.childScopes.add(scope),
      removeChildScope: (scope: string) => chain.childScopes.delete(scope),
      disposeAllChildScopes: () => {
        for (const childScope of chain.childScopes) {
          this.disposeScopedServices(childScope);
        }
        chain.childScopes.clear();
      }
    };
    this.scopeChains.set(parentScope, chain);
    return chain;
  }

  addChildScope(parentScope: string, childScope: string): void {
    const chain = this.scopeChains.get(parentScope);
    if (chain) {
      chain.addChildScope(childScope);
    }
  }

  disposeScopeChain(parentScope: string): void {
    const chain = this.scopeChains.get(parentScope);
    if (chain) {
      chain.disposeAllChildScopes();
      this.disposeScopedServices(parentScope);
      this.scopeChains.delete(parentScope);
    }
  }
}
```

### **3. Edge Adapter erweitern**

```typescript
// src/core/edge/appContext.ts
export function createChildScope(parentScope: string, childType: string): string {
  if (!_container) throw new Error("[Edge] Container not set");
  
  const timestamp = Date.now();
  const randomId = foundry.utils.randomID();
  const childScope = `${childType}-${timestamp}-${randomId}`;
  
  // Child Scope zur Parent Chain hinzufügen
  _container.addChildScope(parentScope, childScope);
  
  return childScope;
}

export function disposeScopeChain(parentScope: string): void {
  if (!_container) throw new Error("[Edge] Container not set");
  _container.disposeScopeChain(parentScope);
}
```

### **4. Dynamic Apps anpassen**

```typescript
export default class DynamicDialogApp extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  private _instanceScope?: string;
  private _parentScope?: string;

  constructor(parentScope?: string) {
    super();
    this._parentScope = parentScope;
    
    if (parentScope) {
      // Child Scope in Parent Chain erstellen
      this._instanceScope = createChildScope(parentScope, 'DynamicDialogApp');
    } else {
      // Fallback: Eigenen Scope erstellen
      this._instanceScope = this.generateInstanceId();
    }
  }

  // ... Rest der Implementierung
}
```

### **5. Parent Apps anpassen**

```typescript
export default class MetadataManagementApplication extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  private _appScope?: string;

  async _onRender(context: any, options: any) {
    // Parent Scope erstellen
    const appId = "MetadataManagementApplication";
    this._appScope = `app-${appId}`;
    setCurrentScope(this._appScope);
    
    // Scope Chain erstellen
    if (_container) {
      _container.createScopeChain(this._appScope);
    }
    
    // ... Rest der Implementierung
  }

  async _onClose(options: any) {
    // Scope Chain mit allen Children entsorgen
    if (this._appScope) {
      disposeScopeChain(this._appScope);
    }
    
    return super._onClose(options);
  }

  // Dynamic Dialog öffnen
  openDynamicDialog(config: IDynamicFormConfig) {
    const dialog = new DynamicDialogApp(this._appScope); // Parent Scope übergeben
    return dialog.show(config);
  }
}
```

## Vorteile der Scope Chain

### **1. Automatisches Cleanup**
```typescript
// Parent App wird geschlossen
metadataApp.close();
// → Alle Dynamic Dialogs werden automatisch aufgeräumt
// → Keine verwaisten Services
// → Keine Memory-Leaks
```

### **2. Hierarchische Struktur**
```
Parent App
├── Dialog 1 (Child Scope)
├── Dialog 2 (Child Scope)
└── Table 1 (Child Scope)
    ├── Sub-Dialog 1 (Grandchild Scope)
    └── Sub-Dialog 2 (Grandchild Scope)
```

### **3. Debugging-Freundlich**
```typescript
// Scope Chain Logging
console.log("Parent Scope:", parentScope);
console.log("Child Scopes:", Array.from(chain.childScopes));
console.log("Disposing all child scopes...");
```

### **4. Flexible Nutzung**
```typescript
// Mit Parent Scope (empfohlen)
const dialog = new DynamicDialogApp(parentScope);

// Ohne Parent Scope (Fallback)
const dialog = new DynamicDialogApp();
```

## Implementierung

### **Schritt 1: ServiceContainer erweitern**
- `IScopeChain` Interface hinzufügen
- `createScopeChain()`, `addChildScope()`, `disposeScopeChain()` Methoden
- Scope Chain Management

### **Schritt 2: Edge Adapter erweitern**
- `createChildScope()` Funktion
- `disposeScopeChain()` Funktion
- Parent-Child Beziehung Management

### **Schritt 3: Dynamic Apps anpassen**
- Constructor erweitern für Parent Scope
- Child Scope Creation
- Fallback für standalone Nutzung

### **Schritt 4: Parent Apps anpassen**
- Scope Chain Creation in `_onRender`
- Scope Chain Disposal in `_onClose`
- Dynamic App Creation mit Parent Scope

## Migration Strategy

### **Phase 1: Backward Compatibility**
- Dynamic Apps funktionieren weiterhin ohne Parent Scope
- Scope Chain ist optional

### **Phase 2: Gradual Adoption**
- Parent Apps nutzen Scope Chain
- Dynamic Apps erkennen Parent Scope automatisch

### **Phase 3: Full Migration**
- Alle Apps nutzen Scope Chain
- Alte Instance-Scope Logik entfernen

## Beispiel: Vollständige Implementierung

```typescript
// Parent App
class MetadataManagementApplication {
  private _appScope?: string;

  async _onRender() {
    this._appScope = `app-MetadataManagementApplication`;
    setCurrentScope(this._appScope);
    _container?.createScopeChain(this._appScope);
  }

  async _onClose() {
    if (this._appScope) {
      disposeScopeChain(this._appScope); // Alle Children werden aufgeräumt
    }
  }

  openDialog(config: IDynamicFormConfig) {
    return DynamicDialogApp.show(config, this._appScope); // Parent Scope übergeben
  }
}

// Dynamic App
class DynamicDialogApp {
  constructor(parentScope?: string) {
    super();
    this._instanceScope = parentScope 
      ? createChildScope(parentScope, 'DynamicDialogApp')
      : this.generateInstanceId();
  }

  static async show(config: IDynamicFormConfig, parentScope?: string) {
    const app = new DynamicDialogApp(parentScope);
    // ... Rest der Implementierung
  }
}
```

## Nächste Schritte

1. **ServiceContainer** für Scope Chain erweitern
2. **Edge Adapter** für Child Scope Management erweitern
3. **Dynamic Apps** für Parent Scope Support anpassen
4. **Parent Apps** für Scope Chain Management anpassen
5. **Tests** für Scope Chain Funktionalität
