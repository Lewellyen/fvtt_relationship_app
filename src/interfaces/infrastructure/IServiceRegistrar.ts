/**
 * Interface für Service Registrar
 *
 * Verantwortlichkeit: Services registrieren und verfügbar machen
 */
export interface IServiceRegistrar {
  /**
   * Alle Services registrieren
   */
  registerAllServices(): void;

  /**
   * Einzelnen Service registrieren
   * @param serviceClass - Service-Klasse
   * @param plan - Service-Plan
   */
  registerService(serviceClass: any, plan: any): void;

  /**
   * Service über ServiceContainer abrufen
   * @param identifier - Service-Identifier
   * @param scope - Optionaler Scope für Scoped Services
   * @returns Service-Instanz
   */
  getService<T>(identifier: any, scope?: string): T;

  /**
   * Prüfen ob Service registriert ist
   * @param identifier - Service-Identifier
   * @returns true wenn registriert
   */
  hasService(identifier: any): boolean;

  /**
   * Alle registrierten Services abrufen
   * @returns Array aller registrierten Services
   */
  getRegisteredServices(): any[];

  /**
   * Service aus Registrierung entfernen
   * @param identifier - Service-Identifier
   */
  unregisterService(identifier: any): void;

  /**
   * Alle Services aus Registrierung entfernen
   */
  unregisterAll(): void;

  /**
   * Service Discovery - Services auffindbar machen
   */
  enableServiceDiscovery(): void;

  /**
   * Service Metadaten abrufen
   * @param identifier - Service-Identifier
   * @returns Service Metadaten
   */
  getServiceMetadata(identifier: any): any;

  /**
   * Alle Service Metadaten abrufen
   * @returns Map mit allen Service Metadaten
   */
  getAllServiceMetadata(): Map<any, any>;
}
