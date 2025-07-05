<script lang="ts">
  import type { Snippet } from "svelte";

  // Destructure the children snippet prop
  let { children }: { children: Snippet } = $props();
</script>

{#snippet failed(error: unknown, reset: () => void)}
  <div class="error-boundary">
    <div class="error-header">
      <h3>⚠️ Ein Fehler ist aufgetreten</h3>
      <button class="error-reset" onclick={() => reset()}
        >Erneut versuchen</button
      >
    </div>
    <div class="error-content">
      <p class="error-message">{(error as Error).message}</p>
      <details class="error-details">
        <summary>Technische Details</summary>
        <pre class="error-stack">{(error as Error).stack}</pre>
      </details>
    </div>
  </div>
{/snippet}

<svelte:boundary {failed}>{@render children()}</svelte:boundary>

<style>
  .error-boundary {
    border: 2px solid #ef4444;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
    background-color: #fef2f2;
    color: #991b1b;
  }

  .error-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .error-header h3 {
    margin: 0;
    color: #dc2626;
  }

  .error-reset {
    background-color: #dc2626;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .error-reset:hover {
    background-color: #b91c1c;
  }

  .error-content {
    font-size: 0.875rem;
  }

  .error-message {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .error-details {
    margin-top: 0.5rem;
  }

  .error-details summary {
    cursor: pointer;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .error-stack {
    background-color: #f3f4f6;
    padding: 0.5rem;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.75rem;
    white-space: pre-wrap;
    overflow-x: auto;
    margin: 0.5rem 0;
  }
</style>
