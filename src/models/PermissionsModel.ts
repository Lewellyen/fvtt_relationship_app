const fields = foundry.data.fields;

export class PermissionsModel extends foundry.abstract.TypeDataModel<any, any, any, any> {
  static defineSchema() {
    return {
      defaultLevel: new fields.NumberField({ required: true, blank: false, initial: 0 }),
      users: new fields.ArrayField(
        new fields.SchemaField({
          id: new fields.StringField({ required: true, blank: false }),
          level: new fields.NumberField({ required: true, blank: false, initial: 0 }),
        }),
        { required: true, blank: true, initial: [] }
      ),
    };
  }
}