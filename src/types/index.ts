export interface Item {}

export interface FormFields {
  question: string;
  answerA: string;
  answerB: string;
}

export interface Poll extends FormFields {
  voteA: 0;
  voteB: 0;
  id: number;
}
