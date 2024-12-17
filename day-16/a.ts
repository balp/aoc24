import {runSolution} from '../utils.ts';
import {number, string} from "mathjs";

interface Position {
  x: number;
  y: number;
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
    const unvisited = new Set<{x: number, y: number, distance: number, direction: string }>();
    for (let x = 0; x < this.size_x; x++) {
      for (let y = 0; y < this.size_y; y++) {
        if (this.map[x][y] === '.'
          || this.map[x][y] === 'E') {
          unvisited.add({x, y, distance: Infinity, direction: ''});
        } else if (this.map[x][y] === 'S') {
          unvisited.add({x, y, distance: 0, direction: '>'});
        }
      }
    }
    // console.log(unvisited);
    while (true) {
      console.log("Loop: Step 3");
      let smallest = {x:0, y:0, distance: Infinity, direction: ''};
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
        console.log("Found the end", smallest);
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
      for (const node of unvisited) {
        if (node.x === in_front.x && node.y === in_front.y) {
          if (node.distance > smallest.distance + 1) {
            node.distance = smallest.distance + 1;
            node.direction = smallest.direction;
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
      for (const node of unvisited) {
        if (node.x === to_left.x && node.y === to_left.y) {
          if (node.distance > smallest.distance + 1) {
            node.distance = smallest.distance + 1001;
            node.direction = to_left.direction;
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
      for (const node of unvisited) {
        if (node.x === to_right.x && node.y === to_right.y) {
          if (node.distance > smallest.distance + 1) {
            node.distance = smallest.distance + 1001;
            node.direction = to_right.direction;
          }
        }
      }
      // Behind
      console.log("Loop: Step 5");
      unvisited.delete(smallest);
    }
    return Infinity;
  }
}

/** provide your solution as the return of this function */
export async function day16a(data: string[]) {
  data.pop();
  console.log(data);
  const map = new RaceMap(data)
  // console.log(map);
  return map.shortest_path();
}

await runSolution(day16a);
