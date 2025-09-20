/**
 * Domain Types for Relationship Graph
 *
 * Framework-agnostic domain models that are independent of Foundry VTT
 */

/**
 * Graph Model - Pure Domain Model
 */
export interface GraphModel {
  version: number;
  nodes: Record<string, NodeData>;
  edges: Record<string, EdgeData>;
  policy?: Record<string, NodePolicy>;
}

/**
 * Node Data - Domain Model
 */
export interface NodeData {
  id: string;
  name: string;
  label: string;
  type: string;
  position?: { x: number; y: number };
  data?: Record<string, unknown>;
  // Additional domain-specific properties
  factions?: string[];
  relation?: string;
  description?: string;
}

/**
 * Edge Data - Domain Model
 */
export interface EdgeData {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: string;
  data?: Record<string, unknown>;
}

/**
 * Node Policy - Domain Model
 */
export interface NodePolicy {
  visible?: boolean;
  visibility?: Record<string, boolean>;
}

/**
 * Field Path - Domain Model
 */
export type FieldPath = string;
