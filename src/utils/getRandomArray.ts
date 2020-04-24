const getRandomArray = (arr, count) => {
  const shuffled = arr.slice(0)
  let temp, index, i = arr.length
  const min = i - count
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }
  return shuffled.slice(min)
}

export default getRandomArray