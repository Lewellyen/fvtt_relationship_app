const { EmbeddedDataField, ArrayField, StringField } = foundry.data.fields;

export class RelationshipNodeDataModel extends foundry.abstract.DataModel<
  any,
  any,
  any
> {
  static defineSchema(): foundry.data.fields.DataSchema {
    return {
      id: new StringField({ required: true, initial: "" }),
      actorUuid: new StringField({ required: false, initial: "" }),
      label: new StringField({ required: false, initial: "" }),
    };
  }
}

export class RelationshipEdgeDataModel extends foundry.abstract.DataModel<
  any,
  any,
  any
> {
  static defineSchema(): foundry.data.fields.DataSchema {
    return {
      id: new StringField({ required: true, initial: "" }),
      source: new StringField({ required: true, initial: "" }),
      target: new StringField({ required: true, initial: "" }),
      type: new StringField({ required: false, initial: "" }),
      label: new StringField({ required: false, initial: "" }),
    };
  }
}

export class RelationshipGraphDataModel extends foundry.abstract.DataModel<
  any,
  any,
  any
> {
  static defineSchema(): foundry.data.fields.DataSchema {
    return {
      nodes: new ArrayField(
        new EmbeddedDataField(RelationshipNodeDataModel, { required: true }),
        { required: true, initial: [] },
      ),
      edges: new ArrayField(
        new EmbeddedDataField(RelationshipEdgeDataModel, { required: true }),
        { required: true, initial: [] },
      ),
    };
  }
}
