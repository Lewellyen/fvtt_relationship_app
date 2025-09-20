/**
 * Interface für Foundry VTT API-Abstraktion
 *
 * Zentralisiert alle Foundry-Aufrufe für bessere Wartbarkeit und Testbarkeit.
 * Bei Foundry-Updates müssen nur die Implementierungen angepasst werden.
 */
export interface IFoundryAdapter {
  // Utils
  generateId(): string;
  loadDocument<TDoc extends foundry.abstract.Document<any, any> | object>(
    uuid: string
  ): Promise<TDoc | null>;
  deepClone<T>(obj: T): T;

  // UI Notifications
  showInfo(message: string): void;
  showError(message: string): void;
  showWarning(message: string): void;
  showSuccess(message: string): void;

  // Hooks
  onInit(callback: () => void): void;
  onReady(callback: () => Promise<void> | void): void;

  // Document Operations
  updateDocument<
    TDoc extends foundry.abstract.Document<any, any>,
    TData extends Record<string, unknown>,
  >(
    document: TDoc,
    data: TData
  ): Promise<TDoc>;
  updateDocumentWithReload<
    TDoc extends foundry.abstract.Document<any, any>,
    TData extends Record<string, unknown>,
  >(
    document: TDoc,
    data: TData
  ): Promise<TDoc>;

  // Settings Operations
  registerSetting(key: string, config: ClientSettings.SettingConfig): void;
  getSetting(key: string): unknown;
  setSetting(key: string, value: unknown): Promise<unknown>;
}
