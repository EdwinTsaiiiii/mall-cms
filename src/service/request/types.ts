// 扩展axiosRequestConfig
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptors<T>;
}

export interface MyRequestInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestFailureFn?: (error: any) => any;
  responseSuccessFn?: (res: T) => T;
  responseFailureFn?: (error: any) => any;
}
