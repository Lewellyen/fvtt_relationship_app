# Single Source of Truth - Korrekte Architektur

## 🎯 **Das Problem mit der aktuellen Architektur**

**Aktuell (falsch):**
```typescript
// ❌ Jede Klasse liest direkt aus index.ts
export class ServiceRegistry {
  registerAllServices(): void {
    for (const ServiceClass of SERVICE_CONFIG) { // ← Direkt aus index.ts
      this.registerService(ServiceClass, ServiceClass);
    }
  }
}

export class DependencyMapper {
  buildDependencyGraph(): Map<any, any[]> {
    for (const ServiceClass of SERVICE_CONFIG) { // ← Direkt aus index.ts
      const dependencies = this.extractDependencies(ServiceClass);
    }
  }
}
```

**Problem:** Wenn du eine andere Service-Quelle einführst, musst du **alle Klassen** ändern!

## ✅ **Korrekte Architektur - Single Source of Truth**

### **ServiceRegistry als einziger Eingangspunkt**

```typescript
export class ServiceRegistry {
  private readonly serviceRegistry = new Map<any, ServiceConstructor>();
  
  // EINZIGER Eingangspunkt für Services
  registerAllServices(serviceSource: any[]): void {
    for (const ServiceClass of serviceSource) {
      this.registerService(ServiceClass, ServiceClass);
    }
  }
  
  // Alle anderen Klassen holen sich Services von hier
  getAllServices(): any[] {
    return Array.from(this.serviceRegistry.keys());
  }
  
  getServiceConstructor(identifier: any): any {
    return this.serviceRegistry.get(identifier);
  }
}
```

### **DependencyMapper holt sich Services von ServiceRegistry**

```typescript
export class DependencyMapper {
  constructor(private serviceRegistry: ServiceRegistry) {}
  
  buildDependencyGraph(): Map<any, any[]> {
    const graph = new Map();
    
    // Services von ServiceRegistry holen, nicht direkt aus index.ts
    const allServices = this.serviceRegistry.getAllServices();
    
    for (const ServiceClass of allServices) {
      const dependencies = this.extractDependencies(ServiceClass);
      graph.set(ServiceClass, dependencies);
    }
    
    return graph;
  }
}
```

### **ServicePlanner holt sich Services von ServiceRegistry**

```typescript
export class ServicePlanner {
  constructor(
    private serviceRegistry: ServiceRegistry,
    private dependencyMapper: DependencyMapper
  ) {}
  
  createServicePlans(): Map<any, ServicePlan> {
    const plans = new Map();
    
    // Services von ServiceRegistry holen
    const allServices = this.serviceRegistry.getAllServices();
    
    for (const ServiceClass of allServices) {
      const plan = this.createServicePlan(ServiceClass);
      plans.set(ServiceClass, plan);
    }
    
    return plans;
  }
}
```

## 🔄 **Korrigierter Datenfluss**

```mermaid
graph TD
    A[index.ts<br/>Service-Quelle] -->|SERVICE_CONFIG| B[ServiceRegistry<br/>EINZIGER Eingangspunkt]
    B -->|getAllServices()| C[DependencyMapper<br/>Baustoff-Lieferant]
    B -->|getAllServices()| D[ServicePlanner<br/>Bauleiter]
    B -->|getServiceConstructor()| E[ServiceContainer<br/>Lagerhaus]
    
    C -->|Dependency Graph| D
    D -->|Service Plans| E
    E -->|Service Instances| F[APIManager<br/>Schaufenster]
```

## 🎯 **Vorteile dieser Architektur**

### **1. Single Source of Truth**
- Nur ServiceRegistry kennt die Service-Quelle
- Alle anderen Klassen fragen ServiceRegistry

### **2. Einfache Service-Quellen-Änderung**
```typescript
// Aktuell: index.ts
serviceRegistry.registerAllServices(SERVICE_CONFIG);

// Später: Datenbank
serviceRegistry.registerAllServices(databaseServices);

// Später: Konfigurationsdatei
serviceRegistry.registerAllServices(configFileServices);

// Später: API
serviceRegistry.registerAllServices(apiServices);
```

### **3. Testbarkeit**
```typescript
// Test mit Mock-Services
const mockServices = [MockService1, MockService2];
serviceRegistry.registerAllServices(mockServices);

// Alle anderen Klassen funktionieren automatisch
const dependencyMapper = new DependencyMapper(serviceRegistry);
const servicePlanner = new ServicePlanner(serviceRegistry, dependencyMapper);
```

## 📋 **Korrigierter Bootablauf**

```typescript
// Phase 1: Early Bootstrap
const coreServices = createCoreServices();

// Phase 2: Service Registry Setup
const serviceRegistry = new ServiceRegistry();
serviceRegistry.registerAllServices(SERVICE_CONFIG); // ← EINZIGER Eingangspunkt

const dependencyMapper = new DependencyMapper(serviceRegistry);
const dependencyGraph = dependencyMapper.buildDependencyGraph();

const servicePlanner = new ServicePlanner(serviceRegistry, dependencyMapper);
const servicePlans = servicePlanner.createServicePlans();

// Phase 3: Service Creation
const serviceValidator = new ServiceValidator();
serviceValidator.validateDependencyGraph(dependencyGraph);

const serviceContainer = new ServiceContainer(servicePlans, serviceValidator);
serviceContainer.createAllServices();

const serviceRegistrar = new ServiceRegistrar(serviceContainer);
serviceRegistrar.registerAllServices();

const apiManager = new APIManager(serviceContainer);
apiManager.registerInGlobalAPI();
```

## 🔧 **Implementierung der korrigierten Klassen**

### **ServiceRegistry (korrigiert)**
```typescript
export class ServiceRegistry {
  private readonly serviceRegistry = new Map<any, ServiceConstructor>();
  
  // EINZIGER Eingangspunkt
  registerAllServices(serviceSource: any[]): void {
    for (const ServiceClass of serviceSource) {
      this.registerService(ServiceClass, ServiceClass);
    }
  }
  
  // Services für andere Klassen bereitstellen
  getAllServices(): any[] {
    return Array.from(this.serviceRegistry.keys());
  }
  
  getServiceConstructor(identifier: any): any {
    return this.serviceRegistry.get(identifier);
  }
  
  hasService(identifier: any): boolean {
    return this.serviceRegistry.has(identifier);
  }
}
```

### **DependencyMapper (korrigiert)**
```typescript
export class DependencyMapper {
  constructor(private serviceRegistry: ServiceRegistry) {}
  
  buildDependencyGraph(): Map<any, any[]> {
    const graph = new Map();
    
    // Services von ServiceRegistry holen
    const allServices = this.serviceRegistry.getAllServices();
    
    for (const ServiceClass of allServices) {
      const dependencies = this.extractDependencies(ServiceClass);
      graph.set(ServiceClass, dependencies);
    }
    
    return graph;
  }
  
  private extractDependencies(serviceClass: any): any[] {
    // @Inject Decorators extrahieren
    if (serviceClass.__dependencies) {
      return serviceClass.__dependencies.filter(Boolean);
    }
    
    // Hardcoded Dependencies als Fallback
    return this.getHardcodedDependencies(serviceClass);
  }
}
```

## ✅ **Zusammenfassung**

**Du hattest absolut recht!** 

- **ServiceRegistry** = EINZIGER Eingangspunkt für Services
- **Alle anderen Klassen** = Holen sich Services von ServiceRegistry
- **Service-Quellen-Änderung** = Nur ServiceRegistry muss angepasst werden
- **Single Source of Truth** = ServiceRegistry ist die einzige Wahrheitsquelle

**Das ist viel sauberer und flexibler!** 🎉
