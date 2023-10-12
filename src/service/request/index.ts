import axios from "axios";
import type { AxiosInstance } from "axios";
import type {
  MyRequestConfig,
  MyRequestInterceptors
} from "@/service/request/types";

/**
 * 难点：
 * 1.拦截器进行精细控制
 *  - 全局拦截器
 *  - 实例拦截器
 *  - 单次请求拦截器
 * 2.响应结果的类型处理（泛型）
 */

class MyRequest {
  instance: AxiosInstance;
  interceptors?: MyRequestInterceptors;

  constructor(config: MyRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);
    // 保存基本信息
    this.interceptors = config.interceptors;

    // 每个instance实例都添加请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("全局请求成功的拦截");
        return config;
      },
      (error) => {
        // console.log("全局请求失败的拦截");
        return error;
      }
    );

    // 每个instance实例都添加响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        // console.log("全局响应成功的拦截");
        return res.data;
      },
      (error) => {
        // console.log("全局响应失败的拦截");
        return error;
      }
    );

    // 针对特定的MyRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    );
  }

  // 封装网络请求的方法
  request<T = any>(config: MyRequestConfig<T>) {
    // 单个请求对数据的处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config);
    }
    // 返回promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: "GET" });
  }

  post<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: "POST" });
  }

  delete<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default MyRequest;
