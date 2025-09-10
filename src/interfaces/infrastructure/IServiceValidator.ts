import type { ServicePlan, ValidationResult } from "./ServicePlanner";

/**
 * Interface für Service Validator
 * 
 * Verantwortlichkeit: Service-Erstellung validieren und Fehler prüfen
 */
export interface IServiceValidator {
  /**
   * Dependency Graph validieren
   * @param dependencyGraph - Dependency Graph
   * @returns Validation Result
   */
  validateDependencyGraph(dependencyGraph: Map<any, any[]>): ValidationResult;

  /**
   * Service-Pläne validieren
   * @param servicePlans - Service-Pläne Map
   * @returns Validation Result
   */
  validateServicePlans(servicePlans: Map<any, ServicePlan>): ValidationResult;

  /**
   * Service-Erstellung validieren
   * @param service - Service-Instanz
   * @param identifier - Service-Identifier
   * @returns true wenn gültig
   */
  validateServiceCreation(service: any, identifier: any): boolean;

  /**
   * Zirkuläre Dependencies prüfen
   * @param dependencyGraph - Dependency Graph
   * @returns true wenn zirkuläre Dependencies gefunden
   */
  checkCircularDependencies(dependencyGraph: Map<any, any[]>): boolean;

  /**
   * Service-Container validieren
   * @param serviceContainer - Service Container
   * @returns Validation Result
   */
  validateServiceContainer(serviceContainer: any): ValidationResult;

  /**
   * Fehlerbehandlung für Service-Erstellung
   * @param error - Fehler
   * @param identifier - Service-Identifier
   */
  handleServiceCreationError(error: Error, identifier: any): void;
}
