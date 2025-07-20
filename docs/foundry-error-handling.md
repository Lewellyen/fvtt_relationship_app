# Foundry VTT v13 Error Handling - Implementierungsguide

## Übersicht

Dieses Dokument beschreibt, wie Foundry VTT v13 Error Handling implementiert und wie es in unserem Relationship App Projekt optimal genutzt wird.

## Foundry VTT v13 Error Handling Standards

### 1. Notifications API
Foundry VTT bietet ein eingebautes Notification-System für benutzerfreundliche Fehlermeldungen:

```javascript
// Foundry Standard Notifications
ui.notifications.error("Something went wrong!");
ui.notifications.warn("Warning message");  
ui.notifications.info("Information");
ui.notifications.notify("Custom message", "error");
```

### 2. DialogV2 für kritische Errors
Für wichtige Errors, die Benutzerinteraktion erfordern:

```javascript
await foundry.applications.api.DialogV2.confirm({
  window: { title: "Critical Error" },
  content: "Database connection lost. Retry?",
  rejectClose: false,
  modal: true
});
```

### 3. Document Validation
Foundry hat eingebaute Document Validation mit spezifischen Error-Klassen:

```javascript
try {
  await document.update(data);
} catch (error) {
  if (error instanceof DocumentValidationFailure) {
    // Handle validation errors
  }
}
```

### 4. Hooks System für Error Broadcasting
Event-driven Error Handling über das Hooks-System:

```javascript
Hooks.callAll("relationshipGraphError", { 
  type: "validation", 
  message: "Invalid node data" 
});
```

## Unsere Implementation

### FoundryErrorHandler Klasse

Die zentrale Klasse für Error Handling in unserem Projekt:

```typescript
import { FoundryErrorHandler, ErrorCategory, ErrorSeverity } from "./services/FoundryErrorHandler";

const errorHandler = new FoundryErrorHandler(logger, "relationship-app");

// Verschiedene Error-Typen handhaben
errorHandler.handleValidationError("field", "message", details);
errorHandler.handleBusinessLogicError("operation", "reason", "userMessage");
errorHandler.handlePermissionError("action", "resource");
errorHandler.handleTechnicalError(error, "context");
```

### Error-Kategorien

```typescript
export enum ErrorCategory {
  VALIDATION = "validation",      // Datenvalidierung
  BUSINESS_LOGIC = "business",    // Geschäftslogik-Fehler
  TECHNICAL = "technical",        // Technische Fehler
  NETWORK = "network",            // Netzwerk-Probleme
  PERMISSION = "permission",      // Berechtigungsfehler
}
```

### Error-Severity

```typescript
export enum ErrorSeverity {
  INFO = "info",          // Informationsmeldungen
  WARN = "warn",          // Warnungen
  ERROR = "error",        // Standard-Fehler
  CRITICAL = "critical",  // Kritische Fehler (Dialog)
}
```

### Error Flow

1. **Logging**: Jeder Error wird für Entwickler geloggt
2. **User Notification**: Benutzerfreundliche Meldung über `ui.notifications`
3. **Hook Broadcasting**: Event über Foundry Hooks für andere Module
4. **Critical Dialog**: DialogV2 für kritische Fehler

## Verwendung in Services

### Service mit Error Handler

```typescript
export class ExampleService {
  private logger: ILogger;
  private errorHandler: FoundryErrorHandler;

  constructor(logger: ILogger) {
    this.logger = logger;
    this.errorHandler = new FoundryErrorHandler(logger);
  }

  async documentOperation(): Promise<boolean> {
    // Document Operation mit automatischem Error Handling
    const result = await this.errorHandler.handleDocumentOperation(
      async () => {
        return await someDocument.update(data);
      },
      "updateOperation"
    );

    return result !== null;
  }
}
```

### Validation Errors

```typescript
validateData(data: any): boolean {
  if (!data.id) {
    this.errorHandler.handleValidationError(
      "data.id",
      "ID is required",
      { providedData: data }
    );
    return false;
  }

  return true;
}
```

### Business Logic Errors

```typescript
async createNode(nodeData: any): Promise<boolean> {
  const existingNode = await this.findExistingNode(nodeData.id);
  
  if (existingNode) {
    this.errorHandler.handleBusinessLogicError(
      "createNode",
      `Node '${nodeData.id}' already exists`,
      "A node with this name already exists. Please choose a different name."
    );
    return false;
  }

  return true;
}
```

### Permission Errors

```typescript
checkPermissions(action: string, documentId: string): boolean {
  const document = game.journal.get(documentId);
  const userLevel = document.getUserLevel();
  
  if (userLevel < CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER) {
    this.errorHandler.handlePermissionError(action, `document:${documentId}`);
    return false;
  }

  return true;
}
```

## ServiceFactory Integration

Die ServiceFactory erstellt automatisch Error Handler für alle Services:

```typescript
export class ServiceFactory {
  createErrorHandler(serviceName: string): FoundryErrorHandler {
    const logger = this.createLogger(serviceName);
    return FoundryErrorHandlerFactory.create(logger, "relationship-app");
  }

  createRelationshipGraphService(): IRelationshipGraphService {
    const logger = this.createLogger("RelationshipGraphService");
    const errorHandler = this.createErrorHandler("RelationshipGraphService");
    
    return new RelationshipGraphService(logger, /* other dependencies */);
  }
}
```

## Error Hooks

### Registrierung von Error Hooks

```typescript
// Listen for all module errors
Hooks.on("relationship-app:error", (error) => {
  console.log(`Error: ${error.category}/${error.severity}`, error);
});

// Listen for specific error categories
Hooks.on("relationship-app:error:validation", (error) => {
  // Handle validation errors specifically
  highlightInvalidField(error.field);
});
```

### Error Broadcasting

Errors werden automatisch über Hooks gebroadcastet:

- `relationship-app:error` - Alle Errors
- `relationship-app:error:validation` - Validation Errors
- `relationship-app:error:business` - Business Logic Errors
- `relationship-app:error:technical` - Technical Errors
- `relationship-app:error:permission` - Permission Errors

## Testing

### Error Handling Demo

```typescript
import { runFoundryErrorHandlingDemo } from "./examples/FoundryErrorHandlingExample";

// In Browser Console oder Hook
await runFoundryErrorHandlingDemo();

// ServiceFactory Testing
const serviceFactory = ServiceFactory.getInstance();
await serviceFactory.testErrorHandling();
```

### Unit Tests

```typescript
describe("FoundryErrorHandler", () => {
  it("should handle validation errors correctly", () => {
    const errorHandler = new FoundryErrorHandler(mockLogger);
    
    errorHandler.handleValidationError("test.field", "Test error");
    
    expect(mockLogger.warn).toHaveBeenCalled();
    expect(ui.notifications.warn).toHaveBeenCalled();
  });
});
```

## Best Practices

### 1. Richtige Error-Kategorie wählen

- **VALIDATION**: Für Datenvalidierung
- **BUSINESS_LOGIC**: Für Geschäftsregeln 
- **TECHNICAL**: Für System-/Programmfehler
- **PERMISSION**: Für Berechtigungsprobleme
- **NETWORK**: Für Netzwerk-/API-Probleme

### 2. Benutzerfreundliche Nachrichten

```typescript
// Schlecht
errorHandler.handleBusinessLogicError("op", "Validation failed", undefined);

// Gut
errorHandler.handleBusinessLogicError(
  "createNode",
  "Node validation failed: missing required field 'id'",
  "Please provide a name for the node before creating it."
);
```

### 3. Error Details für Debugging

```typescript
errorHandler.handleValidationError(
  "node.position",
  "Invalid position coordinates",
  {
    provided: userInput.position,
    expected: "object with numeric x and y properties",
    validExample: { x: 100, y: 200 }
  }
);
```

### 4. Document Operations wrappen

```typescript
// Verwende immer handleDocumentOperation für Foundry Document Calls
const result = await this.errorHandler.handleDocumentOperation(
  () => document.update(changes),
  "updateDocument"
);
```

### 5. Kritische Errors sparsam verwenden

Verwende `ErrorSeverity.CRITICAL` nur für Errors, die sofortige Benutzeraktion erfordern:

```typescript
// Kritisch: Datenverlust möglich
errorHandler.handleError({
  category: ErrorCategory.TECHNICAL,
  severity: ErrorSeverity.CRITICAL,
  message: "Database connection lost",
  userMessage: "Connection lost. Recent changes may not be saved.",
  // ...
});
```

## Migration Guide

### Von console.error zu FoundryErrorHandler

```typescript
// Vorher
try {
  await document.update(data);
} catch (error) {
  console.error("Update failed", error);
  ui.notifications.error("Update failed");
}

// Nachher
const result = await this.errorHandler.handleDocumentOperation(
  () => document.update(data),
  "updateDocument"
);
```

### Von direkten Validation Checks

```typescript
// Vorher
if (!data.id) {
  console.warn("Missing ID");
  ui.notifications.warn("Please provide an ID");
  return false;
}

// Nachher
if (!data.id) {
  this.errorHandler.handleValidationError("data.id", "ID is required");
  return false;
}
```

## Debugging

### Error Handler Status prüfen

```typescript
const serviceFactory = ServiceFactory.getInstance();
serviceFactory.debugServices(); // Zeigt alle Services und Error Handler

// Error Handler direkt testen
const errorHandler = serviceFactory.createErrorHandler("test");
errorHandler.handleValidationError("test", "Test error");
```

### Browser Console

```javascript
// Globale Demo-Funktion
await runFoundryErrorHandlingDemo();

// ServiceFactory Error Testing
const factory = game.modules.get("relationship-app").api.ServiceFactory.getInstance();
await factory.testErrorHandling();
```

## Foundry VTT spezifische Überlegungen

### 1. Verfügbarkeit von APIs

```typescript
// Prüfe ob Foundry APIs verfügbar sind
if (typeof ui !== "undefined" && ui.notifications) {
  ui.notifications.error(message);
} else {
  console.error(message); // Fallback
}
```

### 2. Document Validation Errors

```typescript
// Foundry-spezifische Error-Erkennung
if (error.name === "DocumentValidationFailure") {
  this.handleValidationError(error.field, error.message, error.errors);
} else if (error.message?.includes("permission")) {
  this.handlePermissionError(operation, resource);
}
```

### 3. Hook Timing

```typescript
// Hooks erst nach Foundry Initialisierung registrieren
Hooks.once("ready", () => {
  setupErrorHandlingHooks();
});
```

## Fazit

Das implementierte Error Handling System:

✅ **Foundry-konform**: Nutzt alle relevanten Foundry VTT v13 APIs  
✅ **SOLID-Prinzipien**: Saubere Architektur mit Dependency Injection  
✅ **Benutzerfreundlich**: Klare Trennung zwischen Developer- und User-Messages  
✅ **Erweiterbar**: Hook-System für Custom Error Handling  
✅ **Testbar**: Vollständig testbare Komponenten  
✅ **Dokumentiert**: Umfassende Beispiele und Best Practices

Das System stellt sicher, dass alle Errors:
1. Korrekt geloggt werden (für Entwickler)
2. Benutzerfreundlich angezeigt werden (für Spieler/GM)
3. Über Hooks broadcastet werden (für andere Module)
4. Bei kritischen Problemen Dialoge anzeigen (für wichtige Actions) 