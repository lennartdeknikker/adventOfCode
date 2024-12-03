import getDataForDay from "../utils/getDataForDay";

export async function day1(): Promise<string> {
    const dataString = await getDataForDay(1);
    const splitUp = dataString.split(/(?:\n|\s{3})/);
    const parsedToNumbers = splitUp.map(item => Number(item))
    const firstList = parsedToNumbers.filter((_, index) => index % 2 === 0).sort().filter(item => item);
    const secondList = parsedToNumbers.filter((_, index) => index % 2 !== 0).sort().filter(item => item);
    const totalDistance = firstList.reduce((previousValue, currentValue, currentIndex) =>
        previousValue += Math.abs(currentValue - secondList[currentIndex])
        , 0)
    const answerA = totalDistance

    const similarityScore = firstList.reduce((previousValue, currentValue) => {
        const multiplier = secondList.filter(item => item === currentValue).length
        const score = currentValue * multiplier
        return previousValue += score
    }, 0)
    const answerB = similarityScore

    return `${answerA} ${answerB}`
}
