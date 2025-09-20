import type { IServiceRegistrar, IServiceContainer, ILogger } from "../../interfaces";
import type { ServiceConstructor } from "../../types/ServiceTypes";

/**
 * ServiceRegistrar - Services registrieren und verfügbar machen
 *
 * Boot-Service: Wird nur während des Boot-Prozesses verwendet
 * Registriert nur Factories, keine sofortige Auflösung
 * Side-effect-freier Konstruktor
 */
export class ServiceRegistrar implements IServiceRegistrar {
  private readonly serviceLocator = new Map<ServiceConstructor, () => unknown>();

  constructor(
    private logger: ILogger,
    private serviceContainer: IServiceContainer
  ) {
    // Side-effect-freier Konstruktor
  }

  /**
   * Alle Services registrieren - NUR FACTORIES
   */
  registerAllServices(): void {
    this.logger.info(`[ServiceRegistrar] 📝 Registering all services as factories`);

    const servicePlans = this.serviceContainer.getAllServicePlans();
    this.logger.info(
      `[ServiceRegistrar] 📋 Registering ${servicePlans.size} services as factories`
    );

    for (const [serviceClass] of servicePlans) {
      this.registerService(serviceClass);
    }

    this.logger.info(`[ServiceRegistrar] ✅ All services registered as factories`);
  }

  /**
   * Einzelnen Service registrieren
   */
  registerService(serviceClass: ServiceConstructor): void {
    const serviceName =
      (serviceClass as any).CLASS_NAME ||
      (serviceClass as any).className ||
      serviceClass.name ||
      serviceClass;
    this.logger.info(`[ServiceRegistrar] 📝 Registering service factory: ${serviceName}`);

    // Factory registrieren - keine sofortige Auflösung
    this.serviceLocator.set(serviceClass, () => this.serviceContainer.getService(serviceClass));
    this.serviceLocator.set(serviceName, () => this.serviceContainer.getService(serviceClass));

    this.logger.info(`[ServiceRegistrar] ✅ Service factory registered: ${serviceName}`);
  }

  /**
   * Service über Factory abrufen - On-Demand
   */
  getService<T>(identifier: ServiceConstructor, scope?: string): T {
    this.logger.info(
      `[ServiceRegistrar] 🔍 Getting service: ${identifier.name || identifier}${scope ? ` (scope: ${scope})` : ""}`
    );

    const factory = this.serviceLocator.get(identifier);
    if (!factory) {
      throw new Error(`Service ${identifier.name || identifier} not registered`);
    }

    // Scope an ServiceContainer weiterleiten
    const service = this.serviceContainer.getService(identifier, scope);
    this.logger.info(
      `[ServiceRegistrar] ✅ Service retrieved: ${identifier.name || identifier}${scope ? ` (scope: ${scope})` : ""}`
    );
    return service as T;
  }

  /**
   * Prüfen ob Service registriert ist
   */
  hasService(identifier: ServiceConstructor): boolean {
    return this.serviceLocator.has(identifier);
  }

  /**
   * Alle registrierten Services abrufen
   */
  getRegisteredServices(): ServiceConstructor[] {
    return Array.from(this.serviceLocator.keys());
  }

  /**
   * Service aus Registrierung entfernen
   */
  unregisterService(identifier: ServiceConstructor): void {
    this.logger.info(
      `[ServiceRegistrar] 🗑️ Unregistering service: ${identifier.name || identifier}`
    );

    if (this.serviceLocator.has(identifier)) {
      this.serviceLocator.delete(identifier);
      this.logger.info(
        `[ServiceRegistrar] ✅ Service unregistered: ${identifier.name || identifier}`
      );
    } else {
      this.logger.info(
        `[ServiceRegistrar] ℹ️ Service not registered: ${identifier.name || identifier}`
      );
    }
  }

  /**
   * Alle Services aus Registrierung entfernen
   */
  unregisterAll(): void {
    this.logger.info(
      `[ServiceRegistrar] 🗑️ Unregistering all services (${this.serviceLocator.size} registered)`
    );

    this.serviceLocator.clear();
    this.logger.info(`[ServiceRegistrar] ✅ All services unregistered`);
  }

  /**
   * Service Discovery - Services auffindbar machen
   * @deprecated Verwende GlobalStateManager statt globalThis
   */
  enableServiceDiscovery(): void {
    this.logger.warn(
      `[ServiceRegistrar] ⚠️ enableServiceDiscovery is deprecated. Use GlobalStateManager instead.`
    );
    // Method is deprecated - no implementation needed
  }

  /**
   * Service Metadaten abrufen
   */
  getServiceMetadata(identifier: ServiceConstructor): unknown {
    const plan = this.serviceContainer.getServicePlan(identifier);
    if (!plan) {
      return null;
    }

    return {
      apiName: plan.apiName,
      serviceType: plan.serviceType,
      isSingleton: plan.isSingleton,
      dependencies: plan.dependencies.map((d) => d.name || d),
      isRegistered: this.hasService(identifier),
    };
  }

  /**
   * Alle Service Metadaten abrufen
   */
  getAllServiceMetadata(): Map<ServiceConstructor, unknown> {
    const metadata = new Map<ServiceConstructor, unknown>();
    const servicePlans = this.serviceContainer.getAllServicePlans();

    for (const [serviceClass] of servicePlans) {
      metadata.set(serviceClass, this.getServiceMetadata(serviceClass));
    }

    return metadata;
  }
}
