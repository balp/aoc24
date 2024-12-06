import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3a(data: string[]) {
  console.log(data);
  const regexp = /mul\((\d+),(\d+)\)/g;
  const array = data[0].matchAll(regexp);
  console.log(array);
  let accumulator = 0;
  for (const match of array) {
    console.log(match);
    accumulator += (+match[1]) * (+match[2]);
  }
  return accumulator;
}

await runSolution(day3a);
