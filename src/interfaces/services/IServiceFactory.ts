/**
 * Interface für Service Factory
 *
 * Verantwortlichkeit: Service Creation und Dependency Resolution
 */
export interface IServiceFactory {
  /**
   * Service mit Dependencies erstellen
   * @param identifier - Service-Identifier
   * @returns Service-Instanz
   */
  createService<T>(identifier: any): T;
}
