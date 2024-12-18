import {runSolution} from '../utils.ts';
import {e} from "mathjs";

function draw_map(size: { x: number; y: number }, corruption: { x: number; y: number }[]) {
  for (let i = 0; i < size.y; i++) {
    const line = Array(size.x).fill('.');
    for (const c of corruption) {
      if (c.y == i) {
        line[c.x] = '#'
      }
    }
    console.log(line.join(''))
  }
}

function smallest(unvisited: Set<{ x: number; y: number; distance: number }>) {
  let smallest_node = undefined;
  let smallest_distance = Infinity;
  for (const node of unvisited) {
    if (node.distance < smallest_distance) {
      smallest_distance = node.distance;
      smallest_node = node;
    }
  }
  return smallest_node;
}

function shortest_path(size: { x: number; y: number }, corruption: { x: number; y: number }[]) {
  // Step 0-1: Create a set, add all nodes with either 0 (start) or infinity distance
  const unvisited = new Set<{x: number; y: number, distance: number}>();
  unvisited.add({x: 0, y: 0, distance: 0}) // Start point
  for (let y = 0; y < size.y; y++) {
    for (let x = 0; x < size.x; x++) {
      if (!corruption.some(c => c.x == x && c.y == y))  {
        unvisited.add({x, y, distance: Infinity})
      }
    }
  }

  function update_node(dx: number, y: number, current: {x: number; y: number, distance: number}) {
    if (dx >= 0 && dx < size.x && y >= 0 && y < size.y) {
      for (const node of unvisited) {
        if (node.x == dx && node.y == y) {
          node.distance = current.distance + 1;
        }
      }
    }
  }

  while (true) {
    // Step 3: Get smallest
    const current = smallest(unvisited);
    console.log(current);
    if (current.x == size.x - 1 && current.y == size.y - 1) {
      break;
    }
    // Step 4: Calculate neighbours
    const x = current.x;
    const y = current.y;
    update_node(x - 1, y, current);
    update_node(x + 1, y, current);
    update_node(x, y - 1, current);
    update_node(x, y + 1, current);

    // Step 5: Remove current
    unvisited.delete(current);
  }
  const end = smallest(unvisited);
  console.log("Found path", unvisited, end);
  return end.distance;
}

/** provide your solution as the return of this function */
export async function day18a(data: string[]) {
  const size = {x: 71, y: 71};
  const steps = 1024;
  data.pop()
  const input = data.map((x) => {
    const t = (x.split(','));
    return {x: +t[0], y: +t[1]}
  } )
  console.log(input);
  const corruption = input.slice(0, steps)
  draw_map(size, corruption)
  const length = shortest_path(size, corruption)
  return length;
}

await runSolution(day18a);
