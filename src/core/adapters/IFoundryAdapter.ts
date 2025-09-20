/**
 * Interface für Foundry VTT API-Abstraktion
 *
 * Zentralisiert alle Foundry-Aufrufe für bessere Wartbarkeit und Testbarkeit.
 * Bei Foundry-Updates müssen nur die Implementierungen angepasst werden.
 */
export interface IFoundryAdapter {
  // Utils
  generateId(): string;
  loadDocument(uuid: string): Promise<unknown>;

  // UI Notifications
  showInfo(message: string): void;
  showError(message: string): void;
  showWarning(message: string): void;
  showSuccess(message: string): void;

  // Hooks
  onInit(callback: () => void): void;
  onReady(callback: () => Promise<void>): void;

  // Document Operations
  updateDocument(document: unknown, data: unknown): Promise<unknown>;
  updateDocumentWithReload(document: unknown, data: unknown): Promise<unknown>;

  // Settings Operations
  registerSetting(key: string, config: ClientSettings.NumberConfig | ClientSettings.StringConfig | ClientSettings.BooleanConfig | ClientSettings.ObjectConfig): void;
  getSetting(key: string): unknown;
  setSetting(key: string, value: unknown): Promise<unknown>;
}
