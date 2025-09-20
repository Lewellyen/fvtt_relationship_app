/**
 * Interface für Global State Manager
 *
 * Verantwortlichkeit: Kontrollierter Zugriff auf globalen Zustand
 */
export interface IGlobalStateManager {
  /**
   * Wert im globalen Zustand setzen
   */
  set<T>(key: string, value: T): void;

  /**
   * Wert aus globalem Zustand abrufen
   */
  get<T>(key: string): T | undefined;

  /**
   * Prüfen ob Schlüssel existiert
   */
  has(key: string): boolean;

  /**
   * Wert aus globalem Zustand entfernen
   */
  delete(key: string): boolean;

  /**
   * Alle Schlüssel abrufen
   */
  keys(): string[];

  /**
   * Globalen Zustand leeren
   */
  clear(): void;

  /**
   * Anzahl Einträge
   */
  size(): number;

  /**
   * Service-spezifische Methoden
   */

  /**
   * Service im globalen Zustand registrieren
   */
  registerService<T>(serviceName: string, service: T): void;

  /**
   * Service aus globalem Zustand abrufen
   */
  getService<T>(serviceName: string): T | undefined;

  /**
   * Service aus globalem Zustand entfernen
   */
  unregisterService(serviceName: string): boolean;

  /**
   * Alle Services abrufen
   */
  getAllServices(): Map<string, unknown>;

  /**
   * Debug-Informationen
   */
  getDebugInfo(): GlobalStateDebugInfo;
}

/**
 * Debug-Informationen für globalen Zustand
 */
export interface GlobalStateDebugInfo {
  totalEntries: number;
  services: number;
  keys: string[];
  serviceNames: string[];
}
