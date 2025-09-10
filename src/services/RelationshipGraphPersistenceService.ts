import type { IDocument, RelationshipGraphData } from "../global";
import type { IRelationshipGraphPersistenceService } from "./IRelationshipGraphPersistenceService";
import type { IFoundryAdapter } from "../core/adapters/IFoundryAdapter";
// ✅ Services direkt importieren (zirkuläre Abhängigkeiten vermeiden)
import { FoundryAdapter } from "../core/adapters/FoundryAdapter";

export class RelationshipGraphPersistenceService implements IRelationshipGraphPersistenceService {
  // ✅ Metadaten direkt in der Klasse
  static readonly API_NAME = "persistenceService";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "RelationshipGraphPersistenceService";
  static readonly DEPENDENCIES = [FoundryAdapter]; // ✅ Dependencies explizit definiert

  constructor(private foundryAdapter: IFoundryAdapter) {}

  async load(document: IDocument): Promise<RelationshipGraphData> {
    const documentUuid = (document as any).uuid;
    const freshDocument = await this.foundryAdapter.loadDocument(documentUuid);
    const system = freshDocument?.system ?? document.system;

    // Lade elements und style aus dem system
    const elements = system.elements || { nodes: [], edges: [] };
    const style = system.style || [];

    return {
      description: system.description,
      version: system.version,
      created: system.created,
      modified: system.modified,
      elements: elements,
      style: style,
    };
  }

  async save(document: IDocument, data: Partial<RelationshipGraphData> | object): Promise<void> {
    // Type guard to check if data has elements property
    const hasElements = (obj: any): obj is { elements?: { nodes: any[]; edges: any[] } } => {
      return obj && typeof obj === "object" && "elements" in obj;
    };

    const elements = hasElements(data) ? data.elements : { nodes: [], edges: [] };

    // ✅ Verwende den neuen Wrapper mit automatischem Reload
    await this.foundryAdapter.updateDocumentWithReload(document, {
      "system.elements": elements,
    });
  }

  // Data Export/Import
  async export(format: "json" | "png" | "svg"): Promise<any> {
    // This would be implemented based on the format
    switch (format) {
      case "json":
        return { format: "json", data: "exported data" };
      case "png":
        return { format: "png", data: "exported image" };
      case "svg":
        return { format: "svg", data: "exported svg" };
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  async import(data: any): Promise<void> {
    // Validate and import data
    if (!this.validateData(data)) {
      throw new Error("Invalid import data");
    }

    this.sanitizeData(data);
    // Process the imported data
    // Data imported successfully
  }

  // Backup and Restore
  async createBackup(): Promise<RelationshipGraphData> {
    // Create a backup of current data
    return {
      description: "Backup",
      version: "1.0.0",
      created: Date.now(),
      modified: Date.now(),
      elements: { nodes: [], edges: [] },
      style: [],
    };
  }

  async restoreFromBackup(): Promise<void> {
    // Restore from backup
    // Backup restored successfully
  }

  // Data Validation
  validateData(data: any): boolean {
    if (!data || typeof data !== "object") {
      return false;
    }

    // Check for required structure - support both old and new format
    if (
      data.elements &&
      data.elements.nodes &&
      Array.isArray(data.elements.nodes) &&
      data.elements.edges &&
      Array.isArray(data.elements.edges) &&
      data.style &&
      Array.isArray(data.style)
    ) {
      return true;
    }

    // Legacy support for old format
    if (data.nodes && Array.isArray(data.nodes) && data.edges && Array.isArray(data.edges)) {
      return true;
    }

    return false;
  }

  sanitizeData(data: any): RelationshipGraphData {
    // Sanitize and clean the data
    let nodes: any[] = [];
    let edges: any[] = [];
    let style: any[] = [];

    // Support both old and new format
    if (data.elements && data.elements.nodes && Array.isArray(data.elements.nodes)) {
      nodes = data.elements.nodes;
    } else if (Array.isArray(data.nodes)) {
      nodes = data.nodes;
    }

    if (data.elements && data.elements.edges && Array.isArray(data.elements.edges)) {
      edges = data.elements.edges;
    } else if (Array.isArray(data.edges)) {
      edges = data.edges;
    }

    if (data.style && Array.isArray(data.style)) {
      style = data.style;
    }

    const sanitized: RelationshipGraphData = {
      description: data.description || "Sanitized Graph",
      version: data.version || "1.0.0",
      created: data.created || Date.now(),
      modified: data.modified || Date.now(),
      elements: {
        nodes: nodes,
        edges: edges,
      },
      style: style,
    };

    // Additional sanitization logic here
    return sanitized;
  }

  // Cleanup
  cleanup(): void {
    // Cleanup any resources
    // Persistence service cleanup completed
  }
}
