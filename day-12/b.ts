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
  plant: string
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

  price() {
    const sides = this.sides();
    const area = this.area();
    const value = area * sides;
    console.log("price %s: %d * %d = %d", this.plant, area, sides, value);
    return value;
  }

  private area() {
    return this.positions.length;
  }


  corners(pos: Position): number {
    const corners = []
    // Ytterhörn
    if (!this.contains(pos.north_east()) && !this.contains(pos.north()) && !this.contains(pos.east())) corners.push(pos.north_east());
    if (!this.contains(pos.north_west()) && !this.contains(pos.north()) && !this.contains(pos.west())) corners.push(pos.north_west());
    if (!this.contains(pos.south_east()) && !this.contains(pos.south()) && !this.contains(pos.east())) corners.push(pos.south_east());
    if (!this.contains(pos.south_west()) && !this.contains(pos.south()) && !this.contains(pos.west())) corners.push(pos.south_west());

    // Innerhörn
    if (!this.contains(pos.north_east()) && this.contains(pos.north()) && this.contains(pos.east())) corners.push(pos.north_east());
    if (!this.contains(pos.north_west()) && this.contains(pos.north()) && this.contains(pos.west())) corners.push(pos.north_west());
    if (!this.contains(pos.south_east()) && this.contains(pos.south()) && this.contains(pos.east())) corners.push(pos.south_east());
    if (!this.contains(pos.south_west()) && this.contains(pos.south()) && this.contains(pos.west())) corners.push(pos.south_west());

    console.log(" >>>> corners", this.plant, pos, corners.length);
    return corners.length
  }

  private sides() {
    console.log(" ----  sides", this.plant);
    const number = this.positions.reduce((acc, p) => acc + this.corners(p), 0);
    // console.log("sides", this.plant, number);
    return number;
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
    return new Position(this.x, this.y - 1);
  }

  west() {
    return new Position(this.x, this.y + 1);
  }

  north_west() {
    return this.north().west();
  }

  north_east() {
    return this.north().east();
  }

  south_west() {
    return this.south().west();
  }

  south_east() {
    return this.south().east();
  }

  /*
     o
    o+o
     oAAAA
   */
  corner_of(region: Region): boolean {
    // console.log("corner_of", this, region.plant);
    if (region.contains(this)) return false;
    const sides = this.sides().filter(x => !region.contains(x));
    //console.log("corner_of sides outside", this, region.plant, sides);
    if (sides.length == 4) return true;
    if (sides.length == 2) return true;
    if (sides.length == 0) return true;

    return false;
  }

  sides() {
    return [
      this.north(), this.south(), this.east(), this.west()
    ]
  }
  diagonals() {
    return [
      this.north_east(), this.north_west(),
      this.south_west(), this.south_east()
    ]
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
export async function day12b(data: string[]) {
  data.pop()
  console.log(data);
  const map = new Map(data);
  const regions = get_regions(map);
  console.log(regions);
  return regions.reduce((acc, r) => acc + r.price(), 0);
}

await runSolution(day12b);
