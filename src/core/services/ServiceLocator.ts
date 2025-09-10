import type { IServiceLocator, IServiceManager, IRelationshipGraphService } from "../../interfaces";
import { ServiceManager } from "../../services/ServiceManager";
// ✅ Services aus services/index.ts importieren
import { RelationshipGraphService } from "../../services/RelationshipGraphService";

/**
 * ServiceLocator - Verantwortlich für Service Resolution
 * Single Responsibility: Nur Service-Auflösung und Dependency Management
 */
export class ServiceLocator implements IServiceLocator {
  // ✅ Metadaten für Service Registration
  static readonly API_NAME = "serviceLocator";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "ServiceLocator";

  constructor(serviceManager?: IServiceManager) {
    this.serviceManager = serviceManager || ServiceManager.getInstance();
  }

  private readonly serviceManager: IServiceManager;

  /**
   * Holt einen Service über Identifier
   */
  getService<T>(identifier: any, ...args: any[]): T {
    const logger = (globalThis as any).relationshipApp?.logger;
    if (logger) {
      logger.info("[ServiceLocator] Getting service:", identifier);
    } else {
      console.log("[ServiceLocator] Getting service:", identifier);
    }
    return this.serviceManager.getService<T>(identifier, undefined, ...args);
  }

  /**
   * Prüft ob ein Service verfügbar ist
   */
  hasService(identifier: any): boolean {
    return this.serviceManager.hasService(identifier);
  }

  /**
   * Holt einen Graph-Service für ein spezifisches Document
   */
  getGraphService(document: any): IRelationshipGraphService {
    const logger = (globalThis as any).relationshipApp?.logger;
    if (logger) {
      logger.info(`[ServiceLocator] Getting graph service for document: ${document.uuid}`);
    } else {
      console.log("[ServiceLocator] Getting graph service for document:", document.uuid);
    }

    // Erstelle Graph-Service mit Document-spezifischen Dependencies
    const graphService = this.serviceManager.getService<IRelationshipGraphService>(
      RelationshipGraphService,
      document
    );

    return graphService;
  }
}
