/**
 * Service-spezifische Typen für das Relationship App Modul
 */

/**
 * Service Constructor Type
 * Repräsentiert einen Service-Konstruktor mit beliebigen Parametern
 */
export type ServiceConstructor = new (...args: unknown[]) => unknown;

/**
 * Service Identifier Type
 * Kann ein ServiceConstructor oder ein String-Identifier sein
 */
export type ServiceIdentifier = ServiceConstructor | string;

/**
 * Service Instance Type
 * Repräsentiert eine Service-Instanz
 */
export type ServiceInstance = unknown;

/**
 * Service Factory Function Type
 * Funktion, die eine Service-Instanz erstellt
 */
export type ServiceFactory<T = unknown> = () => T;

/**
 * Service Scope Type
 * Repräsentiert einen Scope-Identifier
 */
export type ServiceScope = string;
