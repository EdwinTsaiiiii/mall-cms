import MyRequest from "@/service/request";
import { BASE_URL, TIME_OUT } from "@/service/config";

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
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
