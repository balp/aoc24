import {runSolution} from '../utils.ts';

/** provide your solution as the return of this function */
export async function day5a(data: string[]) {
  function is_rule(line: string) {
    return line.includes('|');
  }

  function is_update(line: string) {
    return line.includes(',');
  }
  const rules = [];

  function is_valid_update(update) {
      for (const j in update) {
        const number = update[j];
        const before = update.slice(0, j);
        // const after = update.slice(j+1);

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

  function in_place(index: number, update: string[]) {
    const number = update[index];
    const before = update.slice(0, index);
    const after = update.slice(index+1);
    console.log("in_place:: %s, %s, %s, ..", before, number, after);
    for (const rule of rules) {
      if(rule[0] == number) {
        if (rule[1] == after[0]) {
          return false;
        }
      }
    }
    return true;
  }

  for (const line of data) {
    console.log(line);
    if (is_rule(line)) {
      rules.push(line.split('|'));
    } else if (is_update(line)) {
      const update = line.split(',');
      console.log("Update", update);
      if (is_valid_update(update)) {
        // console.log("Valid update: ", update);

      } else {
        for (let i = 0; i < update.length - 1; i++) {
          for (let j = 0; j < update.length - i - 1; j++) {
            if (in_place(j, update)) {
              console.log("swap: %d, %d", j, j+1);
              [update[j], update[j + 1]] = [update[j + 1], update[j]];
              console.log("Update to: ", update);
            }
          }
        }
        console.log(is_valid_update(update));
        accumulator = accumulator + (+update[Math.floor(update.length / 2)]);
      }
    }
  }
  return accumulator;
}

await runSolution(day5a);
