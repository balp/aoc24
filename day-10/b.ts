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
    console.log("get_trails(%s)", head)

    const result: { x: number; y: number }[][] = []
    const queue: { x: number; y: number }[][] = [[head]]

    while (queue.length > 0) {
      // console.log("queue", queue)
      const next = queue.pop();
      // console.log("next", next)
      const steps = this.next_steps(next[next.length - 1]);
      // console.log("steps", steps)
      for (const step of steps) {
        //console.log("step", step)
        const new_candidate = JSON.parse(JSON.stringify(next));
        // console.log("new_candidate", new_candidate);
        new_candidate.push(step)
        // console.log("new_candidate", new_candidate);
        if (new_candidate.length == 10) {
          result.push(new_candidate)
        } else {
          queue.push(new_candidate)
        }
      }
    }
    //console.log("result", result)
    return result;
  }

  private in_map(pos: { x: number; y: number }) {
    return (pos.x >= 0 && pos.y >= 0 && pos.x < this._data.length && pos.y <= this._data[0].length);
  }

  plot_trail(trail: { x: number; y: number }[]) {
    const map = []
    for (let x = 0; x < this._data.length; x++) {
      map.push(new Array(this._data[0].length).fill('.'));
    }
    console.log(trail)
    for (const pos of trail) {
      map[pos.x][pos.y] = this.height_at(pos).toString();
    }
    for (const line of map) {
      console.log(line.join(''))
    }

  }
}

/** provide your solution as the return of this function */
export

async function

day10a(data: string[]) {
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
  console.log(trail_heads, peaks);

  let accumulator = 0
  for (const head of trail_heads) {
    const trails = map.get_trails(head)
    console.log("trails", trails.length);

    const positions = Array.from(new Set(trails.map((x) => JSON.stringify(x)))).map((x) => JSON.parse(x));

    //const score = positions.map((p) => map.height_at(p)).filter((x) => x == 9).length;
    //console.log(head, positions, score);
    accumulator += trails.length;
  }
  return accumulator;
}

await runSolution(day10a);
