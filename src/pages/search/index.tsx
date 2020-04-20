import Taro, { useState, useEffect, navigateBack, navigateTo } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon, AtModal, AtInput } from 'taro-ui'
import { useSelector } from '@tarojs/redux'
import Loading from '@/components/Loading'
import {
  getAllHistory,
  getHostSearch,
  updateHistory,
  deleteAllHistory,
  addSearch
} from '@/service/history'
import { getByName } from '@/service/rubish'
import debounce from '@/utils/debounce'
import { addHistory } from '@/utils/history'
import TabList from '@/components/TabList'
import hotImg from '@/assets/hot.png'
import emptyImg from '@/assets/empty.png'
import './index.less'

const Search = () => {
  const [value, setValue] = useState('')
  const [visible, setVisible] = useState(false)
  const [historyList, setHistoryList] = useState<any[]>([])
  const [hotList, setHotList] = useState<any[]>([])
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [feedback, setFeedback] = useState(false)

  const userInfo = useSelector((state: any) => {
    return state.userInfo
  })

  const getHostSearchData = async () => {
    const data = await getHostSearch()
    data && setHotList(data)
  }
  useEffect(() => {
    getHostSearchData()
  }, [])

  const getAllHistoryData = async () => {
    const data = await getAllHistory()
    data && setHistoryList(data)
  }
  useEffect(() => {
    if (userInfo.token) getAllHistoryData()
  }, [userInfo])


  const getByNameData = async (name: string) => {
    setLoading(true)
    const data = await getByName(name)
    data && setList(data)
    setLoading(false)
  }
  useEffect(() => {
    if (value.trim()) getByNameData(value)
    else setList([])
  }, [value])

  const deleteHistory = async () => {
    await deleteAllHistory()
    setHistoryList([])
    setVisible(false)
  }

  const handleFeedBack = () => {
    setShowToast(true)
    setFeedback(false)
    // 反馈 
    // setFeedback(true)
    // setShowToast(false)
  }

  const handleGoDetail = async (name: string) => {
    const newList = addHistory(historyList, name)
    if (JSON.stringify(historyList) !== JSON.stringify(newList) && newList.length) {
      setHistoryList(newList)
      await updateHistory(newList)
    }
    await addSearch(name)
    navigateTo({
      url: `/pages/detail/index?name=${name}`
    })
  }

  const categoryObj = {
    4: '湿垃圾',
    8: '干垃圾',
    1: '可回收垃圾',
    2: '有害垃圾'
  }

  return (
    <View className='search'>
      <View className='search-header'>
        <View className='search-header-bar'>
          <AtInput
            name='search-input'
            clear
            type='text'
            border={false}
            value={value}
            className='input'
            placeholder='请输入垃圾名称'
            onChange={debounce((value: string) => setValue(value))}
          />
        </View>
        <Text className='cancel' onClick={() => navigateBack()}>取消</Text>
      </View>
      {
        showToast ? <Loading
          text={feedback ? '反馈完成' : '反馈中'}
          status={feedback ? 'success' : 'loading'}
        /> : null
      }
      {
        value
          ? loading ? <Loading /> : <View className='list-box'>
            {
              list.length
                ?
                list.map((item) => <View
                  key={item.name}
                  className='list-item'
                  onClick={() => handleGoDetail(item.name)}
                >
                  <Text className='name'>{item.name}</Text>
                  <Text className='type'>
                    {categoryObj[item.category]}
                  </Text>
                  <View style={{ padding: '0 10px' }}>
                    <AtIcon value='chevron-right' size='16' color='#909399' customStyle={{ height: '20px' }}>
                    </AtIcon>
                  </View>
                </View>)
                : <View className='empty'>
                  <Image src={emptyImg} />
                  <View className='text' onClick={() => handleFeedBack()}>
                    查找不到<Text className='name'>“ {value} ”</Text>，请点击此处反馈
                </View>
                  <View onClick={() => navigateTo({
                    url: `/pages/webView/index?name=${value}`
                  })}>或者点击此处进行网络查询</View>
                </View>
            }
          </View>
          : <View>
            {
              historyList.length
                ? <View className='history-box'>
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
                : null
            }
            {
              hotList.length
                ? <View className='hot'>
                  <View className='header'>
                    <Image src={hotImg} />
                    <Text className='title'>热搜</Text>
                  </View>
                  <TabList list={hotList} />
                </View>
                : null
            }
          </View>
      }
    </View>
  )
}

export default Search