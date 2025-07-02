<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { relationshipGraphService } from '../services/RelationshipGraphService';
  import { relationshipGraphValidationService } from '../services/RelationshipGraphValidationService';

  const { actor } = $props<{ actor: Actor }>();

  let container: HTMLDivElement;
  let cy: any = null;

  // Modal and form state
  let isAddNodeModalOpen = $state(false);
  let nodeLabel = $state('');
  let nodeActorUuid = $state('');

  let isAddEdgeModalOpen = $state(false);
  let edgeSource = $state('');
  let edgeTarget = $state('');
  let edgeType = $state('');
  let edgeLabel = $state('');

  let layoutName = $state('grid');

  onMount(async () => {
    await tick();
    const cytoscapeModule = await import('cytoscape');
    const cytoscape = cytoscapeModule.default;

    const graph = relationshipGraphService.loadGraph(actor);
    const elements = relationshipGraphService.convertToCytoscapeElements(graph);
    cy = cytoscape({ container, elements, style: relationshipGraphService.getDefaultStyle(), layout: relationshipGraphService.getDefaultLayout(layoutName) });

    cy.on('tap', 'node', (evt: any) => {
      const data = evt.target.data();
      if (data.actorUuid) {
        (globalThis as any).fromUuid(data.actorUuid).then((a: any) => a?.sheet?.render(true));
      }
    });

    cy.on('cxttap', 'node', async (evt: any) => {
      const id = evt.target.data('id');
      evt.target.remove();
      await relationshipGraphService.removeNode(actor, id);
    });

    cy.on('cxttap', 'edge', async (evt: any) => {
      const id = evt.target.data('id');
      evt.target.remove();
      await relationshipGraphService.removeEdge(actor, id);
    });

    cy.resize(); cy.layout({ name: layoutName }).run(); cy.fit();
  });

  function applyLayout() {
    if (cy) relationshipGraphService.applyLayout(cy, layoutName);
  }

  function openAddNode() { isAddNodeModalOpen = true; nodeLabel = ''; nodeActorUuid = ''; }
  async function confirmAddNode() {
    if (!cy) return;
    const node = { id: crypto.randomUUID(), label: nodeLabel, actorUuid: nodeActorUuid };
    await relationshipGraphService.addNode(actor, node);
    relationshipGraphService.addElements(cy, [{ data: node }]);
    isAddNodeModalOpen = false;
  }

  function openAddEdge() { isAddEdgeModalOpen = true; edgeSource = ''; edgeTarget = ''; edgeType = ''; edgeLabel = ''; }
  async function confirmAddEdge() {
    if (!cy || !edgeSource || !edgeTarget) return;
    const current = relationshipGraphService.loadGraph(actor);
    const edge = { id: crypto.randomUUID(), source: edgeSource, target: edgeTarget, type: edgeType, label: edgeLabel };
    const validation = relationshipGraphValidationService.validateEdge(edge, current);
    if (!validation.isValid) return ui.notifications?.warn(`Fehler: ${validation.errors.join(', ')}`);
    await relationshipGraphService.addEdge(actor, edge);
    relationshipGraphService.addElements(cy, [{ data: { ...edge, color: relationshipGraphService.getEdgeColor(edgeType) } }]);
    isAddEdgeModalOpen = false;
  }
</script>

<div bind:this={container} style="width:100%; height:300px; border:1px solid #ccc;"></div>
<div class="controls">
  <button onclick={openAddNode}>Add Node</button>
  <button onclick={openAddEdge}>Add Edge</button>
  <select bind:value={layoutName} onchange={applyLayout}>
    <option value="grid">Grid</option>
    <option value="breadthfirst">Breadthfirst</option>
    <option value="cose">Cose</option>
  </select>
</div>

{#if isAddNodeModalOpen}
  <div class="modal">
    <h3>Add Node</h3>
    <input placeholder="Label" bind:value={nodeLabel} />
    <input placeholder="Actor UUID" bind:value={nodeActorUuid} />
    <button onclick={confirmAddNode}>Add</button>
    <button onclick={() => isAddNodeModalOpen = false}>Cancel</button>
  </div>
{/if}

{#if isAddEdgeModalOpen}
  <div class="modal">
    <h3>Add Edge</h3>
    <input placeholder="Source ID" bind:value={edgeSource} />
    <input placeholder="Target ID" bind:value={edgeTarget} />
    <input placeholder="Type" bind:value={edgeType} />
    <input placeholder="Label" bind:value={edgeLabel} />
    <button onclick={confirmAddEdge}>Add</button>
    <button onclick={() => isAddEdgeModalOpen = false}>Cancel</button>
  </div>
{/if} 