/**
 * Graph Mapper
 *
 * Maps between domain models and Foundry data models
 * Handles the conversion between framework-agnostic domain and Foundry-specific infrastructure
 */

import type {
  GraphModel,
  NodeData,
  EdgeData,
  NodePolicy,
} from "../../domain/types/RelationshipGraphDomain";
import type { FoundryGraphDataModel } from "../adapters/FoundryGraphDataModel";

/**
 * Maps Foundry data model to domain model
 */
export function toDomain(dataModel: FoundryGraphDataModel): GraphModel {
  const system = (dataModel as any).system;

  return {
    version: system.version ?? 1,
    nodes: (system.nodes ?? {}) as Record<string, NodeData>,
    edges: (system.edges ?? {}) as Record<string, EdgeData>,
    policy: (system.policy ?? {}) as Record<string, NodePolicy>,
  };
}

/**
 * Maps domain model to Foundry data model system
 */
export function fromDomain(model: GraphModel): any {
  return {
    version: model.version,
    nodes: model.nodes as Record<string, unknown>,
    edges: model.edges as Record<string, unknown>,
    policy: model.policy as Record<string, unknown>,
  };
}

/**
 * Maps domain model to Foundry update patch
 */
export function toUpdatePatch(model: GraphModel): Record<string, unknown> {
  return {
    "system.version": model.version,
    "system.nodes": model.nodes,
    "system.edges": model.edges,
    "system.policy": model.policy ?? {},
  };
}
