import request from '@/utils/request'
import { IHistoryList } from '@/utils/history'
export const getAllHistory = () => {
  return request.get({
    url: '/history/all'
  })
}

export const updateHistory = (list: IHistoryList[]) => {
  return request.post({
    url: '/history/update',
    data: {
      list
    }
  })
}

export const deleteAllHistory = () => {
  return request.post({
    url: '/history/deleteAll'
  })
}

export const getHostSearch = () => {
  return request.get({
    url: '/api/search/gethot'
  })
}

export const addSearch = (name: string) => {
  return request.post({
    url: '/api/search/add',
    data: {
      name
    }
  })
}