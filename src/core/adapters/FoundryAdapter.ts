import type { IFoundryAdapter } from "./IFoundryAdapter";
import { MODULE_ID } from "../../constants";

/**
 * Foundry VTT API Adapter für Version 13
 *
 * Zentralisiert alle Foundry-Aufrufe und abstrahiert die API.
 * Bei Foundry-Updates muss nur diese Klasse angepasst werden.
 *
 * TODO: Bei Foundry v14+ Feature Detection implementieren:
 *
 * ```typescript
 * private hasNewAPI(): boolean {
 *   return typeof foundry.utils.generateId === 'function';
 * }
 *
 * generateId(): string {
 *   if (this.hasNewAPI()) {
 *     return foundry.utils.generateId(); // v14+
 *   }
 *   return foundry.utils.randomID(); // v13
 * }
 * ```
 */
export class FoundryAdapter implements IFoundryAdapter {
  static readonly API_NAME = "foundryAdapter";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "FoundryAdapter"; // ✅ Klassename für Dependency Resolution
  static readonly DEPENDENCIES = []; // ✅ Keine Dependencies erforderlich

  // Utils
  generateId(): string {
    return foundry.utils.randomID();
  }

  async loadDocument(uuid: string): Promise<unknown> {
    return await foundry.utils.fromUuid(uuid);
  }

  // UI Notifications
  showInfo(message: string): void {
    ui?.notifications?.info(message);
  }

  showError(message: string): void {
    ui?.notifications?.error(message);
  }

  showWarning(message: string): void {
    ui?.notifications?.warn(message);
  }

  showSuccess(message: string): void {
    ui?.notifications?.info(`✅ ${message}`);
  }

  // Hooks
  onInit(callback: () => void): void {
    Hooks.once("init", callback);
  }

  onReady(callback: () => Promise<void>): void {
    Hooks.once("ready", callback);
  }

  // Document Operations
  async updateDocument(document: unknown, data: unknown): Promise<unknown> {
    return await (document as any).update(data);
  }

  /**
   * Update-Dokument mit automatischem Reload für Datenkonsistenz
   *
   * Lädt das Dokument vor dem Update neu, um sicherzustellen,
   * dass die neuesten Daten verwendet werden. Ideal für Multi-User-Szenarien.
   *
   * @param document - Das zu aktualisierende Dokument
   * @param data - Die zu speichernden Daten
   * @returns Promise mit dem aktualisierten Dokument
   */
  async updateDocumentWithReload(document: unknown, data: unknown): Promise<unknown> {
    try {
      // Lade das Dokument neu für Datenkonsistenz
      const documentUuid = (document as any).uuid;
      const freshDocument = await this.loadDocument(documentUuid);

      if (freshDocument) {
        // ✅ Update mit frischen Daten
        return await (freshDocument as any).update(data);
      } else {
        // ✅ Fallback: Direktes Update wenn Reload fehlschlägt
        return await (document as any).update(data);
      }
    } catch (error) {
      // ✅ Error Handling mit Fallback
      // Logger über GlobalStateManager abrufen (falls verfügbar)
      try {
        const globalState = (globalThis as any).relationshipApp?.globalStateManager;
        if (globalState) {
          const logger = globalState.getService("logger");
          if (logger) {
            logger.warn("Failed to reload document, using direct update:", error);
          }
        }
      } catch {
        // Fallback: Logger nicht verfügbar, aber trotzdem nicht console verwenden
        // In diesem Fall wird der Fehler stillschweigend ignoriert und direktes Update versucht
      }
      return await (document as any).update(data);
    }
  }

  // Settings Operations
  registerSetting(key: string, config: ClientSettings.NumberConfig | ClientSettings.StringConfig | ClientSettings.BooleanConfig | ClientSettings.ObjectConfig): void {
    game?.settings?.register(MODULE_ID, key, config);
  }

  // Debug Setting registrieren - wird jetzt über SettingsService gemacht
  // registerDebugSetting(): void { ... } // Entfernt - zentralisiert in SettingsService

  getSetting(key: string): unknown {
    return game?.settings?.get(MODULE_ID, key);
  }

  async setSetting(key: string, value: unknown): Promise<unknown> {
    return await game?.settings?.set(MODULE_ID, key, value);
  }
}
