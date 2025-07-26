const fields = foundry.data.fields;

// Gemeinsames Schema für Nodes und Edges
export class CytoScapeCommonAttributesModel extends foundry.abstract.TypeDataModel<any, any, any, any> {
  static defineSchema() {
    return {
      // ERFORDERLICHE FELDER (required: true)
      // Textfarbe (erforderlich)
      color: new fields.ColorField({ required: true, blank: false }),
      
      // OPTIONALE FELDER (required: false)
      // Sichtbarkeit und Interaktion
      // Transparenz des Elements (0-1)
      opacity: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Sichtbarkeit (visible, hidden)
      visibility: new fields.StringField({ required: false, blank: true, initial: "visible" }),
      // Event-Handling aktivieren (yes, no)
      events: new fields.StringField({ required: false, blank: true, initial: "yes" }),
      // Text-Event-Handling (yes, no)
      textEvents: new fields.StringField({ required: false, blank: true, initial: "no" }),
      
      // Text/Label-Eigenschaften
      // Hauptlabel/Text des Elements
      label: new fields.StringField({ required: false, blank: true, initial: "" }),
      // Schriftgröße in Pixeln
      fontSize: new fields.NumberField({ required: false, blank: true, initial: 16 }),
      // Schriftart
      fontFamily: new fields.StringField({ required: false, blank: true, initial: "Helvetica Neue, Helvetica, sans-serif" }),
      // Schriftstärke (normal, bold, etc.)
      fontWeight: new fields.StringField({ required: false, blank: true, initial: "normal" }),
      // Schriftstil (normal, italic)
      fontStyle: new fields.StringField({ required: false, blank: true, initial: "normal" }),
      // Vertikale Textausrichtung (top, center, bottom)
      textValign: new fields.StringField({ required: false, blank: true, initial: "top" }),
      // Horizontale Textausrichtung (left, center, right)
      textHalign: new fields.StringField({ required: false, blank: true, initial: "center" }),
      // Textausrichtung (auto, left, center, right)
      textJustification: new fields.StringField({ required: false, blank: true, initial: "auto" }),
      // Textumbruch (none, wrap)
      textWrap: new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Textüberlauf (whitespace, anywhere)
      textOverflowWrap: new fields.StringField({ required: false, blank: true, initial: "whitespace" }),
      // Maximale Textbreite in Pixeln
      textMaxWidth: new fields.NumberField({ required: false, blank: true, initial: 9999 }),
      // Text-Rotation (none, autorotate, 45deg, etc.)
      textRotation: new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Horizontaler Text-Abstand
      textMarginX: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Vertikaler Text-Abstand
      textMarginY: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Zeilenhöhe (Multiplikator)
      lineHeight: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Anzeige (element, none)
      display: new fields.StringField({ required: false, blank: true, initial: "element" }),
      // Textumrissfarbe
      textOutlineColor: new fields.ColorField({ required: false, blank: true, initial: "#000" }),
      // Textumrissbreite
      textOutlineWidth: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Textumriss-Transparenz
      textOutlineOpacity: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Text-Transparenz
      textOpacity: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Text-Dekoration (none, underline, etc.)
      textDecoration: new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Text-Transformation (none, uppercase, lowercase)
      textTransform: new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Text-Hintergrundfarbe
      textBackgroundColor: new fields.ColorField({ required: false, blank: true, initial: "#000" }),
      // Text-Hintergrund-Transparenz
      textBackgroundOpacity: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Text-Hintergrund-Form (rectangle, roundrectangle)
      textBackgroundShape: new fields.StringField({ required: false, blank: true, initial: "rectangle" }),
      // Text-Hintergrund-Abstand
      textBackgroundPadding: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Text-Rahmenfarbe
      textBorderColor: new fields.ColorField({ required: false, blank: true, initial: "#000" }),
      // Text-Rahmenbreite
      textBorderWidth: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Text-Rahmenstil (solid, dashed, etc.)
      textBorderStyle: new fields.StringField({ required: false, blank: true, initial: "solid" }),
      // Text-Rahmen-Transparenz
      textBorderOpacity: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Minimale Schriftgröße beim Zoomen
      minZoomedFontSize: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      
      // Überlagereffekte
      // Überlagerungsfarbe
      overlayColor: new fields.ColorField({ required: false, blank: true, initial: "#000" }),
      // Überlagerungs-Transparenz
      overlayOpacity: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Überlagerungs-Abstand
      overlayPadding: new fields.NumberField({ required: false, blank: true, initial: 10 }),
      // Überlagerungs-Form (roundrectangle, rectangle, etc.)
      overlayShape: new fields.StringField({ required: false, blank: true, initial: "roundrectangle" }),
      // Überlagerungs-Eckenrundung
      overlayCornerRadius: new fields.StringField({ required: false, blank: true, initial: "auto" }),
      
      // Unterlagereffekte
      // Unterlagerungsfarbe
      underlayColor: new fields.ColorField({ required: false, blank: true, initial: "#000" }),
      // Unterlagerungs-Transparenz
      underlayOpacity: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Unterlagerungs-Abstand
      underlayPadding: new fields.NumberField({ required: false, blank: true, initial: 10 }),
      // Unterlagerungs-Form
      underlayShape: new fields.StringField({ required: false, blank: true, initial: "roundrectangle" }),
      // Unterlagerungs-Eckenrundung
      underlayCornerRadius: new fields.StringField({ required: false, blank: true, initial: "auto" }),
      
      // Animation und Übergänge
      // Übergangseigenschaft (all, none, specific properties)
      transitionProperty: new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Übergangsdauer in Sekunden
      transitionDuration: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Übergangsverzögerung in Sekunden
      transitionDelay: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Übergangs-Timing-Funktion (linear, ease, etc.)
      transitionTimingFunction: new fields.StringField({ required: false, blank: true, initial: "linear" }),
      
      // Z-Index und Stapelreihenfolge
      // Z-Index für Stapelreihenfolge
      zIndex: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Z-Verbund-Tiefe (auto, top, bottom)
      zCompoundDepth: new fields.StringField({ required: false, blank: true, initial: "auto" }),
      // Z-Index-Vergleich (auto, manual)
      zIndexCompare: new fields.StringField({ required: false, blank: true, initial: "auto" }),
      
      // Selektion und Interaktion
      // Label-Selektion bei Box-Select (yes, no)
      boxSelectLabels: new fields.StringField({ required: false, blank: true, initial: "no" })
    };
  }
} 