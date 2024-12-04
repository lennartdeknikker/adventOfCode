import getDataForDay from "../utils/getDataForDay";

export async function day10(): Promise<string> {
    const dataString = await getDataForDay(10);
    return dataString
}
