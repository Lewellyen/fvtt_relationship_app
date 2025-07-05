(function() {
  "use strict";
  class LoggerService {
    constructor() {
      this.debugMode = false;
      this.debugMode = false;
    }
    static getInstance() {
      if (!LoggerService.instance) {
        LoggerService.instance = new LoggerService();
      }
      return LoggerService.instance;
    }
    /**
     * Setzt den Debug-Modus
     */
    setDebugMode(enabled) {
      this.debugMode = enabled;
    }
    /**
     * Log-Level: Info (nur im Debug-Modus sichtbar)
     */
    info(message, ...args) {
      if (this.debugMode) {
        console.log(`[Relationship App] ℹ️ ${message}`, ...args);
      }
    }
    /**
     * Log-Level: Warnung (immer sichtbar)
     */
    warn(message, ...args) {
      console.warn(`[Relationship App] ⚠️ ${message}`, ...args);
    }
    /**
     * Log-Level: Fehler (immer sichtbar)
     */
    error(message, error) {
      console.error(`[Relationship App] ❌ ${message}`, error);
    }
    /**
     * Log-Level: Debug (nur im Debug-Modus sichtbar)
     */
    debug(message, ...args) {
      if (this.debugMode) {
        console.debug(`[Relationship App] 🐛 ${message}`, ...args);
      }
    }
    /**
     * Log-Level: Performance (nur im Debug-Modus sichtbar)
     */
    performance(operation, duration) {
      if (this.debugMode) {
        const status = duration > 100 ? "⚠️" : "✅";
        console.log(
          `[Relationship App] ${status} ${operation}: ${duration.toFixed(2)}ms`
        );
      }
    }
    /**
     * Log-Level: System-Initialisierung
     */
    system(message) {
      console.log(`[Relationship App] 🚀 ${message}`);
    }
  }
  function registerPreCreateActorHook() {
    Hooks.on(
      "preCreateActor",
      (actor, updates, options, userId) => {
        LoggerService.getInstance().debug(
          "preCreateActor",
          actor,
          updates,
          options,
          userId
        );
      }
    );
  }
  function registerCreateActorHook() {
    Hooks.on(
      "createActor",
      async (actor, options, userId) => {
        LoggerService.getInstance().debug("createActor", actor, options, userId);
      }
    );
  }
  function registerPreUpdateActorHook() {
    Hooks.on(
      "preUpdateActor",
      (actor, updates, options, userId) => {
        LoggerService.getInstance().debug(
          "preUpdateActor",
          actor,
          updates,
          options,
          userId
        );
      }
    );
  }
  function registerUpdateActorHook() {
    Hooks.on(
      "updateActor",
      async (actor, updates, options, userId) => {
        LoggerService.getInstance().debug(
          "updateActor",
          actor,
          updates,
          options,
          userId
        );
      }
    );
  }
  function registerHooks() {
    registerPreCreateActorHook();
    registerCreateActorHook();
    registerPreUpdateActorHook();
    registerUpdateActorHook();
  }
  class HandlebarsHelperService {
    static register() {
      Handlebars.registerHelper(
        "ifEquals",
        function(arg1, arg2, options) {
          return arg1 === arg2 ? options.fn(this) : options.inverse(this);
        }
      );
    }
  }
  const { EmbeddedDataField, ArrayField, StringField } = foundry.data.fields;
  class RelationshipNodeDataModel extends foundry.abstract.DataModel {
    static defineSchema() {
      return {
        id: new StringField({ required: true, initial: "" }),
        actorUuid: new StringField({ required: false, initial: "" }),
        label: new StringField({ required: false, initial: "" })
      };
    }
  }
  class RelationshipEdgeDataModel extends foundry.abstract.DataModel {
    static defineSchema() {
      return {
        id: new StringField({ required: true, initial: "" }),
        source: new StringField({ required: true, initial: "" }),
        target: new StringField({ required: true, initial: "" }),
        type: new StringField({ required: false, initial: "" }),
        label: new StringField({ required: false, initial: "" })
      };
    }
  }
  class RelationshipGraphDataModel extends foundry.abstract.DataModel {
    static defineSchema() {
      return {
        nodes: new ArrayField(
          new EmbeddedDataField(RelationshipNodeDataModel, { required: true }),
          { required: true, initial: [] }
        ),
        edges: new ArrayField(
          new EmbeddedDataField(RelationshipEdgeDataModel, { required: true }),
          { required: true, initial: [] }
        )
      };
    }
  }
  class RelationshipGraphDocument extends foundry.documents.JournalEntry {
    /**
     * Wir übernehmen alle Default-Metadaten von JournalEntry und ändern nur Name, Label und Collection.
     */
  }
  class SystemRegistrar {
    /**
     * Registriere Helpers, Actor- und Sheet-Klassen beim init-Hook.
     */
    static registerInit() {
      HandlebarsHelperService.register();
      foundry.applications.apps.DocumentSheetConfig;
      CONFIG.JournalEntry.documentClass = RelationshipGraphDocument;
    }
    /**
     * Registriere Anwendungs-Hooks beim ready-Hook.
     */
    static registerReady() {
      registerHooks();
    }
  }
  Hooks.once("init", () => {
    LoggerService.getInstance().system("Initialisiere Modul");
    LoggerService.getInstance().setDebugMode(true);
    SystemRegistrar.registerInit();
  });
  Hooks.once("ready", () => {
    SystemRegistrar.registerReady();
    LoggerService.getInstance().system("Modul bereit");
  });
})();
//# sourceMappingURL=relationship-app.js.map
