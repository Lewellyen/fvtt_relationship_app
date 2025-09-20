/**
 * Port Interfaces - Domäne-spezifische Abstraktionen
 * 
 * Diese Interfaces definieren die Ports, die die Domäne benötigt,
 * ohne Foundry-spezifische Implementierungen zu kennen.
 */

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
  load(): Promise<GraphModel>;
  save(model: GraphModel): Promise<void>;
}

/**
 * Graph Model Interface
 * Definiert die Struktur der Graph-Daten
 */
export interface GraphModel {
  version: number;
  nodes: Record<string, NodeData>;
  edges: Record<string, EdgeData>;
  policy?: Record<string, NodePolicy>;
}

export interface NodeData {
  id: string;
  name: string;
  label: string;
  type: string;
  position?: { x: number; y: number };
  data?: Record<string, unknown>;
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: string;
  data?: Record<string, unknown>;
}

export interface NodePolicy {
  visible?: boolean;
  visibility?: Record<string, boolean>;
}
