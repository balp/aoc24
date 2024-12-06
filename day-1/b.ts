import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1b(data: string[]) {
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
  let answer = 0
  for (const element of tansposed_matrix[0]) {
    const occurances = tansposed_matrix[1].filter(x => x == element);
    console.log(element, occurances.length, element * occurances.length );
    answer += element * occurances.length
  }

  return answer;
}

await runSolution(day1b);
