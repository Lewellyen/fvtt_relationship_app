import { describe, it, expect, beforeEach } from "vitest";
import { PerformanceMonitor } from "./PerformanceMonitor";

describe("PerformanceMonitor", () => {
  let monitor: PerformanceMonitor;

  beforeEach(() => {
    monitor = PerformanceMonitor.getInstance();
    monitor.clear();
  });

  it("should measure sync function execution time", () => {
    const result = monitor.measure("syncTest", () => 42);
    expect(result).toBe(42);
    const stats = monitor.getStats("syncTest");
    expect(stats).not.toBeNull();
    expect(stats!.count).toBe(1);
  });

  it("should measure async function execution time", async () => {
    const result = await monitor.measureAsync("asyncTest", async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      return 99;
    });
    expect(result).toBe(99);
    const stats = monitor.getStats("asyncTest");
    expect(stats).not.toBeNull();
    expect(stats!.count).toBe(1);
    expect(stats!.avg).toBeGreaterThanOrEqual(10);
  });

  it("should return null for unknown label", () => {
    expect(monitor.getStats("unknown")).toBeNull();
  });

  it("should clear all measurements", () => {
    monitor.measure("clearTest", () => 1);
    expect(monitor.getStats("clearTest")).not.toBeNull();
    monitor.clear();
    expect(monitor.getStats("clearTest")).toBeNull();
  });
});
