import type { Step, AlgoGenerator } from "../types";

export const insertion: AlgoGenerator = function* (arr) {
  const array = arr.slice();
  // For each element in the array (starting from second)
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0) {
      // Compare with the element before it
      yield { type: "compare", i: j, j: i } satisfies Step;
      // If out of order,
      if (array[j] > key) {
        // Shift element to the right
        array[j + 1] = array[j];
        // Yield and write; visualize writes
        yield { type: "write", i: j + 1, value: array[j + 1] } as Step;
        j--;
      } else {
        break;
      }
    }
    // Place key in its correct location
    if (array[j + 1] !== key) {
      // Only write if it's actually changing
      array[j + 1] = key;
      yield { type: "write", i: j + 1, value: key } as Step;
    }
  }
  // Yield the final sorted array
  yield { type: "done" };
  return array;
};
