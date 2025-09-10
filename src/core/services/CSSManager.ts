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
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "CSSManager"; // ✅ Klassename für Dependency Resolution
  static readonly DEPENDENCIES = [FoundryLogger]; // ✅ Dependencies explizit definiert

  private loadedCSS: Set<string> = new Set();

  constructor(private readonly logger: ILogger) {
    // ✅ Test ob FoundryLogger korrekt injiziert wurde
    this.testLoggerInjection();
  }

  /**
   * Testet ob der FoundryLogger korrekt injiziert wurde und funktioniert
   */
  private testLoggerInjection(): void {
    console.log(`[CSSManager] 🔍 Testing FoundryLogger injection...`);
    
    // Test 1: Logger ist definiert
    if (this.logger) {
      console.log(`[CSSManager] ✅ FoundryLogger injected successfully`);
      
      // Test 2: Logger hat die erwarteten Methoden
      const hasInfo = typeof this.logger.info === 'function';
      const hasError = typeof this.logger.error === 'function';
      const hasWarn = typeof this.logger.warn === 'function';
      
      console.log(`[CSSManager] 🔍 Logger methods check:`, {
        hasInfo,
        hasError, 
        hasWarn,
        loggerType: this.logger.constructor.name
      });
      
      if (hasInfo && hasError && hasWarn) {
        console.log(`[CSSManager] ✅ FoundryLogger methods available`);
        
        // Test 3: Logger funktioniert tatsächlich
        try {
          this.logger.info(`[CSSManager] 🎯 FoundryLogger test successful - injection working!`);
          console.log(`[CSSManager] ✅ FoundryLogger functional test passed`);
        } catch (error) {
          console.error(`[CSSManager] ❌ FoundryLogger functional test failed:`, error);
        }
      } else {
        console.error(`[CSSManager] ❌ FoundryLogger missing required methods`);
      }
    } else {
      console.error(`[CSSManager] ❌ FoundryLogger injection failed - logger is undefined`);
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
        console.log(`[CSSManager] CSS already loaded: ${cssPath}`);
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
        console.log(`[CSSManager] CSS loaded successfully: ${cssPath}`);
      }
    } catch (error) {
      if (this.logger) {
        this.logger.error(`[CSSManager] Failed to load CSS: ${cssPath}`, error);
      } else {
        console.error(`[CSSManager] Failed to load CSS: ${cssPath}`, error);
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
        console.log(`[CSSManager] CSS unloaded: ${cssPath}`);
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
      console.log(`[CSSManager] Loaded ${cssPaths.length} CSS files`);
    }
  }
}
