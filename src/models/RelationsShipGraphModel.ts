const fields = foundry.data.fields;

export class RelationshipGraphModel extends foundry.abstract.TypeDataModel<any, any, any, any> {
  static defineSchema() {
    return {
      // GRAPH METADATA
      // Beschreibung des Graphen
      description: new fields.HTMLField({ required: false, blank: true }),
      // Version des Graphen
      version: new fields.StringField({ required: false, blank: true, initial: "1.0.0" }),
      // Erstellungsdatum
      created: new fields.NumberField({ required: false, blank: true }),
      // Letzte Änderung
      modified: new fields.NumberField({ required: false, blank: true }),

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
