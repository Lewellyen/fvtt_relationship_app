import { LoggerService } from "./LoggerService";

/**
 * Performance Monitor für das WH40K Deathwatch System.
 * Überwacht Ausführungszeiten und warnt bei langsamen Operationen.
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private logger = LoggerService.getInstance();
  private marks = new Map<string, number>();
  private measurements = new Map<string, number[]>();

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Startet eine Performance-Messung
   */
  start(label: string): void {
    this.marks.set(label, performance.now());
  }

  /**
   * Beendet eine Performance-Messung und loggt das Ergebnis
   */
  end(label: string): number {
    const start = this.marks.get(label);
    if (!start) {
      this.logger.warn(`Performance measurement '${label}' was not started`);
      return 0;
    }

    const duration = performance.now() - start;
    this.marks.delete(label);

    // Speichere Messung für Statistiken
    if (!this.measurements.has(label)) {
      this.measurements.set(label, []);
    }
    this.measurements.get(label)!.push(duration);

    // Logge Performance-Ergebnis
    this.logger.performance(label, duration);

    return duration;
  }

  /**
   * Misst die Ausführungszeit einer Funktion
   */
  measure<T>(label: string, fn: () => T): T {
    this.start(label);
    try {
      const result = fn();
      this.end(label);
      return result;
    } catch (error) {
      this.end(label);
      throw error;
    }
  }

  /**
   * Misst die Ausführungszeit einer asynchronen Funktion
   */
  async measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.start(label);
    try {
      const result = await fn();
      this.end(label);
      return result;
    } catch (error) {
      this.end(label);
      throw error;
    }
  }

  /**
   * Misst die Render-Zeit einer Svelte-Komponente
   */
  measureComponentRender(componentName: string, renderFn: () => void): void {
    this.measure(`Component Render: ${componentName}`, renderFn);
  }

  /**
   * Gibt Statistiken für eine Messung zurück
   */
  getStats(
    label: string,
  ): { avg: number; min: number; max: number; count: number } | null {
    const measurements = this.measurements.get(label);
    if (!measurements || measurements.length === 0) {
      return null;
    }

    const sum = measurements.reduce((a, b) => a + b, 0);
    const avg = sum / measurements.length;
    const min = Math.min(...measurements);
    const max = Math.max(...measurements);

    return { avg, min, max, count: measurements.length };
  }

  /**
   * Gibt alle Performance-Statistiken zurück
   */
  getAllStats(): Record<
    string,
    { avg: number; min: number; max: number; count: number }
  > {
    const stats: Record<
      string,
      { avg: number; min: number; max: number; count: number }
    > = {};

    for (const [label] of this.measurements) {
      const stat = this.getStats(label);
      if (stat) {
        stats[label] = stat;
      }
    }

    return stats;
  }

  /**
   * Löscht alle gespeicherten Messungen
   */
  clear(): void {
    this.marks.clear();
    this.measurements.clear();
  }

  /**
   * Prüft, ob eine Operation zu langsam ist (über 100ms)
   */
  isSlow(duration: number): boolean {
    return duration > 100;
  }

  /**
   * Prüft, ob eine Operation kritisch langsam ist (über 500ms)
   */
  isCritical(duration: number): boolean {
    return duration > 500;
  }
}
