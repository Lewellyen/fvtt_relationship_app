import type { IRelationshipGraphDataAccess } from "./IRelationshipGraphDataAccess";
import type { IRelationshipGraphAnalysis } from "./IRelationshipGraphAnalysis";

/**
 * Interface für Read-Only Graph Service
 * Verantwortlichkeit: Nur Read-Only Operations für View-Mode
 */
export interface IReadOnlyGraphService
  extends IRelationshipGraphDataAccess,
    IRelationshipGraphAnalysis {
  // Nur Read-Only Operations - keine CRUD oder Persistence
}
