<svelte:options runes={true} />

<script lang="ts">
  import { onMount, tick } from "svelte";
  import ErrorBoundary from "../components/ErrorBoundary.svelte";
  import { relationshipGraphService } from "../services/RelationshipGraphService";
  import type { DeathwatchActor } from "../entities/DeathwatchActor";
  import type {
    RelationshipNode,
    RelationshipEdge,
  } from "../types/relationship";

  // Actor prop via runes-mode
  const { actor } = $props<{ actor: DeathwatchActor }>();

  let container: HTMLDivElement;
  let cy: any = $state(null);

  // Modal states
  let isAddNodeModalOpen = $state(false);
  let isAddEdgeModalOpen = $state(false);

  // Node form data
  let nodeLabel = $state("");
  let nodeActorUuid = $state("");

  // Edge form data
  let edgeSource = $state("");
  let edgeTarget = $state("");
  let edgeType = $state("");
  let edgeLabel = $state("");
  // Layout selection
  let layoutName = $state("grid");

  onMount(async () => {
    await tick();
    const cytoscapeModule = await import("cytoscape");
    const cytoscape = cytoscapeModule.default;

    const graph = relationshipGraphService.loadGraph(actor);
    const elements = relationshipGraphService.convertToCytoscapeElements(graph);

    cy = cytoscape({
      container,
      elements,
      style: relationshipGraphService.getDefaultStyle(),
      layout: relationshipGraphService.getDefaultLayout(layoutName),
    });

    cy.on("tap", "node", (evt: any) => {
      const data = evt.target.data();
      if (data.actorUuid) {
        (globalThis as any)
          .fromUuid(data.actorUuid)
          .then((a: any) => a?.sheet?.render(true));
      }
    });

    cy.on("cxttap", "node", async (evt: any) => {
      const id = evt.target.data("id");
      evt.target.remove();
      await relationshipGraphService.removeNode(actor, id);
    });

    cy.on("cxttap", "edge", async (evt: any) => {
      const id = evt.target.data("id");
      evt.target.remove();
      await relationshipGraphService.removeEdge(actor, id);
    });

    cy.resize();
    cy.layout({ name: layoutName }).run();
    cy.fit();
  });

  function applyLayout() {
    if (cy) {
      relationshipGraphService.applyLayout(cy, layoutName);
    }
  }

  function openAddNode() {
    isAddNodeModalOpen = true;
    nodeLabel = "";
    nodeActorUuid = "";
  }

  async function confirmAddNode() {
    if (!cy) return;

    try {
      const node: RelationshipNode = {
        id:
          (globalThis as any).foundry?.utils?.randomID() || crypto.randomUUID(),
        label: nodeLabel,
        actorUuid: nodeActorUuid,
      };

      await relationshipGraphService.addNode(actor, node);
      relationshipGraphService.addElements(cy, [{ data: node }]);
      isAddNodeModalOpen = false;
    } catch (error) {
      console.error("Error adding node:", error);
      // You could show a user-friendly error message here
    }
  }

  function addEdgePrompt() {
    isAddEdgeModalOpen = true;
    edgeSource = "";
    edgeTarget = "";
    edgeType = "";
    edgeLabel = "";
  }

  async function confirmAddEdge() {
    if (!cy || !edgeSource || !edgeTarget) return;

    const edge: RelationshipEdge = {
      id: (globalThis as any).foundry?.utils?.randomID() || crypto.randomUUID(),
      source: edgeSource,
      target: edgeTarget,
      type: edgeType,
      label: edgeLabel,
    };

    // Validate edge before adding to avoid duplicates
    const currentGraph = relationshipGraphService.loadGraph(actor);
    const validation = relationshipGraphService.validateEdge(
      edge,
      currentGraph,
    );
    if (!validation.isValid) {
      ui.notifications?.warn(
        `Edge hinzufügen fehlgeschlagen: ${validation.errors.join(", ")}`,
      );
      return;
    }

    try {
      await relationshipGraphService.addEdge(actor, edge);
      const color = relationshipGraphService.getEdgeColor(edgeType);
      relationshipGraphService.addElements(cy, [
        {
          data: { ...edge, color },
        },
      ]);
      isAddEdgeModalOpen = false;
    } catch (error) {
      console.error("Error adding edge:", error);
      // You could show a user-friendly error message here
    }
  }
</script>

<ErrorBoundary>
  <div class="space-y-2">
    <div
      bind:this={container}
      class="w-full border border-border-dark-3"
      style="width: 100%; height: 300px;"
    ></div>
    <div class="flex gap-2 items-center">
      <button class="btn btn-sm btn-primary" onclick={openAddNode}
        >Add Node</button
      >
      <button class="btn btn-sm btn-secondary" onclick={addEdgePrompt}
        >Add Edge</button
      >
      <select class="btn btn-sm" bind:value={layoutName} onchange={applyLayout}>
        <option value="grid">Grid</option>
        <option value="breadthfirst">Breadthfirst</option>
        <option value="cose">Cose</option>
      </select>
    </div>

    <!-- Simple HTML Modal for Add Node -->
    {#if isAddNodeModalOpen}
      <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div
          class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4"
        >
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Node hinzufügen
          </h3>
          <div class="space-y-4">
            <div>
              <label
                for="nlabel"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Label</label
              >
              <input
                id="nlabel"
                bind:value={nodeLabel}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label
                for="nactor"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Actor UUID</label
              >
              <input
                id="nactor"
                bind:value={nodeActorUuid}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div class="flex justify-end space-x-3 mt-6">
            <button
              onclick={() => (isAddNodeModalOpen = false)}
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
              >Cancel</button
            >
            <button
              onclick={confirmAddNode}
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >Add Node</button
            >
          </div>
        </div>
      </div>
    {/if}

    <!-- Simple HTML Modal for Add Edge -->
    {#if isAddEdgeModalOpen}
      <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div
          class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4"
        >
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Edge hinzufügen
          </h3>
          <div class="space-y-4">
            <div>
              <label
                for="source"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Source</label
              >
              <select
                id="source"
                bind:value={edgeSource}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="" disabled selected>Choose Node</option>
                {#each relationshipGraphService.getAvailableNodes(actor) as node}
                  <option value={node.id}>{node.label || node.id}</option>
                {/each}
              </select>
            </div>
            <div>
              <label
                for="target"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Target</label
              >
              <select
                id="target"
                bind:value={edgeTarget}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="" disabled selected>Choose Node</option>
                {#each relationshipGraphService.getAvailableNodes(actor) as node}
                  <option value={node.id}>{node.label || node.id}</option>
                {/each}
              </select>
            </div>
            <div>
              <label
                for="etype"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Type</label
              >
              <select
                id="etype"
                bind:value={edgeType}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Neutral</option>
                <option value="ally">Ally</option>
                <option value="foe">Foe</option>
              </select>
            </div>
            <div>
              <label
                for="elabel"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Label</label
              >
              <input
                id="elabel"
                bind:value={edgeLabel}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div class="flex justify-end space-x-3 mt-6">
            <button
              onclick={() => (isAddEdgeModalOpen = false)}
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
              >Cancel</button
            >
            <button
              onclick={confirmAddEdge}
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >Add Edge</button
            >
          </div>
        </div>
      </div>
    {/if}
  </div>
</ErrorBoundary>
