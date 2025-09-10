import type { IDocument, RelationshipGraphData } from "../global";

export interface IRelationshipGraphPersistenceService {
  // Core Persistence
  load(document: IDocument): Promise<RelationshipGraphData>;
  save(document: IDocument, data: Partial<RelationshipGraphData> | object): Promise<void>;

  // Data Export/Import
  export(format: "json" | "png" | "svg"): Promise<any>;
  import(data: any): Promise<void>;

  // Backup and Restore
  createBackup(): Promise<RelationshipGraphData>;
  restoreFromBackup(backup: RelationshipGraphData): Promise<void>;

  // Data Validation
  validateData(data: any): boolean;
  sanitizeData(data: any): RelationshipGraphData;

  // Cleanup
  cleanup(): void;
}
