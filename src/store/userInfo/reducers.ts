import { getStorageSync, setStorageSync, removeStorageSync } from '@tarojs/taro'
import {
  IuserInfoType,
  UPDATE_USER,
  DELETE_USER,
  userInfoActionTypes
} from './types'

let initialState: IuserInfoType = {}
try {
  const userInfo = getStorageSync('user_info')
  if (userInfo) {
    initialState = userInfo
  } else {
    setStorageSync('user_info', {})
  }
} catch (e) {
}

const userInfoReducer = (
  state = initialState,
  actions: userInfoActionTypes
): IuserInfoType => {
  switch (actions.type) {
    case UPDATE_USER:
      setStorageSync('user_info', actions.payload)
      return actions.payload
    case DELETE_USER:
      removeStorageSync('user_info')
      return {
        nickName: ''
      }
    default:
      return state
  }
}

export default userInfoReducer