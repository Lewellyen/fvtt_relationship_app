import type { IRelationshipGraphDataAccess } from "./IRelationshipGraphDataAccess";
import type { IRelationshipGraphCRUD } from "./IRelationshipGraphCRUD";
import type { IRelationshipGraphPersistence } from "./IRelationshipGraphPersistence";

/**
 * Interface für Editable Graph Service
 * Verantwortlichkeit: Read + Write Operations für Edit-Mode
 */
export interface IEditableGraphService
  extends IRelationshipGraphDataAccess,
    IRelationshipGraphCRUD,
    IRelationshipGraphPersistence {
  // Read + Write Operations für Edit-Mode
}
