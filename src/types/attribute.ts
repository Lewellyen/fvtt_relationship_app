/** Beschriftungen für ein Attribut */
export interface AttributeLabels {
  label: string;
  shortLabel: string;
}

/** Basiswert eines Attributs */
export interface AttributeValue {
  baseValue: number;
}

/** Optionale Modifikatoren für ein Attribut */
export interface AttributeModifiers {
  /** Summe aller Modifikatoren */
  totalValue?: number;
  /** Temporäre Modifikator-Liste */
  temporaryModifiers?: number[];
}

/** Vollständiges Attribut mit Label, Basiswert und Modifikatoren */
export type Attribute = AttributeLabels & AttributeValue & AttributeModifiers;

/** Sammlung aller Attribute */
export type Attributes = Record<string, Attribute>;
