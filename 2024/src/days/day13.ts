import getDataForDay from "../utils/getDataForDay";

export async function day13(): Promise<string> {
    const dataString = await getDataForDay(13);
    return dataString
}