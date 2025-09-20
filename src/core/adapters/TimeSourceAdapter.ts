// import type { ITimeSource } from "../../interfaces/core/IPorts";

/**
 * Time Source Adapter
 *
 * Foundry-spezifische Implementierung der Zeitquelle
 * Kapselt Date.now() für deterministische Tests
 */
export class TimeSourceAdapter {
  static readonly API_NAME = "timeSource";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "TimeSourceAdapter";
  static readonly DEPENDENCIES = [];

  /**
   * Liefert aktuelle Zeit
   */
  getCurrentTime(): Date {
    return new Date();
  }
}
