import Taro, { useEffect, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIndexes, AtTabs, AtTabsPane } from 'taro-ui'
import pinyin from 'tiny-pinyin'
import { getByCategory } from '@/service/classify'
import ClassfiyDes from '@/components/ClassfiyDes'
import './index.less'

const Classify = () => {
  const alph = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'
  const obj = {}
  alph.split(' ').forEach((item) => {
    obj[item] = {
      title: item,
      key: item,
      items: []
    }
  })
  const arr = Object.keys(obj).map((key) => obj[key])
  const [type, setType] = useState(0)
  const [listObj, setListObj] = useState(obj)
  const [list, setList] = useState(arr)

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

  const getRubish = async () => {
    const newObj = {}
    Object.keys(listObj).forEach((key) => {
      newObj[key] = {
        ...listObj[key],
        items: []
      }
    })
    const obj = Object.assign({}, newObj)
    const data = await getByCategory(tabList[type]['category'])
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
    setListObj(obj)
    const arr = Object.keys(obj).map((key) => obj[key])
    setList(arr)
  }
  useEffect(() => {
    getRubish()
  }, [type])
  return (
    <View className='classify'>
      <View className='tabs'>
        <AtTabs
          animated={false}
          current={type}
          tabList={tabList}
          onClick={(value) => setType(value)}>
          {
            tabList.map((item, index) => (
              <AtTabsPane
                current={type}
                index={index}
                key={item.category}>
                <ClassfiyDes classify={item} />
              </AtTabsPane>
            ))
          }
        </AtTabs>
      </View>
      <AtIndexes
        list={list}
      >
      </AtIndexes>
    </View>
  )
}

export default Classify