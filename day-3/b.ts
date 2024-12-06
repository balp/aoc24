import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3b(data: string[]) {
  console.log(data);
  const regexp = /(mul\((\d+),(\d+)\)|do\(\)|don't\(\))/g;
  const array = data[0].matchAll(regexp);
  console.log(array);
  let accumulator = 0;
  let multipy = true;

  for (const match of array) {
    console.log(match);
    if(match[0] === "don't()") {
      multipy = false;
    }
    else if(match[1] === "do()") {
      multipy = true;
    }
    else {
      if (multipy) {
        accumulator += (+match[2]) * (+match[3]);
      }
    }

  }
  return accumulator;
}

await runSolution(day3b);
