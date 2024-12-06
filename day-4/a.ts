import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day4a(data: string[]) {
  //data.pop()
  const lower = data.map( (x)=> x.toLowerCase() )
  console.log(lower);

  function get_words(x: number, y: number, data: string[]) {
    const size_x = data.length;
    const size_y = data[0].length;
    const result = [];
    // "➡↘⬇" "↙⬅↖⬆↗"
    if (x + 4 <= size_x) result.push([data[x][y], data[x+1][y], data[x+2][y], data[x+3][y],].join(""))
    if (x - 3 >=      0) result.push([data[x][y], data[x-1][y], data[x-2][y], data[x-3][y],].join(""))

    if (y + 4 <= size_y) result.push([data[x][y], data[x][y+1], data[x][y+2], data[x][y+3],].join(""))
    if (y - 3 >=      0) result.push([data[x][y], data[x][y-1], data[x][y-2], data[x][y-3],].join(""))

    if ((x + 4 <= size_x) && (y + 4 <= size_y)) result.push([data[x][y], data[x+1][y+1], data[x+2][y+2], data[x+3][y+3],].join(""))
    if ((x + 4 <= size_x) && (y - 3 >=      0)) result.push([data[x][y], data[x+1][y-1], data[x+2][y-2], data[x+3][y-3],].join(""))

    if ((x - 3 >=      0) && (y + 4 <= size_y)) result.push([data[x][y], data[x-1][y+1], data[x-2][y+2], data[x-3][y+3],].join(""))
    if ((x - 3 >=      0) && (y + 4 >=      0)) result.push([data[x][y], data[x-1][y-1], data[x-2][y-2], data[x-3][y-3],].join(""))

    console.log(result)
    return result.filter((x) => x.toLowerCase() == "xmas")
  }

  let all_words = []
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const words = get_words(i,j,lower)
      all_words = all_words.concat(words)
      console.log("%d,%d: -> %s", i, j, words)
    }
  }
  const result = all_words
  console.log(result)
  return result.length;
}

await runSolution(day4a);
