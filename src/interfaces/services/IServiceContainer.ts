import type { ServicePlan } from "../../core/services/ServicePlanner";

/**
 * Interface für Service Container
 * 
 * Verantwortlichkeit: Services mit Dependencies erstellen und lagern
 */
export interface IServiceContainer {
  /**
   * Service aus Lagerhaus holen oder neu erstellen
   * @param identifier - Service-Identifier
   * @returns Service-Instanz
   */
  getService<T>(identifier: any): T;

  /**
   * Service mit Dependencies erstellen
   * @param identifier - Service-Identifier
   * @returns Service-Instanz
   */
  createService<T>(identifier: any): T;

  /**
   * Alle Services erstellen
   */
  createAllServices(): void;

  /**
   * Service aus Cache entfernen
   * @param identifier - Service-Identifier
   */
  disposeService(identifier: any): void;

  /**
   * Alle Services aus Cache entfernen
   */
  disposeAll(): void;

  /**
   * Prüfen ob Service im Cache ist
   * @param identifier - Service-Identifier
   * @returns true wenn gecacht
   */
  hasCachedService(identifier: any): boolean;

  /**
   * Anzahl gecachter Services
   * @returns Anzahl gecachter Services
   */
  getCachedServiceCount(): number;

  /**
   * Service-Plan abrufen
   * @param identifier - Service-Identifier
   * @returns Service-Plan oder undefined
   */
  getServicePlan(identifier: any): ServicePlan | undefined;

  /**
   * Alle Service-Pläne abrufen
   * @returns Map mit allen Service-Plänen
   */
  getAllServicePlans(): Map<any, ServicePlan>;
}
