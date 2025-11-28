import type { Step, AlgoGenerator } from "../types";

export const insertion: AlgoGenerator = function* (arr) {
  const array = arr.slice();
  // For each element in the array (starting from second)
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0) {
      // Compare with the element before it
      yield { type: "compare", i: j, j: j + 1 } satisfies Step;
      // If out of order,
      if (array[j] > key) {
        // Swap elements (shift element to the right)
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        // Yield and swap; visualize swaps
        yield { type: "swap", i: j, j: j + 1 } as Step;
        j--;
      } else {
        break;
      }
    }
  } 
  // Yield the final sorted array
  yield { type: "done" };
  return array;
};
