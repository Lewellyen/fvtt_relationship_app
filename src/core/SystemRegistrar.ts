import { registerHooks } from "./hooks";
import { HandlebarsHelperService } from "../services/HandlebarsHelperService";
import { RelationshipGraphDataModel } from "../models/RelationshipGraphDataModel";

/**
 * Zentralisierte Registrierung aller System-Komponenten.
 */
export class SystemRegistrar {
  /**
   * Registriere Helpers, Actor- und Sheet-Klassen beim init-Hook.
   */
  static registerInit(): void {
    registerHooks();
    HandlebarsHelperService.register();
    // Register the relationship graph data model for actors
    (CONFIG.Actor.dataModels as any)["relationshipGraph"] =
      RelationshipGraphDataModel as any;
  }

  /**
   * Registriere Anwendungs-Hooks beim ready-Hook.
   */
  static registerReady(): void {
    registerHooks();
  }
}
