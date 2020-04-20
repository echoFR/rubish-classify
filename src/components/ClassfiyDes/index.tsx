import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTag, AtIcon } from 'taro-ui'
import data from './data'
import './index.less'

const ClassfiyDes = ({
  classify,
  show = true
}) => {
  const [curData, setCurData] = useState<any>({
    des: '',
    common: '',
    require: ''
  })
  const [open, setOpen] = useState(show)

  useEffect(() => {
    if (classify && data[classify]) setCurData(data[classify])
  }, [classify])
  return (
    <View className='classfiy-des'>
      {
        curData
          ? <View>
            <View className={'des-common'}>
              <Text style={{ marginRight: '10px' }}>{classify}：{curData.des}</Text>
              <AtIcon
                onClick={() => setOpen(!open)}
                value={open ? 'chevron-up' : 'chevron-down'}
                size='18'
                color='#fff'
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
                          <AtTag key={name} circle>{name}</AtTag>
                        ))
                      }
                    </View>
                  </View>
                  <View className='require'>
                    <Text>投放要求：</Text>
                    <View className='require-list'>
                      {
                        curData.require.split(';').map((title) => (
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