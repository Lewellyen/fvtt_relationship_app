import type { ILogger } from "../interfaces";
import type { IFoundryAdapter } from "../core/adapters/IFoundryAdapter";
import { MODULE_ID, SETTINGS_KEYS } from "../constants";

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

  private foundryAdapter: IFoundryAdapter | undefined;

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
    this.foundryAdapter.registerSetting(
      SETTINGS_KEYS.DEBUG_LOGS as any,
      {
        key: SETTINGS_KEYS.DEBUG_LOGS,
        namespace: MODULE_ID,
        name: "Debug Logging",
        hint: "Enable detailed debug logging for development",
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
      } as any
    );

    // Metadata Setting (bereits vorhanden, aber hier zentralisiert)
    this.foundryAdapter.registerSetting(
      SETTINGS_KEYS.METADATA as any,
      {
        key: SETTINGS_KEYS.METADATA,
        namespace: MODULE_ID,
        name: "Relationship App Metadata",
        hint: "Metadata for the Relationship App",
        scope: "world",
        config: false,
        type: Object,
        default: {},
      } as any
    );

    // Weitere Settings können hier hinzugefügt werden
  }

  /**
   * Boolean-Setting abrufen
   */
  getBoolean(key: string): boolean {
    return (this.foundryAdapter?.getSetting(key) as boolean) ?? false;
  }

  /**
   * String-Setting abrufen
   */
  getString(key: string, defaultValue: string = ""): string {
    return (this.foundryAdapter?.getSetting(key) as string) ?? defaultValue;
  }

  /**
   * Number-Setting abrufen
   */
  getNumber(key: string, defaultValue: number = 0): number {
    return (this.foundryAdapter?.getSetting(key) as number) ?? defaultValue;
  }

  /**
   * Object-Setting abrufen
   */
  getObject<T = any>(key: string, defaultValue: T): T {
    return (this.foundryAdapter?.getSetting(key) as T) ?? defaultValue;
  }

  /**
   * Setting setzen
   */
  async setSetting<T>(key: string, value: T): Promise<T> {
    if (!this.foundryAdapter) {
      throw new Error("FoundryAdapter not available for setting update");
    }
    return (await this.foundryAdapter.setSetting(key, value)) as T;
  }

  /**
   * Debug-Logging aktiviert?
   */
  isDebugLoggingEnabled(): boolean {
    return this.getBoolean(SETTINGS_KEYS.DEBUG_LOGS as any);
  }

  /**
   * Metadata abrufen
   */
  getMetadata<T = unknown>(): T {
    return this.getObject(SETTINGS_KEYS.METADATA as any, {} as T);
  }

  /**
   * Metadata setzen
   */
  async setMetadata<T>(metadata: T): Promise<T> {
    return await this.setSetting(SETTINGS_KEYS.METADATA as any, metadata);
  }
}
