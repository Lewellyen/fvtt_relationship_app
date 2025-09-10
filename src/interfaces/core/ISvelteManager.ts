/**
 * Interface für Svelte Component Management
 * Verantwortlichkeit: Svelte Component Mounting und Unmounting
 */
export interface ISvelteManager {
  /**
   * Mountet eine Svelte-Komponente in ein HTML-Element
   * @param component - Die Svelte-Komponente
   * @param target - Das Ziel-HTML-Element
   * @param props - Props für die Komponente
   * @returns Promise mit der gemounteten App-Instanz
   */
  mountComponent<T>(component: any, target: HTMLElement, props: any): Promise<T>;

  /**
   * Unmountet eine Svelte-App
   * @param app - Die zu unmountende App-Instanz
   */
  unmountApp(app: any): Promise<void>;

  /**
   * Mountet eine Graph-Komponente mit spezifischer Logik
   * @param element - Das Ziel-Element
   * @param document - Das Journal Entry Document
   * @param isEditMode - Ob Edit-Mode aktiv ist
   */
  mountGraphComponent(element: HTMLElement, document: any, isEditMode: boolean): Promise<void>;
}
