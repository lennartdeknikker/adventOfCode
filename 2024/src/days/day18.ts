import getDataForDay from "../utils/getDataForDay";

export async function day18(): Promise<string> {
    const dataString = await getDataForDay(18);
    return dataString
}
