import MetadataManagementApplication from "@/applications/MetadataManagementApplication";
import { ServiceFactory } from "../services/ServiceFactory";
import { ServiceManager } from "../services/ServiceManager";
import { SERVICE_IDENTIFIERS } from "../services/IServiceFactory";
import type { IFoundryAdapter } from "./adapters/IFoundryAdapter";
import { MODULE_ID_PREFIX } from "../constants";

// ServiceManager setup
import { FoundryAdapter } from "./adapters/FoundryAdapter";
const foundryAdapter = new FoundryAdapter();

foundryAdapter.onInit(() => {
  console.log(`${MODULE_ID_PREFIX} 🚀 Relationship App: Initializing ServiceManager...`);
  
  // ServiceFactory und ServiceManager erstellen
  const serviceFactory = ServiceFactory.getInstance();
  const serviceManager = ServiceManager.getInstance(serviceFactory);
  
  // ServiceFactory automatisch alle Services im ServiceManager registrieren lassen
  serviceFactory.registerAllServicesInServiceManager(serviceManager);
  
  // ServiceManager global verfügbar machen
  (globalThis as any).relationshipApp = {
    serviceManager
  };
  
  console.log(`${MODULE_ID_PREFIX} ✅ Relationship App: ServiceManager ready!`);
});

// Vollständig SOLID Initialization
foundryAdapter.onReady(async () => {
  const { serviceManager } = (globalThis as any).relationshipApp;
  
  try {
    // ModuleInitializer über ServiceManager auflösen
    const moduleInitializer = serviceManager.resolve(SERVICE_IDENTIFIERS.MODULE_INITIALIZER);
    
    // Initialisierung starten
    await moduleInitializer.initialize();
    
    // Metadata Management Application (noch nicht SOLID - wird später refactored)
    const metadataManagementApplication = new MetadataManagementApplication();
    metadataManagementApplication.render({ force: true });
    
    console.log(`${MODULE_ID_PREFIX} ✅ Relationship App: Fully SOLID initialization completed!`);
  } catch (error) {
    console.error(`${MODULE_ID_PREFIX} 🚨 Relationship App: Initialization failed:`, error);
    // FoundryAdapter für UI-Notifications verwenden
    const foundryAdapter = serviceManager.resolve(SERVICE_IDENTIFIERS.FOUNDRY_ADAPTER) as IFoundryAdapter;
    foundryAdapter.showError("Relationship App initialization failed. Check console for details.");
  }
});
