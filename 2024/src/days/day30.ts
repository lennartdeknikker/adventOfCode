import getDataForDay from "../utils/getDataForDay";

export async function day30(): Promise<string> {
    const dataString = await getDataForDay(30);
    const answerA = 'answer A'
    const answerB = 'answer B'

    return `${answerA} ${answerB}`
}
