import JournalEntryPageRelationshipGraphSheet from "../applications/JournalEntryPageRelationshipGraphSheet";
import { RelationshipGraphModel } from "../models/RelationsShipGraphModel";

export interface IRegistrationService {
  registerSheet(): void;
  registerModel(): void;
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
}
