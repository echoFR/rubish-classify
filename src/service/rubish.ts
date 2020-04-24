import request from '@/utils/request'

export const getByName = (name)=>{
  return request.get({
    url: '/api/rubbish/name',
    data: {
      name
    }
  })
}

export const getByNameOne = (name)=>{
  return request.get({
    url: '/api/rubbish/nameOne',
    data: {
      name
    }
  })
}

export const getAll = ()=>{
  return request.get({
    url: '/api/rubbish/all'
  })
}