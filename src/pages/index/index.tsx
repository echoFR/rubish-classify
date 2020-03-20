import Taro, {
  navigateTo,
  getRecorderManager,
  getSetting,
  authorize,
  openSetting,
  useState,
} from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtModal } from 'taro-ui'
import { uploadVoice } from '@/service/home'
import voiceImg from '@/assets/voice.png'
import './index.less'

const Index = () => {
  const [voiceText, setVoiceText] = useState('按下语音识别')
  const [isOpened, setIsOpened] = useState(false)
  const [openFlag, setOnenFlag] = useState(false)
  const recorderManager = getRecorderManager()
  const onStartVoice = async () => {
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
            duration: 6000, // 最大时长，6000 ms
            format: 'mp3'
          })
          recorderManager.onStart()
        }
      }
    })
  }

  const onEndVoice = () => {
    getSetting({
      success: (setRes) => {
        const { authSetting } = setRes
        const type = 'scope.record'
        if (authSetting && authSetting[type]) {
          console.log('stop')
          recorderManager.onStop(async (res) => {
            console.log('recorder stop', res)
            const { tempFilePath } = res
            //上传录制的音频
            const data = uploadVoice(tempFilePath)
          })
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
        >
          <View className='voice-box'>
            <Image src={voiceImg} />
            <View>{voiceText}</View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index