import { HandlebarsHelperService } from "../services/HandlebarsHelperService";
import { registerHooks } from "./hooks";

/**
 * Zentralisierte Registrierung aller System-Komponenten.
 */
export class SystemRegistrar {
  /**
   * Registriere Helpers, Actor- und Sheet-Klassen beim init-Hook.
   */
  static registerInit(): void {
    HandlebarsHelperService.register();
  }

  /**
   * Registriere Anwendungs-Hooks beim ready-Hook.
   */
  static registerReady(): void {
    registerHooks();
  }
}
