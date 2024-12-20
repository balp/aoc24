import { runSolution } from '../utils.ts';

function solve(design: string, patterns: string[]): boolean {
    const n = design.length;
    const dp: boolean[] = Array(n + 1).fill(false);
    dp[0] = true; // Empty string can always be formed

    for (let i = 1; i <= n; i++) {
        for (const pattern of patterns) {
            const len = pattern.length;
            if (i >= len && design.slice(i - len, i) === pattern) {
                dp[i] = dp[i] || dp[i - len];
            }
        }
    }

    return dp[n];

}

/** provide your solution as the return of this function */
export async function day19a(data: string[]) {
  data.pop();
  const patterns = data.shift().split(',').map(x => x.trim());
  data.shift()
  console.log(patterns);
  console.log(data);
  let acc = 0;
  for (const design of data) {
    if (solve(design, patterns)) {
      acc = acc + 1;
    }
  }
  return acc;
}

await runSolution(day19a);
