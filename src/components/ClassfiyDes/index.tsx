import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTag, AtAccordion, AtIcon } from 'taro-ui'
import data from './data'
import './index.less'

const ClassfiyDes = ({
  classify
}) => {
  const [curData, setCurData] = useState()
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (classify && data[classify]) {
      setCurData(data[classify])
    }
  }, [classify])
  return (
    <View className='classfiy-des'>
      {
        curData
          ? <View>
            <View className='des'>
              <Text style={{ marginRight: '10px' }}>{classify}：{curData.des}</Text>
              <AtIcon
                onClick={() => setOpen(!open)}
                value={open ? 'chevron-up' : 'chevron-down'}
                size='18'
                color='#909399'
              >
              </AtIcon>
            </View>
            {
              open
                ? <View>
                  <View className='common'>
                    <Text>常见物品：</Text>
                    <View className='common-list'>
                      {
                        curData.common.split(';').map((name) => (
                          <AtTag key={name} circle size='small'>{name}</AtTag>
                        ))
                      }
                    </View>
                  </View>
                  <View className='require'>
                    <Text>投放要求：</Text>
                    <View className='require-list'>
                      {
                        curData.require.split(';').map((title, index) => (
                          <View key={title} className='tip'>
                            <Text>·</Text>
                            <Text className='title'>{title}</Text>
                          </View>
                        ))
                      }
                    </View>
                  </View>
                </View>
                : null
            }
          </View>
          : null
      }
    </View>
  )
}
export default ClassfiyDes