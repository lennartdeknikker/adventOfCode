
import getDataForDay from "../utils/getDataForDay";

const sampleString = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`

const sampleString2 = `
....#.....
.........#
..........
..#.......
....o..#..
...#...#..
.#.#^.#...
........#.
#.........
......#...
`

type Direction = '^' | '<' | '>' | 'v'
type Obstacle = '#'
type FreeSpace = '.'
type SimulatedObstacle = 'o'
type Trail = '-' | '|' | '+'

type Position = Direction | Obstacle | FreeSpace | SimulatedObstacle | Trail

type Coordinate = [number, number]

type Line = Position[]



const logCurrentState = (lines: Line[]) => {
    console.log(lines.map(part => part.join('')).join('\n'));
}

const findGuard = (lines: Line[]): [number, number, Direction] => {
    try {
        const lineIndex = lines.findIndex(line => String(line).match(/<|>|\^|v/));
        const guardIndex = Array.from(lines[lineIndex]).findIndex(letter => letter.match(/<|>|\^|v/));
        const direction = lines[lineIndex][guardIndex] as Direction
        return [lineIndex, guardIndex, direction]
    } catch (e) {
        return [-1, -1, 'v']
    }
}

const rotate90Degrees = (direction: Direction): Direction => {
    switch (direction) {
        case '<':
            return '^'
        case '>':
            return 'v'
        case 'v':
            return '<'
        case '^':
            return '>'
    }
}

const simulateGuard = async (baseLines: Line[], obstacleOptions: Coordinate[] = [], isSimulation: boolean = false): Promise<[number, Coordinate[]]> => {
    const baseLinesCopy = baseLines.map(part => part.map(letter => letter))

    let moves = 0;
    let hasFinished = false;
    let couldBeLooping = false;
    let hasLooped = false;
    let isTurning = false;
    let obstacleCoordinates: Coordinate | null = null;
    let [lineIndex, guardIndex, direction] = findGuard(baseLinesCopy)

    const finishUp = () => {
        moves += 1;
        hasFinished = true;
    }

    if (lineIndex === -1 || guardIndex === -1) {
        finishUp();
        return [0, []];
    }

    const moveGuard = async (lines: Line[]) => {
        let verticalShift = 0;
        let horizontalShift = 0;

        if (direction === '^') verticalShift = -1
        if (direction === 'v') verticalShift = 1
        if (direction === '<') horizontalShift = -1
        if (direction === '>') horizontalShift = 1

        const currentLine = Array.from(lines[lineIndex])
        let wouldBeNextLine = lines?.[lineIndex + verticalShift] && Array.from(lines[lineIndex + verticalShift])
        let wouldBeNextPosition = wouldBeNextLine?.[guardIndex + horizontalShift]

        if (!wouldBeNextLine || !wouldBeNextPosition) {
            finishUp()
            return;
        }
        if (wouldBeNextPosition === '#' ||
            wouldBeNextPosition === 'o'
        ) {
            if (wouldBeNextPosition === 'o') {
                obstacleCoordinates = [lineIndex + verticalShift, guardIndex + horizontalShift]
            }
            if (couldBeLooping && obstacleCoordinates) {
                obstacleOptions.push(obstacleCoordinates)
                hasLooped = true;
                finishUp()
                return;
            }
            const updatedDirection = rotate90Degrees(direction)
            lines[lineIndex] = Array.from(currentLine.join('').replace(direction, updatedDirection)) as Position[]
            direction = updatedDirection
            isTurning = true
            return;
        }
        couldBeLooping = false;

        if (!isSimulation && wouldBeNextPosition === '.') {
            // run simulation in which case the next position would be an obstacle
            // log the obstacle location if it then starts looping
            // do not count the first next position!
            const linesDuplicate = baseLines.map(part => part.map(letter => letter))
            linesDuplicate[lineIndex + verticalShift][guardIndex + horizontalShift] = 'o'
            
            await simulateGuard(linesDuplicate, obstacleOptions, true)
        }

        if (wouldBeNextPosition === '.' ||
            wouldBeNextPosition === '-' ||
            wouldBeNextPosition === '|' ||
            wouldBeNextPosition === '+'
        ) {
            const updatedNextLine = wouldBeNextLine
            const updatedCurrentLine = currentLine

            const positionGuardMovesTo = updatedNextLine[guardIndex + horizontalShift]

            if (positionGuardMovesTo === '+') couldBeLooping = true;
            updatedNextLine[guardIndex + horizontalShift] = direction

            let trail: Trail = '-'
            if (verticalShift) trail = '|'
            if (horizontalShift) trail = '-'
            if (isTurning) {
                trail = '+';isTurning = false;
            }
            updatedCurrentLine[guardIndex] = trail

            lines[lineIndex] = updatedCurrentLine
            if (verticalShift) lineIndex = lineIndex + verticalShift;
            if (horizontalShift) guardIndex = guardIndex + horizontalShift;

            const isDistinct = wouldBeNextPosition === '.'
            if (isDistinct) moves += 1;
            return;
        }
    }

    do {
        await moveGuard(baseLinesCopy);
    } while (!hasFinished);

    return [moves, obstacleOptions]
}

export async function day6(): Promise<string> {

    const dataString = await getDataForDay(6);
    const baseLines = dataString.split('\n').map(line => Array.from(line)) as Line[];
    const [moves, obstacleOptions] = await simulateGuard(baseLines);

    const answerA = moves
    const answerB = obstacleOptions.length

    return `${answerA} ${answerB}`
}
