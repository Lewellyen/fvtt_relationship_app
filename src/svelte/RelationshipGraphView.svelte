<script lang="ts">
  import type { GraphComponentProps } from "../global";
  import CytoscapeGraph from './CytoscapeGraph.svelte';
  
  // Props mit Svelte 5 Runes-Syntax  
  let { nodes, edges }: GraphComponentProps = $props();

  console.log("[RelationshipGraphView] Props received:", { nodes, edges });

  // Event handlers
  function handleNodeClick(nodeId: string) {
    console.log('Node clicked in view mode:', nodeId);
  }

  function handleEdgeClick(edgeId: string) {
    console.log('Edge clicked in view mode:', edgeId);
  }
</script>

<div class="relationship-graph-view">
  <h2>Beziehungsgraph (Ansicht)</h2>
  
  <div class="graph-info">
    <p>Nodes: {nodes.length} | Edges: {edges.length}</p>
  </div>

  <!-- Cytoscape Graph -->
  <div class="cytoscape-wrapper">
    <CytoscapeGraph 
      nodes={nodes}
      edges={edges}
      width="100%"
      height="500px"
      interactive={true}
      onNodeClick={handleNodeClick}
      onEdgeClick={handleEdgeClick}
    />
  </div>

  <!-- Info Panel -->
  <div class="info-panel">
    <div class="nodes-info">
      <h3>Nodes ({nodes.length}):</h3>
      {#each nodes as node}
        <div class="node-item">
          <strong>{node.id}</strong> ({node.x}, {node.y})
        </div>
      {/each}
    </div>

    <div class="edges-info">
      <h3>Edges ({edges.length}):</h3>
      {#each edges as edge}
        <div class="edge-item">
          <strong>{edge.from}</strong> → <strong>{edge.to}</strong> ({edge.label})
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .relationship-graph-view {
    padding: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .graph-info {
    background: #e8f5e8;
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    text-align: center;
  }

  .cytoscape-wrapper {
    flex: 1;
    margin-bottom: 1rem;
  }

  .info-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
  }

  .nodes-info, .edges-info {
    background: white;
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #dee2e6;
  }

  .node-item, .edge-item {
    padding: 0.25rem 0;
    border-bottom: 1px solid #f1f3f4;
  }

  .node-item:last-child, .edge-item:last-child {
    border-bottom: none;
  }
</style>
