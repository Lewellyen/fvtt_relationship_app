import { vi } from "vitest";

// Mock Foundry VTT globals
(global as any).game = {
  system: {
    id: "wh40k-deathwatch",
  },
  settings: {
    get: vi.fn(),
    set: vi.fn(),
  },
} as any;

(global as any).CONFIG = {
  Actor: {
    documentClass: null,
    dataModels: {},
    typeLabels: {},
  },
  Item: {
    documentClass: null,
    dataModels: {},
    typeLabels: {},
  },
} as any;

(global as any).Hooks = {
  on: vi.fn(),
  once: vi.fn(),
  off: vi.fn(),
  callAll: vi.fn(),
} as any;

(global as any).foundry = {
  applications: {
    apps: {
      DocumentSheetConfig: {
        registerSheet: vi.fn(),
        unregisterSheet: vi.fn(),
      },
    },
  },
  appv1: {
    sheets: {
      ActorSheet: class {},
      ItemSheet: class {},
    },
  },
} as any;

// Mock performance API
(global as any).performance = {
  now: vi.fn(() => Date.now()),
} as any;

// Mock console methods
global.console = {
  ...console,
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  debug: vi.fn(),
};
