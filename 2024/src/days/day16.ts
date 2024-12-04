import getDataForDay from "../utils/getDataForDay";

export async function day16(): Promise<string> {
    const dataString = await getDataForDay(16);
    return dataString
}
