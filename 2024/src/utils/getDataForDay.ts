import * as fs from 'node:fs/promises';

const getDataForDay = async (dayNumber: number) => {
    try {
        const cachedData = require(`../cache/day${dayNumber}.json`)   
        return cachedData; 
    } catch (error) {
        const COOKIE_HEADER = "_ga=GA1.2.2026047871.1733053175; _gid=GA1.2.1818788531.1733053175; session=53616c7465645f5f41859d259c2deb0dd99bb784662b181811e59d78eec9a41bfd043f95e699ba0cc423859de8225e921b538270c27b30f63479220264fbf0a9; _ga_MHSNPJKWC7=GS1.2.1733053175.1.1.1733053181.0.0.0";
        const response = await fetch(`https://adventofcode.com/2024/day/${dayNumber}/input`, {
            headers: {
                Cookie: COOKIE_HEADER,
            }
        })
        const newData = await response.text()
        const json = {
            day: dayNumber,
            fetchedAt: new Date().toISOString(),
            dataString: newData
        }
        await fs.writeFile(`src/cache/day${dayNumber}.json`, JSON.stringify(json));
        return newData;
    }
}

export default getDataForDay

