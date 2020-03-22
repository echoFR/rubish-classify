import Taro, { useState, useEffect, navigateBack } from '@tarojs/taro'
import { View, Input, Text, Image } from '@tarojs/components'
import { AtIcon, AtModal } from 'taro-ui'
// import { useSelector } from '@tarojs/redux'
import debounce from '@/utils/debounce'
import TabList from '@/components/TabList'
import hotImg from '@/assets/hot.png'
import './index.less'

const Search = () => {
  const [value, setValue] = useState('')
  const [visible, setVisible] = useState(false)
  const [historyList, setHistoryList] = useState<string[]>([])
  const [hotList, setHotList] = useState<string[]>([])
  // const userInfo = useSelector((state: any) => {
  //   return state.userInfo
  // })
  useEffect(() => {
    setHistoryList(['a', 'b', 'c'])
    setHotList(['电池', '化妆棉', '果壳'])
  }, [])
  useEffect(() => {
    const val = value.trim()
    if (val) {
      console.log('val', val)
    }
  }, [value])

  const deleteHistory = async () => {
    console.log('删除记录')
    setVisible(false)
  }
  return (
    <View className='search'>
      <View className='search-header'>
        <View className='search-header-bar'>
          <AtIcon value='search' size='18' customStyle={{ height: '26px' }}>
          </AtIcon>
          <Input
            className='input'
            placeholder='请输入垃圾名称'
            onInput={debounce((e) => {
              setValue(e.target.value)
            })}
          />
        </View>
        <Text className='cancel' onClick={() => navigateBack()}>取消</Text>
      </View>
      <Text>{value}</Text>
      {/* 最近搜索 */}
      <View className='history-box'>
        <AtModal
          isOpened={visible}
          cancelText='取消'
          confirmText='确认'
          onCancel={() => setVisible(false)}
          onConfirm={() => deleteHistory()}
          content='确定要删除全部历史记录吗？'
        />
        <View className='history'>
          <View className='header'>
            <AtIcon value='clock' size='18' color='#53A8FF'>
            </AtIcon>
            <Text className='title'>最近搜索</Text>
            <AtIcon
              onClick={() => setVisible(true)}
              value='trash'
              size='18'
              color='#909399'
            >
            </AtIcon>
          </View>
          <TabList list={historyList} />
        </View>
      </View>
      {/* 热搜 */}
      <View className='hot'>
        <View className='header'>
          <Image src={hotImg} />
          <Text className='title'>热搜</Text>
        </View>
        <TabList list={hotList} />
      </View>
    </View>
  )
}

export default Search