<script lang="ts">
  import type { GraphComponentProps } from "../global";
  import CytoscapeGraph from './CytoscapeGraph.svelte';
  import GraphInfoPanel from './GraphInfoPanel.svelte';
  
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
  <div class="info-panel-wrapper">
    <GraphInfoPanel nodes={nodes} edges={edges} />
  </div>
</div>

<style>
  .relationship-graph-view {
    padding: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .cytoscape-wrapper {
    flex: 1;
    margin-bottom: 1rem;
  }

  .info-panel-wrapper {
    flex: 1;
    margin-bottom: 1rem;
  }
</style>
