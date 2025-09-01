export interface IFormFieldDefinition {
  // Eindeutige ID des Feldes
  id: string;

  // Technischer Name (für API-Zugriffe)
  name: string;

  // Benutzerfreundlicher Anzeigename
  label: string;

  // Datentyp des Feldes
  type: "text" | "number" | "boolean" | "select" | "multiselect" | "textarea" | "date" | "color";

  // Aktueller Wert (für Bearbeitung)
  value?: any;

  // Standardwert
  default?: any;

  // Gibt an, ob das Feld zwingend ausgefüllt werden muss
  required?: boolean;

  // Verfügbare Optionen für Auswahlfelder
  options?: Array<{ value: string; label: string }> | string[];

  // Platzhaltertext
  placeholder?: string;

  // Hilfetext/Beschreibung
  description?: string;

  // Kategorie, in die das Feld eingeordnet wird (für Gruppierung)
  category?: string;

  // Validierungsregeln
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: any) => string | null;
  };

  // UI-spezifische Eigenschaften
  ui?: {
    width?: "full" | "half" | "third";
    multiline?: boolean;
    rows?: number;
    disabled?: boolean;
    readonly?: boolean;
  };

  // Bedingte Anzeige (nur anzeigen wenn Bedingung erfüllt)
  showIf?: (values: Record<string, any>) => boolean;
}

export interface IDynamicFormConfig {
  // Titel des Modals
  title: string;

  // Beschreibung/Untertitel
  description?: string;

  // Felddefinitionen
  elements: IFormFieldDefinition[];

  // Aktuelle Werte (für Bearbeitung)
  initialValues?: Record<string, any>;

  // Callback-Funktionen
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  onCancel?: () => void;
  onValidate?: (values: Record<string, any>) => string[] | null;

  // UI-Konfiguration
  submitLabel?: string;
  cancelLabel?: string;
  showCancelButton?: boolean;
  modalSize?: "small" | "medium" | "large" | "fullscreen";

  // Einbettungsmodus
  embedding?: {
    mode: "overlay" | "inline" | "modal" | "drawer";
    position?: "top" | "bottom" | "left" | "right";
    zIndex?: number;
    animation?: "fade" | "slide" | "scale" | "none";
  };

  // State-Management
  state?: {
    shareIntermediateValues: boolean;
    updateFrequency: "onChange" | "onBlur" | "onSubmit" | "manual";
    onIntermediateUpdate?: (values: Record<string, any>) => void;
    persistInParent: boolean;
  };

  // Validierungsstrategie
  validation?: {
    location: "child" | "parent" | "both";
    timing: "onChange" | "onBlur" | "onSubmit" | "manual";
    allowParentOverride: boolean;
    customValidator?: (values: Record<string, any>) => string[] | null;
  };

  // Styling & Theme
  styling?: {
    theme: "inherit" | "foundry" | "custom" | "auto";
    inheritParentStyles: boolean;
    customClasses?: {
      container?: string;
      form?: string;
      field?: string;
      button?: string;
    };
    responsive: {
      mobile: "stack" | "grid" | "adaptive";
      tablet: "stack" | "grid" | "adaptive";
      desktop: "stack" | "grid" | "adaptive";
    };
  };
}
