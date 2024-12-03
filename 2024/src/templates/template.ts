import getDataForDay from "../utils/getDataForDay";

export async function day1(): Promise<string> {
    const dataString = await getDataForDay(1);
    return dataString
}
