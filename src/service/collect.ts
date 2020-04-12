import request from '@/utils/request'

export const getAllCollect = () => {
  return request.get({
    url: '/collect/all'
  })
}

export const addCollect = (name: string) => {
  return request.post({
    url: '/collect/add',
    data: {
      name
    }
  })
}

export const deleteCollect = (name: string) => {
  return request.post({
    url: '/collect/delete',
    data: {
      name
    }
  })
}

export const deleteAllCollect = () => {
  return request.post({
    url: '/collect/deleteAll'
  })
}