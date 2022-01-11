<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch =
    createEventDispatcher<{ toggleActiveTab: { tab: string } }>();

  export let tabs: string[];
  export let activeTab: string;
</script>

<div class="tabs">
  <ul>
    {#each tabs as tab (tab)}
      <li>
        <div
          class:active={tab === activeTab}
          on:click={() => dispatch("toggleActiveTab", { tab })}
        >
          {tab}
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .tabs {
    margin-bottom: 40px;
  }
  ul {
    display: flex;
    justify-content: center;
    padding: 0;
    list-style-type: none;
  }
  li {
    margin: 0 16px;
    font-size: 18px;
    color: #555;
    cursor: pointer;
  }
  .active {
    color: #d91b42;
    border-bottom: 2px solid #d91b42;
    padding-bottom: 8px;
  }
</style>
