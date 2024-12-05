import getDataForDay from "../utils/getDataForDay";

export async function day11(): Promise<string> {
    const dataString = await getDataForDay(11);
    const answerA = 'answer A'
    const answerB = 'answer B'

    return `${answerA} ${answerB}`
}
