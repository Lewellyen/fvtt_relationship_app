import type { IErrorHandler } from "../interfaces/IErrorHandler";
import type { ILogger } from "../interfaces/ILogger";
import type { IFoundryAdapter } from "../adapters/IFoundryAdapter";

export class ConsoleErrorHandler implements IErrorHandler {
  // ✅ Metadaten direkt in der Klasse
  static readonly API_NAME = 'errorHandler';
  static readonly SERVICE_TYPE = 'singleton' as const;

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
