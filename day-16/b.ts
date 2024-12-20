import {runSolution} from '../utils.ts';

interface Position {
  x: number;
  y: number;
}


interface UnvisitedNode {
  x: number;
  y: number;
  distance: number;
  direction: string;
  before: Position[]
}

class RaceMap {
  private readonly size_x: number;
  private readonly size_y: number;
  private readonly map: string[][] = [];
  private readonly distance: number[][] = [];
  private readonly start: Position;
  private readonly end: Position;

  constructor(data: string[]) {
    this.size_x = data.length;
    this.size_y = data[0].length;
    for (let x = 0; x < this.size_x; x++) {
      this.map.push(data[x].split(''));
      this.distance.push(new Array(this.size_y).fill(Infinity));
      for (let y = 0; y < this.size_y; y++) {
        if (this.map[x][y] === 'S') {
          this.start = {x, y};
        }
        if (this.map[x][y] === 'E') {
          this.end = {x, y};
        }
      }

    }
  }

  shortest_path(): number {
    const unvisited = new Set<UnvisitedNode>();
    const visited = new Set<UnvisitedNode>();
    for (let x = 0; x < this.size_x; x++) {
      for (let y = 0; y < this.size_y; y++) {
        if (this.map[x][y] === '.'
          || this.map[x][y] === 'E') {
          unvisited.add({x, y, distance: Infinity, direction: '', before: []});
          this.distance[x][y] = Infinity;
        } else if (this.map[x][y] === 'S') {
          unvisited.add({x, y, distance: 0, direction: '>', before: []});
          this.distance[x][y] = 0;
        }
      }
    }
    // console.log(unvisited);
    while (true) {
      console.log("Loop: Step 3");
      this.draw_map()
      let smallest: UnvisitedNode = {x:0, y:0, distance: Infinity, direction: '', before: []};
      for (const node of unvisited) {
        // console.log("Looking at node", node);
        if (node.distance < smallest.distance) {
          // console.log("Is smallest", node, smallest);
          smallest = node;
        }
      }
      if (smallest.distance === Infinity) {
        console.log("No more possible paths", smallest);
        break;
      }
      if (smallest.x === this.end.x && smallest.y === this.end.y) {
        console.log("Found the end", smallest, visited);
        const nodes = [smallest];
        const path: Position[] = [];
        while (true) {
          if (nodes[0].before.length === 0) break;
          for (const position of nodes[0].before) {
            if (!path.some(p => p.x === position.x && p.y === position.y)) {
              console.log("Adding", position);
              path.push({x: position.x, y: position.y});
              for (const node of visited) {
                if (node.x === position.x && node.y === position.y) {
                    nodes.push(node);
                }
              }
            }
          }
          nodes.shift()
        }
        console.log(path);
        return smallest.distance;
      }
      console.log("Loop: Step 4", smallest);;
      // In front
      let in_front = {x: Infinity, y: Infinity}
      if (smallest.direction === '>') {
        in_front = {x: smallest.x, y: smallest.y+1}
      } else if (smallest.direction === '<') {
        in_front = {x: smallest.x, y: smallest.y-1}
      } else if (smallest.direction === '^') {
        in_front = {x: smallest.x-1, y: smallest.y}
      } else if (smallest.direction === 'v') {
        in_front = {x: smallest.x+1, y: smallest.y}
      }
      this.distance[in_front.x][in_front.y] = smallest.distance + 1;
      for (const node of unvisited) {
        if (node.x === in_front.x && node.y === in_front.y) {
          if (node.distance == smallest.distance + 1) {
            node.before.push({x: smallest.x, y: smallest.y});
          }
          if (node.distance > smallest.distance + 1) {
            node.distance = smallest.distance + 1;
            node.direction = smallest.direction;
            node.before.push({x: smallest.x, y: smallest.y});
          }
        }
      }
      // To left
      let to_left = {x: Infinity, y: Infinity, direction: ''}
      if (smallest.direction === '>') {
        to_left = {x: smallest.x-1, y: smallest.y, direction: '^'}
      } else if (smallest.direction === '<') {
        to_left = {x: smallest.x+1, y: smallest.y, direction: 'v'}
      } else if (smallest.direction === '^') {
        to_left = {x: smallest.x, y: smallest.y-1, direction: '<'}
      } else if (smallest.direction === 'v') {
        to_left = {x: smallest.x, y: smallest.y+1, direction: '>'}
      }
      this.distance[to_left.x][to_left.y] = smallest.distance + 1001;
      for (const node of unvisited) {
        if (node.x === to_left.x && node.y === to_left.y) {
          if (node.distance == smallest.distance + 1001) {
            node.before.push({x: smallest.x, y: smallest.y});
          }
          if (node.distance > smallest.distance + 1001) {
            node.distance = smallest.distance + 1001;
            node.direction = to_left.direction;
            node.before.push({x: smallest.x, y: smallest.y});
          }
        }
      }
      // To right
      let to_right = {x: Infinity, y: Infinity, direction: ''}
      if (smallest.direction === '>') {
        to_right = {x: smallest.x+1, y: smallest.y, direction: 'v'}
      } else if (smallest.direction === '<') {
        to_right = {x: smallest.x-1, y: smallest.y, direction: '^'}
      } else if (smallest.direction === '^') {
        to_right = {x: smallest.x, y: smallest.y+1, direction: '>'}
      } else if (smallest.direction === 'v') {
        to_right = {x: smallest.x, y: smallest.y-1, direction: '<'}
      }
      this.distance[to_right.x][to_right.y] = smallest.distance + 1001;
      for (const node of unvisited) {
        if (node.x === to_right.x && node.y === to_right.y) {
          if (node.distance == smallest.distance + 1001) {
            node.before.push({x: smallest.x, y: smallest.y});
          }
          if (node.distance > smallest.distance + 1001) {
            node.distance = smallest.distance + 1001;
            node.direction = to_right.direction;
            node.before.push({x: smallest.x, y: smallest.y});
          }
        }
      }
      console.log("Loop: Step 5", smallest.before);
      visited.add(smallest);
      unvisited.delete(smallest);
    }
    return Infinity;
  }


  private draw_map() {
    for (let x = 0; x < this.size_x; x++) {
      const line = []
      for (let y = 0; y < this.size_y; y++) {
        if (this.map[x][y] === "#") {
          line.push("#####");
        } else if (this.map[x][y] === "S") {
          line.push(" SSS ");
        } else if (this.map[x][y] === "E") {
          line.push(" EEE ");
        } else if (this.distance[x][y] === Infinity) {
          line.push(" ... ");
        } else {
          line.push((this.distance[x][y]).toString(16).padStart(5, " "));
        }
      }
      console.log(line.join(''));
    }
  }
}

/** provide your solution as the return of this function */
export async function day16b(data: string[]) {
  data.pop();
  console.log(data);
  const map = new RaceMap(data)
  // console.log(map);
  return map.shortest_path();
}

await runSolution(day16b);
