// Import services directly from their files
import { FoundryLogger } from "../core/services/FoundryLogger";
import { ConsoleErrorHandler } from "../core/services/ConsoleErrorHandler";
import { FoundryAdapter } from "../core/adapters/FoundryAdapter";
import { NotificationService } from "../services/NotificationService";
import { SERVICE_CONFIG } from "../services/index";



import MetadataManagementApplication from "../applications/MetadataManagementApplication";

// ✅ SOLID-konformer Bootablauf

// Phase 1: Early Bootstrap - Core Services manuell erstellen
const foundryAdapter = new FoundryAdapter();
const logger = new FoundryLogger(foundryAdapter);
const errorHandler = new ConsoleErrorHandler(logger, foundryAdapter);
const notificationService = new NotificationService(foundryAdapter, logger);

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
    // ServiceRegistry erstellen (Single Source of Truth)
    const { ServiceRegistry } = await import("../services/ServiceRegistry");
    const serviceRegistry = ServiceRegistry.getInstance();
    
    // Alle Services aus SERVICE_CONFIG registrieren
    logger.info(`[SOLID Boot] 📚 Registering ${SERVICE_CONFIG.length} services from SERVICE_CONFIG`);
    serviceRegistry.registerAllServices([...SERVICE_CONFIG]);
    
    // DependencyMapper erstellen
    const { DependencyMapper } = await import("../core/services/DependencyMapper");
    const dependencyMapper = DependencyMapper.getInstance(serviceRegistry);
    
    // Dependency Graph erstellen
    logger.info(`[SOLID Boot] 🗺️ Building dependency graph`);
    const dependencyGraph = dependencyMapper.buildDependencyGraph();
    
    // ServicePlanner erstellen
    const { ServicePlanner } = await import("../core/services/ServicePlanner");
    const servicePlanner = ServicePlanner.getInstance(serviceRegistry, dependencyMapper, logger);
    
    // Service Baupläne erstellen
    logger.info(`[SOLID Boot] 📋 Creating service plans`);
    const servicePlans = servicePlanner.createServicePlans();
    
    // ServiceValidator erstellen
    const { ServiceValidator } = await import("../core/services/ServiceValidator");
    const serviceValidator = ServiceValidator.getInstance(logger);
    
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
    
    // ServiceContainer erstellen
    const { ServiceContainer } = await import("../services/ServiceContainer");
    const serviceContainer = ServiceContainer.getInstance(servicePlans, serviceValidator, logger);
    
    // ServiceRegistrar erstellen
    const { ServiceRegistrar } = await import("../core/services/ServiceRegistrar");
    const serviceRegistrar = ServiceRegistrar.getInstance(serviceContainer, logger);
    
    // Services registrieren
    logger.info(`[SOLID Boot] 📝 Registering services`);
    serviceRegistrar.registerAllServices();
    serviceRegistrar.enableServiceDiscovery();
    
    // APIManager erstellen
    const { APIManager } = await import("../core/services/APIManager");
    const apiManager = APIManager.getInstance(serviceContainer, logger);
    
    // Services in globaler API registrieren
    logger.info(`[SOLID Boot] 🌐 Registering services in global API`);
    apiManager.registerInGlobalAPI();
    
    // Services global verfügbar machen
    (globalThis as any).relationshipApp = {
      ...(globalThis as any).relationshipApp,
      serviceRegistry,
      dependencyMapper,
      servicePlanner,
      serviceValidator,
      serviceContainer,
      serviceRegistrar,
      apiManager,
    };
    
    logger.info(`[SOLID Boot] ✅ Phase 2 completed - All services registered and available`);
    
  } catch (error) {
    logger.error(`[SOLID Boot] ❌ Phase 2 failed:`, error);
    errorHandler.handle(error, "SOLID Boot Phase 2");
    notificationService.showError("Service registration failed. Check console for details.");
  }
});

// Phase 3: Service Creation - Hooks.once("ready")
foundryAdapter.onReady(async () => {
  const { logger, errorHandler, notificationService } = (globalThis as any).relationshipApp;
  
  logger.info(`[SOLID Boot] 🚀 Phase 3: Service Creation`);
  
  try {
    // ServiceContainer aus globalem Scope holen
    const { serviceContainer } = (globalThis as any).relationshipApp;
    
    // Alle Services erstellen
    logger.info(`[SOLID Boot] 🏗️ Creating all services`);
    serviceContainer.createAllServices();
    
    // RegistrationService manuell erstellen (für Foundry-Integration)
    const { RegistrationService } = await import("../services/RegistrationService");
    const registrationService = new RegistrationService(logger, errorHandler);
    
    // ModuleInitializer manuell erstellen
    const { ModuleInitializer } = await import("../core/services/ModuleInitializer");
    const moduleInitializer = new ModuleInitializer(logger, errorHandler, registrationService);
    
    // Module Initialisierung
    logger.info(`[SOLID Boot] 🚀 Starting module initialization`);
    await moduleInitializer.initialize();
    
    // API Status anzeigen
    const { apiManager } = (globalThis as any).relationshipApp;
    const apiStatus = apiManager.getAPIStatus();
    const apiMetadata = apiManager.generateAPIMetadata();
    
    logger.info(`[SOLID Boot] 📊 API Status:`, {
      isAvailable: apiStatus.isAvailable,
      registeredServices: apiStatus.registeredServices,
      serviceNames: apiStatus.serviceNames
    });
    
    logger.info(`[SOLID Boot] 📊 API Metadata:`, {
      totalServices: apiMetadata.totalServices,
      services: Array.from(apiMetadata.services.keys())
    });
    
    logger.info(`[SOLID Boot] ✅ Phase 3 completed - All services created and module initialized`);
    notificationService.showSuccess("SOLID Boot completed successfully!");
    
  } catch (error) {
    logger.error(`[SOLID Boot] ❌ Phase 3 failed:`, error);
    errorHandler.handle(error, "SOLID Boot Phase 3");
    notificationService.showError("Service creation failed. Check console for details.");
  }

  // Metadata Management Application (noch nicht SOLID - wird später refactored)
    const metadataManagementApplication = new MetadataManagementApplication();
    await metadataManagementApplication.render({ force: true });
    logger.info(`[SOLID Boot] ✅ Metadata Management Application rendered`);

    logger.info((globalThis as any).game?.modules.get("relationship-app").api);
});

// Initialer Log nach Logger-Erstellung
const initialLogger = new FoundryLogger(new FoundryAdapter());
initialLogger.info(`[SOLID Boot] 🎯 SOLID Boot process initialized`);
