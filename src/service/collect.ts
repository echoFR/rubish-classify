import request from '@/utils/request'

export const getCollect = (name?: string) => {
  const url = '/collect/get'
  if (name) {
    return request.get({
      url,
      data: {
        name
      }
    })
  }
  return request.get({
    url
  })
}

export const addCollect = (detail: any) => {
  return request.post({
    url: '/collect/add',
    data: {
      data: {
        ...detail,
        date: `${new Date().getTime()}`
      }
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