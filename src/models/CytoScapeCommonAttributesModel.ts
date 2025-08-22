const fields = foundry.data.fields;

// Gemeinsames Schema für Nodes und Edges mit Snake_case für 1:1 Cytoscape-Kompatibilität
export class CytoScapeCommonAttributesModel extends foundry.abstract.DataModel<any, any, any> {
  static defineSchema() {
    return {
      // ERFORDERLICHE FELDER (required: true)
      // Textfarbe (erforderlich)
      color: new fields.ColorField({ required: true, blank: false, initial: "#000" }),

      // OPTIONALE FELDER (required: false) - Alle in Snake_case
      // Sichtbarkeit und Interaktion
      // Transparenz des Elements (0-1)
      opacity: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Sichtbarkeit (visible, hidden)
      visibility: new fields.StringField({ required: false, blank: true, initial: "visible" }),
      // Event-Handling aktivieren (yes, no)
      events: new fields.StringField({ required: false, blank: true, initial: "yes" }),
      // Text-Event-Handling (yes, no)
      "text-events": new fields.StringField({ required: false, blank: true, initial: "no" }),

      // Text/Label-Eigenschaften
      // Hauptlabel/Text des Elements
      label: new fields.StringField({ required: false, blank: true, initial: "" }),
      // Schriftgröße in Pixeln
      "font-size": new fields.NumberField({ required: false, blank: true, initial: 16 }),
      // Schriftart
      "font-family": new fields.StringField({
        required: false,
        blank: true,
        initial: "Helvetica Neue, Helvetica, sans-serif",
      }),
      // Schriftstärke (normal, bold, etc.)
      "font-weight": new fields.StringField({ required: false, blank: true, initial: "normal" }),
      // Schriftstil (normal, italic)
      "font-style": new fields.StringField({ required: false, blank: true, initial: "normal" }),
      // Vertikale Textausrichtung (top, center, bottom)
      "text-valign": new fields.StringField({ required: false, blank: true, initial: "top" }),
      // Horizontale Textausrichtung (left, center, right)
      "text-halign": new fields.StringField({ required: false, blank: true, initial: "center" }),
      // Textausrichtung (auto, left, center, right)
      "text-justification": new fields.StringField({
        required: false,
        blank: true,
        initial: "auto",
      }),
      // Textumbruch (none, wrap)
      "text-wrap": new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Textüberlauf (whitespace, anywhere)
      "text-overflow-wrap": new fields.StringField({
        required: false,
        blank: true,
        initial: "whitespace",
      }),
      // Maximale Textbreite in Pixeln
      "text-max-width": new fields.NumberField({ required: false, blank: true, initial: 9999 }),
      // Text-Rotation (none, autorotate, 45deg, etc.)
      "text-rotation": new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Horizontaler Text-Abstand
      "text-margin-x": new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Vertikaler Text-Abstand
      "text-margin-y": new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Zeilenhöhe (Multiplikator)
      "line-height": new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Anzeige (element, none)
      display: new fields.StringField({ required: false, blank: true, initial: "element" }),
      // Textumrissfarbe
      "text-outline-color": new fields.ColorField({
        required: false,
        blank: true,
        initial: "#000",
      }),
      // Textumrissbreite
      "text-outline-width": new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Textumriss-Transparenz
      "text-outline-opacity": new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Text-Transparenz
      "text-opacity": new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Text-Dekoration (none, underline, etc.)
      "text-decoration": new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Text-Transformation (none, uppercase, lowercase)
      "text-transform": new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Text-Hintergrundfarbe
      "text-background-color": new fields.ColorField({
        required: false,
        blank: true,
        initial: "#000",
      }),
      // Text-Hintergrund-Transparenz
      "text-background-opacity": new fields.NumberField({
        required: false,
        blank: true,
        initial: 0,
      }),
      // Text-Hintergrund-Form (rectangle, roundrectangle)
      "text-background-shape": new fields.StringField({
        required: false,
        blank: true,
        initial: "rectangle",
      }),
      // Text-Hintergrund-Abstand
      "text-background-padding": new fields.NumberField({
        required: false,
        blank: true,
        initial: 0,
      }),
      // Text-Rahmenfarbe
      "text-border-color": new fields.ColorField({ required: false, blank: true, initial: "#000" }),
      // Text-Rahmenbreite
      "text-border-width": new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Text-Rahmenstil (solid, dashed, etc.)
      "text-border-style": new fields.StringField({
        required: false,
        blank: true,
        initial: "solid",
      }),
      // Text-Rahmen-Transparenz
      "text-border-opacity": new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Minimale Schriftgröße beim Zoomen
      "min-zoomed-font-size": new fields.NumberField({ required: false, blank: true, initial: 0 }),

      // Überlagereffekte
      // Überlagerungsfarbe
      "overlay-color": new fields.ColorField({ required: false, blank: true, initial: "#000" }),
      // Überlagerungs-Transparenz
      "overlay-opacity": new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Überlagerungs-Abstand
      "overlay-padding": new fields.NumberField({ required: false, blank: true, initial: 10 }),
      // Überlagerungs-Form (roundrectangle, rectangle, etc.)
      "overlay-shape": new fields.StringField({
        required: false,
        blank: true,
        initial: "roundrectangle",
      }),
      // Überlagerungs-Eckenrundung
      "overlay-corner-radius": new fields.StringField({
        required: false,
        blank: true,
        initial: "auto",
      }),

      // Unterlagereffekte
      // Unterlagerungsfarbe
      "underlay-color": new fields.ColorField({ required: false, blank: true, initial: "#000" }),
      // Unterlagerungs-Transparenz
      "underlay-opacity": new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Unterlagerungs-Abstand
      "underlay-padding": new fields.NumberField({ required: false, blank: true, initial: 10 }),
      // Unterlagerungs-Form
      "underlay-shape": new fields.StringField({
        required: false,
        blank: true,
        initial: "roundrectangle",
      }),
      // Unterlagerungs-Eckenrundung
      "underlay-corner-radius": new fields.StringField({
        required: false,
        blank: true,
        initial: "auto",
      }),

      // Animation und Übergänge
      // Übergangseigenschaft (all, none, specific properties)
      "transition-property": new fields.StringField({
        required: false,
        blank: true,
        initial: "none",
      }),
      // Übergangsdauer in Sekunden
      "transition-duration": new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Übergangsverzögerung in Sekunden
      "transition-delay": new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Übergangs-Timing-Funktion (linear, ease, etc.)
      "transition-timing-function": new fields.StringField({
        required: false,
        blank: true,
        initial: "linear",
      }),

      // Z-Index und Stapelreihenfolge
      // Z-Index für Stapelreihenfolge
      "z-index": new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Z-Verbund-Tiefe (auto, top, bottom)
      "z-compound-depth": new fields.StringField({ required: false, blank: true, initial: "auto" }),
      // Z-Index-Vergleich (auto, manual)
      "z-index-compare": new fields.StringField({ required: false, blank: true, initial: "auto" }),

      // Selektion und Interaktion
      // Label-Selektion bei Box-Select (yes, no)
      "box-select-labels": new fields.StringField({ required: false, blank: true, initial: "no" }),
    };
  }
}
