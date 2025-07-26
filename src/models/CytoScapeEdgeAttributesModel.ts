import { CytoScapeCommonAttributesModel } from './CytoScapeCommonAttributesModel';

const fields = foundry.data.fields;

// Edge-spezifisches Schema
export class CytoScapeEdgeAttributesModel extends CytoScapeCommonAttributesModel {
  static defineSchema() {
    const commonSchema = super.defineSchema();
    return {
      ...commonSchema,
      // ERFORDERLICHE FELDER (required: true)
      // Keine erforderlichen Felder im Edge-Schema
      
      // OPTIONALE FELDER (required: false)
      // Grundlegende Edge-Eigenschaften
      // Linienbreite in Pixeln
      width: new fields.NumberField({ required: false, blank: true, initial: 3 }),
      // Linienfarbe
      lineColor: new fields.ColorField({ required: false, blank: true, initial: "#999" }),
      // Linien-Transparenz
      lineOpacity: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Linienart (solid, dashed, dotted)
      lineStyle: new fields.StringField({ required: false, blank: true, initial: "solid" }),
      // Kurvenstil (haystack, bezier, straight, taxi, unbundled-bezier)
      curveStyle: new fields.StringField({ required: false, blank: true, initial: "haystack" }),
      
      // Pfeil-Eigenschaften
      // Pfeilform am Ende (none, triangle, vee, tee, diamond, square)
      targetArrowShape: new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Pfeilfarbe am Ende
      targetArrowColor: new fields.ColorField({ required: false, blank: true, initial: "#999" }),
      // Pfeilbreite am Ende
      targetArrowWidth: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Pfeilfüllung am Ende (filled, hollow)
      targetArrowFill: new fields.StringField({ required: false, blank: true, initial: "filled" }),
      // Pfeilform am Anfang (none, triangle, vee, tee, diamond, square)
      sourceArrowShape: new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Pfeilfarbe am Anfang
      sourceArrowColor: new fields.ColorField({ required: false, blank: true, initial: "#999" }),
      // Pfeilbreite am Anfang
      sourceArrowWidth: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Pfeilfüllung am Anfang (filled, hollow)
      sourceArrowFill: new fields.StringField({ required: false, blank: true, initial: "filled" }),
      // Mittlerer Pfeil am Anfang (none, triangle, vee, tee, diamond, square)
      midSourceArrowShape: new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Mittlerer Pfeilfarbe am Anfang
      midSourceArrowColor: new fields.ColorField({ required: false, blank: true, initial: "#999" }),
      // Mittlerer Pfeilbreite am Anfang
      midSourceArrowWidth: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Mittlerer Pfeilfüllung am Anfang (filled, hollow)
      midSourceArrowFill: new fields.StringField({ required: false, blank: true, initial: "filled" }),
      // Mittlerer Pfeil am Ende (none, triangle, vee, tee, diamond, square)
      midTargetArrowShape: new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Mittlerer Pfeilfarbe am Ende
      midTargetArrowColor: new fields.ColorField({ required: false, blank: true, initial: "#999" }),
      // Mittlerer Pfeilbreite am Ende
      midTargetArrowWidth: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Mittlerer Pfeilfüllung am Ende (filled, hollow)
      midTargetArrowFill: new fields.StringField({ required: false, blank: true, initial: "filled" }),
      
      // Edge-spezifische Eigenschaften
      // Linienende (butt, round, square)
      lineCap: new fields.StringField({ required: false, blank: true, initial: "butt" }),
      // Linienfüllung (solid, linear-gradient)
      lineFill: new fields.StringField({ required: false, blank: true, initial: "solid" }),
      // Linienumrissbreite
      lineOutlineWidth: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Linienumrissfarbe
      lineOutlineColor: new fields.ColorField({ required: false, blank: true, initial: "#000" }),
      // Linien-Gradient-Farben
      lineGradientStopColors: new fields.StringField({ required: false, blank: true, initial: "#999" }),
      // Linien-Gradient-Positionen
      lineGradientStopPositions: new fields.StringField({ required: false, blank: true, initial: "0%" }),
      // Strichmuster für gestrichelte Linien
      lineDashPattern: new fields.ArrayField(new fields.NumberField(), { required: false, blank: true, initial: [6, 3] }),
      // Strichmuster-Offset
      lineDashOffset: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      
      // Kontrollpunkt-Eigenschaften
      // Kontrollpunkt-Abstand in Pixeln
      controlPointStepSize: new fields.NumberField({ required: false, blank: true, initial: 40 }),
      // Kontrollpunkt-Gewichtung (0-1)
      controlPointWeights: new fields.NumberField({ required: false, blank: true, initial: 0.5 }),
      // Segment-Gewichtung (0-1)
      segmentWeights: new fields.NumberField({ required: false, blank: true, initial: 0.5 }),
      // Segment-Abstände in Pixeln
      segmentDistances: new fields.NumberField({ required: false, blank: true, initial: 20 }),
      // Segment-Radien in Pixeln
      segmentRadii: new fields.NumberField({ required: false, blank: true, initial: 15 }),
      
      // Kurven- und Routing-Eigenschaften
      // Radius-Typ (arc-radius, arc-radius-2, arc-radius-3)
      radiusType: new fields.StringField({ required: false, blank: true, initial: "arc-radius" }),
      // Taxi-Kurve (50%, 25%, 75%)
      taxiTurn: new fields.StringField({ required: false, blank: true, initial: "50%" }),
      // Taxi-Radius in Pixeln
      taxiRadius: new fields.NumberField({ required: false, blank: true, initial: 15 }),
      // Minimale Taxi-Kurven-Distanz
      taxiTurnMinDistance: new fields.NumberField({ required: false, blank: true, initial: 10 }),
      // Taxi-Richtung (auto, upward, downward, leftward, rightward)
      taxiDirection: new fields.StringField({ required: false, blank: true, initial: "auto" }),
      // Edge-Distanzen (intersection, node-position, 0-1)
      edgeDistances: new fields.StringField({ required: false, blank: true, initial: "intersection" }),
      // Haystack-Radius in Pixeln
      haystackRadius: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Pfeil-Skalierung (Multiplikator)
      arrowScale: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      
      // Loop-Eigenschaften
      // Loop-Richtung (-45deg, 45deg, 90deg, etc.)
      loopDirection: new fields.StringField({ required: false, blank: true, initial: "-45deg" }),
      // Loop-Ausrichtung (-90deg, 90deg, 180deg, etc.)
      loopSweep: new fields.StringField({ required: false, blank: true, initial: "-90deg" }),
      
      // Endpunkt-Eigenschaften
      // Quell-Distanz vom Node in Pixeln
      sourceDistanceFromNode: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Ziel-Distanz vom Node in Pixeln
      targetDistanceFromNode: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Quell-Endpunkt (outside-to-node, outside-to-line, inside-to-node)
      sourceEndpoint: new fields.StringField({ required: false, blank: true, initial: "outside-to-node" }),
      // Ziel-Endpunkt (outside-to-node, outside-to-line, inside-to-node)
      targetEndpoint: new fields.StringField({ required: false, blank: true, initial: "outside-to-node" }),
      
      // Edge-spezifische Text-Eigenschaften
      // Quell-Label (Text am Anfang der Edge)
      sourceLabel: new fields.StringField({ required: false, blank: true, initial: "" }),
      // Quell-Text-Offset in Pixeln
      sourceTextOffset: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Quell-Text horizontaler Abstand
      sourceTextMarginX: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Quell-Text vertikaler Abstand
      sourceTextMarginY: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Quell-Text-Rotation (none, autorotate, 45deg, etc.)
      sourceTextRotation: new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Ziel-Label (Text am Ende der Edge)
      targetLabel: new fields.StringField({ required: false, blank: true, initial: "" }),
      // Ziel-Text-Offset in Pixeln
      targetTextOffset: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Ziel-Text horizontaler Abstand
      targetTextMarginX: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Ziel-Text vertikaler Abstand
      targetTextMarginY: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Ziel-Text-Rotation (none, autorotate, 45deg, etc.)
      targetTextRotation: new fields.StringField({ required: false, blank: true, initial: "none" })
    };
  }
} 