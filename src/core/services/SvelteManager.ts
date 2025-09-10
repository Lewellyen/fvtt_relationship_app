import { mount, unmount } from "svelte";
import RelationshipGraphView from "../../svelte/RelationshipGraphView.svelte";
import RelationshipGraphEdit from "../../svelte/RelationshipGraphEdit.svelte";
import type { ISvelteManager } from "../../interfaces";
// IRelationshipGraphService wird nicht direkt verwendet, da SvelteManager nur für Component Management zuständig ist

/**
 * SvelteManager - Verantwortlich für Svelte Component Management
 * Single Responsibility: Nur Svelte Mounting/Unmounting Logic
 */
export class SvelteManager implements ISvelteManager {
  // ✅ Metadaten für Service Registration
  static readonly API_NAME = "svelteManager";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "SvelteManager"; // ✅ Klassename für Dependency Resolution

  /**
   * Mountet eine Svelte-Komponente
   */
  async mountComponent<T>(component: any, target: HTMLElement, props: any): Promise<T> {
    const logger = (globalThis as any).relationshipApp?.logger;
    if (logger) {
      logger.info(`[SvelteManager] Mounting component: ${component.name}`);
    } else {
      console.log("[SvelteManager] Mounting component:", component.name);
    }

    const app = mount(component, {
      target,
      props,
    });

    if (logger) {
      logger.info("[SvelteManager] Component mounted successfully");
    } else {
      console.log("[SvelteManager] Component mounted successfully");
    }
    return app as T;
  }

  /**
   * Unmountet eine Svelte-App
   */
  async unmountApp(app: any): Promise<void> {
    if (app) {
      const logger = (globalThis as any).relationshipApp?.logger;
      if (logger) {
        logger.info("[SvelteManager] Unmounting app");
      } else {
        console.log("[SvelteManager] Unmounting app");
      }
      await unmount(app);
      if (logger) {
        logger.info("[SvelteManager] App unmounted successfully");
      } else {
        console.log("[SvelteManager] App unmounted successfully");
      }
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
    const logger = (globalThis as any).relationshipApp?.logger;
    if (logger) {
      logger.info(`[SvelteManager] Mounting graph component, edit mode: ${isEditMode}`);
    } else {
      console.log("[SvelteManager] Mounting graph component, edit mode:", isEditMode);
    }

    const target = element.querySelector("#relationship-graph-svelte");
    if (!target) {
      throw new Error("Svelte mount point '#relationship-graph-svelte' not found");
    }

    // Lade Graph-Daten aus dem Document
    const system = document.system;
    const elements = system?.elements || { nodes: [], edges: [] };

    if (logger) {
      logger.info(`[SvelteManager] Graph elements: ${JSON.stringify(elements)}`);
    } else {
      console.log("[SvelteManager] Graph elements:", elements);
    }

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
}
