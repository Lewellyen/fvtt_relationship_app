<script lang="ts">
  import type { GraphComponentProps } from "../global";
  import GraphInfoPanel from './GraphInfoPanel.svelte';
  
  // Props mit Svelte 5 Runes-Syntax
  let { nodes, edges }: GraphComponentProps = $props();

  console.log("[RelationshipGraph] Props received:", { nodes, edges });
</script>

<div class="relationship-graph-container">
  <div class="info-panel-wrapper">
    <GraphInfoPanel nodes={nodes} edges={edges} />
  </div>
</div>

<style>
  .relationship-graph-container {
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem;
  }

  .info-panel-wrapper {
    flex: 1;
    margin-bottom: 1rem;
  }
</style>
