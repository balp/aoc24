import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
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
  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[0].length; y++) {
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
    //return Math.max(Math.abs(from[0] - to[0]), Math.abs(from[1] - to[1]))
  }

  for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[0].length; y++) {
      // console.log(x, y, antennas);
      for (const frequency in antennas) {
        console.log(x, y, frequency);
        for (const first of antennas[frequency]) {
          for (const second of antennas[frequency]) {
            const first_distance = distance([x,y], first)
            const second_distance = distance([x,y], second)
            // console.log(x, y, first, second, first_distance, second_distance);
            if ((first_distance == second_distance*2)
              ||(first_distance*2 == second_distance)) {
              console.log(x, y, first_distance, second_distance);
              input[x][y] = '#'
            }
          }
        }
      }
    }
  }
  display_maze(input);


  return 0;
}

await runSolution(day8a);
