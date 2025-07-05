export interface SkillCore {
  skill: string;
  characteristic: string;
  type: string;
  action: string;
  difficulty: number;
}

export interface SkillDescriptor {
  focus?: string | null;
  descriptor: string[];
}

export interface SkillMetadata {
  favored: boolean;
  familiarity: number;
  talented: boolean;
  notes: string;
}

export type Skill = SkillCore & SkillDescriptor & SkillMetadata;
