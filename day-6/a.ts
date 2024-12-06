import {runSolution} from '../utils.ts';

interface Position {
  x: number;
  y: number;
  direction: number;
}

/** provide your solution as the return of this function */
export async function day6a(data: string[]) {
  data.pop()
  const input = data.map((l) => l.split(''))
  console.log(input);

  function find_start(data: string[][]): Position {
    for (let x = 0; x < data.length; x++) {
      for (let y = 0; y < data[x].length; y++) {
        if (data[x][y] == "^") {
          return {x: x, y: y, direction: 0}
        }
      }
    }
    return {x: -1, y: -1, direction: 0};
  }

  function in_maze(pos: Position, data: string[][]) {
    const size_x = data.length;
    const size_y = data[0].length;
    console.log("In maze:", pos.x, pos.y, size_x, size_y);
    return pos.x >= 0 && pos.y >= 0 && pos.x < size_x && pos.y < size_y;
  }

  let pos = find_start(input);

  function get_ahead(position: Position): Position {
    if (position.direction == 0) {
      return {x: position.x - 1, y: position.y, direction: position.direction};
    }
    if (position.direction == 1) {
      return {x: position.x, y: position.y + 1, direction: position.direction};
    }
    if (position.direction == 2) {
      return {x: position.x + 1, y: position.y, direction: position.direction};
    }
    if (position.direction == 3) {
      return {x: position.x, y: position.y - 1, direction: position.direction};
    }
  }

  while (in_maze(pos, input)) {
    console.log(pos)
    for (const line of input) {
      console.log(line.join(''));
    }
    input[pos.x][pos.y] = 'x';
    const in_front_pos = get_ahead(pos)
    if (in_maze(in_front_pos, input)) {
      if (input[in_front_pos.x][in_front_pos.y] == "#") {
        pos.direction = (pos.direction + 1) % 4;
      } else {
        pos = in_front_pos
      }
    } else {
      pos = in_front_pos
    }
  }
  let result = 0
  for (const line of input) {
    const x_s = (line.join('').match(/x/g)||[]).length;
    console.log(line.join(''), x_s, result);
    result += x_s
  }
  return result;
}

await runSolution(day6a);
