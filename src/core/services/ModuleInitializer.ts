import type { IModuleInitializer } from "../interfaces/IModuleInitializer";
import type { IRegistrationService } from "../interfaces/IRegistrationService";
import type { ILogger } from "../interfaces/ILogger";
import type { IErrorHandler } from "../interfaces/IErrorHandler";

export class ModuleInitializer implements IModuleInitializer {
  // ✅ Metadaten direkt in der Klasse
  static readonly API_NAME = 'moduleInitializer';
  static readonly SERVICE_TYPE = 'singleton' as const;

  constructor(
    private readonly logger: ILogger,
    private readonly errorHandler: IErrorHandler,
    private readonly registrationService: IRegistrationService
  ) {}

  async initialize(): Promise<void> {
    try {
      this.logger.info("🚀 Relationship App: Starting initialization...");
      
      // Register all Foundry integrations
      await this.registrationService.registerAll();
      
      this.logger.info("✅ Relationship App: Initialization completed!");
    } catch (error) {
      this.errorHandler.handle(error, "Module initialization");
      throw error;
    }
  }
}
