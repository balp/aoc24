import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day7b(data: string[]) {
  // console.log(data);
  data.pop()

  function solvable(parts: number[], target: number) {
    for (let i = 0; i < 3 ** (parts.length - 1); i++) {
      const pattern = i.toString(3).padStart(parts.length - 1,'0');
      // console.log(i, pattern);
      let value = parts[0]
      for (let j = 0; j < parts.length - 1; j++) {
        const mjupp = pattern[j]
        // console.log(mjupp, target, value);
        switch (mjupp) {
          case '0':
            value += parts[j+1];
            break;
          case '1':
            value *= parts[j+1];
            break
          case '2': {
            const t = value.toString() + parts[j+1].toString();
            // console.log(t)
            value = +t
            break;
          }
        }
      }
      // console.log(target, value)
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

await runSolution(day7b);
