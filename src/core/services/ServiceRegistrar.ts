import type { IServiceRegistrar, IServiceContainer, ILogger } from "../../interfaces";

/**
 * ServiceRegistrar - Services registrieren und verfügbar machen
 *
 * Boot-Service: Wird nur während des Boot-Prozesses verwendet
 * Registriert nur Factories, keine sofortige Auflösung
 * Side-effect-freier Konstruktor
 */
export class ServiceRegistrar implements IServiceRegistrar {
  private readonly serviceLocator = new Map<any, () => any>();

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
  registerService(serviceClass: any): void {
    const serviceName =
      serviceClass.CLASS_NAME || serviceClass.className || serviceClass.name || serviceClass;
    this.logger.info(`[ServiceRegistrar] 📝 Registering service factory: ${serviceName}`);

    // Factory registrieren - keine sofortige Auflösung
    this.serviceLocator.set(serviceClass, () => this.serviceContainer.getService(serviceClass));
    this.serviceLocator.set(serviceName, () => this.serviceContainer.getService(serviceClass));

    this.logger.info(`[ServiceRegistrar] ✅ Service factory registered: ${serviceName}`);
  }

  /**
   * Service über Factory abrufen - On-Demand
   */
  getService<T>(identifier: any): T {
    this.logger.info(`[ServiceRegistrar] 🔍 Getting service: ${identifier.name || identifier}`);

    const factory = this.serviceLocator.get(identifier);
    if (!factory) {
      throw new Error(`Service ${identifier.name || identifier} not registered`);
    }

    // Factory aufrufen - Service wird erst hier erstellt
    const service = factory();
    this.logger.info(`[ServiceRegistrar] ✅ Service retrieved: ${identifier.name || identifier}`);
    return service;
  }

  /**
   * Prüfen ob Service registriert ist
   */
  hasService(identifier: any): boolean {
    return this.serviceLocator.has(identifier);
  }

  /**
   * Alle registrierten Services abrufen
   */
  getRegisteredServices(): any[] {
    return Array.from(this.serviceLocator.keys());
  }

  /**
   * Service aus Registrierung entfernen
   */
  unregisterService(identifier: any): void {
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
   */
  enableServiceDiscovery(): void {
    this.logger.info(`[ServiceRegistrar] 🔍 Enabling service discovery`);

    // ServiceContainer in globalThis verfügbar machen
    (globalThis as any).relationshipApp = (globalThis as any).relationshipApp || {};
    (globalThis as any).relationshipApp.serviceLocator = this;

    this.logger.info(`[ServiceRegistrar] ✅ Service discovery enabled`);
  }

  /**
   * Service Metadaten abrufen
   */
  getServiceMetadata(identifier: any): any {
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
  getAllServiceMetadata(): Map<any, any> {
    const metadata = new Map();
    const servicePlans = this.serviceContainer.getAllServicePlans();

    for (const [serviceClass] of servicePlans) {
      metadata.set(serviceClass, this.getServiceMetadata(serviceClass));
    }

    return metadata;
  }
}
