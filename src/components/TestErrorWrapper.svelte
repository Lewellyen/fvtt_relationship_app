<script lang="ts">
  import ErrorBoundary from "./ErrorBoundary.svelte";
  import Thrower from "./Thrower.svelte";
</script>

<ErrorBoundary>
  {#snippet children()}
    <Thrower />
  {/snippet}
</ErrorBoundary>
