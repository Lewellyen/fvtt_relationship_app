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


// SERVICE_CONFIG - Array mit allen Runtime Service-Klassen
// ========================================================
// Nur Services die zur Laufzeit benötigt werden, nicht Boot-Services
export const SERVICE_CONFIG = [
  // 🏗️ Cross-Cutting Concerns (Grundbausteine)
  // Diese Services werden überall gebraucht
  {name: FoundryLogger,  class: FoundryLogger},         // Logging-System
  {name: ConsoleErrorHandler,  class: ConsoleErrorHandler},     // Fehlerbehandlung
  {name: FoundryAdapter,  class: FoundryAdapter},          // Foundry VTT API
  {name: NotificationService,  class: NotificationService},     // Benachrichtigungen
  
  // 🎨 Svelte & UI Services (Benutzeroberfläche)
  {name: SvelteManager,  class: SvelteManager},          // Svelte-Komponenten
  {name: CSSManager,  class: CSSManager},             // Styling
  
  // 🔧 Application Services (Anwendungslogik)
  // Hier kommen später die Business-Services hin
];

// ❌ ENTFERNT: Alle Boot-Services
// - ServiceRegistry (Boot-Service)
// - ServiceContainer (Boot-Service)  
// - ServicePlanner (Boot-Service)
// - ServiceRegistrar (Boot-Service)
// - ServiceValidator (Boot-Service)
// - DependencyMapper (Boot-Service)
// - APIManager (Boot-Service)
// - RegistrationService (Boot-Service)
// - ModuleInitializer (Boot-Service)
