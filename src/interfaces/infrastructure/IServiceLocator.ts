/**
 * Interface für Service Resolution
 * Verantwortlichkeit: Service-Auflösung und Dependency Management
 */
export interface IServiceLocator {
  /**
   * Holt einen Service über Identifier
   * @param identifier - Service Identifier (Klasse)
   * @param args - Zusätzliche Argumente für Service-Erstellung
   * @returns Der angeforderte Service
   */
  getService<T>(identifier: any, ...args: any[]): T;

  /**
   * Prüft ob ein Service verfügbar ist
   * @param identifier - Service Identifier (Klasse)
   * @returns true wenn Service verfügbar
   */
  hasService(identifier: any): boolean;

  /**
   * Holt einen Graph-Service für ein spezifisches Document
   * @param document - Das Journal Entry Document
   * @returns Der Graph-Service
   */
  getGraphService(document: any): any;
}
