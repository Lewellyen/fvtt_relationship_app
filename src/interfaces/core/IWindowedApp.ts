/**
 * Windowed Application Interface
 *
 * Definiert die Schnittstelle für Fenster-basierte Anwendungen
 * die über das Service-System verwaltet werden können
 */
export interface IWindowedApp {
  /**
   * Schließt die Anwendung
   * @param options - Optionen für das Schließen
   */
  close(options?: { animate?: boolean; closeKey?: boolean; submitted?: boolean }): Promise<this>;

  /**
   * Prüft ob die Anwendung sichtbar ist
   */
  get isVisible(): boolean;

  /**
   * Eindeutige ID der Anwendung
   */
  get id(): string;
}
