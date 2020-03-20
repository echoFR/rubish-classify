import request from '@/utils/request'
import { IuserInfoType } from '@/store/userInfo/types'

export const userLogin = (data: {
  code: string,
  userInfo: IuserInfoType
}) => {
  return request.post({
    url: '/login',
    data
  })
}