/**
 * Interface für Service-Resolution
 *
 * Abstrahiert die Service-Resolution-Logik und macht sie testbar.
 */
export interface IServiceResolver {
  /**
   * Löst einen Service anhand seines Identifiers auf
   * @param serviceIdentifier - Service-Identifier
   * @returns Service-Instanz
   */
  resolveService<T>(serviceIdentifier: string): T;

  /**
   * Prüft ob ein Service verfügbar ist
   * @param serviceIdentifier - Service-Identifier
   * @returns boolean
   */
  isServiceAvailable(serviceIdentifier: string): boolean;
}
