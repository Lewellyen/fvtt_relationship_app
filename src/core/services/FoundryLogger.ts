import type { ILogger } from "../interfaces/ILogger";
import { BaseService } from "../../services/IServiceFactory";
import type { IFoundryAdapter } from "../adapters/IFoundryAdapter";
import { MODULE_ID_PREFIX } from "../../constants";

export class FoundryLogger extends BaseService implements ILogger {
  // ✅ Metadaten automatisch durch BaseService erzwungen
  readonly API_NAME = 'logger';
  readonly SERVICE_TYPE = 'singleton' as const;

  constructor(private foundryAdapter: IFoundryAdapter) {
    super();
  }

  info(message: string): void {
    console.log(`${MODULE_ID_PREFIX} ℹ️ ${message}`);
  }

  warn(message: string): void {
    console.warn(`${MODULE_ID_PREFIX} ⚠️ ${message}`);
  }

  error(message: string, error?: any): void {
    console.error(`${MODULE_ID_PREFIX} ❌ ${message}`);
    if (error) {
      console.error(`${MODULE_ID_PREFIX} Full error details:`, error);
    }
  }

  debug(message: string): void {
    if (this.foundryAdapter.getSetting('debug') === true) {
      console.debug(`${MODULE_ID_PREFIX} 🐛 ${message}`);
    }
  }
}
