/**
 * Interface für Cross-Cutting Services Management
 * Verantwortlichkeit: Management von Cross-Cutting Concerns Services
 */
export interface ICrossCuttingServiceManager {
  /**
   * Initialisiert alle Cross-Cutting Services
   */
  initializeCrossCuttingServices(): void;

  /**
   * Holt einen Cross-Cutting Service
   * @param identifier - Service Identifier (Klasse)
   * @returns Service Instance
   */
  getCrossCuttingService<T>(identifier: any): T;

  /**
   * Prüft ob ein Cross-Cutting Service verfügbar ist
   * @param identifier - Service Identifier (Klasse)
   * @returns true wenn verfügbar
   */
  hasCrossCuttingService(identifier: any): boolean;
}
