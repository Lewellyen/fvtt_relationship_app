// src/types/RelationshipGraphTypes.ts

/** Primitive Helper */
export type Id = string;
export type NodeId = string;
export type SceneId = string;

/** Verhältnis zur Heldengruppe (FFN) */
export type Relation = "friend" | "enemy" | "neutral";

/** Freigabe-relevante Feldpfade (für Policy-Toggles) */
export type FieldPath =
  | "description.common"
  | "description.hidden"
  | "description.gmOnly"
  | "effects.friend"
  | "effects.enemy"
  | "effects.neutral"
  | "knowledge.general"
  | "knowledge.hidden"
  | "knowledge.secret";

/** Knoten (Node) – exakt gemäß Pflichtenheft */
export interface NodeData {
  id: NodeId;
  label: string;
  type: "person" | "place" | "item";
  isNPC?: boolean;

  /** Mehrfachfraktionen (MUST) – referenziert per ID/Key */
  factions: string[];

  /** Verhältnis zur Heldengruppe (FFN) */
  relation: Relation;

  /** Vererbungsbezug (Hybrid) */
  parentId?: NodeId;
  inherit?: boolean; // default: true in der Praxis

  /** Beschreibungstexte (Plain oder Rich – hier typisiert als string) */
  description: {
    common: string;
    hidden?: string;
    gmOnly?: string;
  };

  /** Auswirkungen im Spiel (pro FFN) */
  effects?: {
    friend?: string;
    enemy?: string;
    neutral?: string;
  };

  /** Wissensblöcke */
  knowledge?: {
    general?: string;
    hidden?: string;
    secret?: string;
  };

  /**
   * Optionaler Koordinaten-Cache:
   * ein Pin pro Szene (MVP). Native Journal-Pins bleiben die Quelle;
   * dieser Cache ist nur QoL für Jump/Anzeige.
   */
  pins?: Record<SceneId, { x: number; y: number }>;
}

/** Kante (Edge) – minimal gehalten */
export interface EdgeData {
  id: Id;
  source: NodeId;
  target: NodeId;
  type?: string;
  label?: string;
}

/** Policy pro Node: Feldpfad → Sichtbarkeit (Spieler) */
// Ergänzung in NodePolicy
export interface NodePolicy {
  /** Sichtbarkeit des ganzen Knotens für Spieler (GM sieht immer alles). Default: false */
  visible?: boolean;
  visibility: Partial<Record<FieldPath, boolean>>;
}


/** Gesamte Policy: NodeId → NodePolicy */
export type PolicyModel = Record<NodeId, NodePolicy>;

/** Root-Graph-Struktur im DataModel (system.graph) */
export interface GraphModel {
  version: number;
  nodes: Record<NodeId, NodeData>;
  edges: Record<Id, EdgeData>;
  policy?: PolicyModel;
}
