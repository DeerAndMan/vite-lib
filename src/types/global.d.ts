declare module "Axios" {
  // export interface AxiosRequestConfig {
  //   // [自定义属性声明]
  //   // 接口报错是否需要toast提示。若为true则提示，若为字符串则为自定义的提示内容
  //   errorMsg?: boolean | string;
  //   // 接口成功是否需要toast提示。若为true则提示，若为字符串则为自定义的提示内容
  //   successMsg?: boolean | string;
  //   // 接口是否不需要token（默认都会加上token）
  //   noToken?: boolean;
  //   // 返回接口原内容
  //   returnOrigin?: boolean;
  // }
  // interface ResponseProps<T = any> {
  //   data: T;
  //   code: number;
  //   msg: string;
  // }
  // export interface AxiosResponse<T = any, D = any> {
  //   data: ResponseProps<T>;
  //   status: number;
  //   statusText: string;
  //   headers: AxiosResponseHeaders;
  //   config: AxiosRequestConfig<D>;
  //   request?: any;
  // }
  // 修正拦截器返回数据类型
  export interface AxiosInstance {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get<T = any>(
      url: string,
      config?: PartialCustomRequestConfig
    ): Promise<ResponseData<T>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post<T = any>(
      url: string,
      data?: any,
      config?: PartialCustomRequestConfig
    ): Promise<ResponseData<T>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    put<T = any>(
      url: string,
      data?: any,
      config?: PartialCustomRequestConfig
    ): Promise<ResponseData<T>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete<T = any>(
      url: string,
      config?: PartialCustomRequestConfig
    ): Promise<ResponseData<T>>;
  }
}

/// <reference types="@types/sigmajs" />
