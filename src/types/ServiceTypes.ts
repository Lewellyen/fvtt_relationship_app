/**
 * Service Type Definitions
 *
 * Zentrale Typdefinitionen für das Service-System
 */

/**
 * Service Constructor Type
 * Repräsentiert einen Service-Konstruktor mit beliebigen Parametern
 */
export type ServiceConstructor<T = unknown> = new (...args: any[]) => T;

/**
 * Service Identifier
 * Kann entweder ein ServiceConstructor oder ein String sein
 */
export type ServiceIdentifier = ServiceConstructor | string;

/**
 * Service Plan Interface
 * Definiert die Struktur eines Service-Plans
 */
export interface ServicePlan {
  serviceClass: ServiceConstructor;
  dependencies: ServiceConstructor[];
  isSingleton: boolean;
  isScoped: boolean;
  isTransient: boolean;
  serviceType: "singleton" | "scoped" | "transient";
}

/**
 * Service Metadata Interface
 * Metadaten für Service-Registrierung
 */
export interface ServiceMetadata {
  serviceClass: string;
  dependencies: string[];
  isSingleton: boolean;
  isScoped: boolean;
  isTransient: boolean;
  serviceType: "singleton" | "scoped" | "transient";
}

/**
 * Dependency Resolution Result
 * Ergebnis der Dependency-Auflösung
 */
export interface DependencyResolutionResult {
  count: number;
  dependencies: ServiceConstructor[];
}

/**
 * Service Creation Context
 * Kontext für Service-Erstellung
 */
export interface ServiceCreationContext {
  serviceClass: ServiceConstructor;
  dependencies: unknown[];
  scope?: string;
}
