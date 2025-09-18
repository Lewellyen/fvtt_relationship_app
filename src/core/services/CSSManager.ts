import type { ICSSManager, ILogger } from "../../interfaces";
// ✅ Services direkt importieren (zirkuläre Abhängigkeiten vermeiden)
import { FoundryLogger } from "./FoundryLogger";

/**
 * CSS-Management-Service
 *
 * Zentrale CSS-Loading-Funktionalität für alle Applications.
 * Verhindert Code-Duplikation und bietet einheitliche CSS-Verwaltung.
 */
export class CSSManager implements ICSSManager {
  // ✅ Metadaten für API-Registrierung
  static readonly API_NAME = "cssManager";
  static readonly SERVICE_TYPE = "scoped" as const;
  static readonly CLASS_NAME = "CSSManager"; // ✅ Klassename für Dependency Resolution
  static readonly DEPENDENCIES = [FoundryLogger]; // ✅ Dependencies explizit definiert - FoundryLogger bereits an erster Stelle

  private loadedCSS: Set<string> = new Set();

  constructor(private readonly logger: ILogger) {
    // ✅ Test ob FoundryLogger korrekt injiziert wurde
    this.testLoggerInjection();
  }

  /**
   * Testet ob der FoundryLogger korrekt injiziert wurde und funktioniert
   */
  private testLoggerInjection(): void {
    this.writeLog("debug", `[CSSManager] 🔍 Testing FoundryLogger injection...`);

    // Test 1: Logger ist definiert
    if (this.logger) {
      this.writeLog("debug", `[CSSManager] ✅ FoundryLogger injected successfully`);

      // Test 2: Logger hat die erwarteten Methoden
      const hasInfo = typeof this.logger.info === "function";
      const hasError = typeof this.logger.error === "function";
      const hasWarn = typeof this.logger.warn === "function";

      this.writeLog("debug", `[CSSManager] 🔍 Logger methods check:`, {
        hasInfo,
        hasError,
        hasWarn,
        loggerType: this.logger.constructor.name,
      });

      if (hasInfo && hasError && hasWarn) {
        this.writeLog("debug", `[CSSManager] ✅ FoundryLogger methods available`);

        // Test 3: Logger funktioniert tatsächlich
        try {
          this.logger.info(`[CSSManager] 🎯 FoundryLogger test successful - injection working!`);
          this.writeLog("debug", `[CSSManager] ✅ FoundryLogger functional test passed`);
        } catch (error) {
          this.writeLog("error", `[CSSManager] ❌ FoundryLogger functional test failed:`, error);
        }
      } else {
        this.writeLog("error", `[CSSManager] ❌ FoundryLogger missing required methods`);
      }
    } else {
      this.writeLog(
        "error",
        `[CSSManager] ❌ FoundryLogger injection failed - logger is undefined`
      );
    }
  }

  /**
   * Lädt eine CSS-Datei, falls sie noch nicht geladen wurde
   */
  async loadCSS(cssPath: string): Promise<void> {
    if (this.isCSSLoaded(cssPath)) {
      if (this.logger) {
        this.logger.info(`[CSSManager] CSS already loaded: ${cssPath}`);
      } else {
        this.writeLog("debug", `[CSSManager] CSS already loaded: ${cssPath}`);
      }
      return;
    }

    try {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = cssPath;
      link.id = `css-${cssPath.replace(/[^a-zA-Z0-9]/g, "-")}`;

      document.head.appendChild(link);
      this.loadedCSS.add(cssPath);

      if (this.logger) {
        this.logger.info(`[CSSManager] CSS loaded successfully: ${cssPath}`);
      } else {
        this.writeLog("info", `[CSSManager] CSS loaded successfully: ${cssPath}`);
      }
    } catch (error) {
      if (this.logger) {
        this.logger.error(`[CSSManager] Failed to load CSS: ${cssPath}`, error);
      } else {
        this.writeLog("error", `[CSSManager] Failed to load CSS: ${cssPath}`, error);
      }
      throw error;
    }
  }

  /**
   * Entfernt eine CSS-Datei aus dem DOM
   */
  async unloadCSS(cssPath: string): Promise<void> {
    const linkId = `css-${cssPath.replace(/[^a-zA-Z0-9]/g, "-")}`;
    const link = document.getElementById(linkId);

    if (link) {
      link.remove();
      this.loadedCSS.delete(cssPath);

      if (this.logger) {
        this.logger.info(`[CSSManager] CSS unloaded: ${cssPath}`);
      } else {
        this.writeLog("info", `[CSSManager] CSS unloaded: ${cssPath}`);
      }
    }
  }

  /**
   * Prüft ob eine CSS-Datei bereits geladen ist
   */
  isCSSLoaded(cssPath: string): boolean {
    return (
      this.loadedCSS.has(cssPath) || document.querySelector(`link[href*="${cssPath}"]`) !== null
    );
  }

  /**
   * Lädt alle CSS-Dateien für eine Application
   */
  async loadMultipleCSS(cssPaths: string[]): Promise<void> {
    const loadPromises = cssPaths.map((cssPath) => this.loadCSS(cssPath));
    await Promise.all(loadPromises);

    if (this.logger) {
      this.logger.info(`[CSSManager] Loaded ${cssPaths.length} CSS files`);
    } else {
      this.writeLog("info", `[CSSManager] Loaded ${cssPaths.length} CSS files`);
    }
  }

  private writeLog(modus: "info" | "warn" | "error" | "debug", message: string, ...args: any[]) {
    if (this.logger) {
      this.logger[modus](message, ...args);
    } else {
      console[modus](message, ...args);
    }
  }
}
