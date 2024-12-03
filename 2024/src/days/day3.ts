import getDataForDay from "../utils/getDataForDay";

export async function day3(): Promise<string> {
    const dataString = await getDataForDay(3);
    const mulPattern = /(mul\(\d+,\d+\))/;
    const doPattern = /(do\(\))/
    const dontPattern = /(don't\(\))/
    const combinedPattern = new RegExp(`${mulPattern.source}|${doPattern.source}|${dontPattern.source}`, 'g');
    const splitString = dataString.split(combinedPattern)
    
    // First answer
    const muls = splitString.filter(item => mulPattern.test(item))
    const sum = muls.reduce((total, current) => {
        const splitmap = current.match(/\d+/g)?.map(item => parseInt(item)) as [number, number]
        total += splitmap[0] * splitmap[1]
        return total
    }, 0)
    const answerA = sum;

    // Second answer
    const mulsDosAndDonts = splitString.filter(item => combinedPattern.test(item));
    let doIt = true;
    const secondSum = mulsDosAndDonts.reduce((previousValue: number, currentValue) => {
        if (currentValue === 'do()') doIt = true;
        else if (currentValue === 'don\'t()') doIt = false;
        else if (doIt === false) return previousValue;
        else {
            const splitmap = currentValue.match(/\d+/g)?.map(item => parseInt(item)) as [number, number]
            previousValue += splitmap[0] * splitmap[1]
        }
        return previousValue;
    }, 0);

    const answerB = secondSum;
    return `${answerA} ${answerB}`
}

