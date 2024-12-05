import getDataForDay from "../utils/getDataForDay";

export async function day9(): Promise<string> {
    const dataString = await getDataForDay(9);
    const answerA = 'answer A'
    const answerB = 'answer B'

    return `${answerA} ${answerB}`
}
