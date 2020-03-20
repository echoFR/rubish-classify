import Taro, { useRouter, useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'

const Detail = () => {
  const router = useRouter()
  const [curName, setCurName] = useState('')
  useEffect(() => {
    const { params: { name } } = router
    if (name) {
      setCurName(name)
    }
  }, [])
  return (
    <View>
      {curName}
    </View>
  )
}

export default Detail