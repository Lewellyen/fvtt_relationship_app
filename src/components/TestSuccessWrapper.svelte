<script lang="ts">
  import ErrorBoundary from "./ErrorBoundary.svelte";
</script>

<ErrorBoundary>
  {#snippet children()}
    <p>Alles gut!</p>
  {/snippet}
</ErrorBoundary>
