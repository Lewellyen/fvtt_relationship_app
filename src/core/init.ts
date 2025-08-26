import MetadataManagementApplication from "@/applications/MetadataManagementApplication";
import { RegistrationService, type IRegistrationService } from "../services/RegistrationService";

// Minimale Initialisierung
console.log("📦 Relationship App: Core init loaded");

// Foundry Hooks registrieren
Hooks.once("init", () => {
  console.log("🚀 Relationship App: Initializing...");
  console.log("✅ Relationship App: Initialized!");
});

Hooks.once("ready", () => {
  console.log("🚀 Relationship App: Ready-Phase...");
  const registrationService: IRegistrationService = new RegistrationService();
  try {
    registrationService.registerSheet();
    console.log("✅ Relationship App: Sheet registered successfully");
  } catch (error) {
    console.error("🚨 Relationship App: Error registering sheet:", error);
  }

  try {
    registrationService.registerModel();
    console.log("✅ Relationship App: Model registered successfully");
  } catch (error) {
    console.error("🚨 Relationship App: Error registering model:", error);
  }

  try {
    registrationService.registerServices();
    console.log("✅ Relationship App: Services registered successfully");
  } catch (error) {
    console.error("🚨 Relationship App: Error registering services:", error);
  }

  try {
    registrationService.registerMetadata();
    console.log("✅ Relationship App: Metadata registered successfully");
  } catch (error) {
    console.error("🚨 Relationship App: Error registering metadata:", error);
  }

  try {
    const metadataManagementApplication = new MetadataManagementApplication();
    metadataManagementApplication.render({ force: true });
    console.log("✅ Relationship App: Metadata registered successfully");
  } catch (error) {
    console.error("🚨 Relationship App: Error registering metadata:", error);
  }

  console.log("✅ Relationship App: Ready!");
});
