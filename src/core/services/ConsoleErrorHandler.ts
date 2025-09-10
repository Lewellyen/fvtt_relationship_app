import type { IErrorHandler, ILogger } from "../../interfaces";
import type { IFoundryAdapter } from "../adapters/IFoundryAdapter";
import { FoundryLogger } from "./FoundryLogger";
import { FoundryAdapter } from "../adapters/FoundryAdapter";

export class ConsoleErrorHandler implements IErrorHandler {
  // ✅ Metadaten direkt in der Klasse
  static readonly API_NAME = "errorHandler";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "ConsoleErrorHandler"; // ✅ Klassename für Dependency Resolution
  static readonly DEPENDENCIES = [FoundryLogger, FoundryAdapter]; // ✅ Dependencies explizit definiert

  constructor(
    private readonly logger: ILogger,
    private readonly foundryAdapter: IFoundryAdapter
  ) {}

  handle(error: any, context: string): void {
    this.logger.error(`Error in ${context}: ${error.message || error}`, error);

    // Show Foundry notification
    this.foundryAdapter.showError(`Relationship App: Error in ${context}`);
  }

  async handleAsync<T>(operation: () => Promise<T>, context: string): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      this.handle(error, context);
      throw error;
    }
  }
}
