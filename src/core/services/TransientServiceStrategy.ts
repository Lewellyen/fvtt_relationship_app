import type { IServiceRegistrationStrategy } from "../../interfaces";

/**
 * TransientServiceStrategy - Registriert Services als Transient
 * Single Responsibility: Nur Transient Service Registration
 */
export class TransientServiceStrategy implements IServiceRegistrationStrategy {
  // ✅ Metadaten für Service Registration
  static readonly API_NAME = "transientServiceStrategy";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "TransientServiceStrategy";

  /**
   * Registriert einen Service als Transient in der Module API
   */
  register(apiName: string, identifier: string, moduleApi: any, serviceManager: any): void {
    const logger = (globalThis as any).relationshipApp?.logger;
    if (logger) {
      logger.info(
        `[TransientServiceStrategy] Registering transient service: ${apiName} -> ${identifier}`
      );
    } else {
      console.log(
        `[TransientServiceStrategy] Registering transient service: ${apiName} -> ${identifier}`
      );
    }

    // Für Transient: Immer neue Instanz erstellen
    moduleApi[apiName] = (...args: any[]) => {
      return serviceManager.getService(identifier, undefined, ...args);
    };
  }
}
