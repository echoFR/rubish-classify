import Taro, { useRouter, useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { useSelector } from '@tarojs/redux'
import { getByNameOne } from '@/service/rubish'
import { getCollect, addCollect, deleteCollect } from '@/service/collect'
import ClassfiyDes from '@/components/ClassfiyDes'
import './index.less'

const classify = {
  4: '湿垃圾',
  8: '干垃圾',
  1: '可回收垃圾',
  2: '有害垃圾'
}
const Detail = () => {
  const router = useRouter()
  const { params: { name } } = router
  const [detail, setDetail] = useState<any>({})
  const [isCollect, setIsCollect] = useState(false)
  const userInfo = useSelector((state: any) => {
    return state.userInfo
  })

  const getRubishData = async (name: string) => {
    const data = await getByNameOne(name)
    data && data.length && setDetail(data[0] || {})
  }
  useEffect(() => {
    if (name) getRubishData(name)
  }, [])

  const getCollectData = async () => {
    const data = await getCollect(name)
    if (data && data.length) setIsCollect(true)
  }

  useEffect(() => {
    if (userInfo.token) getCollectData()
  }, [userInfo])

  const changeCollect = async () => {
    if (isCollect) {
      await deleteCollect(name)
      setIsCollect(false)
    } else {
      await addCollect({
        name: detail.name,
        category: detail.category
      })
      setIsCollect(true)
    }
  }
  return (
    <View className='detail'>
      <View className='detail-con'>
        <View className={`img img-${detail.category}`}></View>
        <View className='title'>
          {detail.name} 属于 {classify[detail.category]}
        </View>
        <AtButton
          className={
            !isCollect
              ? 'btn add-collect'
              : 'btn delete-collect'
          }
          circle
          size='small'
          onClick={() => changeCollect()}
        >
          {
            !isCollect ? '+ 加入收藏' : '- 取消收藏'
          }
        </AtButton>
      </View>
      <ClassfiyDes
        classify={classify[detail.category]}
      ></ClassfiyDes>
    </View>
  )
}

export default Detail