import getDataForDay from "../utils/getDataForDay";

export async function day29(): Promise<string> {
    const dataString = await getDataForDay(29);
    const answerA = 'answer A'
    const answerB = 'answer B'

    return `${answerA} ${answerB}`
}
