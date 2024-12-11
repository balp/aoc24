import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day11b(data: string[]) {
  data.pop()
  //console.log(data);
  const input = data[0].split(' ')
  console.log(input);

  function blink_stone(str: string) {
    if (str == '0') return ['1']
    if (str.length % 2 == 0) {
      const part1 = str.substring(0, str.length/2);
      const part2 = (+(str.substring(str.length/2))).toString();
      return [part1, part2]
    }
    return [(2024 * (+(str))).toString()]
  }

  const cache = ({})
  function step_number(start: string, iterations: number): number {
    const key = JSON.stringify({start, iterations});
    if (key in cache) {
      return cache[key];
    }
    if (iterations == 0) {
      cache[key] = 1;
      return 1
    }
    const blink = blink_stone(start)
    if (blink.length == 2) {
      const value = step_number(blink[0], iterations-1) + (step_number(blink[1], iterations-1));
      cache[key] = value;
      return value;
    } else {
      const value = step_number(blink[0], iterations-1);
      cache[key] = value;
      return value
    }
  }

  let accumulator = 0
  for (let i = 0; i < input.length; i++) {
    const into = step_number(input[i], 75)
    accumulator += into
  }

  return accumulator;
}

await runSolution(day11b);
