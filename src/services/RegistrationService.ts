import JournalEntryPageRelationshipGraphSheet from "../applications/JournalEntryPageRelationshipGraphSheet";
import { RelationshipGraphModel } from "../models/RelationsShipGraphModel";
import { ServiceFactory } from "./ServiceFactory";
import { MODULE_ID, MODULE_METADATA_KEY } from "../constants";
import type { ILogger } from "../core/interfaces/ILogger";
import type { IErrorHandler } from "../core/interfaces/IErrorHandler";
import type { IRegistrationService } from "../core/interfaces/IRegistrationService";

export class RegistrationService implements IRegistrationService {
  // ✅ Metadaten direkt in der Klasse
  static readonly API_NAME = 'registrationService';
  static readonly SERVICE_TYPE = 'singleton' as const;
  
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
    this.logger.info("🚀 Relationship App: Registering services in global API...");

    // ServiceFactory registriert alle Services automatisch
    const serviceFactory = ServiceFactory.getInstance();
    serviceFactory.registerAllServicesInAPI();

    this.logger.info("✅ Relationship App: All services registered successfully");
  }
}
