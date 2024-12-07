import getAnswerForDay from "./utils/getAnswerForDay";
import { Day } from "./utils/getDataForDay";

const currentDate = new Date();

const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

if (currentDay > 25 || currentMonth < 12 || currentYear !== 2024) {
    console.log("It's over! Advent of Code is over!")
} else {
    getAnswerForDay(currentDay as Day)
}