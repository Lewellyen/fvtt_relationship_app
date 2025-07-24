<script lang="ts">
  import type { GraphComponentProps } from "../global";
  
  // Props mit Svelte 5 Runes-Syntax
  let { nodes, edges }: GraphComponentProps = $props();

  console.log("[RelationshipGraph] Props received:", { nodes, edges });
</script>

<div class="relationship-graph-container">
  <h2>Beziehungsgraph</h2>
  
  <div class="graph-info">
    <p>Nodes: {nodes.length}</p>
    <p>Edges: {edges.length}</p>
  </div>

  <div class="graph-content">
    <div class="nodes">
      <h3>Nodes:</h3>
      {#each nodes as node}
        <div class="node">
          <strong>{node.id}</strong> ({node.x}, {node.y})
        </div>
      {/each}
    </div>

    <div class="edges">
      <h3>Edges:</h3>
      {#each edges as edge}
        <div class="edge">
          <strong>{edge.from}</strong> → <strong>{edge.to}</strong> ({edge.label})
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .relationship-graph-container {
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem;
  }

  .graph-info {
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .graph-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .nodes, .edges {
    padding: 1rem;
    border-radius: 4px;
  }

  .node, .edge {
    padding: 0.25rem 0;
  }

  .node:last-child, .edge:last-child {
    border-bottom: none;
  }
</style>
