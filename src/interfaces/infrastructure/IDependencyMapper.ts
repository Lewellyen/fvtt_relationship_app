/**
 * Interface für Dependency Mapper
 *
 * Verantwortlichkeit: Dependencies aus @Inject extrahieren und mappen
 */
export interface IDependencyMapper {
  /**
   * Dependency Graph für alle Services erstellen
   * @returns Map mit Service -> Dependencies
   */
  buildDependencyGraph(): Map<any, any[]>;

  /**
   * Dependencies für einen Service extrahieren
   * @param serviceClass - Service-Klasse
   * @returns Array der Dependencies
   */
  extractDependencies(serviceClass: any): any[];

  /**
   * Zirkuläre Dependencies prüfen
   * @param dependencyGraph - Dependency Graph
   * @returns true wenn zirkuläre Dependencies gefunden
   */
  checkCircularDependencies(dependencyGraph: Map<any, any[]>): boolean;
}
