/**
 * Interface für API Registration
 * Verantwortlichkeit: Service Registration in Foundry Module API
 */
export interface IAPIRegistrationService {
  /**
   * Registriert alle Services in der Module API
   */
  registerAllServicesInAPI(): void;

  /**
   * Registriert einen einzelnen Service in der API
   * @param identifier - Service Identifier
   * @param serviceConstructor - Service Constructor
   * @param moduleApi - Module API Object
   */
  registerServiceInAPI(identifier: string, serviceConstructor: any, moduleApi: any): void;
}
