import { HandlebarsHelperService } from "../services/HandlebarsHelperService";
import { registerHooks } from "./hooks";
import JournalEntryPageRelationshipGraphSheet from "../applications/JournalEntryPageRelationshipGraphSheet";
import { RelationshipGraphDataModel } from "../models/RelationshipGraphDataModel";

/**
 * Zentralisierte Registrierung aller System-Komponenten.
 * Based on Foundry V13 API: https://foundryvtt.com/api/#journal-entry-page
 */
export class SystemRegistrar {
  /**
   * Registriere Helpers, Document-Klassen und Applications beim init-Hook.
   */
  static registerInit(): void {
    HandlebarsHelperService.register();

    // Registriere das Relationship Graph DataModel
    this.registerDataModel();
  }

  /**
   * Registriere Anwendungs-Hooks beim ready-Hook.
   */
  static registerReady(): void {
    registerHooks();
    this.registerSheetClass();
  }

  /**
   * Registriere das Relationship Graph DataModel
   */
  private static registerDataModel(): void {
    // Registriere das custom DataModel für JournalEntryPage
    Object.assign(CONFIG.JournalEntryPage.dataModels, {
      "relationship-app.relationship-graph": RelationshipGraphDataModel,
    });

    console.log(
      "Relationship Graph DataModel registered:",
      CONFIG.JournalEntryPage.dataModels,
    );
  }

  /**
   * Registriere die Relationship Graph Sheet-Klasse
   */
  private static registerSheetClass(): void {
    // Registriere die Sheet-Klasse für den custom Document-Typ
    try {
      (CONFIG.JournalEntryPage.sheetClasses as any)[
        "relationship-app.relationship-graph"
      ] = {
        [JournalEntryPageRelationshipGraphSheet.name]: {
          cls: JournalEntryPageRelationshipGraphSheet,
          id: "relationship-app.relationship-graph",
          label: "Relationship Graph",
          default: true,
          canConfigure: true,
          canBeDefault: true,
        },
      };

      console.log(
        "Relationship Graph Sheet registered:",
        CONFIG.JournalEntryPage.sheetClasses,
      );
      // Debug: Alle Sheet-Klassen für diesen Typ ausgeben
      console.log(
        "Alle Sheet-Klassen für relationship-app.relationship-graph:",
        (CONFIG.JournalEntryPage.sheetClasses as any)[
          "relationship-app.relationship-graph"
        ],
      );
    } catch (error) {
      console.error("Error registering Relationship Graph Sheet:", error);
    }
  }
}
