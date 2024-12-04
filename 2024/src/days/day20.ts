import getDataForDay from "../utils/getDataForDay";

export async function day20(): Promise<string> {
    const dataString = await getDataForDay(20);
    return dataString
}
