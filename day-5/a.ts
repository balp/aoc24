import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day5b(data: string[]) {
  function is_rule(line: string) {
    return line.includes('|');
  }

  function is_update(line: string) {
    return line.includes(',');
  }
  const rules = [];

  function is_valid_update(update, rules) {
      console.log("is_valid_update(%s)", update)
      for (const j in update) {
        const number = update[j];
        const before = update.slice(0, j);
        const after = update.slice(j+1);

        // console.log(":: %s, %s, %s, %s", before, number, after, rules);
        for (const rule of rules) {
          // console.log("is it %s, %s", number, rule);
          if(rule[0] == number) {
            // console.log("check %s, %s", number, rule[1], before.includes(rule[1]));
            if (before.includes(rule[1])) {
              return false;
            }
          }
        }
      }
    return true;
  }

  //console.log(data);
  let accumulator = 0;
  for (const line of data) {
    console.log(line);
    if (is_rule(line)) {
      rules.push(line.split('|'));
    } else if (is_update(line)) {
      const update = line.split(',');
      console.log("Update", update);
      if (is_valid_update(update, rules)) {
        console.log("Valid update: ", update);
        accumulator = accumulator + (+update[Math.floor(update.length / 2)]);
      }
    }
  }
  return accumulator;
}

await runSolution(day5b);
