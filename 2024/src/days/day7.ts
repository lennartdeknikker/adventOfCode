import getDataForDay from "../utils/getDataForDay";

const sampleString = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`

type Equation = {
    answer: number,
    numbers: number[]
}

type Operator = '+' | '*' | '||'

type Answer = {
    part: 'A' | 'B'
    answer: string | number
}

export async function day7(): Promise<[Answer, Answer]> {
    // const dataString = sampleString;
    const dataString = await getDataForDay(7);
    const baseLines: Equation[] = dataString.trim().split('\n').map(item => {
        const [answerString, numbersString] = item.split(':');
        return {
            answer: parseInt(answerString),
            numbers: numbersString.trim().split(' ').map(numberString => parseInt(numberString))
        }
    })

    const isPossible: (equation: Equation, operators: Operator[]) => boolean = (equation, operators) => {
        const { answer, numbers } = equation;
        const operatorSlotsCount = numbers.length - 1;
    
        // Generate all possible combinations of operators
        const generateCombinations = (path: Operator[] = [], index = 0): Operator[][] => {
            if (index === operatorSlotsCount) {
                return [path];
            }
            return operators.flatMap((op: Operator) => generateCombinations([...path, op], index + 1));
        };
    
        // Evaluate the expression left-to-right
        const evaluateExpression = (numbers: number[], operators: Operator[]): number => {
            let result = numbers[0];
            for (let index = 0; index < operators.length; index++) {
                if (operators[index] === '+') {
                    result += numbers[index + 1];
                } else if (operators[index] === '*') {
                    result *= numbers[index + 1];
                } else if (operators[index] === '||') {
                    result = parseInt(result.toString() + numbers[index + 1].toString(), 10);
                }
            }
            return result;
        };
    
        // Generate all operator combinations and check if any matches the answer
        const operatorCombinations = generateCombinations();
    
        for (const ops of operatorCombinations) {
            if (evaluateExpression(numbers, ops) === answer) {
                return true; // Found a valid combination
            }
        }
    
        return false; // No combination matches the answer
    };

    const answerA = baseLines.filter((equation) => isPossible(equation, ['+', '*'])).reduce((acc: number, equation: Equation) => acc += equation.answer, 0)
    const answerB = baseLines.filter((equation) => isPossible(equation, ['+', '*', '||'])).reduce((acc: number, equation: Equation) => acc += equation.answer, 0)

    return [{
        part: 'A',
        answer: answerA
    }, {
        part: 'B',
        answer: answerB
    }]
}
