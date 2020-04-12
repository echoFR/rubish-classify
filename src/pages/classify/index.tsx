import Taro, { useEffect, useState, navigateTo } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Loading from '@/components/Loading'
import { AtIndexes, AtSegmentedControl } from 'taro-ui'
import pinyin from 'tiny-pinyin'
import { getByCategory } from '@/service/classify'
import ClassfiyDes from '@/components/ClassfiyDes'
import './index.less'

const Classify = () => {
  const [type, setType] = useState(0)
  const [allData, setAllData] = useState<any[]>([])
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const tabList = [
    {
      title: '湿垃圾',
      category: 4
    }, {
      title: '干垃圾',
      category: 8
    }, {
      title: '可回收垃圾',
      category: 1
    }, {
      title: '有害垃圾',
      category: 2
    },
  ]

  useEffect(() => {
    const getAllRubish = async () => {
      const promiseArr = tabList.map(({ category }) => getByCategory(category))
      const data = await Promise.all(promiseArr)
      data && setAllData(data)
      data && getCurList(data)
    }
    getAllRubish()
  }, [])

  const getCurList = (allData) => {
    setLoading(true)
    const alph = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'
    const obj = {}
    alph.split(' ').forEach((item) => {
      obj[item] = {
        title: item,
        key: item,
        items: []
      }
    })
    const data = allData[type] || []
    const reg = /^[a-zA-Z]/
    data.forEach(({ name }) => {
      let parseName = ''
      if (reg.test(name)) parseName = name.toUpperCase()
      else parseName = pinyin.convertToPinyin(name)
      if (parseName[0] in obj) {
        obj[parseName[0]].items.push({
          name
        })
      }
    })
    const arr = Object.keys(obj).map((key) => obj[key])
    setList(arr)
    setLoading(false)
  }
  useEffect(() => {
    if (allData.length) getCurList(allData)
  }, [type])
  useEffect(() => {
    if (!list.length) setLoading(true)
  }, list)
  return (
    <View className='classify'>
      <AtSegmentedControl
        values={tabList.map(({ title }) => title)}
        onClick={(value) => setType(value)}
        current={type}
      />
      <ClassfiyDes classify={tabList[type]['title']} show={false} />
      {
        loading
          ? <Loading />
          : <View className='list'>
            <AtIndexes
              onClick={({ name }) =>
                navigateTo({
                  url: `/pages/detail/index?name=${name}`
                })
              }
              topKey=''
              list={list}
            ></AtIndexes>
          </View>
      }
    </View>
  )
}

export default Classify