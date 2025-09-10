import type { IServiceRegistrationStrategy } from "../../interfaces";

/**
 * FactoryServiceStrategy - Registriert Services als Factories
 * Single Responsibility: Nur Factory Service Registration
 */
export class FactoryServiceStrategy implements IServiceRegistrationStrategy {
  // ✅ Metadaten für Service Registration
  static readonly API_NAME = "factoryServiceStrategy";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "FactoryServiceStrategy";

  /**
   * Registriert einen Service als Factory in der Module API
   */
  register(apiName: string, identifier: string, moduleApi: any, serviceManager: any): void {
    const logger = (globalThis as any).relationshipApp?.logger;
    if (logger) {
      logger.info(
        `[FactoryServiceStrategy] Registering factory service: ${apiName} -> ${identifier}`
      );
    } else {
      console.log(
        `[FactoryServiceStrategy] Registering factory service: ${apiName} -> ${identifier}`
      );
    }

    // Für Factory: getService() mit zusätzlichen Args verwenden
    moduleApi[apiName] = (...args: any[]) => {
      return serviceManager.getService(identifier, undefined, ...args);
    };
  }
}
