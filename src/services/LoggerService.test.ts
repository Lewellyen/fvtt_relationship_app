import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoggerService } from "./LoggerService";

describe("LoggerService", () => {
  let logger: LoggerService;

  beforeEach(() => {
    // Reset singleton instance
    (LoggerService as any).instance = undefined;
    logger = LoggerService.getInstance();

    // Mock console methods
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "debug").mockImplementation(() => {});
  });

  describe("getInstance", () => {
    it("should return the same instance (singleton)", () => {
      const instance1 = LoggerService.getInstance();
      const instance2 = LoggerService.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe("setDebugMode", () => {
    it("should enable debug mode", () => {
      logger.setDebugMode(true);
      logger.info("test message");
      expect(console.log).toHaveBeenCalledWith(
        "[WH40K Deathwatch] ℹ️ test message",
      );
    });

    it("should disable debug mode", () => {
      logger.setDebugMode(false);
      logger.info("test message");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("info", () => {
    it("should log info message when debug mode is enabled", () => {
      logger.setDebugMode(true);
      logger.info("test info");
      expect(console.log).toHaveBeenCalledWith(
        "[WH40K Deathwatch] ℹ️ test info",
      );
    });

    it("should not log info message when debug mode is disabled", () => {
      logger.setDebugMode(false);
      logger.info("test info");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("warn", () => {
    it("should always log warning messages", () => {
      logger.setDebugMode(false);
      logger.warn("test warning");
      expect(console.warn).toHaveBeenCalledWith(
        "[WH40K Deathwatch] ⚠️ test warning",
      );
    });
  });

  describe("error", () => {
    it("should always log error messages", () => {
      const testError = new Error("test error");
      logger.setDebugMode(false);
      logger.error("test error message", testError);
      expect(console.error).toHaveBeenCalledWith(
        "[WH40K Deathwatch] ❌ test error message",
        testError,
      );
    });
  });

  describe("debug", () => {
    it("should log debug message when debug mode is enabled", () => {
      logger.setDebugMode(true);
      logger.debug("test debug");
      expect(console.debug).toHaveBeenCalledWith(
        "[WH40K Deathwatch] 🐛 test debug",
      );
    });

    it("should not log debug message when debug mode is disabled", () => {
      logger.setDebugMode(false);
      logger.debug("test debug");
      expect(console.debug).not.toHaveBeenCalled();
    });
  });

  describe("performance", () => {
    it("should log performance message when debug mode is enabled", () => {
      logger.setDebugMode(true);
      logger.performance("test operation", 50);
      expect(console.log).toHaveBeenCalledWith(
        "[WH40K Deathwatch] ✅ test operation: 50.00ms",
      );
    });

    it("should show warning for slow operations", () => {
      logger.setDebugMode(true);
      logger.performance("slow operation", 150);
      expect(console.log).toHaveBeenCalledWith(
        "[WH40K Deathwatch] ⚠️ slow operation: 150.00ms",
      );
    });
  });

  describe("system", () => {
    it("should always log system messages", () => {
      logger.setDebugMode(false);
      logger.system("system message");
      expect(console.log).toHaveBeenCalledWith(
        "[WH40K Deathwatch] 🚀 system message",
      );
    });
  });
});
