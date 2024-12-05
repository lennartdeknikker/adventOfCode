import getDataForDay from "../utils/getDataForDay";

export async function day15(): Promise<string> {
    const dataString = await getDataForDay(15);
    const answerA = 'answer A'
    const answerB = 'answer B'

    return `${answerA} ${answerB}`
}
