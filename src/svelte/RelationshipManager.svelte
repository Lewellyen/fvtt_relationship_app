<svelte:options runes={true} />

<script lang="ts">
  import { onMount } from 'svelte';
  import type { DeathwatchActor } from '../entities/DeathwatchActor';
  import ErrorBoundary from '../components/ErrorBoundary.svelte';
  import RelationshipGraphEditor from './RelationshipGraphEditor.svelte';

  let actors: DeathwatchActor[] = $state([]);
  let selectedActor: DeathwatchActor | null = $state(null);

  onMount(() => {
    // Beschneide den Foundry Actor-Typ auf DeathwatchActor via unknown-Cast
    actors = ((game.actors?.contents as unknown) as DeathwatchActor[]) ?? [];
    if (actors.length > 0) selectedActor = actors[0];
  });

  function onSelectChange(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    selectedActor = ((game.actors?.get(id) as unknown) as DeathwatchActor) ?? null;
  }
</script>

<style>
  .relationship-manager-app { padding: 1rem; }
  .actor-select { margin-bottom: 1rem; }
</style>

<div class="relationship-manager-app">
  <h2 class="text-xl font-bold mb-2">Relationship Manager</h2>

  <div class="actor-select">
    <label for="actor-select" class="mr-2">Actor wählen:</label>
    <select id="actor-select" onchange={onSelectChange}>
      {#each actors as actor}
        <option value={actor.id}>{actor.name}</option>
      {/each}
    </select>
  </div>

  {#if selectedActor}
    <ErrorBoundary>
      <RelationshipGraphEditor actor={selectedActor as any} />
    </ErrorBoundary>
  {:else}
    <p>Kein Actor verfügbar.</p>
  {/if}
</div> 