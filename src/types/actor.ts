import type { Attributes } from "@/types/attribute";
import type { Skill } from "@/types/skill";
import type { RelationshipGraph } from "@/types/relationship";

/** Nur System-Daten des Actors */
export interface IActorAttributes {
  attributes: Attributes;
}

export interface IActorSkills {
  skills: Skill[];
}

export interface IActorRelationships {
  relationshipGraph: RelationshipGraph;
}

export type ActorProps = IActorAttributes & IActorSkills & IActorRelationships;

export interface ActorSystemData {
  props: ActorProps;
}

/**
 * Metadaten des Actors (Name, Bild, Flags, etc.)
 * Kann bei Bedarf erweitert werden.
 */
export interface ActorMetadata {
  name: string;
  img?: string;
  [key: string]: unknown;
}
