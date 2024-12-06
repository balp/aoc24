import { runSolution, string_to_number_array } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day2b(data: string[]) {
  const input = string_to_number_array(data);
  // console.log(input);
  const is_safe_line = (x) => {
    let safe = true;
    const first = Math.sign(x[0] - x[1]);
    if (first == 0) {
      safe = false;
    }
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
  const is_safe = (line) => {
    if (is_safe_line(line)) {
      return true;
    }
    for (let i = 0; i < line.length; i++) {
      const line2 = line.toSpliced(i,1);
      // console.log("splice: ", i, line, line2);
      //console.log("is_safe line2:", line2, is_safe_line(line2));
      if (is_safe_line(line2)) {
        return true;
      }
    }

    //console.log("unsafe: ", line);
    return false;
  }
  const safe_lines = input.filter(is_safe);
  // console.log(safe_lines);
  return safe_lines.length;
}

await runSolution(day2b);
