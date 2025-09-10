/**
 * Interface für Service Registration Management
 * Verantwortlichkeit: Service Registration Strategy Management
 */
export interface IServiceRegistrationManager {
  /**
   * Registriert alle Services mit entsprechenden Strategies
   * @param moduleApi - Module API Object
   * @param serviceManager - Service Manager Instance
   */
  registerAllServices(moduleApi: any, serviceManager: any): void;

  /**
   * Registriert einen einzelnen Service mit Strategy
   * @param identifier - Service Identifier
   * @param serviceType - Service Type (singleton, factory, transient)
   * @param moduleApi - Module API Object
   * @param serviceManager - Service Manager Instance
   */
  registerService(
    identifier: string,
    serviceType: string,
    moduleApi: any,
    serviceManager: any
  ): void;

  /**
   * Fügt eine neue Strategy hinzu
   * @param serviceType - Service Type
   * @param strategy - Strategy Instance
   */
  addStrategy(serviceType: string, strategy: any): void;
}
