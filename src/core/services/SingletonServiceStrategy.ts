import type { IServiceRegistrationStrategy } from "../../interfaces";

/**
 * SingletonServiceStrategy - Registriert Services als Singletons
 * Single Responsibility: Nur Singleton Service Registration
 */
export class SingletonServiceStrategy implements IServiceRegistrationStrategy {
  // ✅ Metadaten für Service Registration
  static readonly API_NAME = "singletonServiceStrategy";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "SingletonServiceStrategy";

  /**
   * Registriert einen Service als Singleton in der Module API
   */
  register(apiName: string, identifier: string, moduleApi: any, serviceManager: any): void {
    const logger = (globalThis as any).relationshipApp?.logger;
    if (logger) {
      logger.info(
        `[SingletonServiceStrategy] Registering singleton service: ${apiName} -> ${identifier}`
      );
    } else {
      console.log(
        `[SingletonServiceStrategy] Registering singleton service: ${apiName} -> ${identifier}`
      );
    }

    // Für Singleton: resolve() verwenden (mit Dependency Injection)
    moduleApi[apiName] = serviceManager.resolve(identifier);
  }
}
