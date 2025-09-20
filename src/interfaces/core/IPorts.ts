/**
 * Port Interfaces - Domäne-spezifische Abstraktionen
 *
 * Diese Interfaces definieren die Ports, die die Domäne benötigt,
 * ohne Foundry-spezifische Implementierungen zu kennen.
 */

import type { Result } from "../../utils/result";
import type { GraphModel } from "../../domain/types/RelationshipGraphDomain";

/**
 * ID-Generator Port
 * Generiert eindeutige IDs für die Domäne
 */
export interface IIdGenerator {
  (): string;
}

/**
 * Zeitquelle Port
 * Liefert aktuelle Zeit für deterministische Tests
 */
export interface ITimeSource {
  (): Date;
}

/**
 * Graph Repository Port
 * Persistiert und lädt Graph-Daten
 */
export interface IGraphRepository {
  load(): Promise<Result<GraphModel>>;
  save(model: GraphModel): Promise<Result<void>>;
}

// Re-export domain types for backward compatibility
export type {
  GraphModel,
  NodeData,
  EdgeData,
  NodePolicy,
} from "../../domain/types/RelationshipGraphDomain";
