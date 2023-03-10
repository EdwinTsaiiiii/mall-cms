import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { SelfRequestInterceptors, SelfRequestConfig } from './types'

import { ElLoading, ElMessage } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading.js'

const DEAFULT_LOADING = true

class SelfRequest {
  instance: AxiosInstance
  interceptors?: SelfRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: SelfRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的拦截器: 请求成功拦截')
        this.loading = ElLoading.service({
          lock: true,
          text: '加载中...',
          background: 'rgba(255,255,255,0.5)'
        })
        return config
      },
      (error) => {
        // console.log('所有的实例都有的拦截器: 请求失败拦截')
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有的拦截器: 响应成功拦截')
        this.loading?.close()
        const data = res.data
        if (data.code == 0) {
          return data
        } else {
          ElMessage({
            type: 'info',
            message: '请求失败~, 错误信息：' + data.data
          })
        }
      },
      (error) => {
        // console.log('所有的实例都有的拦截器: 响应失败拦截')
        this.loading?.close()
        if (error.response.status === 404) {
          alert('404的错误~')
        }
        return error
      }
    )
  }

  request<T = any>(config: SelfRequestConfig<T>): Promise<T> {
    // 在SelfRequestConfig中加泛型，会一步一步传，传到types中的responseInterceptor
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          reject(err)
        })
    })
  }

  get<T = any>(config: SelfRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: SelfRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: SelfRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: SelfRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default SelfRequest
