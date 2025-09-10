// Services - Service Implementierungen
// =====================================

// 📊 Business Services (Geschäftslogik)
import { NotificationService } from './NotificationService';
export { NotificationService } from './NotificationService';

import { RegistrationService } from './RegistrationService';
export { RegistrationService } from './RegistrationService';

import { RelationshipGraphDemoDataService } from './RelationshipGraphDemoDataService';
export { RelationshipGraphDemoDataService } from './RelationshipGraphDemoDataService';

import { RelationshipGraphPersistenceService } from './RelationshipGraphPersistenceService';
export { RelationshipGraphPersistenceService } from './RelationshipGraphPersistenceService';

import { RelationshipGraphService } from './RelationshipGraphService';
export { RelationshipGraphService } from './RelationshipGraphService';

// 🔧 Core Services (Hauptfunktionen)
import { ServiceContainer } from './ServiceContainer';
export { ServiceContainer } from './ServiceContainer';

import { ServiceRegistry } from './ServiceRegistry';
export { ServiceRegistry } from './ServiceRegistry';

import { ServiceFactory } from './ServiceFactory';
export { ServiceFactory } from './ServiceFactory';

import { ServiceManager } from './ServiceManager';
export { ServiceManager } from './ServiceManager';

// Core Services für SERVICE_CONFIG
// ================================

// 🏗️ Cross-Cutting Concerns (Grundbausteine)
import { FoundryLogger } from '../core/services/FoundryLogger';
export { FoundryLogger } from '../core/services/FoundryLogger';

import { ConsoleErrorHandler } from '../core/services/ConsoleErrorHandler';
export { ConsoleErrorHandler } from '../core/services/ConsoleErrorHandler';

import { FoundryAdapter } from '../core/adapters/FoundryAdapter';
export { FoundryAdapter } from '../core/adapters/FoundryAdapter';

// 🔧 Core Services (Hauptfunktionen)
import { ModuleInitializer } from '../core/services/ModuleInitializer';
export { ModuleInitializer } from '../core/services/ModuleInitializer';

import { ServicePlanner } from '../core/services/ServicePlanner';
export { ServicePlanner } from '../core/services/ServicePlanner';

import { ServiceRegistrar } from '../core/services/ServiceRegistrar';
export { ServiceRegistrar } from '../core/services/ServiceRegistrar';

import { ServiceValidator } from '../core/services/ServiceValidator';
export { ServiceValidator } from '../core/services/ServiceValidator';

import { ServiceResolver } from '../core/services/ServiceResolver';
export { ServiceResolver } from '../core/services/ServiceResolver';

import { DependencyMapper } from '../core/services/DependencyMapper';
export { DependencyMapper } from '../core/services/DependencyMapper';

import { ServiceLocator } from '../core/services/ServiceLocator';
export { ServiceLocator } from '../core/services/ServiceLocator';

// 🎨 Svelte & UI Services (Benutzeroberfläche)
import { SvelteManager } from '../core/services/SvelteManager';
export { SvelteManager } from '../core/services/SvelteManager';

import { CSSManager } from '../core/services/CSSManager';
export { CSSManager } from '../core/services/CSSManager';

// 🌐 API & Registration Services (Externe Schnittstellen)
import { APIManager } from '../core/services/APIManager';
export { APIManager } from '../core/services/APIManager';

import { APIRegistrationService } from '../core/services/APIRegistrationService';
export { APIRegistrationService } from '../core/services/APIRegistrationService';

import { ServiceRegistrationManager } from '../core/services/ServiceRegistrationManager';
export { ServiceRegistrationManager } from '../core/services/ServiceRegistrationManager';

import { CrossCuttingServiceManager } from '../core/services/CrossCuttingServiceManager';
export { CrossCuttingServiceManager } from '../core/services/CrossCuttingServiceManager';

// 📊 Business Services (Geschäftslogik)
import { RelationshipGraphAnalysisService } from '../core/services/RelationshipGraphAnalysisService';
export { RelationshipGraphAnalysisService } from '../core/services/RelationshipGraphAnalysisService';

import { RelationshipGraphCRUDService } from '../core/services/RelationshipGraphCRUDService';
export { RelationshipGraphCRUDService } from '../core/services/RelationshipGraphCRUDService';

import { RelationshipGraphDataManager } from '../core/services/RelationshipGraphDataManager';
export { RelationshipGraphDataManager } from '../core/services/RelationshipGraphDataManager';

import { RelationshipGraphDemoService } from '../core/services/RelationshipGraphDemoService';
export { RelationshipGraphDemoService } from '../core/services/RelationshipGraphDemoService';

// 🔧 Application Services (Anwendungslogik)
import { ApplicationDependencyResolver } from '../core/services/ApplicationDependencyResolver';
export { ApplicationDependencyResolver } from '../core/services/ApplicationDependencyResolver';

// 🏭 Service Strategy Pattern (Factory Pattern)
import { FactoryServiceStrategy } from '../core/services/FactoryServiceStrategy';
export { FactoryServiceStrategy } from '../core/services/FactoryServiceStrategy';

import { SingletonServiceStrategy } from '../core/services/SingletonServiceStrategy';
export { SingletonServiceStrategy } from '../core/services/SingletonServiceStrategy';

import { TransientServiceStrategy } from '../core/services/TransientServiceStrategy';
export { TransientServiceStrategy } from '../core/services/TransientServiceStrategy';

// SERVICE_CONFIG - Array mit allen Service-Klassen
// ================================================
export const SERVICE_CONFIG = [
  // 🏗️ Cross-Cutting Concerns (Grundbausteine)
  // Diese Services werden überall gebraucht
  {name: FoundryLogger,  class: FoundryLogger},         // Logging-System
  {name: ConsoleErrorHandler,  class: ConsoleErrorHandler},     // Fehlerbehandlung
  {name: FoundryAdapter,  class: FoundryAdapter},          // Foundry VTT API
  {name: NotificationService,  class: NotificationService},     // Benachrichtigungen
  
  // 🔧 Core Services (Hauptfunktionen)
  // Diese Services sind das Herz des Systems
  {name: RegistrationService,  class: RegistrationService},     // Service-Registrierung
  {name: ModuleInitializer,  class: ModuleInitializer},      // Modul-Initialisierung  
  {name: ServiceManager,  class: ServiceManager},         // Service-Manager
  {name: ServiceFactory,  class: ServiceFactory},         // Service-Factory
  {name: ServiceRegistry,  class: ServiceRegistry},        // Service-Registrierung
  {name: ServiceContainer,  class: ServiceContainer},       // Service-Erstellung
  {name: ServiceLocator,  class: ServiceLocator},         // Service-Locator
  {name: ServicePlanner,  class: ServicePlanner},         // Service-Planung
  {name: ServiceRegistrar,  class: ServiceRegistrar},       // Service-Registrierung
  {name: ServiceValidator,  class: ServiceValidator},       // Service-Validierung
  {name: ServiceResolver,  class: ServiceResolver},        // Service-Auflösung
  {name: DependencyMapper,  class: DependencyMapper},       // Dependency-Mapping
  
  // 🎨 Svelte & UI Services (Benutzeroberfläche)
  {name: SvelteManager,  class: SvelteManager},          // Svelte-Komponenten
  {name: CSSManager,  class: CSSManager},             // Styling
  
  // 🌐 API & Registration Services (Externe Schnittstellen)
  {name: APIManager,  class: APIManager},             // API-Management
  {name: APIRegistrationService,  class: APIRegistrationService}    , // API-Registrierung
  {name: ServiceRegistrationManager,  class: ServiceRegistrationManager}, // Service-Registrierungs-Management
  {name: CrossCuttingServiceManager,  class: CrossCuttingServiceManager}, // Cross-Cutting Services
  
  // 📊 Business Services (Geschäftslogik)
  {name: RelationshipGraphService,  class: RelationshipGraphService},              // Haupt-Graph-Service
  {name: RelationshipGraphPersistenceService,  class: RelationshipGraphPersistenceService},  // Graph-Persistierung
  {name: RelationshipGraphDemoDataService,  class: RelationshipGraphDemoDataService},     // Demo-Daten
  {name: RelationshipGraphAnalysisService,  class: RelationshipGraphAnalysisService},     // Graph-Analyse
  {name: RelationshipGraphCRUDService,  class: RelationshipGraphCRUDService},         // Graph-CRUD
  {name: RelationshipGraphDataManager,  class: RelationshipGraphDataManager},         // Graph-Daten-Management
  {name: RelationshipGraphDemoService,  class: RelationshipGraphDemoService},         // Graph-Demo
  
  // 🔧 Application Services (Anwendungslogik)
  {name: ApplicationDependencyResolver,  class: ApplicationDependencyResolver},        // Application-Dependency-Auflösung
  
  // 🏭 Service Strategy Pattern (Factory Pattern)
  {name: FactoryServiceStrategy,  class: FactoryServiceStrategy},               // Factory-Strategie
  {name: SingletonServiceStrategy,  class: SingletonServiceStrategy},             // Singleton-Strategie
  {name: TransientServiceStrategy,  class: TransientServiceStrategy},             // Transient-Strategie
];
