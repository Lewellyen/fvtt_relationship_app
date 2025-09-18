# Service Lifecycle Types

## Übersicht

Das Relationship App Modul unterstützt drei verschiedene Service Lifecycle-Typen:

1. **Singleton** - Eine Instanz für die gesamte Anwendungslebensdauer
2. **Transient** - Neue Instanz bei jedem `getService()` Aufruf  
3. **Scoped** - Eine Instanz pro Scope

## Service-Typen

### 1. Singleton Services ✅ **Standard**

**Verhalten:**
- Eine Instanz für die gesamte Anwendungslebensdauer
- Gecacht im ServiceContainer
- Wiederverwendet bei jedem `getService()` Aufruf

**Verwendung:**
```typescript
export class DatabaseService {
  static readonly SERVICE_TYPE = "singleton" as const;
  // oder undefined (Standard)
}
```

**Beispiel:**
```typescript
// Erste Verwendung - wird erstellt
const db1 = serviceContainer.getService(DatabaseService);

// Zweite Verwendung - wird aus Cache geholt
const db2 = serviceContainer.getService(DatabaseService);
// db1 === db2 (gleiche Instanz)
```

### 2. Transient Services ✅ **Neu implementiert**

**Verhalten:**
- Neue Instanz bei jedem `getService()` Aufruf
- Nicht gecacht - wird jedes Mal neu erstellt
- Ideal für stateless Services

**Verwendung:**
```typescript
export class DataProcessor {
  static readonly SERVICE_TYPE = "transient" as const;
}
```

**Beispiel:**
```typescript
// Erste Verwendung - wird erstellt
const processor1 = serviceContainer.getService(DataProcessor);

// Zweite Verwendung - wird neu erstellt
const processor2 = serviceContainer.getService(DataProcessor);
// processor1 !== processor2 (verschiedene Instanzen)
```

### 3. Scoped Services ✅ **Neu implementiert**

**Verhalten:**
- Eine Instanz pro Scope (z.B. pro User, Session, Request)
- Scope-basierte Lebensdauer
- Ideal für user-spezifische Services

**Verwendung:**
```typescript
export class UserSession {
  static readonly SERVICE_TYPE = "scoped" as const;
}
```

**Beispiel:**
```typescript
// Scope für User 1 setzen
serviceContainer.setCurrentScope("user-1");

// Service im Scope verwenden
const session1 = serviceContainer.getService(UserSession, "user-1");
const session2 = serviceContainer.getService(UserSession, "user-1");
// session1 === session2 (gleiche Instanz im gleichen Scope)

// Anderer Scope
const session3 = serviceContainer.getService(UserSession, "user-2");
// session1 !== session3 (verschiedene Instanzen in verschiedenen Scopes)
```

## Scope Management

### Scope setzen
```typescript
serviceContainer.setCurrentScope("user-123");
```

### Service mit explizitem Scope abrufen
```typescript
const service = serviceContainer.getService(MyService, "explicit-scope");
```

### Scope-Informationen abrufen
```typescript
const serviceCount = serviceContainer.getScopedServiceCount("user-123");
console.log(`Services in scope: ${serviceCount}`);
```

### Scope leeren
```typescript
serviceContainer.clearScope("user-123");
```

### Scoped Services entsorgen
```typescript
serviceContainer.disposeScopedServices("user-123");
```

## Implementierung

### ServicePlanner
- Erkennt Service-Typ über `SERVICE_TYPE` Property
- Erstellt entsprechende ServicePlans mit `isSingleton`, `isTransient`, `isScoped`

### ServiceContainer
- **Singleton**: Cached in `instances` Map
- **Transient**: Wird jedes Mal neu erstellt
- **Scoped**: Cached in `scopedInstances` Map pro Scope

### ServiceRegistrar
- Leitet Scope-Parameter an ServiceContainer weiter
- Unterstützt alle Service-Typen über einheitliche API

## Wann welchen Typ verwenden?

### Singleton
- **Datenbankverbindungen**
- **Logger**
- **Konfigurationsservices**
- **Cache-Manager**

### Transient
- **Data Processor**
- **Validatoren**
- **Temporary Services**
- **Stateless Utilities**

### Scoped
- **User Sessions**
- **Request Context**
- **User-spezifische Services**
- **Temporary State**

## Migration

### Bestehende Services
Bestehende Services ohne `SERVICE_TYPE` sind automatisch **Singletons**:
```typescript
// Vorher (automatisch Singleton)
export class MyService {
  static readonly API_NAME = "myService";
}

// Nachher (explizit Singleton)
export class MyService {
  static readonly API_NAME = "myService";
  static readonly SERVICE_TYPE = "singleton" as const;
}
```

### Neue Services
```typescript
// Singleton (Standard)
export class DatabaseService {
  static readonly SERVICE_TYPE = "singleton" as const;
}

// Transient
export class DataProcessor {
  static readonly SERVICE_TYPE = "transient" as const;
}

// Scoped
export class UserSession {
  static readonly SERVICE_TYPE = "scoped" as const;
}
```

## Performance

- **Singleton**: Beste Performance, einmalige Erstellung
- **Transient**: Höhere Kosten, aber bessere Isolation
- **Scoped**: Balance zwischen Performance und Isolation

## Memory Management

- **Singleton**: Bleibt bis zum Ende der Anwendung
- **Transient**: Wird automatisch garbage collected
- **Scoped**: Wird beim Scope-Ende entsorgt

```typescript
// Scope aufräumen
serviceContainer.disposeScopedServices("user-123");
```
