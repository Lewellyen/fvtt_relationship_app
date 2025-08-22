<script lang="ts">
  let {
    elements,
    interactive,
    onNodeClick,
    onEdgeClick,
  }: {
    elements: any[];
    interactive: boolean;
    onNodeClick: (nodeId: string) => void;
    onEdgeClick: (edgeId: string) => void;
  } = $props();

  console.log("RelationshipGraphView", elements);
  console.log("RelationshipGraphView", interactive);
  console.log("RelationshipGraphView", onNodeClick);
  console.log("RelationshipGraphView", onEdgeClick);

</script>

<div class="relationship-graph-view">
  <div class="graph-container">
    <div> Platzhalter für Graph</div>
    <!-- <CytoscapeGraph
      width="800px"
      height="600px"
      {elements}
      {interactive}
      onNodeClick={handleNodeClick}
      onEdgeClick={handleEdgeClick}
    /> -->
  </div>
  
  <div class="info-container">
    <div> Platzhalter für Info-Panel</div>
  </div>
</div>

<style>
  .relationship-graph-view {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 100vh;
  }

  .graph-container {
    flex: 1;
    min-height: 0;
  }

  .info-container {
    height: 300px;
    min-height: 300px;
  }
</style>
