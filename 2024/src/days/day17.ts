import getDataForDay from "../utils/getDataForDay";

export async function day17(): Promise<string> {
    const dataString = await getDataForDay(17);
    const answerA = 'answer A'
    const answerB = 'answer B'

    return `${answerA} ${answerB}`
}
