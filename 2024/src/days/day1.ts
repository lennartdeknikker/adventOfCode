import getDataForDay from "../utils/getDataForDay";

export async function day1(): Promise<string> {
    const data = await getDataForDay(1);
    return data.toString();
}
