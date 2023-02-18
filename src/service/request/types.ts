import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface SelfRequestInterceptors<T = AxiosResponse> { // 这里把不确定的类型作为泛型，并提到接口上，判断外界传入是否符合此类型，不传类型默认是AxiosResponse类型
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface SelfRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: SelfRequestInterceptors<T>
  showLoading?: boolean
}

