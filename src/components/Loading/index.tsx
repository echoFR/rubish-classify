import Taro from '@tarojs/taro'
import { AtToast } from 'taro-ui'


const Loading = (
  {
    text = '加载中',
    status = 'loading',
    hasMask = true
  }
) => <AtToast
  isOpened
  hasMask={hasMask}
  duration={0}
  text={text}
  status={status}>
  </AtToast>

export default Loading