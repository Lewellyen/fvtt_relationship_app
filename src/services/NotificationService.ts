import type { INotificationService } from "./INotificationService";
import type { IFoundryAdapter } from "../core/adapters/IFoundryAdapter";
import type { ILogger } from "../interfaces";
import { FoundryAdapter } from "../core/adapters/FoundryAdapter";
import { FoundryLogger } from "../core/services/FoundryLogger";

export class NotificationService implements INotificationService {
  // ✅ Metadaten direkt in der Klasse
  static readonly API_NAME = "notificationService";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "NotificationService"; // ✅ Klassename für Dependency Resolution
  static readonly DEPENDENCIES = [FoundryAdapter, FoundryLogger]; // ✅ Dependencies explizit definiert

  constructor(
    private readonly foundryAdapter: IFoundryAdapter,
    private readonly logger: ILogger
  ) {}

  showSuccess(message: string): void {
    this.foundryAdapter.showSuccess(message);
    this.logger.info(`[UI] Success: ${message}`);
  }

  showError(message: string): void {
    this.foundryAdapter.showError(`❌ ${message}`);
    this.logger.error(`[UI] Error: ${message}`);
  }

  showWarning(message: string): void {
    this.foundryAdapter.showWarning(`⚠️ ${message}`);
    this.logger.warn(`[UI] Warning: ${message}`);
  }

  showInfo(message: string): void {
    this.foundryAdapter.showInfo(`ℹ️ ${message}`);
    this.logger.info(`[UI] Info: ${message}`);
  }
}
