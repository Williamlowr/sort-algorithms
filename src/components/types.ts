// Define types for sorting algorithms and their steps
export type Algorithms =
  | "insertion"
  | "bubble"
  | "selection"
  | "merge"
  | "quick"
  | "heap";

// Define the different types of steps that can occur during sorting
export type Step =
  | { type: "compare"; i: number; j: number }
  | { type: "swap"; i: number; j: number }
  | { type: "write"; i: number; value: number }
  | { type: "pivot"; i: number }
  | { type: "done" };

export type AlgoGenerator = (arr: number[]) => Generator<Step, number[], void>;
