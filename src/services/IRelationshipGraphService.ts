import type {
  RelationshipGraph,
  RelationshipNode,
  RelationshipEdge,
} from "@/types/relationship";
import type { DeathwatchActor } from "@/entities/DeathwatchActor";
import type { IRelationshipGraphPersistenceService } from "./IRelationshipGraphPersistenceService";
import type { IRelationshipGraphValidationService } from "./IRelationshipGraphValidationService";
import type { IRelationshipGraphCytoscapeService } from "./IRelationshipGraphCytoscapeService";

/**
 * Main interface for relationship graph operations.
 * Follows Interface Segregation Principle by aggregating specific interfaces.
 */
export interface IRelationshipGraphService
  extends IRelationshipGraphPersistenceService,
    IRelationshipGraphValidationService,
    IRelationshipGraphCytoscapeService {
  /**
   * Loads the relationship graph from an actor.
   */
  loadGraph(actor: DeathwatchActor): RelationshipGraph;

  /**
   * Gets all available nodes for selection in dropdowns.
   */
  getAvailableNodes(actor: DeathwatchActor): RelationshipNode[];
}
