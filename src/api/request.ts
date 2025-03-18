import axios from "axios";
import store from "@/store/store";
import { userSlice } from "@store/slices";

import { message } from "antd";

import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// 自定义请求参数
type RequestConfig = {
  noToken?: boolean;
  errorMsg?: boolean;
  successMsg?: string;
  saltLength?: number;
};

export type CustomRequestConfig = RequestConfig & InternalAxiosRequestConfig;

export type PartialCustomRequestConfig = Partial<CustomRequestConfig>;

// console.log("meta.env", import.meta.env.VITE_WEB_BASE_URL);
const BASE_API = import.meta.env.VITE_WEB_BASE_URL;

export const request = axios.create({
  baseURL: BASE_API,
  timeout: 300000,
  headers: { Accept: "application/json", "Content-type": "application/json" },
});

// export const setUpInterceptor = () => {
// 请求拦截器
request.interceptors.request.use((config: CustomRequestConfig) => {
  // 如果需要token
  if (!config.noToken) {
    const stores = store.getState();
    const stateUser = stores.user;
    // console.log("stateUser", stateUser);

    if (stateUser?.token) {
      config.headers.Authorization = "Bearer token" + stateUser?.token;
    }
  }

  // // 当前只有文件上传地址不一样
  // if (config.url === "/file/upload") {
  //   // config.baseURL = process.env.REACT_APP_FILE_URL;
  // }

  // 让errorMsg默认生效;
  if (config.errorMsg === undefined) {
    config.errorMsg = true;
  }

  if (config.saltLength) {
    config.headers.SaltLength = config.saltLength;
  }

  // console.log("config", config);

  return config;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResponseData<T = any> = {
  data: T;
  code: number;
  msg: string;
};
// | Blob;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PromiseResponseData<T = any> = Promise<ResponseData<T>>;

/**
 * 响应拦截器
 */
request.interceptors.response.use(
  async (res: AxiosResponse) => {
    const config = res.config as CustomRequestConfig;
    const data = res.data as ResponseData;

    // console.log("res --> config ", config);
    // console.log("res --->===== data", data);

    let errorMsg, successMsg;
    if (config) {
      errorMsg = config.timeoutErrorMessage;
      successMsg = config.successMsg;
    }

    if (res.data instanceof Blob) {
      return res;
    }

    /** *************** 消息提示 ************************ */
    if (!(data instanceof Blob) && res.data.code === 200) {
      // 2xx 范围内的状态码都会触发该函数。

      // 结果为true 那么返回去掉外层data之后的数据 如果successMsg，则会提示成功信息
      if (successMsg) {
        // 根据successMsg类型来判断是提示successMsg内容，还是后端返回
        if (typeof successMsg === "string") {
          message.success(successMsg);
        } else {
          message.success(res.data.msg);
        }
      }
    } else if (!(data instanceof Blob) && errorMsg) {
      // 根据errorMsg类型来判断是提示errorMsg内容，还是后端返回
      if (typeof errorMsg === "string") {
        message.error(errorMsg);
      } else {
        message.error(res?.data?.msg ?? "出错啦");
      }
    }

    /** *************** 失败情况处理 ************************ */

    // console.log("res.data.code", res.data.code);
    // 登录失效
    if ([10004, 10001, 10003].includes(res.data.code)) {
      // store.dispatch(logout()).then((res) => {
      //   // if (res?.code === 0 && !(window.location.pathname === '/')) {
      //   // 如果不是登录页则跳转到登录页
      //   window.location.replace("/");
      //   // }
      // });

      // !错误测试，清空store
      store.dispatch(userSlice.testTokenNull());

      return Promise.reject(new Error(res.data.msg));
    }

    return res.data;
  },
  (error) => {
    message.error(error.message);
    Promise.reject(error?.response?.data || "出错啦");
  }
);
// };

export default request;
