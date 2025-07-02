import type {
  RelationshipGraph,
  RelationshipNode,
  RelationshipEdge,
} from "../types/relationship";

export class RelationshipGraphPersistenceService {
  async saveGraph(actor: Actor, graph: RelationshipGraph): Promise<void> {
    const current = (foundry.utils.getProperty(
      actor.system,
      "props.relationshipGraph",
    ) as RelationshipGraph) || { nodes: [], edges: [] };
    const updated = { ...current, ...graph };
    await actor.update({ system: { props: { relationshipGraph: updated } } });
  }

  async addNode(actor: Actor, node: RelationshipNode): Promise<void> {
    const graph = (foundry.utils.getProperty(
      actor.system,
      "props.relationshipGraph",
    ) as RelationshipGraph) || { nodes: [], edges: [] };
    graph.nodes.push(node);
    await this.saveGraph(actor, graph);
  }

  async removeNode(actor: Actor, nodeId: string): Promise<void> {
    const graph = (foundry.utils.getProperty(
      actor.system,
      "props.relationshipGraph",
    ) as RelationshipGraph) || { nodes: [], edges: [] };
    graph.nodes = graph.nodes.filter((n) => n.id !== nodeId);
    graph.edges = graph.edges.filter(
      (e) => e.source !== nodeId && e.target !== nodeId,
    );
    await this.saveGraph(actor, graph);
  }

  async addEdge(actor: Actor, edge: RelationshipEdge): Promise<void> {
    const graph = (foundry.utils.getProperty(
      actor.system,
      "props.relationshipGraph",
    ) as RelationshipGraph) || { nodes: [], edges: [] };
    graph.edges.push(edge);
    await this.saveGraph(actor, graph);
  }

  async removeEdge(actor: Actor, edgeId: string): Promise<void> {
    const graph = (foundry.utils.getProperty(
      actor.system,
      "props.relationshipGraph",
    ) as RelationshipGraph) || { nodes: [], edges: [] };
    graph.edges = graph.edges.filter((e) => e.id !== edgeId);
    await this.saveGraph(actor, graph);
  }

  async updateNode(
    actor: Actor,
    nodeId: string,
    updates: Partial<RelationshipNode>,
  ): Promise<void> {
    const graph = (foundry.utils.getProperty(
      actor.system,
      "props.relationshipGraph",
    ) as RelationshipGraph) || { nodes: [], edges: [] };
    const idx = graph.nodes.findIndex((n) => n.id === nodeId);
    if (idx !== -1) {
      graph.nodes[idx] = { ...graph.nodes[idx], ...updates };
      await this.saveGraph(actor, graph);
    }
  }

  async updateEdge(
    actor: Actor,
    edgeId: string,
    updates: Partial<RelationshipEdge>,
  ): Promise<void> {
    const graph = (foundry.utils.getProperty(
      actor.system,
      "props.relationshipGraph",
    ) as RelationshipGraph) || { nodes: [], edges: [] };
    const idx = graph.edges.findIndex((e) => e.id === edgeId);
    if (idx !== -1) {
      graph.edges[idx] = { ...graph.edges[idx], ...updates };
      await this.saveGraph(actor, graph);
    }
  }
}

export const relationshipGraphPersistenceService =
  new RelationshipGraphPersistenceService();
