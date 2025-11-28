// Clamp n between low and high
export const clamp = (n: number, low: number, high: number) =>
  Math.max(low, Math.min(high, n));
// Sleep for ms milliseconds between operations
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function makeArray(n: number): number[] {
  // Create an array of size n with values 5 to n+4 in random order
  const a = Array.from({ length: n }, (_, i) => i + 5);
  // Shuffle using Fisher-Yates algorithm
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
