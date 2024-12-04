import getDataForDay from "../utils/getDataForDay";

export async function day7(): Promise<string> {
    const dataString = await getDataForDay(7);
    return dataString
}
