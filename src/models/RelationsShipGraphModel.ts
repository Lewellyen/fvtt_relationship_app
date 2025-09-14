const fields = foundry.data.fields;

export class RelationshipGraphModel extends foundry.abstract.TypeDataModel<any, any, any, any> {
  static defineSchema() {
    return {
      version: new fields.NumberField({
        required: true,
        initial: 1,
        min: 1,
        integer: true,
      }),
      nodes: new fields.ObjectField({
        required: true,
        initial: {},
      }),
      edges: new fields.ObjectField({
        required: true,
        initial: {},
      }),
      policy: new fields.ObjectField({
        required: true,
        initial: {},
      }),
    };
  }
}
