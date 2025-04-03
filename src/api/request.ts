import axios from 'axios';
import axiosRetry from 'axios-retry';
import store from '@/store/store';
import { userSlice } from '@/store/slices';

import { message } from 'antd';

import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 自定义请求参数
type RequestConfig = {
  noToken?: boolean;
  errorMsg?: boolean;
  successMsg?: string;
  saltLength?: number;
  needRetry?: boolean; // 控制是否需要重试
};

export type CustomRequestConfig = RequestConfig & InternalAxiosRequestConfig;

export type PartialCustomRequestConfig = Partial<CustomRequestConfig>;

// 修改环境变量引用方式
const BASE_API = process.env.PUBLIC_WEB_BASE_URL;

export const request = axios.create({
  baseURL: BASE_API,
  timeout: 300000,
  headers: { Accept: 'application/json', 'Content-type': 'application/json' },
});

// 重试机制
axiosRetry(request, {
  retries: 3,
  retryDelay: retryCount => {
    return retryCount * 1000;
  },
  retryCondition: error => {
    const config = error.config as CustomRequestConfig;
    return !!config.needRetry && error.response?.status === 500;
  },
});

request.interceptors.request.use((config: CustomRequestConfig) => {
  if (!config.noToken) {
    const stores = store.getState();
    const stateUser = stores.user;

    if (stateUser?.token) {
      config.headers.Authorization = stateUser?.token;
    }
  }

  if (config.errorMsg === undefined) {
    config.errorMsg = true;
  }

  if (config.saltLength) {
    config.headers.SaltLength = config.saltLength;
  }

  return config;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResponseData<T = any> = {
  data: T;
  code: number;
  msg: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PromiseResponseData<T = any> = Promise<ResponseData<T>>;

request.interceptors.response.use(
  async (res: AxiosResponse) => {
    const config = res.config as CustomRequestConfig;
    const data = res.data as ResponseData;

    const newToken = res.headers['x-new-token'];
    if (newToken) {
      localStorage.setItem('token', newToken);
      store.dispatch(userSlice.setToken(newToken));
    }

    let errorMsg, successMsg;
    if (config) {
      errorMsg = config.timeoutErrorMessage;
      successMsg = config.successMsg;
    }

    if (res.data instanceof Blob) {
      return res;
    }

    if (!(data instanceof Blob) && res.data.code === 200) {
      if (successMsg) {
        if (typeof successMsg === 'string') {
          message.success(successMsg);
        } else {
          message.success(res.data.msg);
        }
      }
    } else if (!(data instanceof Blob) && errorMsg) {
      if (typeof errorMsg === 'string') {
        message.error(errorMsg);
      } else {
        message.error(res?.data?.msg ?? '出错啦');
      }
    }

    return res.data;
  },
  (err: AxiosError) => {
    message.error(err.message);

    const { status, response } = err;
    const data = response?.data as ResponseData;
    // 登录失效
    const statusList = [401, 403];
    // token错误
    const tokenErrList = [101, 102, 103];
    if (status && statusList.includes(status) && tokenErrList.includes(data.code)) {
      localStorage.removeItem('token');
      store.dispatch(userSlice.testTokenNull());
      Promise.reject(new Error(data.msg));
      return;
    }

    Promise.reject(err?.response?.data || '出错啦');
  }
);

export default request;
