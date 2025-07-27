const fields = foundry.data.fields;
import { PermissionsModel } from "./PermissionsModel";

export class DescriptionModel extends foundry.abstract.DataModel<any, any, any> {
  static defineSchema() {
    return {
      text: new fields.HTMLField({ required: true, blank: false, initial: "" }),
      category: new fields.StringField({ required: true, blank: false, initial: "general" }),
      permissions: new fields.EmbeddedDataField(PermissionsModel, { required: true, blank: false }),
    };
  }
}
