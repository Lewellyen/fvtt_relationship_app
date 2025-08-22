const fields = foundry.data.fields;
import { PermissionsModel } from "./PermissionsModel";

export class RelationshipGraphModel extends foundry.abstract.TypeDataModel<any, any, any, any> {
  static defineSchema() {
    return {
      // GRAPH METADATA
      // Beschreibung des Graphen
      description: new fields.HTMLField({ required: false, blank: true }),
      // Graph-Level Berechtigungen
      permissions: new fields.EmbeddedDataField(PermissionsModel, { required: true, blank: false }),
      // Version des Graphen
      version: new fields.StringField({ required: false, blank: true, initial: "1.0.0" }),
      // Erstellungsdatum
      created: new fields.NumberField({ required: false, blank: true }),
      // Letzte Änderung
      modified: new fields.NumberField({ required: false, blank: true }),

      // GRAPH SETTINGS
      // Zoom-Level
      zoom: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Pan-Position X
      panX: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Pan-Position Y
      panY: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Layout-Typ (grid, random, circle, etc.)
      layoutType: new fields.StringField({ required: false, blank: true, initial: "preset" }),

      // CYTOGRAPHE ELEMENTS direkt als JSON
      elements: new fields.ObjectField({
        required: true,
        blank: true,
        initial: {
          nodes: [],
          edges: [],
        },
      }),

      // CYTOGRAPHE STYLE als JSON
      style: new fields.ArrayField(new fields.ObjectField({ required: true }), {
        required: true,
        blank: true,
        initial: [],
      }),
    };
  }
}
