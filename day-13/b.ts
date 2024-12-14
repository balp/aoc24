import {runSolution} from '../utils.ts';
import {matrix, lusolve, usolve, lsolve} from 'mathjs';

function isCloseToInteger(num: number) {
  return Math.abs(num - Math.round(num)) < 0.001
}

/** provide your solution as the return of this function */
export async function day13b(data: string[]) {
  console.log(data);
  const button_a = {x:0, y:0}
  const button_b = {x:0, y:0}
  const prize = {x:0, y:0}
  let acc = 0
  for (const line of data) {
    if (line.match(/Button A:/)) {
      const [, x, y] = line.match(/Button A: X\+(\d+), Y\+(\d+)/)
      console.log(line, "->", x,y);
      button_a.x = +x
      button_a.y = +y
    }
    if (line.match(/Button B:/)) {
      const [, x, y] = line.match(/Button B: X\+(\d+), Y\+(\d+)/)
      console.log(line, "->", x,y);
      button_b.x = +x
      button_b.y = +y
    }
    if (line.match(/Prize:/)) {
      const [, x, y] = line.match(/Prize: X=(\d+), Y=(\d+)/)
      console.log(line, "->", x,y);
      prize.x = (+x)+10000000000000
      prize.y = (+y)+10000000000000
    }
    if (line.length == 0) {
      console.log(button_a, button_b, prize);
      // a_x * A + b_x * B = p_x
      // a_y * A + b_y * B = p_y
      console.log(" A*%d + B*%d = %d", button_a.x, button_a.y, prize.x);
      console.log(" A*%d + B*%d = %d", button_b.x, button_b.y, prize.y);

      console.log(" |%d, %d||A| = |%d|", button_a.x, button_a.y, prize.x);
      console.log(" |%d, %d||A| = |%d|", button_b.x, button_b.y, prize.y);

      const co_a = matrix([[button_a.x, button_b.x], [button_a.y, button_b.y]])

      const constants = matrix([prize.x, prize.y])
      const solution = lusolve(co_a, constants).toArray().flat(1);
      console.log("lu", co_a.toString(), constants.toString(), solution, solution.every(isCloseToInteger));
      if (solution.every(isCloseToInteger)) {

        acc += (solution[0] * 3 + solution[1]* 1)
      }
    }
  }

  return acc;
}

await runSolution(day13b);
