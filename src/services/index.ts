// Services - Service Implementierungen
// =====================================

// 📊 Business Services (Geschäftslogik)
import { NotificationService } from './NotificationService';
export { NotificationService } from './NotificationService';

import { RegistrationService } from './RegistrationService';
export { RegistrationService } from './RegistrationService';


// 🔧 Core Services (Hauptfunktionen)
import { ServiceContainer } from './ServiceContainer';
export { ServiceContainer } from './ServiceContainer';

import { ServiceRegistry } from './ServiceRegistry';
export { ServiceRegistry } from './ServiceRegistry';


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

import { DependencyMapper } from '../core/services/DependencyMapper';
export { DependencyMapper } from '../core/services/DependencyMapper';

// 🎨 Svelte & UI Services (Benutzeroberfläche)
import { SvelteManager } from '../core/services/SvelteManager';
export { SvelteManager } from '../core/services/SvelteManager';

import { CSSManager } from '../core/services/CSSManager';
export { CSSManager } from '../core/services/CSSManager';

// 🌐 API & Registration Services (Externe Schnittstellen)
import { APIManager } from '../core/services/APIManager';
export { APIManager } from '../core/services/APIManager';



// 🔧 Application Services (Anwendungslogik)
import { ApplicationDependencyResolver } from '../core/services/ApplicationDependencyResolver';
export { ApplicationDependencyResolver } from '../core/services/ApplicationDependencyResolver';


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
  {name: ServiceRegistry,  class: ServiceRegistry},        // Service-Registrierung
  {name: ServiceContainer,  class: ServiceContainer},       // Service-Erstellung
  {name: ServicePlanner,  class: ServicePlanner},         // Service-Planung
  {name: ServiceRegistrar,  class: ServiceRegistrar},       // Service-Registrierung
  {name: ServiceValidator,  class: ServiceValidator},       // Service-Validierung
  {name: DependencyMapper,  class: DependencyMapper},       // Dependency-Mapping
  
  // 🎨 Svelte & UI Services (Benutzeroberfläche)
  {name: SvelteManager,  class: SvelteManager},          // Svelte-Komponenten
  {name: CSSManager,  class: CSSManager},             // Styling
  
  // 🌐 API & Registration Services (Externe Schnittstellen)
  {name: APIManager,  class: APIManager},             // API-Management
  
  
  // 🔧 Application Services (Anwendungslogik)
  {name: ApplicationDependencyResolver,  class: ApplicationDependencyResolver},        // Application-Dependency-Auflösung
];
