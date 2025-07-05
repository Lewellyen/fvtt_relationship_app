import { DeathwatchActorDataModel } from "../models/DeathwatchActorDataModel";

export class DeathwatchActor extends Actor {
  system!: DeathwatchActorDataModel;
  /** Foundry document name */
  name!: string;
  /** Collection of owned items */
  items!: any[];
  // (Alle Actor-Initialisierungen laufen über Hooks/Services.)
  static type = "dw-character";
  static get typeLabel(): string {
    return (CONFIG.Actor.typeLabels as any)[DeathwatchActor.type];
  }
}
