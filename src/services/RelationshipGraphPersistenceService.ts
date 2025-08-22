import type { IDocument, RelationshipGraphData } from "../global";
import type { IRelationshipGraphPersistenceService } from "./IRelationshipGraphPersistenceService";

export class RelationshipGraphPersistenceService implements IRelationshipGraphPersistenceService {
  async load(document: IDocument): Promise<RelationshipGraphData> {
    const documentUuid = (document as any).uuid;
    const freshDocument = await (foundry.utils as any).fromUuid(documentUuid);
    const system = freshDocument?.system ?? document.system;
    
    // Lade nur aus system.elements
    const elements = system.elements || { nodes: [], edges: [] };
    
    return {
      name: "Relationship Graph",
      permissions: { defaultLevel: 0, users: [] },
      // Keine Transformation - verwende elements direkt
      elements: elements,
    };
  }

  async save(document: IDocument, data: Partial<RelationshipGraphData> | object): Promise<void> {
    const documentUuid = (document as any).uuid;
    const freshDocument = await (foundry.utils as any).fromUuid(documentUuid);
    
    if (freshDocument) {
      // Speichere elements direkt
      await freshDocument.update({
        "system.elements": data.elements || { nodes: [], edges: [] },
      });
    } else {
      await document.update({
        "system.elements": data.elements || { nodes: [], edges: [] },
      });
    }
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

    const sanitizedData = this.sanitizeData(data);
    // Process the imported data
    console.log("Imported data:", sanitizedData);
  }

  // Backup and Restore
  async createBackup(): Promise<RelationshipGraphData> {
    // Create a backup of current data
    return { nodes: [], edges: [], name: "Backup", permissions: { defaultLevel: 0, users: [] } };
  }

  async restoreFromBackup(backup: RelationshipGraphData): Promise<void> {
    // Restore from backup
    console.log("Restoring from backup:", backup);
  }

  // Data Validation
  validateData(data: any): boolean {
    if (!data || typeof data !== "object") {
      return false;
    }

    // Check for required structure
    if (data.nodes && Array.isArray(data.nodes) && data.edges && Array.isArray(data.edges)) {
      return true;
    }

    return false;
  }

  sanitizeData(data: any): RelationshipGraphData {
    // Sanitize and clean the data
    const sanitized: RelationshipGraphData = {
      nodes: Array.isArray(data.nodes) ? data.nodes : [],
      edges: Array.isArray(data.edges) ? data.edges : [],
      name: data.name || "Sanitized Graph",
      permissions: data.permissions || { defaultLevel: 0, users: [] },
    };

    // Additional sanitization logic here
    return sanitized;
  }

  // Cleanup
  cleanup(): void {
    // Cleanup any resources
    console.log("Persistence service cleanup");
  }
}
