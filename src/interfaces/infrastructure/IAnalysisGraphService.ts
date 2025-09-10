import type { IRelationshipGraphDataAccess } from "./IRelationshipGraphDataAccess";
import type { IRelationshipGraphAnalysis } from "./IRelationshipGraphAnalysis";

/**
 * Interface für Analysis Graph Service
 * Verantwortlichkeit: Data Access + Analysis für Analysis-Features
 */
export interface IAnalysisGraphService
  extends IRelationshipGraphDataAccess,
    IRelationshipGraphAnalysis {
  // Data Access + Analysis für Analysis-Features
}
