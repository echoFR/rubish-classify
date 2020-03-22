import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtAccordion } from 'taro-ui'
import data from './data'

const ClassfiyDes = ({
  classify
}) => {
  const [open, setOpen] = useState(true)
  return (
    <View className='classfiy-des'>
      <AtAccordion
        open={open}
        title={classify && classify.title || ''}
        onClick={() => setOpen(!open)}
      >
      </AtAccordion>
    </View>
  )
}
export default ClassfiyDes