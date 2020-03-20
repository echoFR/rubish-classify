import Taro, { useState, useEffect, login, navigateTo } from '@tarojs/taro'
import { useSelector, useDispatch } from '@tarojs/redux'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtToast } from 'taro-ui'
import { RootState } from '@/store/index'
import { updateUserInfo } from '@/store/userInfo/actions'
import request from '@/utils/request'
import { userLogin } from '@/service/user'
import userImg from '@/assets/user1.png'
import collectImg from '@/assets/collect.png'
import suggestImg from '@/assets/suggest.png'
import './index.less'

const User = () => {
  const userInfo = useSelector((state: RootState) => (state.userInfo))
  const [needLogin, setNeedLogin] = useState(true)
  const [openToast, setOpenToast] = useState(false)

  const dispatch = useDispatch()

  const changeNeedLogin = () => {
    if (userInfo && userInfo.nickName && userInfo.token) {
      setNeedLogin(false)
    } else {
      setNeedLogin(true)
    }
  }
  useEffect(() => {
    changeNeedLogin()
  }, [])

  useEffect(() => {
    changeNeedLogin()
  }, [userInfo])

  const onGetUserInfo = async (e) => {
    const { userInfo: curUserInfo } = e.detail
    if (curUserInfo) {
      delete curUserInfo.language
      try {
        const loginRes = await login({})
        const data = await userLogin({
          code: loginRes.code,
          userInfo: curUserInfo
        })
        if (data) {
          dispatch(updateUserInfo(data))
        }
      } catch (error) {
      }
    } else {
      setOpenToast(true)
    }
  }
  return (
    <View className='user'>
      <AtToast isOpened={openToast} text='请允许授权'></AtToast>
      <View className='user_info'>
        {
          needLogin
            ? <Button
              className='to-sign'
              open-type='getUserInfo' onGetUserInfo={onGetUserInfo}
            >
              <Image src={userImg} />
              <View>
                <Text>请点击登录</Text>
              </View>
            </Button>
            : <View className='info-con'>
              <Image src={userInfo.avatarUrl || ''} />
              <View>
                <Text>{userInfo.nickName}</Text>
              </View>
            </View>
        }

      </View>
      <View className='user-feats'>
        <View onClick={() => {
          navigateTo({
            url: '/pages/collect/index'
          })
        }}
        >
          <Image src={collectImg} />
          <Text>我的收藏</Text>
        </View>
        <View onClick={() => {
          navigateTo({
            url: '/pages/userPractice/index'
          })
        }}
        >
          <Image src={suggestImg} />
          <Text>答题记录</Text>
        </View>
      </View>
    </View>
  )
}

export default User