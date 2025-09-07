import type { INotificationService } from "./INotificationService";
import type { IFoundryAdapter } from "../core/adapters/IFoundryAdapter";
import type { ILogger } from "../core/interfaces/ILogger";

export class NotificationService implements INotificationService {
  // ✅ Metadaten direkt in der Klasse
  static readonly API_NAME = 'notificationService';
  static readonly SERVICE_TYPE = 'singleton' as const;
  
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
