// State
export interface IuserInfoType {
  id?: number
  nickName?: string // 昵称
  avatarUrl?: string // 头像
  gender? : '1' | '2' | '0' // 1男，2女，0未知
  city?: string // 城市
  province?: string // 省份
  country?: string // 国家
  token?: string // token
}
// Actions type
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'

// Action Creators
interface IupdateUserInfo {
  type: typeof UPDATE_USER
  payload: IuserInfoType
}
interface IdeleteUserInfo {
  type: typeof DELETE_USER
}
export type userInfoActionTypes = IupdateUserInfo | IdeleteUserInfo