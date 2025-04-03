import { request } from "@/api";
import type { PartialCustomRequestConfig, PromiseResponseData } from "@/api";

const baseUrl = "/admin/user";

export type LoginParams = {
  username: string;
  password: string;
};

export const login = (
  params: LoginParams,
  other: PartialCustomRequestConfig
): PromiseResponseData =>
  request.post(`${baseUrl}/login`, params, { ...other });

export const getAllUser = (): PromiseResponseData => request.get("/admin/user");
