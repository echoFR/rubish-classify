import Taro, { General } from '@tarojs/taro';

const interceptor = (chain) => {
  const requestParams = chain.requestParams
  const { method, data, url } = requestParams
  // requestParams.header = {
  //   ...requestParams.header,
  //   token: ''
  // }
  return chain.proceed(requestParams)
    .then(res => {
      return res
    })
}

// 添加拦截器
Taro.addInterceptor(interceptor)

interface Ioption {
  url: string
  data?: any
  header?: General.IAnyObject
}
const request = {
  http (optipn: Ioption, method) {
    const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7001' : ''
    return Taro.request({
      ...optipn,
      url: BASE_URL + optipn.url,
      method,
      header: {
        'content-type': 'application/json',
        ...optipn.header
      },
    }).then((res: Taro.request.SuccessCallbackResult) => {
      const { data: resData, statusCode } = res
      if (statusCode >= 200 && statusCode < 300) {
        const { code, success, data, msg } = resData
        if (!success) {
          Taro.showToast({
            title: `${code}，${msg}`,
            icon: 'none'
          })
        } else {
          return data
        }
      } else {
        Taro.showToast({
          title: `${statusCode}，网络请求错误`,
          icon: 'none'
        })
      }
    })
  },
  get (option: Ioption) {
    return this.http(option, 'GET')
  },
  post (option: Ioption) {
    return this.http(option, 'POST')
  }
}

export default request
