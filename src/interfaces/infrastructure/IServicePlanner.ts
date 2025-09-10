import type { ServicePlan, ValidationResult } from "../../core/services/ServicePlanner";

/**
 * Interface für Service Planner
 * 
 * Verantwortlichkeit: Service Baupläne mit Dependencies erstellen
 */
export interface IServicePlanner {
  /**
   * Service Baupläne für alle Services erstellen
   * @returns Map mit Service -> ServicePlan
   */
  createServicePlans(): Map<any, ServicePlan>;

  /**
   * Service-Plan für einen Service abrufen
   * @param serviceClass - Service-Klasse
   * @param plans - Service-Pläne Map
   * @returns Service-Plan oder undefined
   */
  getServicePlan(serviceClass: any, plans: Map<any, ServicePlan>): ServicePlan | undefined;

  /**
   * Alle Service-Pläne validieren
   * @param plans - Service-Pläne Map
   * @returns Validation Result
   */
  validateServicePlans(plans: Map<any, ServicePlan>): ValidationResult;
}
