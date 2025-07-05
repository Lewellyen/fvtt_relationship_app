import type { Skill } from "./skill";

export interface ConversionStrategy {
  matches(field: keyof Skill, target: HTMLInputElement): boolean;
  convert(field: keyof Skill, target: HTMLInputElement): Skill[keyof Skill];
}
