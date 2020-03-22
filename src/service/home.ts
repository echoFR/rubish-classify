import { uploadFile } from '@tarojs/taro'

export const uploadVoice = (filePath: string) => {
  const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7001' : ''
  return uploadFile({
    url: `${BASE_URL}/upload`,
    filePath,
    name: 'file',
  })
}