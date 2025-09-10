import type { IApplicationDependencies, IServiceApplicationDependencies, ISvelteApplicationDependencies, INotificationApplicationDependencies } from "../../interfaces";
// ✅ Core Services direkt importieren
import { SvelteManager } from "./SvelteManager";
import { CSSManager } from "./CSSManager";
import { ConsoleErrorHandler } from "./ConsoleErrorHandler";
import { FoundryAdapter } from "../adapters/FoundryAdapter";
// ✅ Core Services direkt importieren
import { ServiceRegistrar } from "./ServiceRegistrar";
// ✅ Services aus services/index.ts importieren
import { NotificationService } from "../../services/NotificationService";

/**
 * Application Dependency Resolver
 *
 * Löst alle Dependencies für Applications auf.
 * Folgt dem Single Responsibility Principle.
 */
export class ApplicationDependencyResolver {
  private getServiceContainer(): any {
    // ✅ ServiceContainer aus globalem Scope holen (SOLID-Architektur)
    const serviceContainer = (globalThis as any).relationshipApp?.serviceContainer;
    if (!serviceContainer) {
      throw new Error("ServiceContainer not available");
    }
    return serviceContainer;
  }

  /**
   * Löst alle Application-Dependencies auf (für Kompatibilität)
   */
  resolveApplicationDependencies(): IApplicationDependencies {
    const serviceContainer = this.getServiceContainer();

    return {
      svelteManager: serviceContainer.getService(SvelteManager),
      cssManager: serviceContainer.getService(CSSManager),
      serviceLocator: serviceContainer.getService(ServiceRegistrar), // ServiceRegistrar als Service-Resolver
      notificationService: serviceContainer.getService(NotificationService),
      errorHandler: serviceContainer.getService(ConsoleErrorHandler),
      foundryAdapter: serviceContainer.getService(FoundryAdapter),
      logger: (globalThis as any).relationshipApp?.logger,
    };
  }

  /**
   * Löst Service-Application-Dependencies auf
   */
  resolveServiceApplicationDependencies(): IServiceApplicationDependencies {
    const serviceContainer = this.getServiceContainer();

    return {
      serviceLocator: serviceContainer.getService(ServiceRegistrar), // ServiceRegistrar als Service-Resolver
      foundryAdapter: serviceContainer.getService(FoundryAdapter),
      logger: (globalThis as any).relationshipApp?.logger,
    };
  }

  /**
   * Löst Svelte-Application-Dependencies auf
   */
  resolveSvelteApplicationDependencies(): ISvelteApplicationDependencies {
    const serviceContainer = this.getServiceContainer();

    return {
      svelteManager: serviceContainer.getService(SvelteManager),
      cssManager: serviceContainer.getService(CSSManager),
      logger: (globalThis as any).relationshipApp?.logger,
    };
  }

  /**
   * Löst Notification-Application-Dependencies auf
   */
  resolveNotificationApplicationDependencies(): INotificationApplicationDependencies {
    const serviceContainer = this.getServiceContainer();

    return {
      notificationService: serviceContainer.getService(NotificationService),
      errorHandler: serviceContainer.getService(ConsoleErrorHandler),
      logger: (globalThis as any).relationshipApp?.logger,
    };
  }
}
