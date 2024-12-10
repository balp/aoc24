import {runSolution} from '../utils.ts';

class Map {
  _data: number[][]

  constructor(input: string[]) {
    this._data = []
    for (let x = 0; x < input.length; x++) {
      this._data.push([])
      for (let y = 0; y < input[0].length; y++) {
        this._data[x].push(+(input[x][y]));
      }
    }
  }

  height_at(pos: { x: number; y: number }): number {
    return (this._data[pos.x][pos.y]);
  }

  next_steps(pos: { x: number; y: number }): { x: number; y: number }[] {
    // console.log("next_steps", pos);
    const result: { x: number; y: number }[] = []
    const north = {x: pos.x - 1, y: pos.y};
    const south = {x: pos.x + 1, y: pos.y};
    const west = {x: pos.x, y: pos.y - 1};
    const east = {x: pos.x, y: pos.y + 1};
    const current_height = this.height_at(pos);

    if (this.in_map(north) && current_height == this.height_at(north) - 1) {
      result.push(north)
    }
    if (this.in_map(south) && current_height == this.height_at(south) - 1) {
      result.push(south)
    }
    if (this.in_map(west) && current_height == this.height_at(west) - 1) {
      result.push(west)
    }
    if (this.in_map(east) && current_height == this.height_at(east) - 1) {
      result.push(east)
    }
    return result;
  }

  get_trails(head: { x: number; y: number }) {
    // console.log("get_trails(%s)", head)
    let result: { x: number; y: number }[] = []
    let queue: { x: number; y: number }[] = [head]
    while (queue.length > 0) {
      // console.log("queue", queue)
      const next = queue.pop();
      const steps = this.next_steps(next);
      // console.log("got", next, steps);
      result = result.concat(steps);
      queue = queue.concat(steps);

    }
    return result;
  }

  private in_map(pos: { x: number; y: number }) {
    return (pos.x >= 0 && pos.y >= 0 && pos.x < this._data.length && pos.y <= this._data[0].length);
  }
}

/** provide your solution as the return of this function */
export

async function

day10b(data: string[]) {
  data.pop()
  console.log(data);
  const map = new Map(data);

  const trail_heads: { x: number; y: number }[] = [];
  const peaks: { x: number; y: number }[] = [];
  for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[0].length; y++) {
      // console.log(height_at(x, y));
      if (map.height_at({x, y}) == 0) {
        trail_heads.push({x, y});
      }
      if (map.height_at({x, y}) == 9) {
        peaks.push({x, y});
      }
    }
  }
  // console.log(trail_heads, peaks);

  let accumulator = 0
  for (const head of trail_heads) {
    const trails = map.get_trails(head)
    const positions = Array.from(new Set(trails.map((x) => JSON.stringify(x)))).map((x) => JSON.parse(x));

    const score = positions.map((p) => map.height_at(p)).filter((x) => x == 9).length;
    console.log(head, positions, score);
    accumulator += score;
  }
  return accumulator;
}

await  runSolution(day10b);
