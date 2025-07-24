const fields = foundry.data.fields;

export class RelationshipGraphModel extends foundry.abstract.TypeDataModel<any, any, any, any> {
  static defineSchema() {
    return {
      nodes: new fields.ArrayField(
        new fields.SchemaField({
          id: new fields.StringField({ required: true, blank: false }),
          label: new fields.StringField({ blank: false }),
          x: new fields.NumberField({ required: true }),
          y: new fields.NumberField({ required: true }),
          type: new fields.StringField({ required: true, blank: false }),
          color: new fields.ColorField({ required: true, blank: false }),
        }),
        { required: true, blank: true }
      ),
      edges: new fields.ArrayField(
        new fields.SchemaField({
          id: new fields.StringField({ required: true, blank: false }),
          label: new fields.StringField({ blank: false }),
          source: new fields.StringField({ required: true, blank: false }),
          target: new fields.StringField({ required: true, blank: false }),
          type: new fields.StringField({ required: true, blank: false }),
          color: new fields.ColorField({ required: true, blank: false }),
        }),
        { required: true, blank: true }
      ),
    };
  }
}