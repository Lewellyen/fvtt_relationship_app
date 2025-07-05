export class DeathwatchActor extends Actor {
  // (Alle Actor-Initialisierungen laufen über Hooks/Services.)
  static type = "dw-character";
  static get typeLabel(): string {
    return (CONFIG.Actor.typeLabels as any)[DeathwatchActor.type];
  }
}
