import { runSolution } from '../utils.ts';
import {re} from "mathjs";

/** provide your solution as the return of this function */
export async function day17a(data: string[]) {
  console.log(data);
  const registers = {
    a: undefined,
    b: undefined,
    c: undefined
  }
  const output: number[] = [];
  for (const line of data) {
    if (line.match(/Register A:/)) {
      const [, a] = line.match(/Register A: (\d+)/)
      console.log(a);
      registers.a = a
    }
    if (line.match(/Register B:/)) {
      const [, b] = line.match(/Register B: (\d+)/)
      console.log(b);
      registers.b = b
    }
    if (line.match(/Register C:/)) {
      const [, c] = line.match(/Register C: (\d+)/)
      console.log(c);
      registers.c = c
    }
    if (line.match(/Program:/)) {
      const [, raw_program] = line.match(/Program: (.+)/)
      const program = raw_program.split(',').map(x => +x);
      console.log(program);
      let instruction_pointer = 0
      while (instruction_pointer < program.length) {
        const instruction = program[instruction_pointer];
        const operand = program[instruction_pointer+1];
        const combo_operand = operand <= 3 ? operand : operand == 4 ? registers.a : operand == 5 ? registers.b : operand == 6 ? registers.c : undefined;
        console.log(registers, instruction, operand);
        switch (instruction) {
          case 0: {
            const tmp = Math.trunc(registers.a / (2 ** combo_operand));
            console.log('adv: %d = %d / (2 ** %d);', tmp, registers.a, combo_operand);
            registers.a = Math.trunc(tmp)
            instruction_pointer += 2
            break;
          }
          case 1:
            console.log('bxl');
            registers.b = registers.b ^ operand;
            instruction_pointer += 2
            break;
          case 2:
            console.log('bst', combo_operand % 8);
            registers.b = combo_operand % 8;
            instruction_pointer += 2
            break;
          case 3:
            console.log('jnz');
            if (registers.a === 0) {
              instruction_pointer += 2;
            } else {
             instruction_pointer = operand;
            }
            break;
          case 4:
            console.log('bxc');
            registers.b = registers.b ^ registers.c;
            instruction_pointer += 2
            break;
          case 5:
            console.log('out', combo_operand % 8);
            output.push(combo_operand % 8);
            instruction_pointer += 2
            break;
          case 6: {
            const tmp = Math.trunc(registers.a / (2 ** combo_operand));
            console.log('bdv: %d = %d / (2 ** %d);', tmp, registers.a, combo_operand);
            registers.b = Math.trunc(tmp)
            instruction_pointer += 2
            break;
          }
          case 7: {
            const tmp = Math.trunc(registers.a / (2 ** combo_operand));
            console.log('cdv: %d = %d / (2 ** %d);', tmp, registers.a, combo_operand);
            registers.c = Math.trunc(tmp)
            instruction_pointer += 2
            break;
          }
        }
      }
    }
  }
  console.log(registers);
  console.log(output.join(','));
  return 0;
}

await runSolution(day17a);
