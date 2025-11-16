import type { Step, AlgoGenerator } from "../types";

export const merge: AlgoGenerator = function* (
  arr
): Generator<Step, number[], void> {
  const array = arr.slice();

  // Recursive merge sort function
  function* mergeSort(low: number, high: number): Generator<Step, void, void> {
    // Base case: single element
    if (high - low <= 1) return;

    // Split array and merge sort each half recursively
    const mid = Math.floor((low + high) / 2);
    yield* mergeSort(low, mid);
    yield* mergeSort(mid, high);

    // Merge the sorted halves
    const left = array.slice(low, mid);
    const right = array.slice(mid, high);
    let i = 0;
    let j = 0;
    let k = low;

    // Merge while there are elements in both left and right
    while (i < left.length && j < right.length) {
      const li = low + i;
      const rj = mid + j;
      // Compare elements from left and right
      yield { type: "compare", i: li, j: rj } as Step;

      // Write the smaller element back to the main array
      if (left[i] <= right[j]) {
        array[k] = left[i++];
      } else {
        array[k] = right[j++];
      }

      // Yield and write; visualize writes
      yield { type: "write", i: k, value: array[k] } as Step;
      // Move to the next position in the main array
      k++;
    }

    // Copy any remaining elements from left
    while (i < left.length) {
      array[k] = left[i++];
      yield { type: "write", i: k, value: array[k] } as Step;
      k++;
    }
    // Copy any remaining elements from right
    while (j < right.length) {
      array[k] = right[j++];
      yield { type: "write", i: k, value: array[k] } as Step;
      k++;
    }
  }
  // Start the merge sort
  yield* mergeSort(0, array.length);
  // Yield the final sorted array
  yield { type: "done", array } as Step;
  return array;
};
