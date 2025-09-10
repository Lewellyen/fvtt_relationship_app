import type { IRelationshipGraphService } from "./IRelationshipGraphService";

export interface IRelationshipGraphDemoDataService {
  // Demo Data Creation
  createDemoData(service: IRelationshipGraphService): Promise<void>;
  getDemoData(): { nodes: any[]; edges: any[] };

  // Demo Data Templates
  createSimpleDemo(): { nodes: any[]; edges: any[] };
  createComplexDemo(): { nodes: any[]; edges: any[] };
  createCharacterDemo(): { nodes: any[]; edges: any[] };
  createWorldDemo(): { nodes: any[]; edges: any[] };

  // Demo Data Management
  clearDemoData(service: IRelationshipGraphService): Promise<void>;
  hasDemoData(service: IRelationshipGraphService): boolean;

  // Demo Data Configuration
  setDemoDataTemplate(template: "simple" | "complex" | "character" | "world"): void;
  getCurrentTemplate(): string;

  // Cleanup
  cleanup(): void;
}
