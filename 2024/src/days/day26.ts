import getDataForDay from "../utils/getDataForDay";

export async function day26(): Promise<string> {
    const dataString = await getDataForDay(26);
    const answerA = 'answer A'
    const answerB = 'answer B'

    return `${answerA} ${answerB}`
}
