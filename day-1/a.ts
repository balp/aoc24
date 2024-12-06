import {runSolution} from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
  console.log(data);
  data.pop()
  const input_strings = data.map((x) => x.split(/ +/))
  const input = input_strings.map((x) => x.map((y) => +y))
  console.log(input);

  const tansposed_matrix = [];
  for (let j = 0; j < input[0].length; j++) {
    tansposed_matrix.push([]);
    for (let i = 0; i < input.length; i++) {
      tansposed_matrix[j].push(input[i][j]);
    }
  }
  console.log(tansposed_matrix);
  const sorted = tansposed_matrix.map((x) => x.toSorted())
  console.log(sorted);
  const sorted_trans = [];
  for (let j = 0; j < sorted[0].length; j++) {
    sorted_trans.push([]);
    for (let i = 0; i < sorted.length; i++) {
      sorted_trans[j].push(sorted[i][j]);
    }
  }
  console.log(sorted_trans);
  const distace = sorted_trans.map((x) => Math.abs(x[1]-x[0]))
  console.log(distace);
  return distace.reduce((a, b) => a + b);
}

await runSolution(day1a);
