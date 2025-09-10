/**
 * Interface für Foundry VTT API-Abstraktion
 *
 * Zentralisiert alle Foundry-Aufrufe für bessere Wartbarkeit und Testbarkeit.
 * Bei Foundry-Updates müssen nur die Implementierungen angepasst werden.
 */
export interface IFoundryAdapter {
  // Utils
  generateId(): string;
  loadDocument(uuid: string): Promise<any>;

  // UI Notifications
  showInfo(message: string): void;
  showError(message: string): void;
  showWarning(message: string): void;
  showSuccess(message: string): void;

  // Hooks
  onInit(callback: () => void): void;
  onReady(callback: () => Promise<void>): void;

  // Document Operations
  updateDocument(document: any, data: any): Promise<any>;
  updateDocumentWithReload(document: any, data: any): Promise<any>;

  // Settings Operations
  registerSetting(key: string, config: any): void;
  getSetting(key: string): any;
  setSetting(key: string, value: any): Promise<any>;
}
