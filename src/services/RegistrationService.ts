import JournalEntryPageRelationshipGraphSheet from "../applications/JournalEntryPageRelationshipGraphSheet";
import { RelationshipGraphModel } from "../models/RelationsShipGraphModel";
import { MODULE_ID, MODULE_METADATA_KEY } from "../constants";
import type { ILogger, IErrorHandler, IRegistrationService } from "../interfaces";
// ✅ Services direkt importieren (zirkuläre Abhängigkeiten vermeiden)
import { FoundryLogger } from "../core/services/FoundryLogger";
import { ConsoleErrorHandler } from "../core/services/ConsoleErrorHandler";

export class RegistrationService implements IRegistrationService {
  // ✅ Metadaten direkt in der Klasse
  static readonly API_NAME = "registrationService";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "RegistrationService";
  static readonly DEPENDENCIES = [FoundryLogger, ConsoleErrorHandler]; // ✅ Dependencies explizit definiert - FoundryLogger bereits an erster Stelle

  constructor(
    private readonly logger: ILogger,
    private readonly errorHandler: IErrorHandler
  ) {}

  async registerAll(): Promise<void> {
    try {
      await this.registerSheet();
      await this.registerModel();
      await this.registerMetadata();
      await this.registerServices();
    } catch (error) {
      this.errorHandler.handle(error, "RegistrationService.registerAll");
      throw error;
    }
  }

  private async registerSheet(): Promise<void> {
    this.logger.info("🚀 Relationship App: Registering JournalEntryPageRelationshipGraphSheet...");
    const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
    DocumentSheetConfig.registerSheet(
      JournalEntryPage,
      "relationship-app",
      JournalEntryPageRelationshipGraphSheet,
      {
        types: ["relationship-app.relationship-graph"],
        makeDefault: true,
        label: () => {
          return (
            game?.i18n?.format("TYPES.JournalEntryPage.relationship-graph", {
              page: game?.i18n?.localize("TYPES.JournalEntryPage.relationship-graph"),
            }) || "Relationship Graph"
          );
        },
      }
    );
  }

  private async registerModel(): Promise<void> {
    this.logger.info("🚀 Relationship App: Registering RelationshipGraphModel...");
    CONFIG.JournalEntryPage.dataModels["relationship-app.relationship-graph"] =
      RelationshipGraphModel;
  }

  private async registerMetadata(): Promise<void> {
    this.logger.info("🚀 Relationship App: Registering metadata...");
    game?.settings?.register(MODULE_ID as any, MODULE_METADATA_KEY as any, {
      name: "Relationship App Metadata",
      hint: "Metadata for the Relationship App",
      scope: "world",
      config: false,
      type: Object,
    });
  }

  private async registerServices(): Promise<void> {
    this.logger.info(
      "🚀 Relationship App: Services will be registered in API after initialization..."
    );
    // API-Registrierung wird in init-solid.ts gemacht, nachdem alle Services im ServiceContainer registriert sind
  }
}
