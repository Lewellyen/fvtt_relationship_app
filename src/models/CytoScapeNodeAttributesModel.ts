import { CytoScapeCommonAttributesModel } from './CytoScapeCommonAttributesModel';

const fields = foundry.data.fields;

// Node-spezifisches Schema
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
      borderColor: new fields.ColorField({ required: true, blank: false, initial: "#000" }),
      // Rahmenbreite (erforderlich)
      borderWidth: new fields.NumberField({ required: true, blank: false, initial: 0 }),
      
      // OPTIONALE FELDER (required: false)
      // Grundlegende Node-Eigenschaften
      // Breite des Nodes in Pixeln
      width: new fields.NumberField({ required: false, blank: true, initial: 30 }),
      // Höhe des Nodes in Pixeln
      height: new fields.NumberField({ required: false, blank: true, initial: 30 }),
      // Hintergrundfarbe des Nodes
      backgroundColor: new fields.ColorField({ required: false, blank: true, initial: "#999" }),
      // Hintergrund-Transparenz
      backgroundOpacity: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // URL/Pfad zum Hintergrundbild
      backgroundImage: new fields.StringField({ required: false, blank: true, initial: "none" }),
      // CORS-Einstellung für externe Bilder
      backgroundImageCrossorigin: new fields.StringField({ required: false, blank: true, initial: "anonymous" }),
      // Transparenz des Hintergrundbildes
      backgroundImageOpacity: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Begrenzung des Bildes (inside, outside)
      backgroundImageContainment: new fields.StringField({ required: false, blank: true, initial: "inside" }),
      // Bildglättung (yes, no)
      backgroundImageSmoothing: new fields.StringField({ required: false, blank: true, initial: "yes" }),
      // Horizontale Bildposition (50%, left, center, right)
      backgroundPositionX: new fields.StringField({ required: false, blank: true, initial: "50%" }),
      // Vertikale Bildposition (50%, top, center, bottom)
      backgroundPositionY: new fields.StringField({ required: false, blank: true, initial: "50%" }),
      // Horizontaler Bild-Offset in Pixeln
      backgroundOffsetX: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Vertikaler Bild-Offset in Pixeln
      backgroundOffsetY: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Relative Bildbreite (include-padding, exclude-padding)
      backgroundWidthRelativeTo: new fields.StringField({ required: false, blank: true, initial: "include-padding" }),
      // Relative Bildhöhe (include-padding, exclude-padding)
      backgroundHeightRelativeTo: new fields.StringField({ required: false, blank: true, initial: "include-padding" }),
      // Bild-Wiederholung (no-repeat, repeat, repeat-x, repeat-y)
      backgroundRepeat: new fields.StringField({ required: false, blank: true, initial: "no-repeat" }),
      // Bildanpassung (none, contain, cover, fill, scale-down)
      backgroundFit: new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Bildbeschnitt (node, none)
      backgroundClip: new fields.StringField({ required: false, blank: true, initial: "node" }),
      // Bildbreite (auto, 100%, 50px)
      backgroundWidth: new fields.StringField({ required: false, blank: true, initial: "auto" }),
      // Bildhöhe (auto, 100%, 50px)
      backgroundHeight: new fields.StringField({ required: false, blank: true, initial: "auto" }),
      // Eckenrundung (auto, 10px, 50%)
      cornerRadius: new fields.StringField({ required: false, blank: true, initial: "auto" }),
      // Innenabstand des Nodes
      padding: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      
      // Border/Outline-Eigenschaften
      // Rahmenstil (solid, dashed, dotted)
      borderStyle: new fields.StringField({ required: false, blank: true, initial: "solid" }),
      // Rahmen-Transparenz
      borderOpacity: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Strichmuster für gestrichelte Rahmen
      borderDashPattern: new fields.ArrayField(new fields.NumberField(), { required: false, blank: true, initial: [4, 2] }),
      // Strichmuster-Offset
      borderDashOffset: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Rahmen-Ende (butt, round, square)
      borderCap: new fields.StringField({ required: false, blank: true, initial: "butt" }),
      // Rahmen-Verbindung (miter, round, bevel)
      borderJoin: new fields.StringField({ required: false, blank: true, initial: "miter" }),
      // Rahmen-Position (center, inside, outside)
      borderPosition: new fields.StringField({ required: false, blank: true, initial: "center" }),
      // Umrissfarbe
      outlineColor: new fields.ColorField({ required: false, blank: true, initial: "#999" }),
      // Umrissbreite
      outlineWidth: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Umriss-Transparenz
      outlineOpacity: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Umriss-Offset
      outlineOffset: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Umriss-Stil (solid, dashed, etc.)
      outlineStyle: new fields.StringField({ required: false, blank: true, initial: "solid" }),
      
      // Erweiterte Node-Eigenschaften
      // Gradient-Richtung (to-bottom, to-top, to-right, to-left, 45deg)
      backgroundGradientDirection: new fields.StringField({ required: false, blank: true, initial: "to-bottom" }),
      // Gradient-Farben (#ff0000, #00ff00, #0000ff)
      backgroundGradientStopColors: new fields.StringField({ required: false, blank: true, initial: "#999" }),
      // Gradient-Positionen (0%, 50%, 100%)
      backgroundGradientStopPositions: new fields.StringField({ required: false, blank: true, initial: "0%" }),
      // Hintergrund-Abdunklung (-1 bis 1)
      backgroundBlacken: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Hintergrund-Füllung (solid, linear-gradient, radial-gradient)
      backgroundFill: new fields.StringField({ required: false, blank: true, initial: "solid" }),
      // Polygon-Punkte für polygon-Form
      shapePolygonPoints: new fields.StringField({ required: false, blank: true, initial: "-1, -1,   1, -1,   1, 1,   -1, 1" }),
      // Grenzen-Erweiterung in Pixeln
      boundsExpansion: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      
      // Pie-Chart-Eigenschaften
      // Pie-Chart-Größe (100%, 50px)
      pieSize: new fields.StringField({ required: false, blank: true, initial: "100%" }),
      // Loch in der Mitte (0-1)
      pieHole: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Startwinkel (0deg, 90deg, 180deg)
      pieStartAngle: new fields.StringField({ required: false, blank: true, initial: "0deg" }),
      
      // Compound-Node-Eigenschaften
      // Padding relativ zu (width, height, average, min, max)
      paddingRelativeTo: new fields.StringField({ required: false, blank: true, initial: "width" }),
      // Position (origin, center)
      position: new fields.StringField({ required: false, blank: true, initial: "origin" }),
      // Größe bezüglich Labels (include, exclude)
      compoundSizingWrtLabels: new fields.StringField({ required: false, blank: true, initial: "include" }),
      // Minimale Breite
      minWidth: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Minimale Höhe
      minHeight: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      
      // Ghost-Eigenschaften
      // Ghost-Effekt aktivieren (yes, no)
      ghost: new fields.StringField({ required: false, blank: true, initial: "no" }),
      // Ghost horizontaler Offset
      ghostOffsetX: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Ghost vertikaler Offset
      ghostOffsetY: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Ghost-Transparenz
      ghostOpacity: new fields.NumberField({ required: false, blank: true, initial: 0 })
    };
  }
} 