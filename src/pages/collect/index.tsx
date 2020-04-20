import Taro, { navigateTo, useEffect, useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { useSelector } from '@tarojs/redux'
import Loading from '@/components/Loading'
import { getCollect, deleteCollect } from '@/service/collect'
import './index.less'
const Collect = () => {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const userInfo = useSelector((state: any) => {
    return state.userInfo
  })

  const getCollectList = async () => {
    setLoading(true)
    const data = await getCollect()
    setList(data)
    setLoading(false)
  }
  useEffect(() => {
    if (userInfo.token) getCollectList()
    else {
      navigateTo({
        url: '/pages/user/index'
      })
    }
  }, [userInfo])
  const categoryObj = {
    4: '湿垃圾',
    8: '干垃圾',
    1: '可回收垃圾',
    2: '有害垃圾'
  }
  const handleDelete = async (name) => {
    await deleteCollect(name)
    const newList = list.filter((item) => item.name !== name)
    setList(newList)
  }
  return (
    <View className='collect'>
      {
        loading
          ? <Loading />
          : list.length
            ? list.map((item) => <View
              key={item.name}
              className='list-item'
            >
              <View
                className='title'
                onClick={() => navigateTo({
                  url: `/pages/detail/index?name=${item.name}`
                })}
              >
                <Text className='name'>{item.name}</Text>
                <Text className='type'>
                  {categoryObj[item.category]}
                </Text>
              </View>
              <View
                onClick={() => handleDelete(item.name)}
                style={{ padding: '0 10px' }}
              >
                <AtIcon value='trash' size='16' customStyle={{ height: '20px' }}>
                </AtIcon>
              </View>
            </View>)
            : <View className='empty'>暂无收藏</View>
      }
    </View>
  )
}

export default Collect