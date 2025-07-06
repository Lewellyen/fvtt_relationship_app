import { SystemRegistrar } from "./SystemRegistrar";
import { LoggerService } from "../services/LoggerService";

Hooks.once("init", () => {
  LoggerService.getInstance().system("Initialisiere Modul");
  LoggerService.getInstance().setDebugMode(true);
  SystemRegistrar.registerInit();
});

Hooks.once("ready", () => {
  SystemRegistrar.registerReady();
  LoggerService.getInstance().system("Modul bereit");
});
