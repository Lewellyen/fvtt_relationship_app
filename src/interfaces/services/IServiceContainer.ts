import type { ServicePlan } from "../../core/services/ServicePlanner";
import type { IScopeChain } from "./IScopeChain";

/**
 * Interface für Service Container
 *
 * Verantwortlichkeit: Services mit Dependencies erstellen und lagern
 */
export interface IServiceContainer {
  /**
   * Service aus Lagerhaus holen oder neu erstellen
   * @param ctor - Service-Konstruktor
   * @param scope - Optionaler Scope für Scoped Services
   * @returns Service-Instanz
   */
  getService<T>(ctor: new (...args: unknown[]) => T, scope?: string): T;

  /**
   * Service mit Dependencies erstellen
   * @param ctor - Service-Konstruktor
   * @returns Service-Instanz
   */
  createService<T>(ctor: new (...args: unknown[]) => T): T;

  /**
   * Alle Services erstellen
   */
  createAllServices(): void;

  /**
   * Service aus Cache entfernen
   * @param ctor - Service-Konstruktor
   */
  disposeService(ctor: new (...args: unknown[]) => any): void;

  /**
   * Alle Services aus Cache entfernen
   */
  disposeAll(): void;

  /**
   * Prüfen ob Service im Cache ist
   * @param ctor - Service-Konstruktor
   * @returns true wenn gecacht
   */
  hasCachedService(ctor: new (...args: unknown[]) => any): boolean;

  /**
   * Anzahl gecachter Services
   * @returns Anzahl gecachter Services
   */
  getCachedServiceCount(): number;

  /**
   * Service-Plan abrufen
   * @param ctor - Service-Konstruktor
   * @returns Service-Plan oder undefined
   */
  getServicePlan(ctor: new (...args: unknown[]) => any): ServicePlan | undefined;

  /**
   * Alle Service-Pläne abrufen
   * @returns Map mit allen Service-Plänen
   */
  getAllServicePlans(): Map<any, ServicePlan>;

  /**
   * Aktuellen Scope setzen
   * @param scope - Scope-Name
   */
  setCurrentScope(scope: string): void;

  /**
   * Scope leeren
   * @param scope - Scope-Name
   */
  clearScope(scope: string): void;

  /**
   * Scoped Services eines Scopes entsorgen
   * @param scope - Scope-Name
   */
  disposeScopedServices(scope: string): void;

  /**
   * Anzahl Scoped Services in einem Scope
   * @param scope - Scope-Name
   * @returns Anzahl Scoped Services
   */
  getScopedServiceCount(scope: string): number;

  // Scope Chain Management

  /**
   * Scope Chain erstellen
   * @param parentScope - Parent Scope-Name
   * @returns Scope Chain Interface
   */
  createScopeChain(parentScope: string): IScopeChain;

  /**
   * Child Scope zur Parent Chain hinzufügen
   * @param parentScope - Parent Scope-Name
   * @param childScope - Child Scope-Name
   */
  addChildScope(parentScope: string, childScope: string): void;

  /**
   * Child Scope aus Parent Chain entfernen
   * @param parentScope - Parent Scope-Name
   * @param childScope - Child Scope-Name
   */
  removeChildScope(parentScope: string, childScope: string): void;

  /**
   * Scope Chain mit allen Children entsorgen
   * @param parentScope - Parent Scope-Name
   */
  disposeScopeChain(parentScope: string): void;

  /**
   * Scope Chain abrufen
   * @param parentScope - Parent Scope-Name
   * @returns Scope Chain oder undefined
   */
  getScopeChain(parentScope: string): IScopeChain | undefined;
}
