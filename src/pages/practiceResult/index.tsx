import Taro, { useRouter, useEffect, useState, navigateTo } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { getById } from '@/service/practice'
import Loading from '@/components/Loading'
import './index.less'
const PracticeResult = () => {
  const router = useRouter()
  const [result, setResult] = useState()
  const [loading, setLoading] = useState(false)
  const getByIdData = async () => {
    const { params: { id = '' } } = router
    setLoading(true)
    const data = await getById(id)
    setResult(data)
    setLoading(false)
  }
  useEffect(() => {
    getByIdData()
  }, [])
  const classify = {
    4: '湿垃圾',
    8: '干垃圾',
    1: '可回收垃圾',
    2: '有害垃圾'
  }
  return (
    <View className='result'>
      {
        loading
          ? <Loading />
          : result && result.list
            ? <View>
              <View className='des'>
                <View className='title'>答题记录</View>
                <View className='num'>
                  <Text>回答正确：{result.correct_num}</Text>
                  <Text>回答错误：{result.error_num}</Text>
                  <Text>未作答：{result.num - result.correct_num - result.error_num}</Text>
                </View>
              </View>
              <View className='list'>
                {result.list.map((item, index) => (<View
                  onClick={({ name }) =>
                    navigateTo({
                      url: `/pages/detail/index?name=${item.name}`
                    })
                  }
                  key={index}
                  className='list-item'
                >
                  <AtIcon
                    value={item.status ? item.status === 1 ? 'check-circle' : 'subtract-circle' : 'close-circle'}
                    color={item.status ? item.status === 1 ? 'green' : 'blue' : 'red'}
                    size='18'
                  ></AtIcon>
                  <Text className='info'>
                    {item.name}{item.status === 1 ? '属于' : '应属于'}{classify[item.category]}
                  </Text>
                </View>))}
              </View>
            </View>
            : <View className='empty'>暂无数据</View>
      }
    </View>
  )
}

export default PracticeResult