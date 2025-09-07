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

  static readonly API_NAME = 'foundryAdapter';
  static readonly SERVICE_TYPE = 'singleton' as const;

  // Utils
  generateId(): string {
    return foundry.utils.randomID();
  }
  
  async loadDocument(uuid: string): Promise<any> {
    return await foundry.utils.fromUuid(uuid as any);
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
  async updateDocument(document: any, data: any): Promise<any> {
    return await document.update(data);
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
  async updateDocumentWithReload(document: any, data: any): Promise<any> {
    try {
      // Lade das Dokument neu für Datenkonsistenz
      const documentUuid = document.uuid;
      const freshDocument = await this.loadDocument(documentUuid);
      
      if (freshDocument) {
        // ✅ Update mit frischen Daten
        return await freshDocument.update(data);
      } else {
        // ✅ Fallback: Direktes Update wenn Reload fehlschlägt
        return await document.update(data);
      }
    } catch (error) {
      // ✅ Error Handling mit Fallback
      console.warn("Failed to reload document, using direct update:", error);
      return await document.update(data);
    }
  }
  
  // Settings Operations
  registerSetting(key: string, config: any): void {
    game?.settings?.register(MODULE_ID as any, key as any, config);
  }
  
  getSetting(key: string): any {
    return game?.settings?.get(MODULE_ID as any, key as any);
  }
  
  async setSetting(key: string, value: any): Promise<any> {
    return await game?.settings?.set(MODULE_ID as any, key as any, value);
  }
}
