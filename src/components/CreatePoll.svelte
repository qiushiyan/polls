<script lang="ts">
  import type { FormFields, Poll } from "src/types";

  import Button from "./ui/Button.svelte";
  import InputWrapper from "./ui/InputWrapper.svelte";
  export let createHandler: (data: Poll) => void;
  let valid = false;
  let fields: FormFields = { question: "", answerA: "", answerB: "" };
  let errors: FormFields = { question: "", answerA: "", answerB: "" };
  let submitHandler = () => {
    valid = true;
    if (fields.question.trim().length < 5) {
      valid = false;
      errors.question = "Question must be at least 5 characters long";
    } else {
      errors.question = "";
    }

    if (fields.answerA.trim().length < 1) {
      valid = false;
      errors.answerA = "Answer A cannot be empty";
    } else {
      errors.answerA = "";
    }

    if (fields.answerB.trim().length < 1) {
      valid = false;
      errors.answerB = "Answer B cannot be empty";
    } else {
      errors.answerB = "";
    }

    if (valid) {
      errors = { question: "", answerA: "", answerB: "" };
      let poll = { ...fields, voteA: 0, voteB: 0, id: Math.random() } as Poll;
      createHandler(poll);
    }
  };
</script>

<form on:submit|preventDefault={submitHandler}>
  <InputWrapper title="Question" error={errors.question}>
    <input
      type="text"
      id="question"
      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      required
      bind:value={fields.question}
    />
  </InputWrapper>
  <InputWrapper title="Answer A" error={errors.answerA}>
    <input
      type="text"
      id="answer A"
      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      required
      bind:value={fields.answerA}
    />
  </InputWrapper>
  <InputWrapper title="Answer B" error={errors.answerB}>
    <input
      type="text"
      id="answer B"
      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      required
      bind:value={fields.answerB}
    />
  </InputWrapper>

  <Button>Add Poll</Button>
</form>

<style>
  form {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }
</style>
