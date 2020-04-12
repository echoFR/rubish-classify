export interface IHistoryList {
  name: string
  type: number
  date?: string
}

const insertArray = (arr: IHistoryList[], val: string, maxlen?: number): IHistoryList[] => {
  const index = arr.findIndex(item => item.name === val)
  if (index === 0) return arr
  const newArr = [...arr]
  if (index > 0) newArr.splice(index, 1)
  newArr.unshift({
    name: val,
    type: 1,
    date: `${new Date().getTime()}`
  })
  if (maxlen && newArr.length > maxlen) newArr.pop()
  return newArr
}

export const addHistory = (arr: IHistoryList[], val: string): IHistoryList[] => {
  const maxlen = 10
  return insertArray(arr, val, maxlen) || []
}