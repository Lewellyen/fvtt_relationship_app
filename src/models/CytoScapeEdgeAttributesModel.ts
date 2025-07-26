import { CytoScapeCommonAttributesModel } from './CytoScapeCommonAttributesModel';

const fields = foundry.data.fields;

// Edge-spezifisches Schema mit Snake_case für 1:1 Cytoscape-Kompatibilität
export class CytoScapeEdgeAttributesModel extends CytoScapeCommonAttributesModel {
  static defineSchema() {
    const commonSchema = super.defineSchema();
    return {
      ...commonSchema,
      // ERFORDERLICHE FELDER (required: true)
      // Keine erforderlichen Felder im Edge-Schema
      
      // OPTIONALE FELDER (required: false) - Alle in Snake_case
      // Grundlegende Edge-Eigenschaften
      // Linienbreite in Pixeln
      width: new fields.NumberField({ required: false, blank: true, initial: 3 }),
      // Linienfarbe
      'line-color': new fields.ColorField({ required: false, blank: true, initial: "#999" }),
      // Linien-Transparenz
      'line-opacity': new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Linienart (solid, dashed, dotted)
      'line-style': new fields.StringField({ required: false, blank: true, initial: "solid" }),
      // Kurvenstil (haystack, bezier, straight, taxi, unbundled-bezier)
      'curve-style': new fields.StringField({ required: false, blank: true, initial: "haystack" }),
      
      // Pfeil-Eigenschaften
      // Pfeilform am Ende (none, triangle, vee, tee, diamond, square)
      'target-arrow-shape': new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Pfeilfarbe am Ende
      'target-arrow-color': new fields.ColorField({ required: false, blank: true, initial: "#999" }),
      // Pfeilbreite am Ende
      'target-arrow-width': new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Pfeilfüllung am Ende (filled, hollow)
      'target-arrow-fill': new fields.StringField({ required: false, blank: true, initial: "filled" }),
      // Pfeilform am Anfang (none, triangle, vee, tee, diamond, square)
      'source-arrow-shape': new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Pfeilfarbe am Anfang
      'source-arrow-color': new fields.ColorField({ required: false, blank: true, initial: "#999" }),
      // Pfeilbreite am Anfang
      'source-arrow-width': new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Pfeilfüllung am Anfang (filled, hollow)
      'source-arrow-fill': new fields.StringField({ required: false, blank: true, initial: "filled" }),
      // Mittlerer Pfeil am Anfang (none, triangle, vee, tee, diamond, square)
      'mid-source-arrow-shape': new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Mittlerer Pfeilfarbe am Anfang
      'mid-source-arrow-color': new fields.ColorField({ required: false, blank: true, initial: "#999" }),
      // Mittlerer Pfeilbreite am Anfang
      'mid-source-arrow-width': new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Mittlerer Pfeilfüllung am Anfang (filled, hollow)
      'mid-source-arrow-fill': new fields.StringField({ required: false, blank: true, initial: "filled" }),
      // Mittlerer Pfeil am Ende (none, triangle, vee, tee, diamond, square)
      'mid-target-arrow-shape': new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Mittlerer Pfeilfarbe am Ende
      'mid-target-arrow-color': new fields.ColorField({ required: false, blank: true, initial: "#999" }),
      // Mittlerer Pfeilbreite am Ende
      'mid-target-arrow-width': new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Mittlerer Pfeilfüllung am Ende (filled, hollow)
      'mid-target-arrow-fill': new fields.StringField({ required: false, blank: true, initial: "filled" }),
      
      // Edge-spezifische Eigenschaften
      // Linienende (butt, round, square)
      'line-cap': new fields.StringField({ required: false, blank: true, initial: "butt" }),
      // Linienfüllung (solid, linear-gradient)
      'line-fill': new fields.StringField({ required: false, blank: true, initial: "solid" }),
      // Linienumrissbreite
      'line-outline-width': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Linienumrissfarbe
      'line-outline-color': new fields.ColorField({ required: false, blank: true, initial: "#000" }),
      // Linien-Gradient-Farben
      'line-gradient-stop-colors': new fields.StringField({ required: false, blank: true, initial: "#999" }),
      // Linien-Gradient-Positionen
      'line-gradient-stop-positions': new fields.StringField({ required: false, blank: true, initial: "0%" }),
      // Strichmuster für gestrichelte Linien
      'line-dash-pattern': new fields.ArrayField(new fields.NumberField(), { required: false, blank: true, initial: [6, 3] }),
      // Strichmuster-Offset
      'line-dash-offset': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      
      // Kontrollpunkt-Eigenschaften
      // Kontrollpunkt-Abstand in Pixeln
      'control-point-step-size': new fields.NumberField({ required: false, blank: true, initial: 40 }),
      // Kontrollpunkt-Gewichtung (0-1)
      'control-point-weights': new fields.NumberField({ required: false, blank: true, initial: 0.5 }),
      // Segment-Gewichtung (0-1)
      'segment-weights': new fields.NumberField({ required: false, blank: true, initial: 0.5 }),
      // Segment-Abstände in Pixeln
      'segment-distances': new fields.NumberField({ required: false, blank: true, initial: 20 }),
      // Segment-Radien in Pixeln
      'segment-radii': new fields.NumberField({ required: false, blank: true, initial: 15 }),
      
      // Kurven- und Routing-Eigenschaften
      // Radius-Typ (arc-radius, arc-radius-2, arc-radius-3)
      'radius-type': new fields.StringField({ required: false, blank: true, initial: "arc-radius" }),
      // Taxi-Kurve (50%, 25%, 75%)
      'taxi-turn': new fields.StringField({ required: false, blank: true, initial: "50%" }),
      // Taxi-Radius in Pixeln
      'taxi-radius': new fields.NumberField({ required: false, blank: true, initial: 15 }),
      // Minimale Taxi-Kurven-Distanz
      'taxi-turn-min-distance': new fields.NumberField({ required: false, blank: true, initial: 10 }),
      // Taxi-Richtung (auto, upward, downward, leftward, rightward)
      'taxi-direction': new fields.StringField({ required: false, blank: true, initial: "auto" }),
      // Edge-Distanzen (intersection, node-position, 0-1)
      'edge-distances': new fields.StringField({ required: false, blank: true, initial: "intersection" }),
      // Haystack-Radius in Pixeln
      'haystack-radius': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Pfeil-Skalierung (Multiplikator)
      'arrow-scale': new fields.NumberField({ required: false, blank: true, initial: 1 }),
      
      // Loop-Eigenschaften
      // Loop-Richtung (-45deg, 45deg, 90deg, etc.)
      'loop-direction': new fields.StringField({ required: false, blank: true, initial: "-45deg" }),
      // Loop-Ausrichtung (-90deg, 90deg, 180deg, etc.)
      'loop-sweep': new fields.StringField({ required: false, blank: true, initial: "-90deg" }),
      
      // Endpunkt-Eigenschaften
      // Quell-Distanz vom Node in Pixeln
      'source-distance-from-node': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Ziel-Distanz vom Node in Pixeln
      'target-distance-from-node': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Quell-Endpunkt (outside-to-node, outside-to-line, inside-to-node)
      'source-endpoint': new fields.StringField({ required: false, blank: true, initial: "outside-to-node" }),
      // Ziel-Endpunkt (outside-to-node, outside-to-line, inside-to-node)
      'target-endpoint': new fields.StringField({ required: false, blank: true, initial: "outside-to-node" }),
      
      // Edge-spezifische Text-Eigenschaften
      // Quell-Label (Text am Anfang der Edge)
      'source-label': new fields.StringField({ required: false, blank: true, initial: "" }),
      // Quell-Text-Offset in Pixeln
      'source-text-offset': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Quell-Text horizontaler Abstand
      'source-text-margin-x': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Quell-Text vertikaler Abstand
      'source-text-margin-y': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Quell-Text-Rotation (none, autorotate, 45deg, etc.)
      'source-text-rotation': new fields.StringField({ required: false, blank: true, initial: "none" }),
      // Ziel-Label (Text am Ende der Edge)
      'target-label': new fields.StringField({ required: false, blank: true, initial: "" }),
      // Ziel-Text-Offset in Pixeln
      'target-text-offset': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Ziel-Text horizontaler Abstand
      'target-text-margin-x': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Ziel-Text vertikaler Abstand
      'target-text-margin-y': new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Ziel-Text-Rotation (none, autorotate, 45deg, etc.)
      'target-text-rotation': new fields.StringField({ required: false, blank: true, initial: "none" })
    };
  }
} 