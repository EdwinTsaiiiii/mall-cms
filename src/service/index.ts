import MyRequest from "@/service/request";
import { BASE_URL, TIME_OUT } from "@/service/config";
import { localCache } from "@/utils/cache";
import { LOGIN_TOKEN } from "@/global/constant";
import router from "@/router";
import axios from "axios";

const CancelToken = axios.CancelToken;
let source = CancelToken.source();

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  cancelToken: source.token,
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
    responseSuccessFn: (config: any) => {
      // 除了查询成功的请求都给提示
      if (
        config.msg != "查询成功" &&
        config.msg != "SUCCESS OK" &&
        config.code === 1 &&
        config.msg
      ) {
        ElMessage.success(config.msg);
      }
      // 拦截失败的响应（token过期，自动跳转至登录页）
      if (config.code === 0 && window.location.hash != "#/login") {
        // 取消后续请求
        source.cancel();
        ElMessage.error(config.msg);
        router.push({ path: "/login" });
        return config;
      }
      return config;
    },
    responseFailureFn: (error) => {
      return error;
    }
  }
});

export default myRequest;
