import Taro, { navigateTo } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.less'

const Index = () => {
  return (
    <View className='home'>
      <View className='home-search'
        onClick={()=>navigateTo({
          url: '/pages/search/index'
        })}
      >
        <AtIcon value='search' size='18' customStyle={{height: '20px'}}>
        </AtIcon>
        <Text className='text'>请输入垃圾名称</Text>
      </View>
    </View>
  )
}

export default Index