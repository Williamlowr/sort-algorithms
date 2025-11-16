import type { AlgoGenerator } from "../types";
import { bubble } from "./bubble";
import { insertion } from "./insertion";
import { selection } from "./selection";
import { merge } from "./merge";
import { quick } from "./quick";
import { heap } from "./heap";

export const ALGORITHMS: Record<string, AlgoGenerator> = {
  bubble,
  insertion,
  selection,
  merge,
  quick,
  heap,
};
