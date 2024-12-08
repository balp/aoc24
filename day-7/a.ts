import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day7a(data: string[]) {
  // console.log(data);
  data.pop()

  function solvable(parts: number[], target: number) {
    for (let i = 0; i < 2 ** (parts.length - 1); i++) {
      console.log(i, i.toString(2));
      let value = parts[0]
      for (let j = 0; j < parts.length - 1; j++) {
        const mask = 1 << (j)
        // console.log(i, i.toString(2), j, j.toString(2), target, value);

        if (i & mask) {
          // console.log("+");
          value += parts[j + 1]
        } else {
          // console.log("*");
          value *= parts[j + 1]
        }
      }
      console.log(target, value)
      if (target == value) return true;
    }
    return false;
  }
  let accumulator = 0;
  for (const line of data) {
    console.log(line);
    const a = line.split(":");
    const target = +(a[0])
    const parts = a[1].trim().split(" ").map(Number);
    console.log(target, parts);
    if (solvable(parts, target))
      accumulator += target;
  }
  return accumulator;
}

await runSolution(day7a);
