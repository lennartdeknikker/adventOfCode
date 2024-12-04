import getDataForDay from "../utils/getDataForDay";

export async function day22(): Promise<string> {
    const dataString = await getDataForDay(22);
    return dataString
}
