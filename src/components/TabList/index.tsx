import Taro, { navigateTo } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'

const TabList = ({ list = [] }) => {
  return (
    <View className='tab-list'>
      {
        list.map((name) => (
          <View
            className='tab'
            key={name}
            onClick={() => navigateTo({
              url: `/pages/detail/index?name=${name}`
            })}
          >
            {name}
          </View>
        ))
      }
    </View>
  )
}

export default TabList