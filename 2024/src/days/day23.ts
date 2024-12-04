import getDataForDay from "../utils/getDataForDay";

export async function day23(): Promise<string> {
    const dataString = await getDataForDay(23);
    return dataString
}
