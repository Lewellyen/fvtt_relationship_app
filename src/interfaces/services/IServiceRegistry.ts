import type { ServiceConstructor } from "../../types/ServiceTypes";

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
  registerAllServices(serviceSource: ServiceConstructor[]): void;

  /**
   * Einzelnen Service registrieren
   * @param identifier - Service-Identifier
   * @param constructor - Service-Konstruktor
   */
  registerService(identifier: ServiceConstructor, constructor: ServiceConstructor): void;

  /**
   * Service-Konstruktor abrufen
   * @param identifier - Service-Identifier
   * @returns Service-Konstruktor
   */
  getServiceConstructor(identifier: ServiceConstructor): ServiceConstructor | undefined;

  /**
   * Alle registrierten Services abrufen
   * @returns Array aller Service-Klassen
   */
  getAllServices(): ServiceConstructor[];

  /**
   * Prüfen ob Service registriert ist
   * @param identifier - Service-Identifier
   * @returns true wenn registriert
   */
  hasService(identifier: ServiceConstructor): boolean;

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
