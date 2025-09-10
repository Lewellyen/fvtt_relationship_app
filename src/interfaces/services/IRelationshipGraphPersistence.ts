/**
 * Interface für Relationship Graph Persistence
 * Verantwortlichkeit: Nur Data Persistence
 */
export interface IRelationshipGraphPersistence {
  // Data Persistence
  loadData(): Promise<void>;
  saveData(): Promise<void>;

  // Cleanup
  cleanup(): void;
}
