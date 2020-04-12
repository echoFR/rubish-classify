import Taro, { useState, useRouter, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtModal } from 'taro-ui'
import './index.less'

const Problems = () => {
  const router = useRouter()
  const [num, setNum] = useState(1)
  const [count, setCount] = useState<number>(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(0)
  const [list, setList] = useState(['尘土'])
  const [isOpened, setIsOpened] = useState(false)
  useEffect(() => {
    const { params: { count: initCount = '' } } = router
    setCount(Number(initCount))
  }, [])

  const goResult = () => {

  }

  const checkAnswer = (type) => {
    console.log(type)
  }
  return (
    <View className='problems'>
      <AtModal
        isOpened={isOpened}
        cancelText='继续练习'
        confirmText='查看结果'
        onClose={() => setIsOpened(false)}
        onCancel={() => setIsOpened(false)}
        onConfirm={() => goResult()}
        content='确定要结束练习吗？'
      />
      <View className='header'>
        <Text className='sub'>第{num}题 共{count}题</Text>
        <View className='right'>
          <Text className='sub'>正确{correct}题 错误{error}题</Text>
          <Text className='stop' onClick={() => setIsOpened(true)}>结束练习</Text>
        </View>
      </View>
      <View className='list'>
        <Text className='title'>{list[num]}</Text>
        <Text className='sub'>属于什么垃圾？</Text>
        <View className='btn'>
          <Text onClick={() => checkAnswer(4)}>湿垃圾</Text>
          <Text onClick={() => checkAnswer(8)}>干垃圾</Text>
          <Text onClick={() => checkAnswer(1)}>可回收垃圾</Text>
          <Text onClick={() => checkAnswer(2)}>有害垃圾</Text>
        </View>
      </View>
    </View>
  )
}

export default Problems