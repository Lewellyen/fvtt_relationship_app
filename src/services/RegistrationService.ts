import JournalEntryPageRelationshipGraphSheet from "../applications/JournalEntryPageRelationshipGraphSheet";
import { RelationshipGraphModel } from "../models/RelationsShipGraphModel";
import { ServiceManager } from "./ServiceManager";
import { SERVICE_IDENTIFIERS } from "./IServiceFactory";
import { MODULE_ID, MODULE_METADATA_KEY } from "../constants";

export interface IRegistrationService {
  registerSheet(): void;
  registerModel(): void;
  registerServices(): void;
  registerMetadata(): void;
}

export class RegistrationService implements IRegistrationService {
  registerSheet(): void {
    console.log("🚀 Relationship App: Registering JournalEntryPageRelationshipGraphSheet...");
    const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
    DocumentSheetConfig.registerSheet(
      JournalEntryPage,
      "relationship-app",
      JournalEntryPageRelationshipGraphSheet,
      {
        label: "Relationship App.RelationshipGraph",
        makeDefault: true,
        types: ["relationship-app.relationship-graph"],
      }
    );
  }

  registerModel(): void {
    console.log("🚀 Relationship App: Registering RelationshipGraphModel...");
    CONFIG.JournalEntryPage.dataModels["relationship-app.relationship-graph"] =
      RelationshipGraphModel;
  }

  registerMetadata(): void {
    console.log("🚀 Relationship App: Registering metadata...");
    game?.settings?.register(MODULE_ID as any, MODULE_METADATA_KEY as any, {
      name: "Relationship App Metadata",
      hint: "Metadata for the Relationship App",
      scope: "world",
      config: false,
      type: Object,
    });
  }

  registerServices(): void {
    console.log("🚀 Relationship App: Registering services in global API...");

    // Create service manager instance
    const serviceManager = ServiceManager.getInstance();

    // Register services in global API
    if (!(globalThis as any).game?.modules?.get("relationship-app")?.api) {
      (globalThis as any).game.modules.get("relationship-app").api = {};
    }

    const moduleApi = (globalThis as any).game.modules.get("relationship-app").api;

    // Register individual services
    moduleApi.persistenceService = serviceManager.getService(
      SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_PERSISTENCE
    );
    moduleApi.demoDataService = serviceManager.getService(
      SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH_DEMO_DATA
    );

    // Create graph service with dependencies - we'll create it lazily when needed
    // since it requires a document instance
    moduleApi.createGraphService = (document: any) => {
      return serviceManager.getService(
        SERVICE_IDENTIFIERS.RELATIONSHIP_GRAPH,
        document.id, // Use document ID as cache key
        document,
        moduleApi.persistenceService
      );
    };

    // Register service manager
    moduleApi.serviceManager = serviceManager;

    console.log("✅ Relationship App: Services registered successfully");
  }
}
