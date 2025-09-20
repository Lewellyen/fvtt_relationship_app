import type { ILogger } from "../../interfaces";
import type { ServiceConstructor } from "../../types/ServiceTypes";

/**
 * GlobalStateManager - Kapselt globalen Zustand
 *
 * Verantwortlichkeit: Kontrollierter Zugriff auf globalen Zustand
 * Verhindert unkontrollierte globalThis-Zugriffe
 */
export class GlobalStateManager {
  static readonly API_NAME = "globalStateManager";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "GlobalStateManager";
  static readonly DEPENDENCIES = [];

  private static instance: GlobalStateManager;
  private readonly globalState: Map<string, unknown> = new Map();
  private readonly logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  static getInstance(logger: ILogger): GlobalStateManager {
    if (!GlobalStateManager.instance) {
      GlobalStateManager.instance = new GlobalStateManager(logger);
    }
    return GlobalStateManager.instance;
  }

  /**
   * Wert im globalen Zustand setzen
   */
  set<T>(key: string, value: T): void {
    this.globalState.set(key, value);
    this.logger.debug(`[GlobalStateManager] Set global state: ${key}`, { value });
  }

  /**
   * Wert aus globalem Zustand abrufen
   */
  get<T>(key: string): T | undefined {
    const value = this.globalState.get(key) as T | undefined;
    this.logger.debug(`[GlobalStateManager] Get global state: ${key}`, { value });
    return value;
  }

  /**
   * Prüfen ob Schlüssel existiert
   */
  has(key: string): boolean {
    return this.globalState.has(key);
  }

  /**
   * Wert aus globalem Zustand entfernen
   */
  delete(key: string): boolean {
    const deleted = this.globalState.delete(key);
    this.logger.debug(`[GlobalStateManager] Delete global state: ${key}`, { deleted });
    return deleted;
  }

  /**
   * Alle Schlüssel abrufen
   */
  keys(): string[] {
    return Array.from(this.globalState.keys());
  }

  /**
   * Globalen Zustand leeren
   */
  clear(): void {
    this.globalState.clear();
    this.logger.info(`[GlobalStateManager] Cleared all global state`);
  }

  /**
   * Anzahl Einträge
   */
  size(): number {
    return this.globalState.size;
  }

  /**
   * Service-spezifische Methoden
   */

  /**
   * Service im globalen Zustand registrieren
   */
  registerService<T>(serviceName: string, service: T): void {
    this.set(`service.${serviceName}`, service);
    this.logger.info(`[GlobalStateManager] Registered service: ${serviceName}`);
  }

  /**
   * Service aus globalem Zustand abrufen
   */
  getService<T>(serviceName: string): T | undefined {
    return this.get<T>(`service.${serviceName}`);
  }

  /**
   * Service aus globalem Zustand entfernen
   */
  unregisterService(serviceName: string): boolean {
    return this.delete(`service.${serviceName}`);
  }

  /**
   * Alle Services abrufen
   */
  getAllServices(): Map<string, unknown> {
    const services = new Map<string, unknown>();
    for (const [key, value] of this.globalState.entries()) {
      if (key.startsWith("service.")) {
        const serviceName = key.substring(8); // "service." entfernen
        services.set(serviceName, value);
      }
    }
    return services;
  }

  /**
   * Debug-Informationen
   */
  getDebugInfo(): GlobalStateDebugInfo {
    return {
      totalEntries: this.globalState.size,
      services: this.getAllServices().size,
      keys: this.keys(),
      serviceNames: Array.from(this.getAllServices().keys()),
    };
  }
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
