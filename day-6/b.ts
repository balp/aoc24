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
    return pos.x >= 0 && pos.y >= 0 && pos.x < size_x && pos.y < size_y;
  }

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

  function get_path(map: string[][]) {
    const path = []
    for (const x in map) {
      for (const y in map[x]) {
        if ("^>v<".includes(map[x][y])) {
          path.push([+x,+y]);
        }
      }
    }
    return path
  }

  function display_maze(pos, maze) {
    console.log(pos)
    for (const line of maze) {
      console.log(line.join(''));
    }
  }


  function solve_maze(pos,maze) {
    const steps = []
    while (in_maze(pos, maze)) {
      // display_maze(pos, maze);
      const marker = "^>v<"
      maze[pos.x][pos.y] = marker[pos.direction];
      const in_front_pos = get_ahead(pos)
      steps.push(pos)
      if (in_maze(in_front_pos, maze)) {
        if (maze[in_front_pos.x][in_front_pos.y] == "#") {
          pos.direction = (pos.direction + 1) % 4;
        } else if (maze[in_front_pos.x][in_front_pos.y] == "O") {
          pos.direction = (pos.direction + 1) % 4;
        } else if (maze[in_front_pos.x][in_front_pos.y] == marker[pos.direction]) {
          console.log("LOOOP")
          return true;

        } else if(steps.length > 60000) {
          console.log("To many steps: LOOP")
          //maze[pos.x][pos.y] = "X"
          //maze[in_front_pos.x][in_front_pos.y] = "Y"
          //display_maze(pos, maze)
          return true;
        } else {
          pos = in_front_pos
        }
      } else {
        pos = in_front_pos
      }
    }
    return false
  }

  const start_position = find_start(input);
  const start_maze= JSON.parse(JSON.stringify(input));
  solve_maze(start_position, start_maze);
  const path = get_path(start_maze)


  let result = 0
  for (const obstruction of path) {
    if (+obstruction[0] == start_position.x && obstruction[1] == start_position.y) {
      continue
    }
    // console.log(obstruction, start_position)
    const maze = JSON.parse(JSON.stringify(input));
    maze[obstruction[0]][obstruction[1]] = 'O'
    const new_start_position = JSON.parse(JSON.stringify(start_position));
    const loop = solve_maze(new_start_position, maze);
    console.log(obstruction)
    if (loop) {
      // display_maze(start_position, maze)
      result++
    }
  }
  return result;
}

await runSolution(day6a);
