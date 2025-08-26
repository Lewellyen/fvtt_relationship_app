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
  }
</style>
