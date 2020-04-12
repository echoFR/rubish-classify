import Taro, { useRouter, useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { getByNameOne } from '@/service/rubish'
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
  const [detail, setDetail] = useState<any>({})
  const [isCollect, setIsCollect] = useState(false)
  const getRubishData = async (name: string) => {
    const data = await getByNameOne(name)
    data && data.length && setDetail(data[0] || {})
  }
  useEffect(() => {
    const { params: { name } } = router
    if (name) {
      getRubishData(name)
    }
  }, [])


  const changeCollect = () => {
    if (isCollect) {
      console.log('取消收藏')
    } else {
      console.log('添加收藏')
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