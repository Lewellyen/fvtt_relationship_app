import type { ICrossCuttingServiceManager } from "../../interfaces";
// ✅ Core Services direkt importieren
import { FoundryAdapter } from "../adapters/FoundryAdapter";
import { FoundryLogger } from "./FoundryLogger";
import { ConsoleErrorHandler } from "./ConsoleErrorHandler";
// ✅ Services aus services/index.ts importieren
import { NotificationService } from "../../services/NotificationService";

/**
 * CrossCuttingServiceManager - Verantwortlich für Cross-Cutting Services
 * Single Responsibility: Nur Cross-Cutting Services Management
 */
export class CrossCuttingServiceManager implements ICrossCuttingServiceManager {
  // ✅ Metadaten für Service Registration
  static readonly API_NAME = "crossCuttingServiceManager";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "CrossCuttingServiceManager"; // ✅ Klassename für Dependency Resolution

  private crossCuttingServices: Map<any, any> = new Map();

  /**
   * Initialisiert alle Cross-Cutting Services
   */
  initializeCrossCuttingServices(): void {
    // Cross-Cutting Services sind bereits global verfügbar, nicht neu erstellen
    const foundryAdapter = (globalThis as any).relationshipApp?.foundryAdapter;
    const logger = (globalThis as any).relationshipApp?.logger;
    const errorHandler = (globalThis as any).relationshipApp?.errorHandler;
    const notificationService = (globalThis as any).relationshipApp?.notificationService;

    if (foundryAdapter) {
      this.crossCuttingServices.set(FoundryAdapter, foundryAdapter);
    }
    if (logger) {
      this.crossCuttingServices.set(FoundryLogger, logger);
    }
    if (errorHandler) {
      this.crossCuttingServices.set(ConsoleErrorHandler, errorHandler);
    }
    if (notificationService) {
      this.crossCuttingServices.set(NotificationService, notificationService);
    }
  }

  /**
   * Holt einen Cross-Cutting Service
   */
  getCrossCuttingService<T>(identifier: any): T {
    const service = this.crossCuttingServices.get(identifier);
    if (!service) {
      throw new Error(`Cross-cutting service '${identifier}' not initialized`);
    }
    return service as T;
  }

  /**
   * Prüft ob ein Cross-Cutting Service verfügbar ist
   */
  hasCrossCuttingService(identifier: any): boolean {
    return this.crossCuttingServices.has(identifier);
  }
}
