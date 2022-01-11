<script lang="ts">
  export let title: string;
  export let error: string;
</script>

<div class="mb-6">
  <label
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    for="{`question-${title}`}}">{title}</label
  >
  <slot />
  <div class="error">
    {#if error}
      <p class="text-red-300 text-xs italic">{error}</p>
    {/if}
  </div>
</div>
