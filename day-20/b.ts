import {runSolution} from '../utils.ts';
import {compareNatural, gamma} from "mathjs";

interface Position {
  x: number;
  y: number;
}

interface Node {
  position: Position;
  distance: number
};

interface Cheat {
  start: Position;
  end: Position,
  gain: number
};

class RaceMap {
  private readonly size_x: number;
  private readonly size_y: number;
  private readonly map: boolean[][] = [];
  private readonly distance: number[][] = [];
  private readonly start: Position;
  private readonly end: Position;

  constructor(data: string[]) {
    this.size_x = data.length;
    this.size_y = data[0].length;
    for (let x = 0; x < this.size_x; x++) {
      this.map.push(new Array(this.size_y).fill(true));
      this.distance.push(new Array(this.size_y).fill(Infinity));
      for (let y = 0; y < this.size_y; y++) {
        if (data[x][y] === 'S') {
          this.start = {x, y};
          this.map[x][y] = false;
        } else if (data[x][y] === 'E') {
          this.end = {x, y};
          this.map[x][y] = false;
        } else if (data[x][y] === '.') {
          this.map[x][y] = false;
        } else if (data[x][y] === '#') {
          this.map[x][y] = true;
        }
      }
    }
  }

  draw() {
    console.log("Map:", this.size_x, this.size_y, this.start, this.end);
    for (let x = 0; x < this.size_x; x++) {
      let line = ""
      for (let y = 0; y < this.size_y; y++) {
        if (this.start.x === x && this.start.y === y) {
          line += '   S  '
        } else if (this.end.x === x && this.end.y === y) {
          line += '   E  '
        } else if (this.map[x][y]) {
          line += '######'
        } else if (this.distance[x][y] === Infinity) {
          line += ' .... '
        } else {
          line += ' ' + this.distance[x][y].toString(16).padStart(4, '0') + ' ';
        }
      }
      console.log(line);
    }
  }

  private isValid(pos: Position): boolean {
    return pos.x >= 0 && pos.x < this.size_x && pos.y >= 0 && pos.y < this.size_y && !this.map[pos.x][pos.y];
  }

  solve() {
    const queue: Node[] = [{position: this.start, distance: 0}];
    const visited: boolean[][] = Array.from({length: this.size_x}, () => Array(this.size_y).fill(false));
    const directions: Position[] = [{x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1},];
    this.distance[this.start.x][this.start.y] = 0;
    visited[this.start.x][this.start.y] = true
    while (queue.length > 0) {
      const {position, distance} = queue.shift()!;
      if (this.end.x === position.x && this.end.y === position.y) {
        // this.distance[position.x][position.y] = distance+1;
        break;
      }
      for (const dir of directions) {
        const candidate: Position = {x: position.x + dir.x, y: position.y + dir.y};
        const valid = this.isValid(candidate);
        const candidate_distance = this.distance[position.x][position.y];
        console.log(" -> ", candidate, valid, candidate_distance)
        if (valid && !visited[candidate.x][candidate.y]) {
          this.distance[candidate.x][candidate.y] = distance + 1;
          visited[candidate.x][candidate.y] = true
          queue.push({position: candidate, distance: distance + 1});
        }
      }
    }
  }

  cheats(): Cheat[] {
    const cheats: Cheat[] = []
    for (let x = 0; x < this.size_x; x++) {
      for (let y = 0; y < this.size_y; y++) {
        if (this.distance[x][y] < 2) {
          console.log("----------", x,y, " start ", this.distance[x][y]);
        }
        if (!this.isValid({x,y})) {continue;}
        // if (this.distance[x][y] === Infinity) {continue}
        for (let d_x = -20; d_x <= 20; d_x++) {
          for (let d_y = -20; d_y <= 20; d_y++) {
            const distance = Math.abs(d_x) + Math.abs(d_y);
            if (distance > 20) {
              continue;
            }
            const candidate: Position = {x: x + d_x, y: y + d_y};
            if (this.isValid(candidate)) {
              const gain = this.distance[candidate.x][candidate.y] - this.distance[x][y] - distance;
              // if (this.distance[x][y] < 2) {
              //   console.log(" -> ", candidate, distance, gain);
              // }
              if (gain >= 100) {
                // console.log(" -> ", x, y, candidate, gain);
                cheats.push({start: {x, y}, end: candidate, gain})
              }
            }
          }
        }

      }
    }
    return cheats
  }
}

/** provide your solution as the return of this function */
export async function day20b(data: string[]) {
  data.pop()
  console.log(data);
  const map = new RaceMap(data)
  // map.draw()
  map.solve()
  console.log('')
  map.draw()
  const cheats = map.cheats()
  //const gains = cheats.map(cheat => cheat.gain)
  // console.log(gains)
  //const occurrences = new Map<number, number>();
  //gains.forEach(num => {
  //  occurrences.set(num, (occurrences.get(num) || 0) + 1);
  //});
  //const entries = Array.from(occurrences.entries());
  //entries.sort((a, b) => a[0] - b[0]);
  //console.log(entries);
  return cheats.length;
}

await runSolution(day20b);
