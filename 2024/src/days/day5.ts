import getDataForDay from "../utils/getDataForDay";

export async function day5(): Promise<string> {
    const dataString = await getDataForDay(5);
    return dataString
}
