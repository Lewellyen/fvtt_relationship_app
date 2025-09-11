import type { IModuleInitializer, IRegistrationService, ILogger, IErrorHandler } from "../../interfaces";
// ✅ Services direkt importieren (zirkuläre Abhängigkeiten vermeiden)
import { FoundryLogger } from "./FoundryLogger";
import { ConsoleErrorHandler } from "./ConsoleErrorHandler";
import { RegistrationService } from "../../services/RegistrationService";

export class ModuleInitializer implements IModuleInitializer {
  // ✅ Metadaten direkt in der Klasse
  static readonly API_NAME = "moduleInitializer";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "ModuleInitializer";
  static readonly DEPENDENCIES = [FoundryLogger, ConsoleErrorHandler, RegistrationService]; // ✅ Dependencies explizit definiert - FoundryLogger bereits an erster Stelle

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
