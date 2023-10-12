import MyRequest from "@/service/request";
import { BASE_URL, TIME_OUT } from "@/service/config";
import { localCache } from "@/utils/cache";
import { LOGIN_TOKEN } from "@/global/constant";

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 在请求拦截器中统一添加token
      const token = localCache.getCache(LOGIN_TOKEN);
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestFailureFn: (error) => {
      return error;
    },
    responseSuccessFn: (config) => {
      return config;
    },
    responseFailureFn: (error) => {
      return error;
    }
  }
});

export default myRequest;
