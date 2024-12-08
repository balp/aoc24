import { runSolution } from '../utils.ts';


// Output: [ { x: 2.5, y: 4.33 }, { x: 2.5, y: -4.33 } ]
export async function day8a(data: string[]) {
  function display_maze(maze) {
    for (const line of maze) {
      console.log(line.join(''));
    }
  }

  data.pop()
  const input = data.map((l) => l.split(''))
  // console.log(input);
  const antennas = {};
  const size_x = input.length;
  const size_y = input[0].length;

  for (let x = 0; x < size_x; x++) {
    for (let y = 0; y < size_y; y++) {
      const frequency = input[x][y];
      if (frequency == '.') continue;
      // console.log(x, y, frequency);
      if (!antennas[frequency]) {
        antennas[frequency] = [];
      }
      antennas[frequency].push([x,y]);
    }
  }
  console.log(antennas);

  function distance(from: number[], to: number[]) {
    const dx =from[0] - to[0];
    const dy =from[1] - to[1];
    return Math.sqrt(dx * dx + dy * dy);
  }
function findPointOnLine(x1: number, y1: number, x2: number, y2: number, distance: number): { x: number, y: number } {
  // Calculate the direction vector from A(x1, y1) to B(x2, y2)
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Calculate the magnitude (length) of the direction vector
  const magnitude = Math.sqrt(dx * dx + dy * dy);

  // Normalize the direction vector
  const unitVectorX = dx / magnitude;
  const unitVectorY = dy / magnitude;

  // Calculate the point at the given distance from (x1, y1)
  const x = Math.round(x1 + distance * unitVectorX);
  const y = Math.round(y1 + distance * unitVectorY);

  return { x, y };
}

  function plot(map: string[][], point: { x: number; y: number }) {
    if (point.x >= 0 && point.x < size_x && point.y >= 0 && point.y < size_y) {
      console.error("plot: " + point.x + " " + point.y);
      map[point.x][point.y] = "#"
    } else {
      console.error("Unknown point: " + point.x + " " + point.y);
    }
  }

  for (const frequency in antennas) {
    console.log(frequency);
    for (const first of antennas[frequency]) {
      for (const second of antennas[frequency]) {
        const between = distance(first, second);
        if (between == 0) continue;
        const p1 = findPointOnLine(first[0], first[1], second[0], second[1], -between);
        const p2 = findPointOnLine(second[0], second[1], first[0], first[1], -between);

        console.log(first, second, between, p1, p2);
        plot(input, p1);
        plot(input, p2);
      }
    }
  }
  display_maze(input);
  let accumulator = 0
  for (let x = 0; x < size_x; x++) {
    for (let y = 0; y < size_y; y++) {
      if (input[x][y] == '#') {
        accumulator++
      }
    }
  }

  return accumulator;
}

await runSolution(day8a);
