import {runSolution} from '../utils.ts';

function no_combinations(s: string, substrings: string[]): number {
  const memo: Map<number, number> = new Map();

  function backtrack(start: number): number {
    // If we've reached the end, count this as one valid combination
    if (start === s.length) {
      return 1;
    }

    // If result for this position is already computed, return it
    if (memo.has(start)) {
      return memo.get(start)!;
    }

    let count = 0;

    // Try all substrings starting at the current position
    for (const substring of substrings) {
      const len = substring.length;
      if (s.slice(start, start + len) === substring) {
        count += backtrack(start + len); // Add the number of valid combinations from this position
      }
    }

    // Store the result in the memoization map
    memo.set(start, count);
    return count;
  }
  return backtrack(0);
}

/** provide your solution as the return of this function */
export async function day19b(data: string[]) {
  data.pop();
  const patterns = data.shift().split(',').map(x => x.trim());
  data.shift()
  console.log(patterns);
  console.log(data);
  let acc = 0;
  for (const design of data) {
    const combinations = no_combinations(design, patterns);
    console.log("%d = %d + %d", acc + combinations, acc, combinations);
    acc = acc + combinations;
  }
  return acc;
}

await runSolution(day19b);
