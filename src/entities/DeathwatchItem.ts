import { DeathwatchItemDataModel } from "../models/DeathwatchItemDataModel";

export class DeathwatchItem extends Item {
  system!: DeathwatchItemDataModel;
  /** Foundry document name */
  name!: string;
  // (Alle Item-Initialisierungen laufen über Hooks/Services.)
  static type = "dw-item";
  static get typeLabel(): string {
    return (CONFIG.Item.typeLabels as any)[DeathwatchItem.type];
  }
}
