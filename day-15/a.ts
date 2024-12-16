import {runSolution} from '../utils.ts';
import {re} from "mathjs";

interface Position {
  x: number;
  y: number;
}

class Map {
  private size_x: number;
  private size_y: number;
  private readonly map: string[][];
  robot: Position;
  barrels: Position[];

  constructor() {
    this.size_x = 0;
    this.size_y = 0;
    this.map = [];
    this.barrels = [];
  }

  add(line: string) {
    this.size_y = line.length;
    this.map.push(line.split(''))
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === 'O') {
        this.barrels.push({x: this.size_x, y: i})
        this.map[this.size_x][i] = '.';
      }
      ;
      if (c === '@') {
        this.robot = {x: this.size_x, y: i}
        this.map[this.size_x][i] = '.';
      }
      ;

    }
    this.size_x = this.map.length
  }

  draw_map() {
    for (let i = 0; i < this.size_x; i++) {
      const line = JSON.parse(JSON.stringify(this.map[i]));
      for (const barrel of this.barrels) {
        if (barrel.x === i) line[barrel.y] = 'O';
      }
      if (this.robot.x === i) line[this.robot.y] = '@';
      console.log(line.join(''));
    }
  }

  get_direction_of_pos(pos: Position, move: string) {
    const next = this.next_pos(pos, move);
    return this.get_pos(next);
  }

  private next_pos(pos: Position, move: string) {
    let next: Position = undefined;
    if (move === '<') {
      next = {x: pos.x, y: pos.y - 1};
    }
    if (move === '^') {
      next = {x: pos.x - 1, y: pos.y};
    }
    if (move === '>') {
      next = {x: pos.x, y: pos.y + 1};
    }
    if (move === 'v') {
      next = {x: pos.x + 1, y: pos.y};
    }
    return next;
  }

  private get_pos(pos: Position) {
    // console.log("get_pos(%s)", pos);
    if (this.robot.x === pos.x && this.robot.y === pos.y) return '@';
    for (const barrel of this.barrels) {
      if (barrel.x === pos.x && barrel.y === pos.y) return 'O';
    }
    return this.map[pos.x][pos.y]
  }

  can_move(pos: Position, move: string): boolean {
    const next = this.get_direction_of_pos(pos, move)
    if (next === '.') return true;
    if (next === '#') return false;
    return this.can_move(this.next_pos(pos, move), move)
  }

  do_move(pos: Position, move: string) {
    const map_char = this.get_pos(pos);
    // console.log("do_move(%s, %s): %s", pos, move, map_char);
    const nextPos = this.next_pos(pos, move);

    if (map_char === '#') return;
    if (map_char === '.') return;
    if (!this.in_map(pos)) return;
    this.do_move(nextPos, move)
    if (this.robot.x === pos.x && this.robot.y === pos.y) {
      const next_pos = nextPos;

      this.robot.x = next_pos.x;
      this.robot.y = next_pos.y;
      console.log("Robot moved to %s (%s %s)", this.robot, move);
    }
    for (const barrel of this.barrels) {
      if (barrel.x === pos.x && barrel.y === pos.y) {
        const next_pos = nextPos;
        barrel.x = next_pos.x;
        barrel.y = next_pos.y;
        console.log("Barrel moved to %s (%s %s)", barrel, move);

      }
    }
  }

  move(move: string) {
    if (this.can_move(this.robot, move)) {
      this.do_move(this.robot, move)
    } else {
      console.log("Can't move: %s %s", this.robot, move)
    }
  }

  private in_map(pos: Position) {
    return (pos.x >= 0 && pos.x < this.size_x && pos.y >= 0 && pos.y < this.size_y);
  }
}

/** provide your solution as the return of this function */
export async function day15a(data: string[]) {
  data.pop()
  //console.log(data);
  let map_done = false;
  const map = new Map()

  function do_moves(map: Map, moves: string) {
    // console.log("do_moves(%s, %s)", map, moves);
    for (const move of moves) {
      // const closest = map.get_direction_of_pos(map.robot, move)
      // const ok = map.can_move(map.robot, move)
      // console.log("move: %s", move, closest, ok);
      map.move(move)
      // map.draw_map()
    }
  }

  for (const line of data) {
    if (line.length === 0) {
      map.draw_map();
      map_done = true;
      continue;
    }
    ;
    if (map_done) do_moves(map, line)
    else map.add(line);
  }

  let score = 0;
  for (const barrel of map.barrels) {
    // console.log(barrel);
    score += 100 * barrel.x + barrel.y;
  }
  return score;
}

await runSolution(day15a);
