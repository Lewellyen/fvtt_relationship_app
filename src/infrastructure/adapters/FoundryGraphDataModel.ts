/**
 * Foundry Graph Data Model
 *
 * Foundry-specific implementation of the graph data model
 * This is the infrastructure layer that handles Foundry VTT integration
 */

const fields = foundry.data.fields;

export class FoundryGraphDataModel extends foundry.abstract.TypeDataModel<
  {
    version: foundry.data.fields.NumberField;
    nodes: foundry.data.fields.ObjectField;
    edges: foundry.data.fields.ObjectField;
    policy: foundry.data.fields.ObjectField;
  },
  any,
  {
    version: number;
    nodes: Record<string, unknown>;
    edges: Record<string, unknown>;
    policy: Record<string, unknown>;
  },
  {
    version: number;
    nodes: Record<string, unknown>;
    edges: Record<string, unknown>;
    policy: Record<string, unknown>;
  }
> {
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
