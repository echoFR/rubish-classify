import Taro, { useState, useRouter, useEffect, redirectTo } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtModal } from 'taro-ui'
import { useSelector } from '@tarojs/redux'
import { getAll } from '@/service/rubish'
import { addPractice, addVisitPractice } from '@/service/practice'
import getRandomArray from '@/utils/getRandomArray'
import './index.less'
const classify = {
  4: '湿垃圾',
  8: '干垃圾',
  1: '可回收垃圾',
  2: '有害垃圾'
}
const Problems = () => {
  const router = useRouter()
  const [count, setCount] = useState<number>(0)
  const [num, setNum] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(0)
  const [list, setList] = useState<any[]>([])
  const [isOpened, setIsOpened] = useState(false)
  const [tip, setTip] = useState(false)
  const [index, setIndex] = useState<number>()
  const [curStatus, setCurStatus] = useState<number>()

  const userInfo = useSelector((state: any) => {
    return state.userInfo
  })

  const getList = async () => {
    const { params: { count: initCount } } = router
    setCount(Number(initCount))
    const data = await getAll()
    const list = getRandomArray(data, initCount).map((item)=>({
      ...item,
      status: 2 // 默认未答题
    }))
    setList(list)
  }
  useEffect(() => {
    getList()
  }, [])

  const checkAnswer = (type, curIndex) => {
    if (num < count) {
      const { category } = list[num]
      setIndex(curIndex)
      if (category !== type) { // 错误
        setCurStatus(2)
        setError(error + 1)
        list[num].status = 0
        setTip(true)
      } else {
        setCurStatus(1)
        setCorrect(correct + 1)
        list[num].status = 1
        handleNext()
      }
    }
  }

  const handleNext = () => {
    setTimeout(() => {
      setCurStatus(0)
      setIndex(0)
      if (num + 1 < count) setNum(num + 1)
      else redirectToResult()
    }, 500);
  }

  const redirectToResult = async () => {
    // 添加后跳转
    const date = `${new Date().getTime()}`
    const id = `${date}`
    const practice = {
      id,
      date,
      num: count,
      correct_num: correct,
      error_num: error,
      list
    }
    if (userInfo.token) await addPractice(practice)
    else await addVisitPractice(practice)
    redirectTo({
      url: `/pages/practiceResult/index?id=${id}`
    })
  }

  return (
    <View className='problems'>
      <AtModal
        isOpened={isOpened}
        cancelText='继续练习'
        confirmText='查看结果'
        onClose={() => setIsOpened(false)}
        onCancel={() => setIsOpened(false)}
        onConfirm={() => redirectToResult()}
        content='确定要结束练习吗？'
      />
      <AtModal
        isOpened={tip}
        cancelText=''
        confirmText='知道了'
        onClose={() => setTip(false)}
        onConfirm={() => {
          setTip(false)
          handleNext()
        }}
        content={`${list[num] && list[num].name}属于${list[num] && classify[list[num].category]}`}
      />
      <View className='header'>
        <Text className='sub'>第{num + 1}题 共{count}题</Text>
        <View className='right'>
          <Text className='sub'>正确{correct}题 错误{error}题</Text>
          <Text className='stop' onClick={() => setIsOpened(true)}>结束练习</Text>
        </View>
      </View>
      <View className='list'>
        <Text className='title'>{list[num].name}</Text>
        <Text className='sub'>属于什么垃圾？</Text>
        <View className='btn'>
          <Text
            onClick={() => checkAnswer(4, 1)}
            className={index === 1 ? curStatus && curStatus === 1 ? 'correct' : 'error' : ''}
          >湿垃圾</Text>
          <Text
            onClick={() => checkAnswer(8, 2)}
            className={index === 2 ? curStatus && curStatus === 1 ? 'correct' : 'error' : ''}
          >干垃圾</Text>
          <Text
            onClick={() => checkAnswer(1, 3)}
            className={index === 3 ? curStatus && curStatus === 1 ? 'correct' : 'error' : ''}
          >可回收垃圾</Text>
          <Text
            onClick={() => checkAnswer(2, 4)}
            className={index === 4 ? curStatus && curStatus === 1 ? 'correct' : 'error' : ''}
          >有害垃圾</Text>
        </View>
      </View>
    </View>
  )
}

export default Problems