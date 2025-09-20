import { mount, unmount } from "svelte";
import RelationshipGraphView from "../../svelte/RelationshipGraphView.svelte";
import RelationshipGraphEdit from "../../svelte/RelationshipGraphEdit.svelte";
import type { ISvelteManager, ILogger } from "../../interfaces";
import { FoundryLogger } from "./FoundryLogger";
// IRelationshipGraphService wird nicht direkt verwendet, da SvelteManager nur für Component Management zuständig ist

/**
 * SvelteManager - Verantwortlich für Svelte Component Management
 * Single Responsibility: Nur Svelte Mounting/Unmounting Logic
 */
export class SvelteManager implements ISvelteManager {
  // ✅ Metadaten für Service Registration
  static readonly API_NAME = "svelteManager";
  static readonly SERVICE_TYPE = "scoped" as const;
  static readonly CLASS_NAME = "SvelteManager"; // ✅ Klassename für Dependency Resolution
  static readonly DEPENDENCIES = [FoundryLogger]; // ✅ Dependencies explizit definiert - FoundryLogger bereits an erster Stelle

  constructor(private logger: ILogger) {}

  /**
   * Mountet eine Svelte-Komponente
   */
  async mountComponent<T>(component: any, target: HTMLElement, props: any): Promise<T> {
    this.writeLog("info", `[SvelteManager] Mounting component: ${component.name}`);

    // Logger in Props injizieren
    const propsWithLogger = {
      ...props,
      logger: this.logger,
    };

    const app = mount(component, {
      target,
      props: propsWithLogger,
    });

    this.writeLog("info", "[SvelteManager] Component mounted successfully");
    return app as T;
  }

  /**
   * Unmountet eine Svelte-App
   */
  async unmountApp(app: any): Promise<void> {
    if (app) {
      this.writeLog("info", "[SvelteManager] Unmounting app");
      await unmount(app);
      this.writeLog("info", "[SvelteManager] App unmounted successfully");
    }
  }

  /**
   * Mountet eine Graph-Komponente mit spezifischer Logik
   */
  async mountGraphComponent(
    element: HTMLElement,
    document: any,
    isEditMode: boolean
  ): Promise<void> {
    this.writeLog("info", `[SvelteManager] Mounting graph component, edit mode: ${isEditMode}`);

    const target = element.querySelector("#relationship-graph-svelte");
    if (!target) {
      throw new Error("Svelte mount point '#relationship-graph-svelte' not found");
    }

    // Lade Graph-Daten aus dem Document
    const system = document.system;
    const elements = system?.elements || { nodes: [], edges: [] };

    this.writeLog("info", `[SvelteManager] Graph elements: ${JSON.stringify(elements)}`);

    // Wähle die richtige Komponente basierend auf dem Modus
    const component = isEditMode ? RelationshipGraphEdit : RelationshipGraphView;

    // Mounte die Komponente
    await this.mountComponent(component, target as HTMLElement, {
      elements: elements,
      interactive: isEditMode,
      onNodeClick: () => {},
      onEdgeClick: () => {},
    });
  }

  private writeLog(modus: "info" | "warn" | "error" | "debug", message: string, ...args: any[]) {
    if (this.logger) {
      this.logger[modus](message, ...args);
    } else {
      console[modus](message, ...args);
    }
  }
}
