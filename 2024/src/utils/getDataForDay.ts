import * as fs from 'node:fs/promises';

type CachedDay = {
    day: number;
    fetchedAt: string;
    dataString: string;
}

const getDataForDay = async (day: number): Promise<string> => {
    try {
        const cachedData = require(`../cache/day${day}.json`) as CachedDay;
        return cachedData.dataString;
    } catch (error) {
        const cookieHeader = '_ga=GA1.2.2041653070.1733068810; _gid=GA1.2.1755308867.1733164310; session=53616c7465645f5f4350d5bbe5581a358457355346a699332ee7ff2cda24ea091f9510850f7967c7a5cffe43c078f39f4b7b6a1038ec5b67ea98146792ee2868; _gat=1; _ga_MHSNPJKWC7=GS1.2.1733164310.2.1.1733164672.0.0.0'
        console.log(cookieHeader)
        const response = await fetch(`https://adventofcode.com/2024/day/${day}/input`, {
            headers: {
                Cookie: cookieHeader ?? "",
            }
        })
        const latestData = await response.text()
        const json: CachedDay = {
            day: day,
            fetchedAt: new Date().toISOString(),
            dataString: latestData
        }
        await fs.writeFile(`src/cache/day${day}.json`, JSON.stringify(json));
        return latestData;
    }
}

export default getDataForDay