import {runSolution} from '../utils.ts';

interface Robot {
  position: {x: number, y: number}
  velocity: {x: number, y: number}
}

/** provide your solution as the return of this function */
export async function day14a(data: string[]) {
  data.pop()
  console.log(data);
  // const size_x = 11
  const size_x = 101
  // const size_y = 7
  const size_y = 103
  const steps = 100
  const robots = []
  for (const line of data) {
    const [, p_x, p_y, v_x, v_y] = line.match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/)
    //console.log(p_x, p_y, v_x, v_y)
    robots.push({position: {x: +p_x, y: +p_y}, velocity: {x: +v_x, y: +v_y}})
  }
  console.log(robots)
console.log("-------")
  function plot_map(size_x: number, size_y: number, robots: Robot[]) {
    for (let y = 0; y < size_y; y++) {
      let line = ""
      for (let x = 0; x < size_x; x++) {
        const at = robots.filter((robot) => robot.position.x === x && robot.position.y === y).length
        line += at === 0 ? "." : at.toString()
      }
      console.log(y, line)
    }
  }

  console.log("Step: %d", 0)
  plot_map(size_x, size_y, robots)
  for (let i = 0; i < steps; i++) {
    // console.log("Step: %d", i)
    //plot_map(size_x, size_y, robots)
    for (const robot of robots) {
      const new_x = robot.position.x + robot.velocity.x;
      if (new_x < 0) {
        robot.position.x = ((new_x % size_x) + size_x) % size_x
      } else {
        robot.position.x = new_x % size_x
      }
      const new_y = robot.position.y + robot.velocity.y;
      if (new_y < 0) {
        robot.position.y = ((new_y % size_y) + size_y) % size_y
      } else {
        robot.position.y = new_y % size_y
      }
    }
  }
  console.log("Step: %d", steps)
  plot_map(size_x, size_y, robots)
  console.log("-------", Math.floor(size_x/2),Math.ceil(size_x/2), size_y/2, robots.length)
  const q1 = robots.filter((robot) => robot.position.x < Math.floor(size_x/2) && robot.position.y < Math.floor(size_y/2)).length
  const q2 = robots.filter((robot) => robot.position.x >= Math.ceil(size_x/2) && robot.position.y < Math.floor(size_y/2)).length
  const q3 = robots.filter((robot) => robot.position.x < Math.floor(size_x/2) && robot.position.y >= Math.ceil(size_y/2)).length
  const q4 = robots.filter((robot) => robot.position.x >= Math.ceil(size_x/2) && robot.position.y >= Math.ceil(size_y/2)).length
  console.log(q1, q2, q3, q4)
  return q1 * q2 * q3 * q4
}

await runSolution(day14a);
