// import type { IIdGenerator } from "../../interfaces/core/IPorts";

/**
 * ID Generator Adapter
 *
 * Foundry-spezifische Implementierung des ID-Generator Ports
 * Kapselt foundry.utils.randomID() für die Domäne
 */
export class IdGeneratorAdapter {
  static readonly API_NAME = "idGenerator";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "IdGeneratorAdapter";
  static readonly DEPENDENCIES = [];

  /**
   * Generiert eine eindeutige ID
   */
  generateId(): string {
    return foundry.utils.randomID();
  }
}
