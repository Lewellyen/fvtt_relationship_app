import JournalEntryPageRelationshipGraphSheet from "../applications/JournalEntryPageRelationshipGraphSheet";
import { RelationshipGraphModel } from "../models/RelationsShipGraphModel";

// Minimale Initialisierung
console.log("📦 Relationship App: Core init loaded");

// Foundry Hooks registrieren
Hooks.once("init", () => {
  console.log("🚀 Relationship App: Initializing...");
  console.log("✅ Relationship App: Initialized!");
});

Hooks.once("ready", () => {
  console.log("🚀 Relationship App: Ready-Phase...");
  console.log("🚀 Relationship App: Registering JournalEntryPageRelationshipGraphSheet...");
  const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
  try {
    DocumentSheetConfig.registerSheet(
      JournalEntryPage, // Die Dokumenten-Klasse
      "relationship-app", // Dein Modul-Scope (module.json → name)
      JournalEntryPageRelationshipGraphSheet, // Deine Sheet-Klasse
      {
        label: "Relationship App.RelationshipGraph", // Lokalisierbarer Schlüssel für den Namen im Dropdown
        makeDefault: true,
        types: ["relationship-app.relationship-graph"], // Soll es als default angeboten werden?
      }
    );
    console.log("✅ Relationship App: Sheet registered successfully");
  } catch (error) {
    console.error("🚨 Relationship App: Error registering sheet:", error);
  }

  console.log("🚀 Relationship App: Registering RelationshipGraphModel...");
  try {
    CONFIG.JournalEntryPage.dataModels["relationship-app.relationship-graph"] =
      RelationshipGraphModel;
    console.log("✅ Relationship App: Model registered successfully");
  } catch (error) {
    console.error("🚨 Relationship App: Error registering model:", error);
  }

  console.log("✅ Relationship App: Ready!");
});
