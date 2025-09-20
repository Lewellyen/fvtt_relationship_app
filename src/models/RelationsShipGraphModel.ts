// Note: This model extends Foundry's TypeDataModel for compatibility
// In a fully decoupled architecture, this would be a pure domain model
const fields = foundry.data.fields;

export class RelationshipGraphModel extends foundry.abstract.TypeDataModel<any, any, any, any> {
  static override defineSchema() {
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
