import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day4b(data: string[]) {
  console.log(data);
  data.pop()
  const lower = data.map( (x)=> x.toLowerCase() )
  console.log(lower);


  const all_words = []

  function is_xmas(x: number, y: number, data: string[]) {
    const size_x = data.length;
    const size_y = data[0].length;

    if ((x == 0) || (x == size_x-1)) return false;
    if ((y == 0) || (y == size_y-1)) return false;
    if (data[x][y].toLowerCase() === 'a') {
      if (data[x-1][y-1].toLowerCase() === 'm') {
        if (data[x+1][y+1].toLowerCase() === 's') {
          if (data[x - 1][y + 1].toLowerCase() === 'm') {
            if (data[x + 1][y - 1].toLowerCase() === 's') {
              return true
            }
          }
          if (data[x - 1][y + 1].toLowerCase() === 's') {
            if (data[x + 1][y - 1].toLowerCase() === 'm') {
              return true
            }
          }
        }
      }
      if (data[x-1][y-1].toLowerCase() === 's') {
        if (data[x+1][y+1].toLowerCase() === 'm') {
          if (data[x - 1][y + 1].toLowerCase() === 'm') {
            if (data[x + 1][y - 1].toLowerCase() === 's') {
              return true
            }
          }
          if (data[x - 1][y + 1].toLowerCase() === 's') {
            if (data[x + 1][y - 1].toLowerCase() === 'm') {
              return true
            }
          }
        }
      }
    }
    return false
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if(is_xmas(i,j,lower)) {
        all_words.push([i, j]);
      }
      console.log("%d,%d: -> %s", i, j, all_words)
    }
  }
  const result = all_words
  console.log(result)
  return result.length;

  return 0;
}

await runSolution(day4b);
