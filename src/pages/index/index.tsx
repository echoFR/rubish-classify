import Taro, {
  navigateTo,
  getRecorderManager,
  getSetting,
  authorize,
  openSetting,
  useState,
  saveFile,
  createInnerAudioContext,
} from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtModal } from 'taro-ui'
import { uploadVoice } from '@/service/home'
import voiceImg from '@/assets/voice.png'
import './index.less'

const Index = () => {
  const [voiceText, setVoiceText] = useState({
    text: '按下语音识别',
    backColor: '#1989fa'
  })
  const [isOpened, setIsOpened] = useState(false)
  const [openFlag, setOnenFlag] = useState(false)
  const recorderManager = getRecorderManager()
  const innerAudioContext = createInnerAudioContext()
  // 录音开始回调
  recorderManager.onStart({
    fail: () => {
      Taro.showToast({
        title: `录音失败，请重试`,
        icon: 'none'
      })
    }
  })
  // 结束回调
  recorderManager.onStop(async (res) => {
    console.log('recorder stop', res)
    const { tempFilePath } = res
    //上传录制的音频
    if (tempFilePath) {
      // innerAudioContext.src = tempFilePath;
      // innerAudioContext.play()
      const data = await uploadVoice(tempFilePath)
    }
  })
  const onStartVoice = async () => {
    setVoiceText({
      text: '松开取消',
      backColor: '#F56C6C'
    })
    getSetting({
      success: (setRes) => {
        const { authSetting } = setRes
        const type = 'scope.record'
        if (authSetting && !authSetting[type]) {
          authorize({
            scope: type,
          }).catch(() => {
            if (openFlag) setIsOpened(true)
            else setOnenFlag(true)
          })
        } else {
          recorderManager.start({
            duration: 60000, // 接口最长 1 分钟
          })
        }
      }
    })
  }

  const onEndVoice = () => {
    setVoiceText({
      text: '按下语音识别',
      backColor: '#1989fa'
    })
    getSetting({
      success: (setRes) => {
        const { authSetting } = setRes
        const type = 'scope.record'
        if (authSetting && authSetting[type]) {
          recorderManager.stop()
        }
      }
    })
  }
  return (
    <View className='home'>
      <AtModal
        isOpened={isOpened}
        title='授权提醒'
        cancelText='取消'
        confirmText='确认'
        onClose={() => setIsOpened(false)}
        onCancel={() => setIsOpened(false)}
        onConfirm={() => {
          try {
            openSetting({})
            setIsOpened(false)
          } catch (error) {
          }
        }}
        content='您之前拒绝过录音授权，本次是否打开授权'
      />
      <View className='home-search'
        onClick={() => navigateTo({
          url: '/pages/search/index'
        })}
      >
        <AtIcon value='search' size='18' customStyle={{ height: '20px' }}>
        </AtIcon>
        <Text className='text'>请输入垃圾名称</Text>
      </View>
      <View className='home-feat'>
        <View
          onTouchStart={onStartVoice}
          onTouchEnd={onEndVoice}
          className='voice'
          style={{
            backgroundColor: voiceText.backColor
          }}
        >
          <View className='voice-box'>
            <Image src={voiceImg} />
            <View>{voiceText.text}</View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index