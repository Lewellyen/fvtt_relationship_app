import { LoggerService } from "./LoggerService";

/**
 * Service Factory für Dependency Injection und Service Management.
 * Verwaltet Singleton-Instanzen aller Services.
 */
export class ServiceFactory {
  private static services = new Map<string, unknown>();
  private static logger = LoggerService.getInstance();

  /**
   * Registriert einen Service mit der Factory
   */
  static register<T>(key: string, service: T): void {
    this.services.set(key, service);
    this.logger.debug(`Service registered: ${key}`);
  }

  /**
   * Holt einen Service aus der Factory (Singleton-Pattern)
   */
  static getService<T>(ServiceClass: new () => T): T {
    const key = ServiceClass.name;

    if (!this.services.has(key)) {
      try {
        const service = new ServiceClass();
        this.services.set(key, service);
        this.logger.debug(`Created new instance of ${key}`);
      } catch (error) {
        this.logger.error(
          `Failed to create instance of ${key}`,
          error as Error,
        );
        throw error;
      }
    }

    return this.services.get(key) as T;
  }

  /**
   * Holt einen Service mit explizitem Key
   */
  static getServiceByKey<T>(key: string): T | null {
    return (this.services.get(key) as T) || null;
  }

  /**
   * Prüft, ob ein Service bereits registriert ist
   */
  static hasService(key: string): boolean {
    return this.services.has(key);
  }

  /**
   * Entfernt einen Service aus der Factory
   */
  static removeService(key: string): boolean {
    const service = this.services.get(key);
    if (service && typeof service === "object" && "destroy" in service) {
      try {
        (service as any).destroy();
        this.logger.debug(`Service destroyed: ${key}`);
      } catch (error) {
        this.logger.warn(`Error destroying service ${key}`, error as Error);
      }
    }
    return this.services.delete(key);
  }

  /**
   * Gibt alle registrierten Service-Keys zurück
   */
  static getRegisteredServices(): string[] {
    return Array.from(this.services.keys());
  }

  /**
   * Löscht alle Services (für Cleanup)
   */
  static clear(): void {
    this.logger.debug("Clearing all services");
    for (const [key, service] of this.services) {
      if (service && typeof service === "object" && "destroy" in service) {
        try {
          (service as any).destroy();
        } catch (error) {
          this.logger.warn(`Error destroying service ${key}`, error as Error);
        }
      }
    }
    this.services.clear();
  }

  /**
   * Initialisiert alle Services mit Standard-Konfiguration
   */
  static initialize(): void {
    this.logger.info("Initializing services...");

    // Hier können Services vorab registriert werden
    // z.B. für Services, die spezielle Initialisierung benötigen

    this.logger.info("Services initialized");
  }
}
