import getDataForDay from "../utils/getDataForDay";

export async function day9(): Promise<string> {
    const dataString = await getDataForDay(9);
    return dataString
}
