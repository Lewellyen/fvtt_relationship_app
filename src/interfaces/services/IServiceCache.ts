/**
 * Interface für Service Cache
 *
 * Verantwortlichkeit: Service Caching (Singleton, Scoped, Transient)
 */
export interface IServiceCache {
  /**
   * Singleton Service abrufen oder erstellen
   * @param identifier - Service-Identifier
   * @param factory - Factory-Funktion für Service-Erstellung
   * @returns Service-Instanz
   */
  getSingleton<T>(identifier: any, factory: () => T): T;

  /**
   * Scoped Service abrufen oder erstellen
   * @param identifier - Service-Identifier
   * @param scope - Scope-Name
   * @param factory - Factory-Funktion für Service-Erstellung
   * @returns Service-Instanz
   */
  getScoped<T>(identifier: any, scope: string, factory: () => T): T;

  /**
   * Transient Service erstellen (kein Caching)
   * @param identifier - Service-Identifier
   * @param factory - Factory-Funktion für Service-Erstellung
   * @returns Service-Instanz
   */
  getTransient<T>(identifier: any, factory: () => T): T;

  /**
   * Singleton Service aus Cache entfernen
   * @param identifier - Service-Identifier
   */
  disposeSingleton(identifier: any): void;

  /**
   * Alle Singleton Services aus Cache entfernen
   */
  disposeAllSingletons(): void;

  /**
   * Scoped Services eines Scopes entsorgen
   * @param scope - Scope-Name
   */
  disposeScopedServices(scope: string): void;

  /**
   * Alle Scoped Services entsorgen
   */
  disposeAllScopedServices(): void;

  /**
   * Alle Services entsorgen
   */
  disposeAll(): void;

  /**
   * Prüfen ob Singleton im Cache ist
   * @param identifier - Service-Identifier
   * @returns true wenn gecacht
   */
  hasSingleton(identifier: any): boolean;

  /**
   * Anzahl gecachter Singleton Services
   * @returns Anzahl gecachter Services
   */
  getSingletonCount(): number;

  /**
   * Anzahl Scoped Services in einem Scope
   * @param scope - Scope-Name
   * @returns Anzahl Scoped Services
   */
  getScopedServiceCount(scope: string): number;

  /**
   * Anzahl aller Scopes
   * @returns Anzahl Scopes
   */
  getScopeCount(): number;
}
