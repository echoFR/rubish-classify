import request from '@/utils/request'

export const getAll = () => {
  return request.get({
    url: '/practice/all',
    data: {
      name
    }
  })
}

export const getById = (id: number) => {
  return request.get({
    url: '/practice/byId',
    data: {
      id
    }
  })
}

export const addPractice = (practice: any) => {
  return request.post({
    url: '/practice/add',
    data: {
      data: {
        ...practice
      }
    }
  })
}

export const addVisitPractice = (practice: any) => {
  return request.post({
    url: '/api/practice/addVisit',
    data: {
      data: {
        ...practice
      }
    }
  })
}

export const deletePractice = (id: number) => {
  return request.post({
    url: '/practice/delete',
    data: {
      id
    }
  })
}