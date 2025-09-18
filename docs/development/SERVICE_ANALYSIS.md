# Service Analysis - Relationship App

## Übersicht aller Services

### **Runtime Services** (in SERVICE_CONFIG)

| Service | Zweck | Service-Typ | Status | Begründung |
|---------|-------|-------------|--------|------------|
| **FoundryLogger** | Logging-System | `singleton` | ✅ **Korrekt** | Zentrale Logging-Instanz für gesamte App |
| **ConsoleErrorHandler** | Fehlerbehandlung | `singleton` | ✅ **Korrekt** | Zentrale Error-Handling-Instanz |
| **FoundryAdapter** | Foundry VTT API Wrapper | `singleton` | ✅ **Korrekt** | Zentrale API-Abstraktion |
| **NotificationService** | UI-Benachrichtigungen | `singleton` | ✅ **Korrekt** | Zentrale Notification-Instanz |
| **SvelteManager** | Svelte Component Management | `scoped` | ✅ **Korrekt** | Page-spezifische Component-Management-Instanz |
| **CSSManager** | CSS-Loading Management | `scoped` | ✅ **Korrekt** | Page-spezifische CSS-Management-Instanz |
| **GraphService** | Beziehungsgraph-Logik | `scoped` | ✅ **Korrekt** | Page-spezifische Graph-Instanz |

### **Boot Services** (nicht in SERVICE_CONFIG)

| Service | Zweck | Service-Typ | Status | Begründung |
|---------|-------|-------------|--------|------------|
| **ServiceContainer** | Service Lifecycle Management | `singleton` | ✅ **Korrekt** | Zentrale Service-Container-Instanz |
| **ServiceRegistry** | Service Registration | `singleton` | ✅ **Korrekt** | Zentrale Service-Registry-Instanz |
| **ServicePlanner** | Service Planning | `singleton` | ✅ **Korrekt** | Zentrale Service-Planning-Instanz |
| **ServiceRegistrar** | Service Factory Registration | `singleton` | ✅ **Korrekt** | Zentrale Service-Registrar-Instanz |
| **ServiceValidator** | Service Validation | `singleton` | ✅ **Korrekt** | Zentrale Service-Validation-Instanz |
| **DependencyMapper** | Dependency Resolution | `singleton` | ✅ **Korrekt** | Zentrale Dependency-Mapping-Instanz |
| **APIManager** | API Registration | `singleton` | ✅ **Korrekt** | Zentrale API-Management-Instanz |
| **ModuleInitializer** | Module Initialization | `singleton` | ✅ **Korrekt** | Zentrale Module-Initialization-Instanz |
| **RegistrationService** | Foundry Registration | `singleton` | ✅ **Korrekt** | Zentrale Registration-Instanz |

## Detaillierte Service-Analyse

### 1. **FoundryLogger** ✅ **Korrekt als Singleton**
```typescript
static readonly SERVICE_TYPE = "singleton" as const;
```
**Zweck:** Zentrale Logging-Instanz für die gesamte Anwendung
**Begründung:** Logging sollte konsistent und zentral verwaltet werden

### 2. **ConsoleErrorHandler** ✅ **Korrekt als Singleton**
```typescript
static readonly SERVICE_TYPE = "singleton" as const;
```
**Zweck:** Zentrale Fehlerbehandlung für die gesamte Anwendung
**Begründung:** Error Handling sollte einheitlich und zentral sein

### 3. **FoundryAdapter** ✅ **Korrekt als Singleton**
```typescript
static readonly SERVICE_TYPE = "singleton" as const;
```
**Zweck:** Foundry VTT API Wrapper und Abstraktion
**Begründung:** API-Abstraktion sollte konsistent und zentral sein

### 4. **NotificationService** ✅ **Korrekt als Singleton**
```typescript
static readonly SERVICE_TYPE = "singleton" as const;
```
**Zweck:** UI-Benachrichtigungen für die gesamte Anwendung
**Begründung:** Notifications sollten einheitlich und zentral verwaltet werden

### 5. **SvelteManager** ✅ **Korrekt als Singleton**
```typescript
static readonly SERVICE_TYPE = "singleton" as const;
```
**Zweck:** Svelte Component Management
**Begründung:** Component Management sollte zentral und konsistent sein

### 6. **CSSManager** ✅ **Korrekt als Singleton**
```typescript
static readonly SERVICE_TYPE = "singleton" as const;
```
**Zweck:** CSS-Loading Management
**Begründung:** CSS-Management sollte zentral und konsistent sein

### 7. **GraphService** ❌ **Problem - Fehlt SERVICE_TYPE**
```typescript
// FEHLT: static readonly SERVICE_TYPE = "..." as const;
```
**Zweck:** Beziehungsgraph-Logik und Datenmanagement
**Problem:** Kein SERVICE_TYPE definiert → wird als Singleton behandelt
**Empfehlung:** Sollte `transient` oder `scoped` sein

## Empfohlene Änderungen

### **GraphService korrigieren:**

**Option 1: Transient (Empfohlen)**
```typescript
export class GraphService {
  static readonly API_NAME = "graphService";
  static readonly SERVICE_TYPE = "transient" as const;
  static readonly CLASS_NAME = "GraphService";
  static readonly DEPENDENCIES = [];
  
  // ... Rest der Implementierung
}
```

**Begründung für Transient:**
- GraphService ist **page-spezifisch** (constructor nimmt `JournalEntryPage`)
- Jede Seite sollte ihre eigene GraphService-Instanz haben
- Keine globale State-Sharing erforderlich
- Bessere Isolation zwischen verschiedenen Seiten

**Option 2: Scoped (Alternative)**
```typescript
export class GraphService {
  static readonly API_NAME = "graphService";
  static readonly SERVICE_TYPE = "scoped" as const;
  static readonly CLASS_NAME = "GraphService";
  static readonly DEPENDENCIES = [];
  
  // ... Rest der Implementierung
}
```

**Begründung für Scoped:**
- Eine Instanz pro Seite/Scope
- Bessere Performance als Transient
- Scope-basierte Lebensdauer

## Service-Typ Empfehlungen

### **Singleton Services** ✅
- **Infrastructure Services**: Logger, ErrorHandler, Adapter
- **Cross-Cutting Concerns**: NotificationService, CSSManager, SvelteManager
- **Boot Services**: Alle Service-Management Services

### **Transient Services** 🔄
- **Page-Specific Services**: GraphService (pro Seite)
- **Stateless Services**: Data Processors, Validators
- **Temporary Services**: Request Handlers

### **Scoped Services** 🎯
- **User-Specific Services**: User Sessions, User Preferences
- **Session-Specific Services**: Request Context, Temporary State
- **Page-Specific Services**: GraphService (pro Seite/Scope)

## Implementierung der Korrektur

### **GraphService korrigieren:**

```typescript
// src/services/GraphService.ts
export class GraphService {
  // ✅ SERVICE_TYPE hinzufügen
  static readonly API_NAME = "graphService";
  static readonly SERVICE_TYPE = "transient" as const;
  static readonly CLASS_NAME = "GraphService";
  static readonly DEPENDENCIES = [];

  // ... Rest der Implementierung bleibt gleich
}
```

### **Verwendung anpassen:**

```typescript
// Vorher (Singleton - Problem)
const graphService = serviceContainer.getService(GraphService);

// Nachher (Transient - Korrekt)
const graphService = serviceContainer.getService(GraphService);
// Jeder Aufruf erstellt eine neue Instanz für die spezifische Seite
```

## Zusammenfassung

### **Status:**
- ✅ **9 von 10 Services** haben korrekte Service-Typen
- ❌ **1 Service** (GraphService) fehlt SERVICE_TYPE
- 🔧 **Alle Services** sind als Singleton implementiert (außer GraphService)

### **Empfehlung:**
1. **GraphService** auf `transient` umstellen
2. **SERVICE_TYPE** für alle Services explizit definieren
3. **Dokumentation** der Service-Typ-Wahl begründen

### **Begründung der Service-Typ-Wahl:**
- **Singleton**: Infrastructure, Cross-Cutting, Boot Services
- **Transient**: Page-Specific, Stateless, Temporary Services  
- **Scoped**: User-Specific, Session-Specific Services
