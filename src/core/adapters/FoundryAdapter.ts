import type { IFoundryAdapter } from "./IFoundryAdapter";
import { MODULE_ID } from "../../constants";
import type { ILogger } from "../../interfaces";
import { FoundryLogger } from "../services/FoundryLogger";

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
  static readonly DEPENDENCIES = [FoundryLogger];

  constructor(private readonly logger: ILogger) {}

  // Utils
  generateId(): string {
    return foundry.utils.randomID();
  }

  async loadDocument<TDoc extends foundry.abstract.Document<any, any> | object>(
    uuid: string
  ): Promise<TDoc | null> {
    const doc = await foundry.utils.fromUuid(uuid);
    return (doc ?? null) as TDoc | null;
  }

  deepClone<T>(obj: T): T {
    return foundry.utils.deepClone(obj);
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

  onReady(callback: () => Promise<void> | void): void {
    Hooks.once("ready", callback);
  }

  // Document Operations
  async updateDocument<
    TDoc extends foundry.abstract.Document<any, any>,
    TData extends Record<string, unknown>,
  >(document: TDoc, data: TData): Promise<TDoc> {
    return (await (document as any).update(data)) as TDoc;
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
  async updateDocumentWithReload<
    TDoc extends foundry.abstract.Document<any, any>,
    TData extends Record<string, unknown>,
  >(document: TDoc, data: TData): Promise<TDoc> {
    try {
      // Lade das Dokument neu für Datenkonsistenz
      const documentUuid = (document as any).uuid as string;
      const freshDocument = await this.loadDocument<TDoc>(documentUuid);

      if (freshDocument) {
        // ✅ Update mit frischen Daten
        return (await (freshDocument as any).update(data)) as TDoc;
      } else {
        // ✅ Fallback: Direktes Update wenn Reload fehlschlägt
        return (await (document as any).update(data)) as TDoc;
      }
    } catch (error) {
      this.logger.warn("Failed to reload document, using direct update:", error as unknown);
      return (await (document as any).update(data)) as TDoc;
    }
  }

  // Settings Operations
  registerSetting(key: string, config: ClientSettings.SettingConfig): void {
    (game?.settings as any)?.register(MODULE_ID as any, key, config);
  }

  // Debug Setting registrieren - wird jetzt über SettingsService gemacht
  // registerDebugSetting(): void { ... } // Entfernt - zentralisiert in SettingsService

  getSetting(key: string): unknown {
    return (game?.settings as any)?.get(MODULE_ID as any, key);
  }

  async setSetting(key: string, value: unknown): Promise<unknown> {
    return await (game?.settings as any)?.set(MODULE_ID as any, key, value);
  }
}
