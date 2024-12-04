import * as days from "../days";

const getAnswerForDay = async (day: number) => {
    console.log(`answers for day ${day} are:`, await days.day4());
}

export default getAnswerForDay