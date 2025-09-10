/**
 * Interface für Relationship Graph Demo Data
 * Verantwortlichkeit: Nur Demo Data Management
 */
export interface IRelationshipGraphDemo {
  // Demo Data Management
  loadDemoData(demoData: { nodes: any[]; edges: any[] }): Promise<void>;
}
