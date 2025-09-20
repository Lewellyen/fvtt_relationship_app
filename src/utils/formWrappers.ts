import type { IFormFieldDefinition } from "../types/DynamicFormTypes";

/**
 * Basis-Wrapper-Funktion für alle Feldtypen
 */
export function createElement(config: {
  field: string;
  type: "text" | "number" | "boolean" | "select" | "multiselect" | "textarea" | "date" | "color";
  label?: string;
  required?: boolean;
  placeholder?: string;
  default?: any;
  options?: string[] | Array<{ value: string; label: string }>;
  description?: string;
  category?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: any) => string | null;
  };
  ui?: {
    width?: "full" | "half" | "third";
    multiline?: boolean;
    rows?: number;
    disabled?: boolean;
    readonly?: boolean;
  };
  showIf?: (values: Record<string, any>) => boolean;
}): IFormFieldDefinition {
  return {
    id: config.field,
    name: config.field,
    label: config.label || config.field,
    type: config.type,
    required: config.required || false,
    placeholder: config.placeholder || "",
    default: config.default,
    options: config.options || [],
    description: config.description || "",
    category: config.category || "Allgemein",
    validation: config.validation || {},
    ui: {
      width: config.ui?.width || "full",
      multiline: config.ui?.multiline || false,
      rows: config.ui?.rows || 3,
      disabled: config.ui?.disabled || false,
      readonly: config.ui?.readonly || false,
    },
    showIf: config.showIf || (() => true),
  };
}

/**
 * Spezialisierter Wrapper für Text-Felder
 */
export function createTextElement(
  field: string,
  options: {
    label?: string;
    required?: boolean;
    placeholder?: string;
    default?: string;
    multiline?: boolean;
    description?: string;
    category?: string;
    validation?: {
      pattern?: string;
      custom?: (value: any) => string | null;
    };
    showIf?: (values: Record<string, any>) => boolean;
  } = {}
): IFormFieldDefinition {
  return createElement({
    field,
    type: options.multiline ? "textarea" : "text",
    label: options.label || field,
    required: options.required || false,
    placeholder: options.placeholder || "",
    default: options.default || undefined,
    description: options.description || "",
    category: options.category || "",
    validation: options.validation ?? {},
    showIf: options.showIf ?? (() => true),
    ui: {
      width: "full",
      multiline: options.multiline || false,
      rows: options.multiline ? 3 : 1,
    },
  });
}

/**
 * Spezialisierter Wrapper für Select-Felder
 */
export function createSelectElement(
  field: string,
  options: {
    label?: string;
    required?: boolean;
    options: string[] | Array<{ value: string; label: string }>;
    default?: string;
    description?: string;
    category?: string;
  }
): IFormFieldDefinition {
  return createElement({
    field,
    type: "select",
    label: options.label || field,
    required: options.required || false,
    options: options.options,
    default: options.default,
    description: options.description || "",
    category: options.category || "",
  });
}

/**
 * Spezialisierter Wrapper für Multi-Select-Felder
 */
export function createMultiSelectElement(
  field: string,
  options: {
    label?: string;
    required?: boolean;
    options: string[] | Array<{ value: string; label: string }>;
    default?: string[];
    description?: string;
    category?: string;
  }
): IFormFieldDefinition {
  return createElement({
    field,
    type: "multiselect",
    label: options.label || field,
    required: options.required || false,
    options: options.options,
    default: options.default || [],
    description: options.description || "",
    category: options.category || "",
  });
}

/**
 * Spezialisierter Wrapper für Zahlen-Felder
 */
export function createNumberElement(
  field: string,
  options: {
    label?: string;
    required?: boolean;
    min?: number;
    max?: number;
    default?: number;
    placeholder?: string;
    description?: string;
    category?: string;
  } = {}
): IFormFieldDefinition {
  return createElement({
    field,
    type: "number",
    label: options.label || field,
    required: options.required || false,
    placeholder: options.placeholder || "",
    default: options.default || 0,
    description: options.description || "",
    category: options.category || "",
    validation:
      options.min !== undefined || options.max !== undefined
        ? {
            min: options.min || 0,
            max: options.max || 100,
          }
        : {},
  });
}

/**
 * Spezialisierter Wrapper für Boolean-Felder
 */
export function createBooleanElement(
  field: string,
  options: {
    label?: string;
    required?: boolean;
    default?: boolean;
    description?: string;
    category?: string;
  } = {}
): IFormFieldDefinition {
  return createElement({
    field,
    type: "boolean",
    label: options.label || field,
    required: options.required || false,
    default: options.default || false,
    description: options.description || "",
    category: options.category || "",
  });
}

/**
 * Spezialisierter Wrapper für Textarea-Felder
 */
export function createTextareaElement(
  field: string,
  options: {
    label?: string;
    required?: boolean;
    placeholder?: string;
    default?: string;
    rows?: number;
    description?: string;
    category?: string;
  } = {}
): IFormFieldDefinition {
  return createElement({
    field,
    type: "textarea",
    label: options.label || field,
    required: options.required || false,
    placeholder: options.placeholder || "",
    default: options.default,
    description: options.description || "",
    category: options.category || "",
    ui: {
      width: "full",
      multiline: true,
      rows: options.rows || 3,
    },
  });
}

/**
 * Hilfsfunktion zum Erstellen von Optionen für Select-Felder
 */
export function createOptions(...options: string[]): string[] {
  return options;
}

/**
 * Hilfsfunktion zum Erstellen von Optionen mit Labels für Select-Felder
 */
export function createOptionsWithLabels(
  options: Record<string, string>
): Array<{ value: string; label: string }> {
  return Object.entries(options).map(([value, label]) => ({ value, label }));
}

/**
 * Gruppierung von Feldern
 */
export function createGroup(title: string, elements: IFormFieldDefinition[]) {
  return { type: "group", title, elements };
}
