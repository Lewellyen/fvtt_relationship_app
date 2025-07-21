  __vite_style__.textContent = "\n  .relationship-graph-container.svelte-1pcjct6 {\n    padding: 1rem;\n    border-radius: 8px;\n    margin: 1rem;\n  }\n\n  .graph-info.svelte-1pcjct6 {\n    padding: 0.5rem;\n    border-radius: 4px;\n    margin-bottom: 1rem;\n  }\n\n  .graph-content.svelte-1pcjct6 {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 1rem;\n  }\n\n  .nodes.svelte-1pcjct6, .edges.svelte-1pcjct6 {\n    padding: 1rem;\n    border-radius: 4px;\n  }\n\n  .node.svelte-1pcjct6, .edge.svelte-1pcjct6 {\n    padding: 0.25rem 0;\n  }\n\n  .node.svelte-1pcjct6:last-child, .edge.svelte-1pcjct6:last-child {\n    border-bottom: none;\n  }\n\n  .cytoscape-graph-container.svelte-yi65y3 {\n    border: 1px solid #dee2e6;\n    border-radius: 8px;\n    overflow: hidden;\n    background: #f8f9fa;\n  }\n\n  .cytoscape-container.svelte-yi65y3 {\n    width: 100%;\n    height: 100%;\n  }\n\n  .relationship-graph-view.svelte-1bk0qhz {\n    padding: 1rem;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .graph-info.svelte-1bk0qhz {\n    background: #e8f5e8;\n    padding: 0.5rem;\n    border-radius: 4px;\n    margin-bottom: 1rem;\n    text-align: center;\n  }\n\n  .cytoscape-wrapper.svelte-1bk0qhz {\n    flex: 1;\n    margin-bottom: 1rem;\n  }\n\n  .info-panel.svelte-1bk0qhz {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 1rem;\n    background: #f8f9fa;\n    padding: 1rem;\n    border-radius: 8px;\n  }\n\n  .nodes-info.svelte-1bk0qhz, .edges-info.svelte-1bk0qhz {\n    background: white;\n    padding: 1rem;\n    border-radius: 4px;\n    border: 1px solid #dee2e6;\n  }\n\n  .node-item.svelte-1bk0qhz, .edge-item.svelte-1bk0qhz {\n    padding: 0.25rem 0;\n    border-bottom: 1px solid #f1f3f4;\n  }\n\n  .node-item.svelte-1bk0qhz:last-child, .edge-item.svelte-1bk0qhz:last-child {\n    border-bottom: none;\n  }\n/*$vite$:1*/";
  class RelationshipGraphService {
    constructor(document2) {
      this.document = document2;
    }
    getNodes() {
      return this.document.system.nodes ?? [];
    }
    getEdges() {
      return this.document.system.edges ?? [];
    }
    async addNode(node) {
      const nodes = [...this.getNodes(), node];
      await this.document.update({ "system.nodes": nodes });
    }
    async addEdge(edge) {
      const newEdge = {
        id: edge.id ?? crypto.randomUUID(),
        type: edge.type ?? "relation",
        color: edge.color ?? "#000000",
        ...edge
      };
      const edges = [...this.getEdges(), newEdge];
      await this.document.update({ "system.edges": edges });
    }
    async removeNode(id) {
      const nodes = this.getNodes().filter((n) => n.id !== id);
      await this.document.update({ "system.nodes": nodes });
    }
    async removeEdge(id) {
      const edges = this.getEdges().filter((e) => e.id !== id);
      await this.document.update({ "system.edges": edges });
    }
  }
  class ServiceFactory {
    createRelationshipGraphService(document2) {
      return new RelationshipGraphService(document2);
    }
  }
    constructor(...args) {
      super(...args);
      this.serviceFactory = new ServiceFactory();
      this.graphService = this.serviceFactory.createRelationshipGraphService(
        this.document
      );
      context.graphData = {
        nodes: this.graphService.getNodes(),
        edges: this.graphService.getEdges()
      };
        await this.graphService.addNode({ id: "Bauer", x: 150, y: 200 });
        await this.graphService.addNode({ id: "Müller", x: 450, y: 200 });
        graphData.nodes = this.graphService.getNodes();
        await this.graphService.addEdge({
          from: "Bauer",
          to: "Müller",
          label: "Weizen",
          type: "trade",
          color: "#ff0000"
        });
        graphData.edges = this.graphService.getEdges();
