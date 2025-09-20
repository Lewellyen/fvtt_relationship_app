<script lang="ts">
  import type { ILogger } from '../interfaces';

  let {
    elements,
    interactive,
    onNodeClick,
    onEdgeClick,
    logger,
  }: {
    elements: unknown[];
    interactive: boolean;
    onNodeClick: (nodeId: string) => void;
    onEdgeClick: (edgeId: string) => void;
    logger: ILogger;
  } = $props();

  // Debug-Logging über Logger
  if (logger) {
    logger.debug("RelationshipGraphEdit", elements);
    logger.debug("RelationshipGraphEdit", interactive);
    logger.debug("RelationshipGraphEdit", onNodeClick);
    logger.debug("RelationshipGraphEdit", onEdgeClick);
  }

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
