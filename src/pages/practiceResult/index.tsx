import Taro, { useRouter, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'
const PracticeResult = () => {
  const router = useRouter()
  useEffect(() => {
    const { params: { id = '' } } = router
    console.log(id)
  }, [])
  return (
    <View>
      PracticeResult
    </View>
  )
}

export default PracticeResult