import Taro, { navigateTo } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'

const TabList = ({ list = [] }: {
  list: any[]
}) => {
  return (
    <View className='tab-list'>
      {
        list.map((item) => (
          <View
            className='tab'
            key={item.name}
            onClick={() => navigateTo({
              url: `/pages/detail/index?name=${item.name}`
            })}
          >
            {item.name}
          </View>
        ))
      }
    </View>
  )
}

export default TabList