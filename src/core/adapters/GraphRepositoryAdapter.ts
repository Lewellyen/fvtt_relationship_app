import type { IGraphRepository, GraphModel } from "../../interfaces/core/IPorts";
import type { IFoundryAdapter } from "./IFoundryAdapter";
import type { ILogger } from "../../interfaces";
import { FoundryAdapter } from "./FoundryAdapter";
import { FoundryLogger } from "../services/FoundryLogger";

/**
 * Graph Repository Adapter
 * 
 * Foundry-spezifische Implementierung des Graph Repository Ports
 * Kapselt JournalEntryPage-Operationen für die Domäne
 */
export class GraphRepositoryAdapter {
  static readonly API_NAME = "graphRepository";
  static readonly SERVICE_TYPE = "scoped" as const;
  static readonly CLASS_NAME = "GraphRepositoryAdapter";
  static readonly DEPENDENCIES = [FoundryAdapter, FoundryLogger];

  constructor(
    private readonly foundryAdapter: IFoundryAdapter,
    private readonly logger: ILogger
  ) {}

  private pageUuid?: string;

  setPageUuid(pageUuid: string): void {
    this.pageUuid = pageUuid;
  }

  /**
   * Lädt Graph-Daten aus der JournalEntryPage
   */
  async load(): Promise<GraphModel> {
    if (!this.pageUuid) {
      throw new Error("Page UUID not set. Call setPageUuid() first.");
    }
    
    try {
      const page = await this.foundryAdapter.loadDocument<JournalEntryPage>(this.pageUuid);
      if (!page) {
        throw new Error(`JournalEntryPage not found: ${this.pageUuid}`);
      }

      const system = page.system as any;
      return {
        version: system.version ?? 1,
        nodes: this.foundryAdapter.deepClone(system.nodes ?? {}),
        edges: this.foundryAdapter.deepClone(system.edges ?? {}),
        policy: this.foundryAdapter.deepClone(system.policy ?? {}),
      } as GraphModel;
    } catch (error) {
      this.logger.error("Failed to load graph data:", error);
      throw error;
    }
  }

  /**
   * Speichert Graph-Daten in der JournalEntryPage
   */
  async save(model: GraphModel): Promise<void> {
    if (!this.pageUuid) {
      throw new Error("Page UUID not set. Call setPageUuid() first.");
    }
    
    try {
      const page = await this.foundryAdapter.loadDocument<JournalEntryPage>(this.pageUuid);
      if (!page) {
        throw new Error(`JournalEntryPage not found: ${this.pageUuid}`);
      }

      const patch: Record<string, unknown> = {};
      
      // Version
      if (model.version !== undefined) {
        patch["system.version"] = model.version;
      }

      // Dictionaries diffen (Nodes, Edges, Policy)
      patch["system.nodes"] = model.nodes;
      patch["system.edges"] = model.edges;
      patch["system.policy"] = model.policy ?? {};

      await this.foundryAdapter.updateDocumentWithReload(page as any, patch);
    } catch (error) {
      this.logger.error("Failed to save graph data:", error);
      throw error;
    }
  }
}
