import getDataForDay from "../utils/getDataForDay";

export async function day8(): Promise<string> {
    const dataString = await getDataForDay(8);
    return dataString
}
