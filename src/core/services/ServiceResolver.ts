import type { IServiceResolver } from "../../interfaces";

/**
 * Service-Resolution-Implementierung
 *
 * Zentrale Service-Resolution-Logik mit Fehlerbehandlung.
 */
export class ServiceResolver implements IServiceResolver {
  private getServiceManager(): any {
    const serviceManager = (globalThis as any).game?.modules?.get("relationship-app")?.api
      ?.serviceManager;
    if (!serviceManager) {
      throw new Error("ServiceManager not available");
    }
    return serviceManager;
  }

  resolveService<T>(serviceIdentifier: string): T {
    try {
      return this.getServiceManager().getService(serviceIdentifier) as T;
    } catch (error) {
      throw new Error(`Failed to resolve service '${serviceIdentifier}': ${error}`);
    }
  }

  isServiceAvailable(serviceIdentifier: string): boolean {
    try {
      const serviceManager = this.getServiceManager();
      return serviceManager.hasService(serviceIdentifier);
    } catch {
      return false;
    }
  }
}
