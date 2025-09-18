// Import services directly from their files
import { FoundryLogger } from "../core/services/FoundryLogger";
import { ConsoleErrorHandler } from "../core/services/ConsoleErrorHandler";
import { FoundryAdapter } from "../core/adapters/FoundryAdapter";
import { NotificationService } from "../services/NotificationService";
import { SERVICE_CONFIG } from "../services/index";
import { setContainer } from "../core/edge/appContext";
import MetadataManagementApplication from "../applications/MetadataManagementApplication";
import { GraphService } from "../services/GraphService";

// ✅ SOLID-konformer Bootablauf

// ✅ SOLID-konformer Bootablauf - On-Demand-Architektur

// Phase 1: Early Bootstrap - Core Services manuell erstellen
const foundryAdapter = new FoundryAdapter();
const logger = new FoundryLogger();
const errorHandler = new ConsoleErrorHandler(logger, foundryAdapter);
const notificationService = new NotificationService(logger, foundryAdapter);

logger.info(`[SOLID Boot] 🚀 Phase 1: Early Bootstrap - Creating core services`);

// Global verfügbar machen für frühe Nutzung
(globalThis as any).relationshipApp = {
  foundryAdapter,
  logger,
  errorHandler,
  notificationService,
};

logger.info(`[SOLID Boot] ✅ Phase 1 completed - Core services available globally`);

// Phase 2: Service Registry Setup - Hooks.once("init")
foundryAdapter.onInit(async () => {
  const { logger, errorHandler, notificationService } = (globalThis as any).relationshipApp;

  logger.info(`[SOLID Boot] 🚀 Phase 2: Service Registry Setup`);

  try {
    // Boot-Services direkt erstellen (nicht registrieren)
    const { ServiceRegistry } = await import("../services/ServiceRegistry");
    const serviceRegistry = new ServiceRegistry(logger); // ← Direkt erstellen

    const { DependencyMapper } = await import("../core/services/DependencyMapper");
    const dependencyMapper = new DependencyMapper(logger, serviceRegistry); // ← Direkt erstellen

    const { ServicePlanner } = await import("../core/services/ServicePlanner");
    const servicePlanner = new ServicePlanner(logger, serviceRegistry, dependencyMapper); // ← Direkt erstellen

    const { ServiceValidator } = await import("../core/services/ServiceValidator");
    const serviceValidator = new ServiceValidator(logger); // ← Direkt erstellen

    // Runtime Services registrieren
    logger.info(`[SOLID Boot] 📚 Registering ${SERVICE_CONFIG.length} runtime services`);
    serviceRegistry.registerAllServices([...SERVICE_CONFIG]);

    // Dependency Graph erstellen
    logger.info(`[SOLID Boot] 🗺️ Building dependency graph`);
    const dependencyGraph = dependencyMapper.buildDependencyGraph();

    // Service Baupläne erstellen
    logger.info(`[SOLID Boot] 📋 Creating service plans`);
    const servicePlans = servicePlanner.createServicePlans();

    // Dependencies und Pläne validieren
    logger.info(`[SOLID Boot] 🔍 Validating dependencies and plans`);
    const dependencyValidation = serviceValidator.validateDependencyGraph(dependencyGraph);
    const planValidation = serviceValidator.validateServicePlans(servicePlans);

    if (!dependencyValidation.isValid) {
      throw new Error(`Dependency validation failed: ${dependencyValidation.errors.join(", ")}`);
    }

    if (!planValidation.isValid) {
      throw new Error(`Plan validation failed: ${planValidation.errors.join(", ")}`);
    }

    // Runtime Services erstellen - Neue Hierarchie
    const { ServiceContainer } = await import("../services/ServiceContainer");
    const serviceContainer = new ServiceContainer(logger, servicePlans, serviceValidator);

    // Spezialisierte Services erstellen
    const { ServiceFactory } = await import("../core/services/ServiceFactory");
    const { ServiceCache } = await import("../core/services/ServiceCache");
    const { ScopeManager } = await import("../core/services/ScopeManager");

    const serviceCache = new ServiceCache(logger);
    const scopeManager = new ScopeManager(logger);
    const serviceFactory = new ServiceFactory(
      logger,
      servicePlans,
      serviceValidator,
      serviceContainer
    );

    // Services in Container injizieren
    serviceContainer.setServiceFactory(serviceFactory);
    serviceContainer.setServiceCache(serviceCache);
    serviceContainer.setScopeManager(scopeManager);

    const { ServiceRegistrar } = await import("../core/services/ServiceRegistrar");
    const serviceRegistrar = new ServiceRegistrar(logger, serviceContainer);

    const { APIManager } = await import("../core/services/APIManager");
    const apiManager = new APIManager(logger, serviceContainer);

    // Services registrieren (nur Factories)
    logger.info(`[SOLID Boot] 📝 Registering services as factories`);
    serviceRegistrar.registerAllServices();

    // Services in globaler API registrieren (lazy)
    logger.info(`[SOLID Boot] 🌐 Registering services in global API (lazy)`);
    apiManager.registerInGlobalAPI();

    // Container für Edge-Adapter setzen
    setContainer(serviceContainer); // ← WICHTIG: genau 1x setzen

    // Runtime Services global verfügbar machen
    (globalThis as any).relationshipApp = {
      ...(globalThis as any).relationshipApp,
      serviceContainer, // ← Für getService()
      serviceRegistrar, // ← Für getService()
      apiManager, // ← Für API-Zugriff
    };

    logger.info(
      `[SOLID Boot] ✅ Phase 2 completed - All services registered and available (on-demand)`
    );
  } catch (error) {
    logger.error(`[SOLID Boot] ❌ Phase 2 failed:`, error);
    errorHandler.handle(error, "SOLID Boot Phase 2");
    notificationService.showError("Service registration failed. Check console for details.");
  }
});

// Phase 3: Module Initialization - Hooks.once("ready")
foundryAdapter.onReady(async () => {
  const { logger, errorHandler, notificationService } = (globalThis as any).relationshipApp;

  logger.info(`[SOLID Boot] 🚀 Phase 3: Module Initialization`);

  try {
    // On-Demand: Services werden erst bei Bedarf erstellt
    // Keine createAllServices() mehr nötig

    // RegistrationService manuell erstellen (für Foundry-Integration)
    const { RegistrationService } = await import("../services/RegistrationService");
    const registrationService = new RegistrationService(logger, errorHandler);

    // ModuleInitializer manuell erstellen
    const { ModuleInitializer } = await import("../core/services/ModuleInitializer");
    const moduleInitializer = new ModuleInitializer(logger, errorHandler, registrationService);

    // Module Initialisierung
    logger.info(`[SOLID Boot] 🚀 Starting module initialization`);
    await moduleInitializer.initialize();

    logger.info(`[SOLID Boot] ✅ Phase 3 completed - Module initialized`);
    notificationService.showSuccess("SOLID Boot completed successfully!");
  } catch (error) {
    logger.error(`[SOLID Boot] ❌ Phase 3 failed:`, error);
    errorHandler.handle(error, "SOLID Boot Phase 3");
    notificationService.showError("Module initialization failed. Check console for details.");
  }

  // Metadata Management Application (noch nicht SOLID - wird später refactored)
  const metadataManagementApplication = new MetadataManagementApplication();
  await metadataManagementApplication.render({ force: true });
  logger.info(`[SOLID Boot] Metadata Management Application rendered`);

  const container = (globalThis as any).relationshipApp.serviceContainer;
  const graphService = container.getService(GraphService);
  (globalThis as any).relationshipApp = {
    ...(globalThis as any).relationshipApp,
    graphService,
  };
});
