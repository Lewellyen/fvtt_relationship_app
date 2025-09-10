/**
 * Logger Helper - Utility für Application-Klassen
 * Bietet einheitliche Logging-Funktionalität mit Fallback auf console
 */

export class LoggerHelper {
  private static get logger(): any {
    return (globalThis as any).relationshipApp?.logger;
  }

  static info(className: string, message: string, ...args: any[]): void {
    if (this.logger) {
      this.logger.info(`[${className}] ${message}`, ...args);
    } else {
      console.log(`[${className}] ${message}`, ...args);
    }
  }

  static warn(className: string, message: string, ...args: any[]): void {
    if (this.logger) {
      this.logger.warn(`[${className}] ${message}`, ...args);
    } else {
      console.warn(`[${className}] ${message}`, ...args);
    }
  }

  static error(className: string, message: string, ...args: any[]): void {
    if (this.logger) {
      this.logger.error(`[${className}] ${message}`, ...args);
    } else {
      console.error(`[${className}] ${message}`, ...args);
    }
  }

  static debug(className: string, message: string, ...args: any[]): void {
    if (this.logger) {
      this.logger.debug(`[${className}] ${message}`, ...args);
    } else {
      console.debug(`[${className}] ${message}`, ...args);
    }
  }
}
