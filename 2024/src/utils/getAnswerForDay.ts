import * as days from "../days";
import { Day } from "./getDataForDay";

const getAnswerForDay = async (day: Day) => {
    const key = `day${day}` as keyof typeof days;

    console.log(`getting answers for day ${day}...`);

    try {
        const answers = await days[key]();
        console.clear();
        console.log(`answers for day ${day} are:`);
        console.table(answers)
    } catch (error) {
        console.clear();
        console.error(`Error getting answers for day ${day}:\n---------------------------------`);
        console.error(error);
    }
}

export default getAnswerForDay