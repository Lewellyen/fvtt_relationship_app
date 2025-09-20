// Import services directly from their files
import { FoundryLogger } from "../core/services/FoundryLogger";
import { ConsoleErrorHandler } from "../core/services/ConsoleErrorHandler";
import { FoundryAdapter } from "../core/adapters/FoundryAdapter";
import { NotificationService } from "../services/NotificationService";
import { SERVICE_CONFIG } from "../services/index";
import { setContainer } from "../core/edge/appContext";
import MetadataManagementApplication from "../applications/MetadataManagementApplication";
import { MODULE_ID, SETTINGS_KEYS, SERVICE_NAMES } from "../constants";
import { GlobalStateManager } from "../core/services/GlobalStateManager";
// GraphService wird nicht mehr global erzeugt - ist scoped Service

// ✅ SOLID-konformer Bootablauf

// ✅ SOLID-konformer Bootablauf - On-Demand-Architektur

// Phase 1: Early Bootstrap - Core Services manuell erstellen
const logger = new FoundryLogger();
const foundryAdapter = new FoundryAdapter(logger);
const errorHandler = new ConsoleErrorHandler(logger, foundryAdapter);
const notificationService = new NotificationService(logger, foundryAdapter);

logger.info(`[SOLID Boot] 🚀 Phase 1: Early Bootstrap - Creating core services`);

// Global State Manager erstellen und Services registrieren
const globalStateManager = GlobalStateManager.getInstance(logger);
globalStateManager.registerService(SERVICE_NAMES.FOUNDRY_ADAPTER, foundryAdapter);
globalStateManager.registerService(SERVICE_NAMES.LOGGER, logger);
globalStateManager.registerService(SERVICE_NAMES.ERROR_HANDLER, errorHandler);
globalStateManager.registerService(SERVICE_NAMES.NOTIFICATION_SERVICE, notificationService);

logger.info(`[SOLID Boot] ✅ Phase 1 completed - Core services available via GlobalStateManager`);

// Phase 2: Service Registry Setup - Hooks.once("init")
foundryAdapter.onInit(async () => {
  const globalState = GlobalStateManager.getInstance(logger);
  const loggerInstance = globalState.getService<FoundryLogger>("logger")!;
  const errorHandler = globalState.getService<ConsoleErrorHandler>("errorHandler")!;
  const notificationService = globalState.getService<NotificationService>("notificationService")!;

  loggerInstance.info(`[SOLID Boot] 🚀 Phase 2: Service Registry Setup`);

  try {
    // Boot-Services direkt erstellen (nicht registrieren)
    const { ServiceRegistry } = await import("../services/ServiceRegistry");
    const serviceRegistry = new ServiceRegistry(loggerInstance); // ← Direkt erstellen

    const { DependencyMapper } = await import("../core/services/DependencyMapper");
    const dependencyMapper = new DependencyMapper(loggerInstance, serviceRegistry); // ← Direkt erstellen

    const { ServicePlanner } = await import("../core/services/ServicePlanner");
    const servicePlanner = new ServicePlanner(loggerInstance, serviceRegistry, dependencyMapper); // ← Direkt erstellen

    const { ServiceValidator } = await import("../core/services/ServiceValidator");
    const serviceValidator = new ServiceValidator(loggerInstance); // ← Direkt erstellen

    // Runtime Services registrieren
    loggerInstance.info(`[SOLID Boot] 📚 Registering ${SERVICE_CONFIG.length} runtime services`);
    serviceRegistry.registerAllServices([...SERVICE_CONFIG]);

    // Dependency Graph erstellen
    loggerInstance.info(`[SOLID Boot] 🗺️ Building dependency graph`);
    const dependencyGraph = dependencyMapper.buildDependencyGraph();

    // Service Baupläne erstellen
    loggerInstance.info(`[SOLID Boot] 📋 Creating service plans`);
    const servicePlans = servicePlanner.createServicePlans();

    // Dependencies und Pläne validieren
    loggerInstance.info(`[SOLID Boot] 🔍 Validating dependencies and plans`);
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
    const serviceContainer = new ServiceContainer(loggerInstance, servicePlans, serviceValidator);

    // Spezialisierte Services erstellen
    const { ServiceFactory } = await import("../core/services/ServiceFactory");
    const { ServiceCache } = await import("../core/services/ServiceCache");
    const { ScopeManager } = await import("../core/services/ScopeManager");

    const serviceCache = new ServiceCache(loggerInstance);
    const scopeManager = new ScopeManager(loggerInstance);
    const serviceFactory = new ServiceFactory(
      loggerInstance,
      servicePlans,
      serviceValidator,
      serviceContainer
    );

    // Services in Container injizieren
    serviceContainer.setServiceFactory(serviceFactory);
    serviceContainer.setServiceCache(serviceCache);
    serviceContainer.setScopeManager(scopeManager);

    const { ServiceRegistrar } = await import("../core/services/ServiceRegistrar");
    const serviceRegistrar = new ServiceRegistrar(loggerInstance, serviceContainer);

    const { APIManager } = await import("../core/services/APIManager");
    const apiManager = new APIManager(loggerInstance, serviceContainer);

    // Services registrieren (nur Factories)
    loggerInstance.info(`[SOLID Boot] 📝 Registering services as factories`);
    serviceRegistrar.registerAllServices();

    // Settings über SettingsService registrieren
    loggerInstance.info(`[SOLID Boot] 🔧 Registering settings via SettingsService`);
    const { SettingsService } = await import("../services/SettingsService");
    const settingsService = new SettingsService(loggerInstance, foundryAdapter);
    settingsService.registerAll();

    // Container für Edge-Adapter setzen
    setContainer(serviceContainer); // ← WICHTIG: genau 1x setzen

    // Services in Foundry API registrieren (einzige API-Exposition)
    loggerInstance.info(`[SOLID Boot] 🌐 Registering services in Foundry API`);
    apiManager.registerInGlobalAPI();

    // Debug: Globale API nur bei Debug-Logging
    // Graceful handling: Wenn Setting noch nicht registriert ist, debug-Logging deaktivieren
    let debugEnabled = false;
    try {
      debugEnabled =
        game?.settings?.get(MODULE_ID as any, SETTINGS_KEYS.DEBUG_LOGS as any) === true;
    } catch {
      // Setting noch nicht registriert - debug-Logging deaktivieren
      debugEnabled = false;
    }

    if (debugEnabled) {
      globalState.registerService(SERVICE_NAMES.SERVICE_CONTAINER, serviceContainer);
      globalState.registerService(SERVICE_NAMES.SERVICE_REGISTRAR, serviceRegistrar);
      globalState.registerService(SERVICE_NAMES.API_MANAGER, apiManager);

      // Debug-Hilfsfunktionen für Console-Zugriff
      const debugHelpers = {
        getLogger: () => globalState.getService(SERVICE_NAMES.LOGGER),
        getErrorHandler: () => globalState.getService(SERVICE_NAMES.ERROR_HANDLER),
        getNotificationService: () => globalState.getService(SERVICE_NAMES.NOTIFICATION_SERVICE),
        getServiceContainer: () => globalState.getService(SERVICE_NAMES.SERVICE_CONTAINER),
        getServiceRegistrar: () => globalState.getService(SERVICE_NAMES.SERVICE_REGISTRAR),
        getAPIManager: () => globalState.getService(SERVICE_NAMES.API_MANAGER),
        getAllServices: () => globalState.getAllServices(),
        getDebugInfo: () => globalState.getDebugInfo(),
        // Convenience-Methoden
        log: (message: string | object, ...args: unknown[]) =>
          globalState.getService<FoundryLogger>(SERVICE_NAMES.LOGGER)?.info(message, ...args),
        warn: (message: string | object, ...args: unknown[]) =>
          globalState.getService<FoundryLogger>(SERVICE_NAMES.LOGGER)?.warn(message, ...args),
        error: (message: string | object, ...args: unknown[]) =>
          globalState.getService<FoundryLogger>(SERVICE_NAMES.LOGGER)?.error(message, ...args),
        debug: (message: string | object, ...args: unknown[]) =>
          globalState.getService<FoundryLogger>(SERVICE_NAMES.LOGGER)?.debug(message, ...args),
      };

      // Debug-Hilfsfunktionen über GlobalStateManager verfügbar machen
      globalState.registerService(SERVICE_NAMES.DEBUG_HELPERS, debugHelpers);
      loggerInstance.info(`[SOLID Boot] 🐛 Debug helpers available via GlobalStateManager`);
    }

    loggerInstance.info(
      `[SOLID Boot] ✅ Phase 2 completed - All services registered and available (on-demand)`
    );
  } catch (error) {
    loggerInstance.error(`[SOLID Boot] ❌ Phase 2 failed:`, error);
    errorHandler.handle(error, "SOLID Boot Phase 2");
    notificationService.showError("Service registration failed. Check console for details.");
  }
});

// Phase 3: Module Initialization - Hooks.once("ready")
foundryAdapter.onReady(async () => {
  const globalState = GlobalStateManager.getInstance(logger);
  const loggerInstance = globalState.getService<FoundryLogger>("logger")!;
  const errorHandler = globalState.getService<ConsoleErrorHandler>("errorHandler")!;
  const notificationService = globalState.getService<NotificationService>("notificationService")!;

  loggerInstance.info(`[SOLID Boot] 🚀 Phase 3: Module Initialization`);

  try {
    // On-Demand: Services werden erst bei Bedarf erstellt
    // Keine createAllServices() mehr nötig

    // RegistrationService manuell erstellen (für Foundry-Integration)
    const { RegistrationService } = await import("../services/RegistrationService");
    const registrationService = new RegistrationService(loggerInstance, errorHandler);

    // ModuleInitializer manuell erstellen
    const { ModuleInitializer } = await import("../core/services/ModuleInitializer");
    const moduleInitializer = new ModuleInitializer(
      loggerInstance,
      errorHandler,
      registrationService
    );

    // Module Initialisierung
    loggerInstance.info(`[SOLID Boot] 🚀 Starting module initialization`);
    await moduleInitializer.initialize();

    loggerInstance.info(`[SOLID Boot] ✅ Phase 3 completed - Module initialized`);
    notificationService.showSuccess("SOLID Boot completed successfully!");
  } catch (error) {
    loggerInstance.error(`[SOLID Boot] ❌ Phase 3 failed:`, error);
    errorHandler.handle(error, "SOLID Boot Phase 3");
    notificationService.showError("Module initialization failed. Check console for details.");
  }

  // Metadata Management Application (noch nicht SOLID - wird später refactored)
  const metadataManagementApplication = new MetadataManagementApplication();
  await metadataManagementApplication.render({ force: true });
  loggerInstance.info(`[SOLID Boot] Metadata Management Application rendered`);
});
