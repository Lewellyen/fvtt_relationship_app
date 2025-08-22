import type { IRelationshipGraphService } from "./IRelationshipGraphService";
import type { NodeData, EdgeData } from "../global";

export interface IRelationshipGraphDemoDataService {
  // Demo Data Creation
  createDemoData(service: IRelationshipGraphService): Promise<void>;
  getDemoData(): { nodes: NodeData[]; edges: EdgeData[] };

  // Demo Data Templates
  createSimpleDemo(): { nodes: NodeData[]; edges: EdgeData[] };
  createComplexDemo(): { nodes: NodeData[]; edges: EdgeData[] };
  createCharacterDemo(): { nodes: NodeData[]; edges: EdgeData[] };
  createWorldDemo(): { nodes: NodeData[]; edges: EdgeData[] };

  // Demo Data Management
  clearDemoData(service: IRelationshipGraphService): Promise<void>;
  hasDemoData(service: IRelationshipGraphService): boolean;

  // Demo Data Configuration
  setDemoDataTemplate(template: "simple" | "complex" | "character" | "world"): void;
  getCurrentTemplate(): string;

  // Cleanup
  cleanup(): void;
}
