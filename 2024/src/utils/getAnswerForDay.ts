import * as days from "../days";

const getAnswerForDay = async (day: number) => {
    const key = `day${day}` as keyof typeof days;
    console.log(`answers for day ${day} are:`, await days[key]());
}

export default getAnswerForDay