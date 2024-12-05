import getDataForDay from "../utils/getDataForDay";

export async function day24(): Promise<string> {
    const dataString = await getDataForDay(24);
    const answerA = 'answer A'
    const answerB = 'answer B'

    return `${answerA} ${answerB}`
}
