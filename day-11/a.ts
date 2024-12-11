import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day11a(data: string[]) {
  data.pop()
  //console.log(data);
  const input = data[0].split(' ')
  console.log(input);

  function do_step(input: string[]) {
    for (let i = 0; i < input.length; i++) {
      if (input[i] == '0') {
        input[i] = '1'
      } else if (input[i].length % 2 == 0) {
        const part1 = input[i].substring(0, input[i].length/2);
        const part2 = (+(input[i].substring(input[i].length/2))).toString();
        // input.splice(i, 0, second);
        input[i] = part2
        input.splice(i, 0, part1)
        i++
      } else {
        const val = +(input[i])
        input[i] = (2024 * val).toString()
        // console.log("input[%d] = (2024 * %d)", i, val)
      }
    }
  }

  for (let i = 0; i < 25; i++) {
    do_step(input);
    console.log(input);
  }
  return input.length;
}

await runSolution(day11a);
