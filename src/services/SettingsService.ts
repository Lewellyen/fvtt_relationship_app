import type { ILogger } from "../interfaces";
import type { IFoundryAdapter } from "../core/adapters/IFoundryAdapter";
import { MODULE_ID } from "../constants";

/**
 * SettingsService - Zentrale Verwaltung aller Module-Settings
 * 
 * Single Responsibility: Nur Settings-Registrierung und -Abfrage
 * Kapselt alle Foundry-Settings-Operationen
 */
export class SettingsService {
  static readonly API_NAME = "settingsService";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "SettingsService";
  static readonly DEPENDENCIES = []; // Dependencies werden über Container injiziert

  private foundryAdapter?: IFoundryAdapter;

  constructor(logger?: ILogger, foundryAdapter?: IFoundryAdapter) {
    this.foundryAdapter = foundryAdapter;
  }

  /**
   * Alle Settings registrieren
   */
  registerAll(): void {
    if (!this.foundryAdapter) {
      throw new Error("FoundryAdapter not available for settings registration");
    }

    // Debug-Logging Setting
    this.foundryAdapter.registerSetting("debugLogs", {
      name: "Debug Logging",
      hint: "Enable detailed debug logging for development",
      scope: "world",
      config: true,
      type: Boolean,
      default: false,
    });

    // Metadata Setting (bereits vorhanden, aber hier zentralisiert)
    this.foundryAdapter.registerSetting("metadata", {
      name: "Relationship App Metadata",
      hint: "Metadata for the Relationship App",
      scope: "world",
      config: false,
      type: Object,
    });

    // Weitere Settings können hier hinzugefügt werden
  }

  /**
   * Boolean-Setting abrufen
   */
  getBoolean(key: string): boolean {
    return this.foundryAdapter?.getSetting(key) ?? false;
  }

  /**
   * String-Setting abrufen
   */
  getString(key: string, defaultValue: string = ""): string {
    return this.foundryAdapter?.getSetting(key) ?? defaultValue;
  }

  /**
   * Number-Setting abrufen
   */
  getNumber(key: string, defaultValue: number = 0): number {
    return this.foundryAdapter?.getSetting(key) ?? defaultValue;
  }

  /**
   * Object-Setting abrufen
   */
  getObject<T = any>(key: string, defaultValue: T): T {
    return this.foundryAdapter?.getSetting(key) ?? defaultValue;
  }

  /**
   * Setting setzen
   */
  async setSetting(key: string, value: any): Promise<any> {
    if (!this.foundryAdapter) {
      throw new Error("FoundryAdapter not available for setting update");
    }
    return await this.foundryAdapter.setSetting(key, value);
  }

  /**
   * Debug-Logging aktiviert?
   */
  isDebugLoggingEnabled(): boolean {
    return this.getBoolean("debugLogs");
  }

  /**
   * Metadata abrufen
   */
  getMetadata(): any {
    return this.getObject("metadata", {});
  }

  /**
   * Metadata setzen
   */
  async setMetadata(metadata: any): Promise<any> {
    return await this.setSetting("metadata", metadata);
  }
}
