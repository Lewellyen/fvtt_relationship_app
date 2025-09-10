/**
 * Interface für Service Registration Strategy
 * Verantwortlichkeit: Service Registration Strategy Pattern
 */
export interface IServiceRegistrationStrategy {
  /**
   * Registriert einen Service in der Module API
   * @param apiName - API Name für den Service
   * @param identifier - Service Identifier
   * @param moduleApi - Module API Object
   * @param serviceManager - Service Manager Instance
   */
  register(apiName: string, identifier: string, moduleApi: any, serviceManager: any): void;
}
