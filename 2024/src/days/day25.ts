import getDataForDay from "../utils/getDataForDay";

export async function day25(): Promise<string> {
    const dataString = await getDataForDay(25);
    return dataString
}
