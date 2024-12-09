import {runSolution} from '../utils.ts';

/** provide your solution as the return of this function */
export async function day9a(data: string[]) {
  data.pop()
  console.log(data);
  const input = data[0]


  const disk_layout: number[] = [];
  let next_id = 0
  for (let x = 0; x < input.length; x++) {
    const item_size = +(input[x]);
    if (x % 2 == 1) {
      for (let y = 0; y < item_size; y++) {
        disk_layout.push(NaN);
      }
    } else {
      for (let y = 0; y < item_size; y++) {
        disk_layout.push(next_id);
      }
      next_id++
    }
  }
  console.log(disk_layout);
  for (let x = 0; x < disk_layout.length; x++) {
    console.log(x, disk_layout[x]);
    if (x > disk_layout.length) break;
    if (isNaN(disk_layout[x])) {
      disk_layout[x] = disk_layout.pop()
      while (isNaN(disk_layout[disk_layout.length-1])) disk_layout.pop()
    }
  }
  console.log(disk_layout);
  let checksum = 0
  for (let x = 0; x < disk_layout.length; x++) {
    checksum += x * disk_layout[x];
  }
  return checksum;
}

await runSolution(day9a);
