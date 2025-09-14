/**
 * Interface für Service Registry
 *
 * Verantwortlichkeit: Service-Klassen erfassen und registrieren
 */
export interface IServiceRegistry {
  /**
   * Alle Services aus einer Service-Quelle registrieren
   * @param serviceSource - Array von Service-Klassen
   */
  registerAllServices(serviceSource: any[]): void;

  /**
   * Einzelnen Service registrieren
   * @param identifier - Service-Identifier
   * @param constructor - Service-Konstruktor
   */
  registerService(identifier: any, constructor: any): void;

  /**
   * Service-Konstruktor abrufen
   * @param identifier - Service-Identifier
   * @returns Service-Konstruktor
   */
  getServiceConstructor(identifier: any): any;

  /**
   * Alle registrierten Services abrufen
   * @returns Array aller Service-Klassen
   */
  getAllServices(): any[];

  /**
   * Prüfen ob Service registriert ist
   * @param identifier - Service-Identifier
   * @returns true wenn registriert
   */
  hasService(identifier: any): boolean;

  /**
   * Anzahl registrierter Services
   * @returns Anzahl Services
   */
  getServiceCount(): number;

  /**
   * Registry leeren (für Tests)
   */
  clear(): void;
}
