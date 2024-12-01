import getDataForDay from './getData.js'

getDataForDay(2)
.then(text => text.split("\n"))
.then(dataArray => {
console.log('🚀 ~ dataArray', dataArray)
  let depth = 0
  let xPos = 0

  dataArray.forEach(item => {
    const number = Array.from(item).pop()
    if (item.includes('forward')) xPos += parseInt(number)
    if (item.includes('up')) depth -= parseInt(number)
    if (item.includes('down')) depth += parseInt(number)
  })
  console.log('first part: ', depth * xPos)
  return dataArray
})
.then(dataArray => {
  let aim = 0
  let depth = 0
  let xPos = 0
  
  dataArray.forEach(item => {
    const number = Array.from(item).pop()
    if (item.includes('forward')) {
      xPos += parseInt(number)
      depth += number * aim
      return
    }
    if (item.includes('up')) {
      aim -= parseInt(number)
      return
    }
    if (item.includes('down')) {
      aim += parseInt(number)
    }
  })
  console.log('second part: ', depth * xPos)
})