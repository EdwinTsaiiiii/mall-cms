// service统一出口
import SelfRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import LocalCache from '@/utils/cache'

const selfRequest = new SelfRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 当postman请求成功但axois请求401，有带token的情况下，注意观察请求头的Content-Type是否正确
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = LocalCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log('响应失败的拦截')
      return err
    }
  }
})
export default selfRequest
