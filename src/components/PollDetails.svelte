<script lang="ts">
  import { polls } from "../lib/store";
  import { createEventDispatcher } from "svelte";
  import { tweened } from "svelte/motion";
  import type { Poll } from "../types";
  import Button from "./ui/Button.svelte";
  import Card from "./ui/Card.svelte";
  export let data: Poll;

  // votes
  $: totalVotes = data.voteA + data.voteB;
  $: percentA = Math.floor((100 / totalVotes) * data.voteA) || 0;
  $: percentB = Math.floor((100 / totalVotes) * data.voteB) || 0;

  // tweened percentages
  const widthA = tweened(0, {
    duration: 200,
  });
  const widthB = tweened(0, {
    duration: 200,
  });
  $: widthA.set(percentA);
  $: widthB.set(percentB);

  const dispatch =
    createEventDispatcher<{ vote: { option: string; id: number } }>();

  const handleVote = (option: string, id: number) => {
    dispatch("vote", { option, id });
  };

  const handleDelete = (id: number) => {
    polls.deletePoll(id);
  };
</script>

<Card>
  <div class="poll">
    <h3>{data.question}</h3>
    <p>total votes {totalVotes}</p>
    <div class="answer" on:click={() => handleVote("a", data.id)}>
      <div class="percent percent-a" style="width: {$widthA}%" />
      <span>{data.answerA} ({data.voteA})</span>
    </div>
    <div class="answer" on:click={() => handleVote("b", data.id)}>
      <div class="percent percent-b" style="width: {$widthB}%" />
      <span>{data.answerB} ({data.voteB})</span>
    </div>
    <div class="delete">
      <Button on:click={() => handleDelete(data.id)}>delete</Button>
    </div>
  </div>
</Card>

<style>
  h3 {
    margin: 0 auto;
    color: #555;
  }
  p {
    margin-top: 6px;
    font-size: 14px;
    color: #aaa;
    margin-bottom: 30px;
  }
  .answer {
    background: #fafafa;
    cursor: pointer;
    margin: 10px auto;
    position: relative;
  }
  .answer:hover {
    opacity: 0.6;
  }
  span {
    display: inline-block;
    padding: 10px 20px;
  }
  .percent {
    height: 100%;
    position: absolute;
    box-sizing: border-box;
  }
  .percent-a {
    background: rgba(217, 27, 66, 0.2);
    border-left: 4px solid #d91b42;
  }
  .percent-b {
    background: rgba(69, 196, 150, 0.2);
    border-left: 4px solid #45c496;
  }
  .delete {
    margin-top: 30px;
    text-align: center;
  }
</style>
