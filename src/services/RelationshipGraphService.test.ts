import { describe, it, expect, vi, beforeEach } from "vitest";
import { RelationshipGraphService } from "./RelationshipGraphService";
import { relationshipGraphValidationService } from "./RelationshipGraphValidationService";
import { relationshipGraphPersistenceService } from "./RelationshipGraphPersistenceService";
import { relationshipGraphCytoscapeService } from "./RelationshipGraphCytoscapeService";

// Mock dependencies
vi.mock("./RelationshipGraphValidationService");
vi.mock("./RelationshipGraphPersistenceService");
vi.mock("./RelationshipGraphCytoscapeService");

describe("RelationshipGraphService", () => {
  let service: RelationshipGraphService;
  let mockActor: any;

  beforeEach(() => {
    service = new RelationshipGraphService();
    mockActor = {
      system: {
        props: {
          relationshipGraph: {
            nodes: [],
            edges: [],
          },
        },
      },
    };

    // Reset mocks
    vi.clearAllMocks();
  });

  describe("loadGraph", () => {
    it("should load existing graph from actor", () => {
      const graph = service.loadGraph(mockActor);
      expect(graph).toEqual({
        nodes: [],
        edges: [],
      });
    });

    it("should return empty graph if no graph exists", () => {
      mockActor.system.props.relationshipGraph = null;
      const graph = service.loadGraph(mockActor);
      expect(graph).toEqual({
        nodes: [],
        edges: [],
      });
    });
  });

  describe("getAvailableNodes", () => {
    it("should return nodes from loaded graph", () => {
      const nodes = service.getAvailableNodes(mockActor);
      expect(nodes).toEqual([]);
    });
  });

  describe("validateGraph", () => {
    it("should delegate to validation service", () => {
      const mockGraph = { nodes: [], edges: [] };
      const mockValidation = { isValid: true, errors: [], warnings: [] };

      vi.mocked(
        relationshipGraphValidationService.validateGraph,
      ).mockReturnValue(mockValidation);

      const result = service.validateGraph(mockGraph);

      expect(
        relationshipGraphValidationService.validateGraph,
      ).toHaveBeenCalledWith(mockGraph);
      expect(result).toBe(mockValidation);
    });
  });

  describe("convertToCytoscapeElements", () => {
    it("should delegate to cytoscape service", () => {
      const mockGraph = { nodes: [], edges: [] };
      const mockElements = [{ id: "test" }];

      vi.mocked(
        relationshipGraphCytoscapeService.convertToCytoscapeElements,
      ).mockReturnValue(mockElements);

      const result = service.convertToCytoscapeElements(mockGraph);

      expect(
        relationshipGraphCytoscapeService.convertToCytoscapeElements,
      ).toHaveBeenCalledWith(mockGraph);
      expect(result).toBe(mockElements);
    });
  });
});
