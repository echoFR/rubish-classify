import Taro, { useRouter, useEffect, useState } from '@tarojs/taro'
import { View, WebView } from '@tarojs/components'

const UserPractice = () => {
  const router = useRouter()
  const [wd, setWd] = useState('')
  useEffect(() => {
    const { params: { name = '' } } = router
    setWd(name)
  }, [])
  return (
    <View>
      <WebView
        src={`https://www.baidu.com/s?ie=UTF-8&wd=${wd}是什么垃圾`}
      />
    </View>
  )
}

export default UserPractice