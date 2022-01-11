import type { Poll } from "src/types";
import { writable } from "svelte/store";

const usePolls = () => {
  const { subscribe, update } = writable<Poll[]>([
    {
      question: "Python or JavaScript",
      answerA: "python",
      answerB: "javascript",
      voteA: 0,
      voteB: 0,
      id: 10,
    },
  ]);

  return {
    subscribe,
    createPoll: (newpoll) => {
      update((poll) => [...poll, newpoll]);
    },
    incrementPoll: (event: CustomEvent<{ option: string; id: number }>) => {
      const { option, id } = event.detail;
      update((polls) =>
        polls.map((poll) => {
          if (poll.id === id) {
            if (option === "a") {
              poll.voteA += 1;
            } else if (option === "b") {
              poll.voteB += 1;
            }
          }
          return poll;
        })
      );
    },
    deletePoll: (id: number) => {
      update((polls) => polls.filter((poll) => poll.id !== id));
    },
  };
};

export const polls = usePolls();
