/**
 * Zentraler Logger-Service für das WH40K Deathwatch System.
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
      console.log(`[WH40K Deathwatch] ℹ️ ${message}`, ...args);
    }
  }

  /**
   * Log-Level: Warnung (immer sichtbar)
   */
  warn(message: string, ...args: unknown[]): void {
    console.warn(`[WH40K Deathwatch] ⚠️ ${message}`, ...args);
  }

  /**
   * Log-Level: Fehler (immer sichtbar)
   */
  error(message: string, error?: Error): void {
    console.error(`[WH40K Deathwatch] ❌ ${message}`, error);
  }

  /**
   * Log-Level: Debug (nur im Debug-Modus sichtbar)
   */
  debug(message: string, ...args: unknown[]): void {
    if (this.debugMode) {
      console.debug(`[WH40K Deathwatch] 🐛 ${message}`, ...args);
    }
  }

  /**
   * Log-Level: Performance (nur im Debug-Modus sichtbar)
   */
  performance(operation: string, duration: number): void {
    if (this.debugMode) {
      const status = duration > 100 ? "⚠️" : "✅";
      console.log(
        `[WH40K Deathwatch] ${status} ${operation}: ${duration.toFixed(2)}ms`,
      );
    }
  }

  /**
   * Log-Level: System-Initialisierung
   */
  system(message: string): void {
    console.log(`[WH40K Deathwatch] 🚀 ${message}`);
  }
}
