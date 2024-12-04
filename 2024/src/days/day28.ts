import getDataForDay from "../utils/getDataForDay";

export async function day28(): Promise<string> {
    const dataString = await getDataForDay(28);
    return dataString
}
