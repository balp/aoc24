import {runSolution} from '../utils.ts';

class Map {
  private map: string[]
  size_x: number;
  size_y: number;

  constructor(map: string[]) {
    this.map = map;
    this.size_x = map.length;
    this.size_y = map[0].length;
  }

  type(pos: Position) {
    if (!this.contains(pos)) {
      return '.';
    }
    return this.map[pos.x][pos.y];
  }

  contains(position: Position) {
    return position.x >= 0 && position.x < this.size_x && position.y >= 0 && position.y < this.size_y;
  }
}

class Region {
  private plant: string
  private positions: Position[]

  constructor(plant: string) {
    this.plant = plant;
    this.positions = [];
  }

  contains(pos: Position): boolean {
    const contain = this.positions.some((p) => p.x === pos.x && p.y === pos.y);
    // console.log(this.plant, this.positions, pos, contain);
    return contain
  }

  add(pos: Position) {
    this.positions.push(pos);
  }

  grow(map: Map) {
    // console.log("grow", this.plant, this.positions);
    for (const position of this.positions) {
      for (const contenter of [position.north(), position.south(), position.west(), position.east()]) {
        const in_region = this.contains(contenter);
        const in_map = map.contains(contenter);
        const same_type = map.type(position) === map.type(contenter);
        // console.log("Look at", contenter, in_region, in_map, same_type);

        if (!in_region && in_map && same_type) {
          // console.log("add", contenter);
          this.add(contenter);
        }
      }
    }
  }

  price(map: Map) {
    const value = this.area() * this.perimiter(map);
    // console.log("%s: %d * %d = %d", this.plant, this.area(), this.perimiter(map), value);
    return value;
  }

  private area() {
    return this.positions.length;
  }

  private perimiter(map: Map) {
    function edges(pos: Position, map: Map) {
      const type = map.type(pos);
      const north = map.type(pos.north());
      const south = map.type(pos.south());
      const east = map.type(pos.east());
      const west = map.type(pos.west());
      const edges = [north, south, east, west].filter(x => x !== type);
      // console.log(pos, edges);
      return edges.length;

    }
    return this.positions.reduce( (acc, p) => acc + edges(p, map), 0 );
  }
}

class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  north() {
    return new Position(this.x - 1, this.y);
  }

  south() {
    return new Position(this.x + 1, this.y);
  }
  east() {
    return new Position(this.x, this.y-1);
  }
  west() {
    return new Position(this.x, this.y+1);
  }
}

function get_regions(map: Map): Region[] {
  const regions: Region[] = []
  for (let x = 0; x < map.size_x; x++) {
    for (let y = 0; y < map.size_y; y++) {
      const pos = new Position(x, y);
      // console.log(pos, map.type(pos), regions);
      if (regions.every(region => region.contains(pos) === false)) {
        // console.log("New region", pos, map.type(pos));
        const region = new Region(map.type(pos));
        region.add(pos)
        region.grow(map)
        regions.push(region);
      }
    }

  }
  return regions;
}

/** provide your solution as the return of this function */
export async function day12a(data: string[]) {
  data.pop()
  console.log(data);
  const map = new Map(data);
  const regions = get_regions(map);
  console.log(regions);
  return regions.reduce( (acc, r) => acc + r.price(map), 0 );
}

await runSolution(day12a);
