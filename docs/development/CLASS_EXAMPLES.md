# Klassen-Erklärungen mit Beispielen und Metaphern

## 🏭 **ServiceRegistry - Das Bauplan-Archiv**

**Metapher:** Ein Architekturbüro, das alle Baupläne für Häuser sammelt und verwaltet.

```typescript
export class ServiceRegistry {
  private readonly serviceRegistry = new Map<any, ServiceConstructor>();
  
  // Bauplan registrieren
  registerService(identifier: any, constructor: any): void {
    this.serviceRegistry.set(identifier, constructor);
  }
  
  // Bauplan abrufen
  getServiceConstructor(identifier: any): any {
    return this.serviceRegistry.get(identifier);
  }
}
```

**Beispiel:**
```typescript
// Baupläne registrieren
serviceRegistry.registerService(FoundryLogger, FoundryLogger);
serviceRegistry.registerService(NotificationService, NotificationService);

// Bauplan abrufen
const loggerPlan = serviceRegistry.getServiceConstructor(FoundryLogger);
// → Gibt die FoundryLogger-Klasse zurück
```

**Was es NICHT macht:** Häuser bauen (das macht ServiceContainer)

---

## 🗺️ **DependencyMapper - Der Baustoff-Lieferant**

**Metapher:** Ein Baustoff-Lieferant, der weiß, welche Materialien für welches Haus benötigt werden.

```typescript
export class DependencyMapper {
  // Aus @Inject Decorators extrahieren
  extractDependencies(serviceClass: any): any[] {
    // FoundryLogger braucht FoundryAdapter
    // NotificationService braucht FoundryAdapter + FoundryLogger
  }
  
  // Dependency Graph erstellen
  buildDependencyGraph(services: any[]): Map<any, any[]> {
    return new Map([
      [FoundryLogger, [FoundryAdapter]],
      [NotificationService, [FoundryAdapter, FoundryLogger]],
      [MyService, [FoundryLogger, NotificationService]]
    ]);
  }
}
```

**Beispiel:**
```typescript
// Dependencies für NotificationService ermitteln
const dependencies = dependencyMapper.extractDependencies(NotificationService);
// → [FoundryAdapter, FoundryLogger]

// Kompletter Dependency Graph
const graph = dependencyMapper.buildDependencyGraph(allServices);
// → Map mit allen Service-Abhängigkeiten
```

**Was es macht:** "Für NotificationService brauche ich FoundryAdapter und FoundryLogger"

---

## 📋 **ServicePlanner - Der Bauleiter**

**Metapher:** Ein Bauleiter, der aus Bauplänen und Materiallisten einen detaillierten Bauplan erstellt.

```typescript
export class ServicePlanner {
  createServicePlans(): Map<any, ServicePlan> {
    const plans = new Map();
    
    // Für jeden Service einen detaillierten Bauplan erstellen
    for (const [serviceClass, dependencies] of dependencyGraph) {
      plans.set(serviceClass, {
        constructor: serviceClass,
        dependencies: dependencies,
        resolutionOrder: this.calculateResolutionOrder(dependencies),
        isSingleton: serviceClass.SERVICE_TYPE === 'singleton'
      });
    }
    
    return plans;
  }
}
```

**Beispiel:**
```typescript
const plans = servicePlanner.createServicePlans();
// → Map mit detaillierten Bauplänen:

// NotificationService Plan:
{
  constructor: NotificationService,
  dependencies: [FoundryAdapter, FoundryLogger],
  resolutionOrder: [FoundryAdapter, FoundryLogger, NotificationService],
  isSingleton: true
}
```

**Was es macht:** "Zuerst FoundryAdapter bauen, dann FoundryLogger, dann NotificationService"

---

## 🔍 **ServiceValidator - Der Baugutachter**

**Metapher:** Ein Baugutachter, der prüft, ob alle Baupläne korrekt sind und keine Probleme auftreten.

```typescript
export class ServiceValidator {
  // Zirkuläre Dependencies prüfen
  checkCircularDependencies(dependencyGraph: Map<any, any[]>): boolean {
    // Prüft: A braucht B, B braucht C, C braucht A = Zirkel!
    // NotificationService → FoundryLogger → FoundryAdapter → NotificationService ❌
  }
  
  // Service-Erstellung validieren
  validateServiceCreation(service: any, identifier: any): boolean {
    // Prüft ob Service korrekt erstellt wurde
    return service && typeof service === 'object';
  }
}
```

**Beispiel:**
```typescript
// Zirkuläre Dependencies prüfen
const hasCircularDeps = serviceValidator.checkCircularDependencies(dependencyGraph);
if (hasCircularDeps) {
  throw new Error("Zirkuläre Dependencies gefunden!");
}

// Service-Erstellung validieren
const isValid = serviceValidator.validateServiceCreation(notificationService, NotificationService);
// → true wenn korrekt erstellt
```

**Was es macht:** "Alle Baupläne sind korrekt, keine Zirkel, kann gebaut werden"

---

## 🏪 **ServiceContainer - Das Lagerhaus der fertigen Services**

**Metapher:** Ein Lagerhaus, das alle fertig gebauten Häuser (Services) lagert und bei Bedarf ausliefert.

```typescript
export class ServiceContainer {
  private readonly instances = new Map<any, any>(); // Lagerhaus
  private readonly servicePlans: Map<any, ServicePlan>;
  
  // Service aus Lagerhaus holen oder neu bauen
  getService<T>(identifier: any): T {
    // Erst im Lagerhaus schauen
    if (this.instances.has(identifier)) {
      return this.instances.get(identifier); // "Hier ist dein fertiger Service"
    }
    
    // Nicht da? Dann neu bauen
    const service = this.createService(identifier);
    
    // Singleton? Dann ins Lagerhaus legen
    if (this.isSingleton(identifier)) {
      this.instances.set(identifier, service);
    }
    
    return service;
  }
  
  // Service mit Dependencies bauen
  private createService<T>(identifier: any): T {
    const plan = this.servicePlans.get(identifier);
    
    // Dependencies zuerst bauen
    const dependencies = plan.dependencies.map(dep => this.getService(dep));
    
    // Service mit Dependencies erstellen
    return new plan.constructor(...dependencies);
  }
}
```

**Beispiel:**
```typescript
// Service aus Lagerhaus holen
const logger = serviceContainer.getService(FoundryLogger);
// → Fertiger FoundryLogger aus dem Lagerhaus

// Service neu bauen (wenn nicht im Lagerhaus)
const notificationService = serviceContainer.getService(NotificationService);
// → Baut zuerst FoundryAdapter, dann FoundryLogger, dann NotificationService
// → Legt NotificationService ins Lagerhaus (Singleton)
```

**Was es macht:** "Hier ist dein fertiger Service, oder ich baue ihn gerade für dich"

---

## 📝 **ServiceRegistrar - Das Service-Verzeichnis**

**Metapher:** Ein Verzeichnis, das alle verfügbaren Services auflistet und auffindbar macht.

```typescript
export class ServiceRegistrar {
  private readonly serviceLocator: ServiceLocator;
  
  // Services registrieren und auffindbar machen
  registerAllServices(): void {
    // Alle Services im ServiceLocator registrieren
    for (const serviceClass of allServiceClasses) {
      this.serviceLocator.register(serviceClass, () => {
        return this.serviceContainer.getService(serviceClass);
      });
    }
  }
}
```

**Beispiel:**
```typescript
// Services registrieren
serviceRegistrar.registerAllServices();

// Service über ServiceLocator abrufen
const logger = serviceLocator.getService(FoundryLogger);
// → Holt Service aus ServiceContainer
```

**Was es macht:** "Alle Services sind jetzt auffindbar und verfügbar"

---

## 🌐 **APIManager - Das Schaufenster**

**Metapher:** Ein Schaufenster, das die Services für externe Kunden sichtbar macht.

```typescript
export class APIManager {
  // Services in globaler API verfügbar machen
  registerInGlobalAPI(): void {
    const moduleApi = game.modules.get("relationship-app").api;
    
    // Services ins Schaufenster stellen
    moduleApi.logger = this.serviceContainer.getService(FoundryLogger);
    moduleApi.notificationService = this.serviceContainer.getService(NotificationService);
    moduleApi.serviceManager = this.serviceContainer;
  }
}
```

**Beispiel:**
```typescript
// Services in globaler API registrieren
apiManager.registerInGlobalAPI();

// Externe Module können jetzt zugreifen
const logger = game.modules.get("relationship-app").api.logger;
const notifications = game.modules.get("relationship-app").api.notificationService;
```

**Was es macht:** "Services sind jetzt für alle sichtbar und nutzbar"

---

## 🔄 **Zusammenarbeit der Klassen - Ein Beispiel**

```typescript
// 1. ServiceRegistry: Baupläne sammeln
serviceRegistry.registerService(NotificationService, NotificationService);

// 2. DependencyMapper: Materialliste erstellen
const dependencies = dependencyMapper.extractDependencies(NotificationService);
// → [FoundryAdapter, FoundryLogger]

// 3. ServicePlanner: Detaillierten Bauplan erstellen
const plan = servicePlanner.createServicePlan(NotificationService);
// → {constructor: NotificationService, dependencies: [...], resolutionOrder: [...]}

// 4. ServiceValidator: Bauplan prüfen
serviceValidator.validateServicePlan(plan);
// → ✅ Alles korrekt

// 5. ServiceContainer: Service bauen und lagern
const notificationService = serviceContainer.getService(NotificationService);
// → Baut FoundryAdapter → FoundryLogger → NotificationService
// → Lagert NotificationService (Singleton)

// 6. ServiceRegistrar: Service auffindbar machen
serviceRegistrar.registerService(NotificationService);

// 7. APIManager: Service ins Schaufenster stellen
apiManager.registerInGlobalAPI();
// → game.modules.get("relationship-app").api.notificationService verfügbar
```

## 🎯 **Zusammenfassung der Metaphern**

| Klasse | Metapher | Was es macht |
|--------|----------|--------------|
| **ServiceRegistry** | Bauplan-Archiv | Sammelt alle Baupläne (Service-Klassen) |
| **DependencyMapper** | Baustoff-Lieferant | Weiß, welche Materialien (Dependencies) benötigt werden |
| **ServicePlanner** | Bauleiter | Erstellt detaillierte Baupläne mit Reihenfolge |
| **ServiceValidator** | Baugutachter | Prüft Baupläne auf Korrektheit |
| **ServiceContainer** | Lagerhaus | Lagert fertige Services und baut sie bei Bedarf |
| **ServiceRegistrar** | Service-Verzeichnis | Macht Services auffindbar |
| **APIManager** | Schaufenster | Stellt Services für externe Nutzung bereit |

**Deine Analogie war perfekt:** ServiceContainer ist tatsächlich das Lagerhaus der fertigen Services! 🏪
