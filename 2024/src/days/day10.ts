import getDataForDay from "../utils/getDataForDay";

export async function day10(): Promise<string> {
    const dataString = await getDataForDay(10);
    const answerA = 'answer A'
    const answerB = 'answer B'

    return `${answerA} ${answerB}`
}
