import Taro, { useState, navigateTo } from '@tarojs/taro'
import { View, Image, Picker, Text, Button } from '@tarojs/components'
import practiceImg from '@/assets/pratice.png'
import './index.less'

const Practice = () => {
  const [count, setCount] = useState(3)
  const selector = [3, 10, 50, 100, 500]
  const startPractice = () => {
    navigateTo({
      url: `/pages/problems/index?count=${count}`
    })
  }

  const onChange = (e) => {
    setCount(selector[e.detail.value])
  }
  return (
    <View className='practice'>
      <View className='img'>
        <Image src={practiceImg} />
      </View>
      <View className='title'>
        <Text>垃圾分类练习</Text>
        <Text className='sub'>从生活点滴做起</Text>
      </View>
      <Picker value={count} mode='selector' range={selector} onChange={onChange}>
        <View className='picker'>
          <Text className='sub'>题目数量</Text>
          <Text>{count}</Text>
        </View>
      </Picker>
      <Button className='btn' onClick={() => startPractice()}>
        开始练习
      </Button>
    </View>
  )
}

export default Practice