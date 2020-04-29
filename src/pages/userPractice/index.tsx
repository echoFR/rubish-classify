import Taro, { useState, useEffect, navigateTo } from '@tarojs/taro'
import { View } from '@tarojs/components'
import moment from 'moment'
import Loading from '@/components/Loading'
import { getAll } from '@/service/practice'
import './index.less'
const UserPractice = () => {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const getAllData = async () => {
    setLoading(true)
    const data = await getAll()
    setList(data || [])
    setLoading(false)
  }
  useEffect(() => {
    getAllData()
  }, [])
  return (
    <View className='user-practice'>
      {
        loading
          ? <Loading />
          : list.length
            ? list.map(item => (<View
              key={item.id}
              className='list-item'
              onClick={() => navigateTo({
                url: `/pages/practiceResult/index?id=${item.id}`
              })}
            >
              <View>
                共{item.num}题，
              正确{item.correct_num}题
              错误{item.error_num}题，
              </View>
              <View style={{ textAlign: 'end' }}>{item.date && moment(Number(item.date)).format('YYYY年MM月DD日 HH:mm:ss')}</View>
            </View>))
            : <View className='empty'>暂无答题记录</View>
      }
    </View>
  )
}

export default UserPractice