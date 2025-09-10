import MetadataManagementApplication from "@/applications/MetadataManagementApplication";

// ✅ Alle Services aus zentraler index.ts importieren
import {
  ServiceFactory,
  ServiceManager,
  ModuleInitializer,
  FoundryAdapter,
  FoundryLogger,
  ConsoleErrorHandler,
  NotificationService,
  RegistrationService,
} from "../services/index";

// Early Bootstrap - Services so früh wie möglich erstellen
const foundryAdapter = new FoundryAdapter();
const logger = new FoundryLogger(foundryAdapter);
const errorHandler = new ConsoleErrorHandler(logger, foundryAdapter);
const notificationService = new NotificationService(foundryAdapter, logger);

// Global verfügbar machen für frühe Nutzung
(globalThis as any).relationshipApp = {
  foundryAdapter,
  logger,
  errorHandler,
  notificationService,
};

foundryAdapter.onInit(() => {
  logger.info("🚀 Relationship App: Initializing ServiceManager...");

  // ServiceFactory und ServiceManager erstellen
  const serviceFactory = ServiceFactory.getInstance();
  const serviceManager = ServiceManager.getInstance();

  // ServiceFactory automatisch alle Services im ServiceManager registrieren lassen
  serviceFactory.registerAllServicesInServiceManager(serviceManager);

  // Debug: Registrierte Services anzeigen
  const registeredServices = serviceManager.getRegisteredServices();
  logger.info(
    `🔧 Registered Services: ${registeredServices.length}`,
    registeredServices.map((s) => s.name || s.toString())
  );

  // Debug: Prüfen ob ModuleInitializer registriert ist
  const isModuleInitializerRegistered = serviceManager.isRegistered(ModuleInitializer);
  logger.info(`🔧 ModuleInitializer registered: ${isModuleInitializerRegistered}`);

  // Debug: Prüfen ob Dependencies registriert sind
  const isFoundryLoggerRegistered = serviceManager.isRegistered(FoundryLogger);
  const isConsoleErrorHandlerRegistered = serviceManager.isRegistered(ConsoleErrorHandler);
  const isRegistrationServiceRegistered = serviceManager.isRegistered(RegistrationService);
  logger.info(`🔧 Dependencies registered:`, {
    FoundryLogger: isFoundryLoggerRegistered,
    ConsoleErrorHandler: isConsoleErrorHandlerRegistered,
    RegistrationService: isRegistrationServiceRegistered,
  });

  // ServiceManager zu globalen Services hinzufügen
  (globalThis as any).relationshipApp.serviceManager = serviceManager;

  logger.info("✅ Relationship App: ServiceManager ready!");
});

// Vollständig SOLID Initialization
foundryAdapter.onReady(async () => {
  const { logger, errorHandler, notificationService } = (globalThis as any).relationshipApp;

  try {
    // RegistrationService manuell erstellen mit globalen Services (DI Problem umgehen)
    const registrationService = new RegistrationService(logger, errorHandler);

    // ModuleInitializer manuell erstellen mit globalen Services (DI Problem umgehen)
    const moduleInitializer = new ModuleInitializer(logger, errorHandler, registrationService);

    // ServiceManager und ServiceFactory aus globalem Scope holen
    const { serviceManager } = (globalThis as any).relationshipApp;
    const serviceFactory = ServiceFactory.getInstance();

    // Services im ServiceManager registrieren (VOR der API-Registrierung)
    logger.info("🚀 Relationship App: Registering services in ServiceManager...");
    serviceFactory.registerAllServicesInServiceManager(serviceManager);
    logger.info("✅ Relationship App: All services registered in ServiceManager");

    // Initialisierung starten
    await moduleInitializer.initialize();

    // API-Registrierung NACH der ServiceManager-Registrierung machen
    logger.info("🚀 Relationship App: Registering services in global API...");
    serviceFactory.registerAllServicesInAPI();
    logger.info("✅ Relationship App: All services registered in API");

    // Metadata Management Application (noch nicht SOLID - wird später refactored)
    const metadataManagementApplication = new MetadataManagementApplication();
    metadataManagementApplication.render({ force: true });

    logger.info("✅ Relationship App: Fully SOLID initialization completed!");
    notificationService.showSuccess("Relationship App initialized successfully!");
  } catch (error) {
    errorHandler.handle(error, "Module initialization");
    notificationService.showError(
      "Relationship App initialization failed. Check console for details."
    );
  }
});
