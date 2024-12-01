import getDataForDay from './getData.js';


const splitInHalf = string => {
  const substring1 = string.substring(0, string.length / 2)
  const substring2 = string.substring(string.length / 2)
  return [substring1, substring2]
}
// const getCommon = stringsArray => {
//   let answer = ''
//   const firstCompartment = Array.from(stringsArray[0])
//   const secondCompartment = Array.from(stringsArray[1])
//   firstCompartment.forEach(letter => {
//     const found = secondCompartment.find(l => letter === l)
//     if (found) answer = found
//     return
//   })
//   return answer
// }

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const alphabetCapitals = alphabet.toUpperCase()

const getPriority = letter => {
  const alphabetPriority = alphabet.indexOf(letter) + 1
  if (alphabetPriority === 0) return alphabetCapitals.indexOf(letter) + 27
  return alphabetPriority
}



// getDataForDay(3)
// .then(text => {
//   let total = 0
//   const array = text.split('\n')
//   const result = array.map(item => splitInHalf(item))
//   const commoned = result.map(item => getCommon(item))
//   const prioritized = commoned.map(item => getPriority(item))
//   prioritized.forEach(item => total += item)
  
//   const logItem = index => {
//     console.log(array[index], result[index], commoned[index], prioritized[index])
//   }
  
//   console.log(total)
// })

const getCommon = stringsArray => {
  let answer = ''
  const firstCompartment = Array.from(stringsArray[0])
  const secondCompartment = Array.from(stringsArray[1])
  const thirdCompartment = Array.from(stringsArray[2])

  firstCompartment.forEach(letter => {
    const found = secondCompartment.find(l => letter === l)
    const foundSecond = thirdCompartment.find(l => letter === l)
    if (found && foundSecond) answer = found
    return
  })
  return answer
}



getDataForDay(3)
.then(text => {
  const array = text.split('\n')
  const commoned = array.map((item, index) => {
    const isFirstOfThree = index % 3 === 0 && array[index + 2]
    if (!isFirstOfThree) return 0
    const commonNominator = getCommon([array[index], array[index + 1], array[index + 2]]) 

    return getPriority(commonNominator)
  }).reduce((acc, curr) => acc + curr, 0)

  console.log(commoned)
  // const commoned = array.map(item => getCommon(item))
  // const prioritized = commoned.map(item => getPriority(item))
  // prioritized.forEach(item => total += item)
  
  // const logItem = index => {
  //   console.log(array[index], result[index], commoned[index], prioritized[index])
  // }
})