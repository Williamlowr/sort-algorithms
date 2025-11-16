import type { Step, AlgoGenerator } from "../types";

export const quick: AlgoGenerator = function* (
  arr: number[]
): Generator<Step, number[], void> {
  const array = arr.slice();

  // Recursive quick sort function
  function* quickSort(low: number, high: number): Generator<Step, void, void> {
    // Base case: single element
    if (low >= high) return;

    // Choose pivot and partition array
    let pivotIndex = Math.floor((low + high) / 2);
    const pivot = array[pivotIndex];
    yield { type: "pivot", i: pivotIndex } as Step;

    let i = low;
    let j = high;

    // Partitioning process
    while (i <= j) {
      // Move indices towards center
      while (array[i] < pivot) {
        yield { type: "compare", i, j: pivotIndex } as Step;
        i++;
      }
      while (array[j] > pivot) {
        yield { type: "compare", i: pivotIndex, j } as Step;
        j--;
      }

      // Swap elements
      if (i <= j) {
        if (i !== j) {
          // Yield and swap; visualize swaps
          [array[i], array[j]] = [array[j], array[i]];
          // if pivot moved, update index
          if (pivotIndex === i) pivotIndex = j;
          else if (pivotIndex === j) pivotIndex = i;

          yield { type: "swap", i, j } as Step;
        }
        i++;
        j--;
      }
    }

    if (low < j) yield* quickSort(low, j);
    if (i < high) yield* quickSort(i, high);
  }

  yield* quickSort(0, array.length - 1);
  yield { type: "done" } as Step;
  return array;
};
