import type {
  StringField,
  NumberField,
  BooleanField,
  ColorField,
  SchemaField,
  ArrayField
} from "../types/foundry-fields";

// Kein Import nötig!

// 1) Primitive Field Value Mapping
export type PrimitiveFieldValue<F> =
  F extends StringField   ? string  :
  F extends NumberField   ? number  :
  F extends BooleanField  ? boolean :
  F extends ColorField    ? string  :
  // ...weitere primitive Field-Klassen ggf. ergänzen
  never;

// 2) Field Mapping (rekursiv für SchemaField und ArrayField)
export type InferField<F> =
  F extends SchemaField<infer Inner extends Record<string, any>> ? InferSchema<Inner> :
  F extends ArrayField<infer Item>   ? InferField<Item>[] :
  PrimitiveFieldValue<F>;

// 3) Rekursives Mapping für ein ganzes Schema-Objekt
export type InferSchema<S extends Record<string, any>> = {
  [K in keyof S]: InferField<S[K]>;
};

// 4) Hilfstyp für beliebige DataModels
export type RawSchemaOf<M extends { defineSchema(): any }> =
  ReturnType<M["defineSchema"]>;

export type DataOfModel<M extends { defineSchema(): any }> =
  InferSchema<RawSchemaOf<M>>;

// Beispiel-Nutzung (Kommentar):
// type MyData = DataOfModel<typeof MyModel>; 