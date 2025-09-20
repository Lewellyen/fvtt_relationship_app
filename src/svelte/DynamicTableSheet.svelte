<script lang="ts">
  
  import type { IDynamicTableConfig } from "../types/DynamicTableTypes";
  
  let { config, onSubmit, onCancel } = $props<{ 
    config: IDynamicTableConfig;
    onSubmit: (data: unknown[]) => void;
    onCancel: () => void;
  }>();
</script>

<div>
  <h1>Dynamic Table</h1>
</div>

<style>

</style>