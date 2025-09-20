import type { ILogger } from "../../interfaces";
import { MODULE_ID_PREFIX } from "../../constants";

export class FoundryLogger implements ILogger {
  // ✅ Metadaten für API-Registrierung
  static readonly API_NAME = "logger";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "FoundryLogger"; // ✅ Klassename für Dependency Resolution
  static readonly DEPENDENCIES = []; // ✅ Keine Dependencies erforderlich

  // ✅ Getter für den echten Klassennamen (gegen Name Mangling)
  static get className() {
    return this.CLASS_NAME;
  }

  constructor() {}

  info(message: any, ...args: any[]): void {
    if (typeof message === "object" && message !== null) {
      console.log(`${MODULE_ID_PREFIX} ℹ️`, message, ...args);
    } else {
      console.log(`${MODULE_ID_PREFIX} ℹ️ ${message}`, ...args);
    }
  }

  warn(message: any, ...args: any[]): void {
    if (typeof message === "object" && message !== null) {
      console.warn(`${MODULE_ID_PREFIX} ⚠️`, message, ...args);
    } else {
      console.warn(`${MODULE_ID_PREFIX} ⚠️ ${message}`, ...args);
    }
  }

  error(message: any, ...args: any[]): void {
    if (typeof message === "object" && message !== null) {
      console.error(`${MODULE_ID_PREFIX} ❌`, message, ...args);
    } else {
      console.error(`${MODULE_ID_PREFIX} ❌ ${message}`, ...args);
    }
  }

  debug(message: any, ...args: any[]): void {
    // Debug-Logging nur wenn Setting aktiviert ist
    // Graceful handling: Wenn Setting noch nicht registriert ist, debug-Logging deaktivieren
    let debugEnabled = false;
    try {
      debugEnabled = game?.settings?.get("relationship-app" as any, "debugLogs" as any) === true;
    } catch (error) {
      // Setting noch nicht registriert - debug-Logging deaktivieren
      debugEnabled = false;
    }
    
    if (!debugEnabled) return;
    
    if (typeof message === "object" && message !== null) {
      console.debug(`${MODULE_ID_PREFIX} 🐛`, message, ...args);
    } else {
      console.debug(`${MODULE_ID_PREFIX} 🐛 ${message}`, ...args);
    }
  }
}
