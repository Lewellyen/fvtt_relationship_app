import { CytoScapeCommonAttributesModel } from './CytoScapeCommonAttributesModel';

const fields = foundry.data.fields;

// Node-spezifisches Schema mit Snake_case für 1:1 Cytoscape-Kompatibilität
export class CytoScapeNodeAttributesModel extends CytoScapeCommonAttributesModel {
  static defineSchema() {
    const commonSchema = super.defineSchema();
    return {
      ...commonSchema,
      // ERFORDERLICHE FELDER (required: true)
      // Form des Nodes (ellipse, rectangle, triangle, etc.)
      shape: new fields.StringField({ required: true, blank: false, initial: "ellipse" }),
      // Größe des Nodes (für runde Formen)
      size: new fields.NumberField({ required: true, blank: false, initial: 30 }),
      // Rahmenfarbe (erforderlich)
      'border-color': new fields.ColorField({ required: true, blank: false, initial: "#000" }),
      // Rahmenbreite (erforderlich)
      'border-width': new fields.NumberField({ required: true, blank: false, initial: 0 }),
      
      // OPTIONALE FELDER (required: false) - Alle in Snake_case
      // Grundlegende Node-Eigenschaften
      // Breite des Nodes in Pixeln
      width: new fields.NumberField({ required: false, blank: true, initial: 80 }),
      // Höhe des Nodes in Pixeln
      height: new fields.NumberField({ required: false, blank: true, initial: 80 }),
      // Hintergrundfarbe des Nodes
      'background-color': new fields.ColorField({ required: false, blank: true, initial: "#999" }),
      // Hintergrund-Transparenz
      'background-opacity': new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // URL/Pfad zum Hintergrundbild
      'background-image': new fields.StringField({ required: false, blank: true, initial: "none" }),
      // CORS-Einstellung für externe Bilder
      'background-image-crossorigin': new fields.StringField({ required: false, blank: true, initial: "anonymous" }),
      // Transparenz des Hintergrundbildes
      'background-image-opacity': new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Begrenzung des Bildes (inside, outside)
      'background-image-containment': new fields.StringField({ required: false, blank: true, initial: "inside" }),
      // Bildglättung (yes, no)
      'background-image-smoothing': new fields.StringField({ required: false, blank: true, initial: "yes" }),
      // Horizontale Bildposition (50%, left, center, right)
      'background-position-x': new fields.StringField({ required: false, blank: true, initial: "50%" }),
      // Vertikale Bildposition (50%, top, center, bottom)
      'background-position-y': new fields.StringField({ required: false, blank: true, initial: "50%" }),
      // Horizontaler Bild-Offset in Pixeln
      'background-offset-x': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Vertikaler Bild-Offset in Pixeln
      'background-offset-y': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Relative Bildbreite (include-padding, exclude-padding)
      'background-width-relative-to': new fields.StringField({ required: false, blank: true, initial: "include-padding" }),
      // Relative Bildhöhe (include-padding, exclude-padding)
      'background-height-relative-to': new fields.StringField({ required: false, blank: true, initial: "include-padding" }),
      // Bild-Wiederholung (no-repeat, repeat, repeat-x, repeat-y)
      'background-repeat': new fields.StringField({ required: false, blank: true, initial: "no-repeat" }),
      // Bildanpassung (none, contain, cover, fill, scale-down)
      'background-fit': new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Bildbeschnitt (node, none)
      'background-clip': new fields.StringField({ required: false, blank: true, initial: "node" }),
      // Bildbreite (auto, 100%, 50px)
      'background-width': new fields.StringField({ required: false, blank: true, initial: "auto" }),
      // Bildhöhe (auto, 100%, 50px)
      'background-height': new fields.StringField({ required: false, blank: true, initial: "auto" }),
      // Eckenrundung (auto, 10px, 50%)
      'corner-radius': new fields.StringField({ required: false, blank: true, initial: "auto" }),
      // Innenabstand des Nodes
      padding: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      
      // Border/Outline-Eigenschaften
      // Rahmenstil (solid, dashed, dotted)
      'border-style': new fields.StringField({ required: false, blank: true, initial: "solid" }),
      // Rahmen-Transparenz
      'border-opacity': new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Strichmuster für gestrichelte Rahmen
      'border-dash-pattern': new fields.ArrayField(new fields.NumberField(), { required: false, blank: true, initial: [4, 2] }),
      // Strichmuster-Offset
      'border-dash-offset': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Rahmen-Ende (butt, round, square)
      'border-cap': new fields.StringField({ required: false, blank: true, initial: "butt" }),
      // Rahmen-Verbindung (miter, round, bevel)
      'border-join': new fields.StringField({ required: false, blank: true, initial: "miter" }),
      // Rahmen-Position (center, inside, outside)
      'border-position': new fields.StringField({ required: false, blank: true, initial: "center" }),
      // Umrissfarbe
      'outline-color': new fields.ColorField({ required: false, blank: true, initial: "#999" }),
      // Umrissbreite
      'outline-width': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Umriss-Transparenz
      'outline-opacity': new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Umriss-Offset
      'outline-offset': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Umriss-Stil (solid, dashed, etc.)
      'outline-style': new fields.StringField({ required: false, blank: true, initial: "solid" }),
      
      // Erweiterte Node-Eigenschaften
      // Gradient-Richtung (to-bottom, to-top, to-right, to-left, 45deg)
      'background-gradient-direction': new fields.StringField({ required: false, blank: true, initial: "to-bottom" }),
      // Gradient-Farben (#ff0000, #00ff00, #0000ff)
      'background-gradient-stop-colors': new fields.StringField({ required: false, blank: true, initial: "#999" }),
      // Gradient-Positionen (0%, 50%, 100%)
      'background-gradient-stop-positions': new fields.StringField({ required: false, blank: true, initial: "0%" }),
      // Hintergrund-Abdunklung (-1 bis 1)
      'background-blacken': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Hintergrund-Füllung (solid, linear-gradient, radial-gradient)
      'background-fill': new fields.StringField({ required: false, blank: true, initial: "solid" }),
      // Polygon-Punkte für polygon-Form
      'shape-polygon-points': new fields.StringField({ required: false, blank: true, initial: "-1, -1,   1, -1,   1, 1,   -1, 1" }),
      // Grenzen-Erweiterung in Pixeln
      'bounds-expansion': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      
      // Pie-Chart-Eigenschaften
      // Pie-Chart-Größe (100%, 50px)
      'pie-size': new fields.StringField({ required: false, blank: true, initial: "100%" }),
      // Loch in der Mitte (0-1)
      'pie-hole': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Startwinkel (0deg, 90deg, 180deg)
      'pie-start-angle': new fields.StringField({ required: false, blank: true, initial: "0deg" }),
      
      // Compound-Node-Eigenschaften
      // Padding relativ zu (width, height, average, min, max)
      'padding-relative-to': new fields.StringField({ required: false, blank: true, initial: "width" }),
      // Position (origin, center)
      position: new fields.StringField({ required: false, blank: true, initial: "origin" }),
      // Größe bezüglich Labels (include, exclude)
      'compound-sizing-wrt-labels': new fields.StringField({ required: false, blank: true, initial: "include" }),
      // Minimale Breite
      'min-width': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Minimale Höhe
      'min-height': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      
      // Ghost-Eigenschaften
      // Ghost-Effekt aktivieren (yes, no)
      ghost: new fields.StringField({ required: false, blank: true, initial: "no" }),
      // Ghost horizontaler Offset
      'ghost-offset-x': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Ghost vertikaler Offset
      'ghost-offset-y': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Ghost-Transparenz
      'ghost-opacity': new fields.NumberField({ required: false, blank: true, initial: 0 })
    };
  }
} 