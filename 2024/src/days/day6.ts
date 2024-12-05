import getDataForDay from "../utils/getDataForDay";

export async function day6(): Promise<string> {
    const dataString = await getDataForDay(6);
    const answerA = 'answer A'
    const answerB = 'answer B'

    return `${answerA} ${answerB}`
}
