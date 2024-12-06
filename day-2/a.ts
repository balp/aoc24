import { runSolution } from '../utils.ts';

function string_to_number_array(data: string[]) {
  data.pop()
  const input_strings = data.map((x) => x.split(/ +/))
  const input = input_strings.map((x) => x.map((y) => +y))
  return input;
}

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
  const input = string_to_number_array(data);
  console.log(input);
  const is_safe = (x) => {
    let safe = true;
    const first = Math.sign(x[0] - x[1]);
    for (let i = 0 ; i < x.length-1; i++) {
      if (Math.abs(x[i] - x[i+1]) > 3) {
        safe = false;
      }
      if (Math.sign(x[i] - x[i+1]) != first) {
        safe = false;
      }
    }
    return safe;
  };
  const safe_lines = input.filter(is_safe);
  console.log(safe_lines);
  return safe_lines.length;
}

await runSolution(day2a);
