import type { IRelationshipGraphDataAccess } from "./IRelationshipGraphDataAccess";
import type { IRelationshipGraphCRUD } from "./IRelationshipGraphCRUD";
import type { IRelationshipGraphAnalysis } from "./IRelationshipGraphAnalysis";
import type { IRelationshipGraphPersistence } from "./IRelationshipGraphPersistence";
import type { IRelationshipGraphDemo } from "./IRelationshipGraphDemo";

/**
 * Hauptinterface für Relationship Graph Service
 * Verantwortlichkeit: Kombiniert alle Graph-Service-Interfaces
 */
export interface IRelationshipGraphService
  extends IRelationshipGraphDataAccess,
    IRelationshipGraphCRUD,
    IRelationshipGraphAnalysis,
    IRelationshipGraphPersistence,
    IRelationshipGraphDemo {
  // Kombiniert alle Graph-Service-Interfaces
}

// GraphStats wird jetzt aus IRelationshipGraphAnalysis importiert
export type { GraphStats } from "./IRelationshipGraphAnalysis";
