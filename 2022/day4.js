import getDataForDay from './getData.js';

getDataForDay(4)
.then(text => {
    const array = text.split('\n')
    const parsed = array.map(item => item.split(',').map(subItem => subItem.split('-').map(item => parseInt(item))))
    const result = parsed.map(parsedItem => {
        const firstElveStart = parsedItem[0]?.[0]
        const firstElveEnd = parsedItem[0]?.[1]
        const secondElveStart = parsedItem[1]?.[0]
        const secondElveEnd = parsedItem[1]?.[1]
        
        if (!firstElveStart || !firstElveEnd || !secondElveEnd || !secondElveStart) return 0
        if (firstElveStart <= secondElveEnd && firstElveStart >= secondElveStart) return 1
        if (firstElveEnd <= secondElveEnd && firstElveStart >= secondElveStart) return 1
        if (firstElveStart <= secondElveStart && firstElveEnd >= secondElveEnd) return 1
        if (firstElveEnd <= secondElveEnd && firstElveEnd >= secondElveStart) return 1
        return 0
    }).reduce((acc, curr) => acc + curr, 0)
    console.log(result);
})