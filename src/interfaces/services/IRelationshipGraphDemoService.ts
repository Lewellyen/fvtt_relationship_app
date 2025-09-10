/**
 * Interface für Relationship Graph Demo Data
 * Verantwortlichkeit: Nur Demo Data Management
 */
export interface IRelationshipGraphDemoService {
  // Demo Data Management
  loadDemoData(demoData: { nodes: any[]; edges: any[] }): Promise<void>;
  createDefaultDemoData(): { nodes: any[]; edges: any[] };
  clearDemoData(): Promise<void>;

  // Demo Data Validation
  validateDemoData(demoData: { nodes: any[]; edges: any[] }): boolean;
  sanitizeDemoData(demoData: { nodes: any[]; edges: any[] }): { nodes: any[]; edges: any[] };
}
