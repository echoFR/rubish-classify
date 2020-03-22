import request from '@/utils/request'

export const getByCategory = (category)=>{
  return request.get({
    url: '/api/rubbish/category',
    data: {
      category
    }
  })
}