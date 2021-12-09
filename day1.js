import getDataForDay from './getData.js';

getDataForDay(1)
.then(text => {
  const numbersArray = text.split("\n").map(string => parseInt(string))
  let increased = 0
  for (const index of numbersArray.keys() ) if (numbersArray[index] > numbersArray[index - 1]) increased++
  console.log('first part: ', increased, 'items increased')
  return numbersArray
})
.then(numbersArray => {
  let increased = 0
  for (const index of numbersArray.keys() ) {
    if (numbersArray?.[index + 3]) {
      const firstSum = numbersArray[index] + numbersArray[index + 1] + numbersArray[index + 2]
      const secondSum = numbersArray[index + 1] + numbersArray[index + 2] + numbersArray[index + 3]
      if (secondSum > firstSum) increased++
    }
  }
  console.log('second part: ', increased, 'items increased')
})