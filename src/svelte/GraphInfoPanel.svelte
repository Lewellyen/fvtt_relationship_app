<script lang="ts">
  import type { NodeData, EdgeData } from "../global";
  
  let { nodes, edges }: { nodes: NodeData[], edges: EdgeData[] } = $props();
</script>

<div class="info-panel">
  <div class="nodes-info">
    <h3>Nodes ({nodes.length}):</h3>
    {#each nodes as node}
      <div class="node-item">
        <strong>{node.label}</strong> ({node.x}, {node.y})
      </div>
    {/each}
  </div>

  <div class="edges-info">
    <h3>Edges ({edges.length}):</h3>
    {#each edges as edge}
      <div class="edge-item">
        <strong>{nodes.find(n => n.id === edge.source)?.label || edge.source}</strong>
        →
        <strong>{nodes.find(n => n.id === edge.target)?.label || edge.target}</strong>
        ({edge.label})
      </div>
    {/each}
  </div>
</div>

<style>
  .info-panel {
    display: flex;
    gap: 2rem;
    margin-top: 1rem;
  }
  .nodes-info, .edges-info {
    flex: 1;
  }
  .node-item, .edge-item {
    margin-bottom: 0.25rem;
  }
</style> 