/**
 * Interface für CSS-Management-Service
 *
 * Bietet zentrale CSS-Loading-Funktionalität für alle Applications
 * und verhindert Code-Duplikation.
 */
export interface ICSSManager {
  /**
   * Lädt eine CSS-Datei, falls sie noch nicht geladen wurde
   * @param cssPath - Pfad zur CSS-Datei
   * @returns Promise<void>
   */
  loadCSS(cssPath: string): Promise<void>;

  /**
   * Entfernt eine CSS-Datei aus dem DOM
   * @param cssPath - Pfad zur CSS-Datei
   * @returns Promise<void>
   */
  unloadCSS(cssPath: string): Promise<void>;

  /**
   * Prüft ob eine CSS-Datei bereits geladen ist
   * @param cssPath - Pfad zur CSS-Datei
   * @returns boolean
   */
  isCSSLoaded(cssPath: string): boolean;

  /**
   * Lädt alle CSS-Dateien für eine Application
   * @param cssPaths - Array von CSS-Pfaden
   * @returns Promise<void>
   */
  loadMultipleCSS(cssPaths: string[]): Promise<void>;
}
