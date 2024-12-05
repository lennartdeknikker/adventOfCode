import getDataForDay from "../utils/getDataForDay";

export async function day21(): Promise<string> {
    const dataString = await getDataForDay(21);
    const answerA = 'answer A'
    const answerB = 'answer B'

    return `${answerA} ${answerB}`
}
