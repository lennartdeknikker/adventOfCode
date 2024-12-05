import getDataForDay from "../utils/getDataForDay";

export async function day22(): Promise<string> {
    const dataString = await getDataForDay(22);
    const answerA = 'answer A'
    const answerB = 'answer B'

    return `${answerA} ${answerB}`
}
