export type SopmodamAnswerFormState =
  | { type: 'create'; content: string }
  | { type: 'update'; answerId: number; originalContent: string; content: string };
