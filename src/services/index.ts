// Services - Service Implementierungen
// =====================================

// 📊 Business Services (Geschäftslogik)
import { NotificationService } from "./NotificationService";
export { NotificationService } from "./NotificationService";

export { RegistrationService } from "./RegistrationService";

// 🔧 Core Services (Hauptfunktionen)
export { ServiceContainer } from "./ServiceContainer";

export { ServiceRegistry } from "./ServiceRegistry";

// Core Services für SERVICE_CONFIG
// ================================

// 🏗️ Cross-Cutting Concerns (Grundbausteine)
import { FoundryLogger } from "../core/services/FoundryLogger";
export { FoundryLogger } from "../core/services/FoundryLogger";

import { ConsoleErrorHandler } from "../core/services/ConsoleErrorHandler";
export { ConsoleErrorHandler } from "../core/services/ConsoleErrorHandler";

import { FoundryAdapter } from "../core/adapters/FoundryAdapter";
export { FoundryAdapter } from "../core/adapters/FoundryAdapter";

// 🔧 Core Services (Hauptfunktionen)
export { ModuleInitializer } from "../core/services/ModuleInitializer";

export { ServicePlanner } from "../core/services/ServicePlanner";

export { ServiceRegistrar } from "../core/services/ServiceRegistrar";

export { ServiceValidator } from "../core/services/ServiceValidator";

export { DependencyMapper } from "../core/services/DependencyMapper";

// 🎨 Svelte & UI Services (Benutzeroberfläche)
import { SvelteManager } from "../core/services/SvelteManager";
export { SvelteManager } from "../core/services/SvelteManager";

import { CSSManager } from "../core/services/CSSManager";
export { CSSManager } from "../core/services/CSSManager";

// 🌐 API & Registration Services (Externe Schnittstellen)
export { APIManager } from "../core/services/APIManager";

export { GraphService } from "./GraphService";
import { GraphService } from "./GraphService";

// 🔧 Application Services (Anwendungslogik)

// SERVICE_CONFIG - Array mit allen Runtime Service-Klassen
// ========================================================
// Nur Services die zur Laufzeit benötigt werden, nicht Boot-Services
export const SERVICE_CONFIG = [
  // 🏗️ Cross-Cutting Concerns (Grundbausteine)
  // Diese Services werden überall gebraucht
  { name: FoundryLogger, class: FoundryLogger }, // Logging-System
  { name: ConsoleErrorHandler, class: ConsoleErrorHandler }, // Fehlerbehandlung
  { name: FoundryAdapter, class: FoundryAdapter }, // Foundry VTT API
  { name: NotificationService, class: NotificationService }, // Benachrichtigungen

  // 🎨 Svelte & UI Services (Benutzeroberfläche)
  { name: SvelteManager, class: SvelteManager }, // Svelte-Komponenten
  { name: CSSManager, class: CSSManager }, // Styling

  // 🔧 Application Services (Anwendungslogik)
  { name: GraphService, class: GraphService },
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
