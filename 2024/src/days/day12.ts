import getDataForDay from "../utils/getDataForDay";

export async function day12(): Promise<string> {
    const dataString = await getDataForDay(12);
    return dataString
}