/** Supported modifier operations */
export type ModifierOperation =
  | "add"
  | "multiply"
  | "replace"
  | "default"
  | "min"
  | "max"
  | "subtract"
  | "divide";

/**
 * A single modifier entry for an attribute.
 */
export interface Modifier {
  id: string;
  attribute: string;
  operation: ModifierOperation;
  value: number;
  sourceType: "item" | "effect" | "custom";
  sourceId: string;
}

/** Defines the apply method for a modifier operation */
export interface ModifierStrategy {
  apply(base: any, modValue: any): any;
}
