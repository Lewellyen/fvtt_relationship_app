/**
 * Zentraler Logger-Service für das Relationship App System.
 * Ersetzt console.log/warn/error mit strukturiertem Logging.
 */
export class LoggerService {
  private static instance: LoggerService;
  private debugMode: boolean = false;

  private constructor() {
    // Debug-Modus standardmäßig deaktiviert
    this.debugMode = false;
  }

  static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  /**
   * Setzt den Debug-Modus
   */
  setDebugMode(enabled: boolean): void {
    this.debugMode = enabled;
  }

  /**
   * Log-Level: Info (nur im Debug-Modus sichtbar)
   */
  info(message: string, ...args: unknown[]): void {
    if (this.debugMode) {
      console.log(`[Relationship App] ℹ️ ${message}`, ...args);
    }
  }

  /**
   * Log-Level: Warnung (immer sichtbar)
   */
  warn(message: string, ...args: unknown[]): void {
    console.warn(`[Relationship App] ⚠️ ${message}`, ...args);
  }

  /**
   * Log-Level: Fehler (immer sichtbar)
   */
  error(message: string, error?: Error): void {
    console.error(`[Relationship App] ❌ ${message}`, error);
  }

  /**
   * Log-Level: Debug (nur im Debug-Modus sichtbar)
   */
  debug(message: string, ...args: unknown[]): void {
    if (this.debugMode) {
      console.debug(`[Relationship App] 🐛 ${message}`, ...args);
    }
  }

  /**
   * Log-Level: Performance (nur im Debug-Modus sichtbar)
   */
  performance(operation: string, duration: number): void {
    if (this.debugMode) {
      const status = duration > 100 ? "⚠️" : "✅";
      console.log(
        `[Relationship App] ${status} ${operation}: ${duration.toFixed(2)}ms`,
      );
    }
  }

  /**
   * Log-Level: System-Initialisierung
   */
  system(message: string): void {
    console.log(`[Relationship App] 🚀 ${message}`);
  }
}
