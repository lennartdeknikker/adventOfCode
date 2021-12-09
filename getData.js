import fetch from "node-fetch"
import dotenv from "dotenv"
dotenv.config();

const getDataForDay = async (day) => {
  const response = await fetch(`https://adventofcode.com/2021/day/${day}/input`, {
    headers: {
      Cookie: process.env.COOKIE_HEADER,
    }
  })
  return response.text()
}

export default getDataForDay