import getDataForDay from "../utils/getDataForDay";

export async function day14(): Promise<string> {
    const dataString = await getDataForDay(14);
    return dataString
}
