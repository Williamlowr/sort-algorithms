import type { Step, AlgoGenerator } from "../types";

export const heap: AlgoGenerator = function* (arr) {
  const array = arr.slice();
  const n = array.length;

  // helper to maintain heap property
  function* heapify(i: number, end: number): Generator<Step, void, void> {
    // sift down element at index i to the proper place such that all elements below are in heap order
    while (true) {
      let largest = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;

      // Compare with left child
      if (left <= end) {
        yield { type: "compare", i: left, j: largest } as Step;
        // If left child is larger, update largest
        if (array[left] > array[largest]) {
          largest = left;
        }
      }

      // Compare with right child
      if (right <= end) {
        yield { type: "compare", i: right, j: largest } as Step;
        // If right child is larger, update largest
        if (array[right] > array[largest]) {
          largest = right;
        }
      }

      // If the largest is still the initial element, done
      if (largest === i) return;
      // Otherwise, swap
      [array[i], array[largest]] = [array[largest], array[i]];
      // Yield and swap; visualize swaps
      yield { type: "swap", i, j: largest } as Step;
      // Continue sifting down the child
      i = largest;
    }
  }

  // build heap, rearranging array into heap order
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(i, n - 1);
  }

  // extract elements from heap, reduce heap each time
  for (let end = n - 1; end > 0; end--) {
    // Move current root (largest number) to end
    [array[0], array[end]] = [array[end], array[0]];
    // Yield and swap; visualize swaps
    yield { type: "swap", i: 0, j: end } as Step;
    // call heapify on the new reduced heap
    yield* heapify(0, end - 1);
  }
  // Yield the final sorted array
  yield { type: "done" };
  return array;
};
