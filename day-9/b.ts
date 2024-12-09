import {runSolution} from '../utils.ts';

/** provide your solution as the return of this function */
export async function day9b(data: string[]) {
  data.pop()
  console.log(data);
  const input = data[0]


  const disk_layout: {id: number, size: number}[] = [];
  const files: {id: number, size: number, index: number}[] = [];
  const spaces: {size: number, index: number}[] = [];
  let next_id = 0
  let index = 0;
  for (let x = 0; x < input.length; x++) {
    const item_size = +(input[x]);
    if (x % 2 == 1) {
      spaces.push({size: item_size, index: index})
      for (let y = 0; y < item_size; y++) {
        disk_layout.push({id: NaN, size: item_size});
      }
    } else {
      files.push({id: next_id, size: item_size, index: index})
      for (let y = 0; y < item_size; y++) {
        disk_layout.push({id: next_id, size: item_size});
      }
      next_id++
    }
    index += item_size
  }

  const start_files = JSON.parse(JSON.stringify(files));
  console.log(files);
  console.log(start_files);
  console.log(spaces);
  for (let f = start_files.length-1; f >= 0; f--) {
    console.log("Move file", start_files[f]);
    for (let space = 0; space < spaces.length; space++) {
      if ((spaces[space].size >= files[f].size)
        && spaces[space].index < files[f].index ) {
        console.log("Can move ", files[f], "to", spaces[space]);
        files[f].index = spaces[space].index;
        spaces[space].size -= files[f].size;
        spaces[space].index += files[f].size;
        break;
      }
    }
  }
  console.log(files);


  let checksum = 0
  for (let x = 0; x < files.length; x++) {
    //console.log(files[x]);
    for (let y = 0; y < files[x].size; y++) {
      checksum += (files[x].index + y) * files[x].id;
    }
  }
  return checksum;
}

await runSolution(day9b);
