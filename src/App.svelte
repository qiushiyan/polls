<svelte:options immutable={true} />

<script lang="ts">
  import Header from "./components/Layout/Header.svelte";
  import Footer from "./components/Layout/Footer.svelte";
  import "./assets/css/globals.css";
  import "./app.css";
  import Tabs from "./components/ui/Tabs.svelte";
  import PollList from "./components/PollList.svelte";
  import CreatePoll from "./components/CreatePoll.svelte";
  import type { Poll } from "./types";
  import { polls } from "./lib/store";

  let items = ["Current Polls", "Add New Poll"];
  let activeItem = "Current Polls";

  const toggleActiveItem = (event: CustomEvent) => {
    activeItem = event.detail.tab;
  };

  const createHandler = (newPoll: Poll) => {
    polls.createPoll(newPoll);
    activeItem = "Current Polls";
  };
</script>

<main>
  <Header />
  <Tabs
    tabs={items}
    activeTab={activeItem}
    on:toggleActiveTab={toggleActiveItem}
  />
  {#if activeItem === "Current Polls"}
    <PollList data={$polls} on:vote={polls.incrementPoll} />
  {:else if activeItem === "Add New Poll"}
    <CreatePoll {createHandler} />
  {/if}
  <Footer />
</main>

<style>
  main {
    max-width: 960px;
    margin: 20px auto;
  }
</style>
