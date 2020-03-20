import { uploadFile } from '@tarojs/taro'

export const uploadVoice = (filePath: string) => {
  return uploadFile({
    url: '/uploadVoice',
    filePath,
    name: 'viceo'
  })
}