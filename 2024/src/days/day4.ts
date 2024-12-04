import getDataForDay from "../utils/getDataForDay";

function getAllIndexes(arr: string, val: string): number[] {
    var indexes = [], i;
    for (i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

function reverseWord(word: string): string {
    return word.split('').reverse().join('')
}

function createRegexForWord(word: string): RegExp {
    return new RegExp(`\(${word}\)`);
}

function getHorizontalOccurances(word: string, lines: string[]): number {
    let horizontalCount = 0

    lines.forEach(line => {
        const oneWay = line.split(createRegexForWord(word)).filter(item => item === word).length
        horizontalCount += oneWay
    });

    return horizontalCount;
}

function getVerticalOccurances(word: string, lines: string[], diagonalShift: number = 0, middleLetterIndices?: string[]): [number, number] {
    let verticalCount = 0;
    let crossCount = 0;

    const xIndicesMap: number[][] = [];
    lines.forEach(line => {
        const xIndices = getAllIndexes(line, word[0]);
        xIndicesMap.push(xIndices);
    });

    const checkNextLetter = (word: string, lineIndex: number, xIndex: number, nextLetterIndex: number) => {
        // if the letter on the next line is the next letter of XMAS
        const letterToCheck = word[nextLetterIndex]
        const letterOnNextLine = lines[lineIndex + nextLetterIndex][xIndex]
        if (letterOnNextLine === letterToCheck) {
            // and it is the last letter, return true
            if (nextLetterIndex === word.length - 1) {
                verticalCount++
                if (middleLetterIndices) {
                    const passedCount = Math.floor(word.length / 2)
                    const middleLetterLineIndex = lineIndex + passedCount
                    const middleLetterIndex = xIndex - passedCount * diagonalShift
                    const newEntry = `${middleLetterLineIndex}:${middleLetterIndex}`
                    if (middleLetterIndices.includes(newEntry)) crossCount++;
                    middleLetterIndices.push(newEntry)
                }
                return true;
            }
            // else check the next letter
            checkNextLetter(word, lineIndex, xIndex + diagonalShift, nextLetterIndex + 1)
        }
        // return false
        return false;
    }

    xIndicesMap.forEach((line, lineIndex) => {
        if (lineIndex < lines.length - (word.length - 1)) {
            // check vertical
            line.forEach(xIndex => {
                const wordIsComplete = checkNextLetter(word, lineIndex, xIndex + diagonalShift, 1)
                if (wordIsComplete) verticalCount++
            })
        }
    })

    return [verticalCount, crossCount];
}


export async function day4(): Promise<string> {
    const dataString = await getDataForDay(4);
    const lines = dataString.trim().split('\n');
    
    let verticalCount = 0
    let crossCount = 0

    // A
    let word = 'XMAS'
    
    verticalCount += getHorizontalOccurances(word, lines)
    verticalCount += getHorizontalOccurances(reverseWord(word), lines)
    verticalCount += getVerticalOccurances(word, lines)[0]
    verticalCount += getVerticalOccurances(reverseWord(word), lines)[0]
    verticalCount += getVerticalOccurances(word, lines, 1)[0]
    verticalCount += getVerticalOccurances(reverseWord(word), lines, 1)[0]
    verticalCount += getVerticalOccurances(word, lines, -1)[0]
    verticalCount += getVerticalOccurances(reverseWord(word), lines, -1)[0]
    const answerA = verticalCount;

    // B
    word = 'MAS'
    let middleLetterIndices: string[] = [] // "{line-index}:{letter-index}"

    getVerticalOccurances(word, lines, 1, middleLetterIndices)[1]
    getVerticalOccurances(reverseWord(word), lines, 1, middleLetterIndices)[1]
    crossCount += getVerticalOccurances(word, lines, -1, middleLetterIndices)[1]
    crossCount += getVerticalOccurances(reverseWord(word), lines, -1, middleLetterIndices)[1]
    const answerB = crossCount;

    return `${answerA} ${answerB}`
}
