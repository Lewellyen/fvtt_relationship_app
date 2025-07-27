const fields = foundry.data.fields;
import { PermissionsModel } from "./PermissionsModel";

export class RelationshipEffectModel extends foundry.abstract.DataModel<any, any, any> {
  static defineSchema() {
    return {
      type: new fields.StringField({ required: true, blank: false, initial: "effect" }),
      description: new fields.HTMLField({ required: true, blank: false, initial: "" }),
      permissions: new fields.EmbeddedDataField(PermissionsModel, { required: true, blank: false }),
    };
  }
}
