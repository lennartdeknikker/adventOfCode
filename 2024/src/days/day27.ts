import getDataForDay from "../utils/getDataForDay";

export async function day27(): Promise<string> {
    const dataString = await getDataForDay(27);
    const answerA = 'answer A'
    const answerB = 'answer B'

    return `${answerA} ${answerB}`
}
