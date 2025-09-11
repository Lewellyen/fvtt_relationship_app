import type { APIMetadata, APIStatus, ServiceMetadata } from "../../core/services/APIManager";

/**
 * Interface für API Manager
 * 
 * Verantwortlichkeit: Services in globaler API verfügbar machen
 */
export interface IAPIManager {
  /**
   * Services in globaler API registrieren
   */
  registerInGlobalAPI(): void;

  /**
   * Service aus API entfernen
   * @param apiName - API Name des Services
   */
  unregisterFromAPI(apiName: string): void;

  /**
   * Alle Services aus API entfernen
   */
  unregisterAllFromAPI(): void;

  /**
   * API Metadaten generieren
   * @returns API Metadaten
   */
  generateAPIMetadata(): APIMetadata;

  /**
   * API Status abrufen
   * @returns API Status
   */
  getAPIStatus(): APIStatus;

  /**
   * Service aus API abrufen
   * @param apiName - API Name des Services
   * @returns Service-Instanz oder null
   */
  getServiceFromAPI(apiName: string): any;

  /**
   * Alle Services aus API abrufen
   * @returns Map mit allen Services
   */
  getAllServicesFromAPI(): Map<string, any>;
}
