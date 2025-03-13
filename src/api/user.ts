import { request } from "@/api";
import type { PartialCustomRequestConfig } from "@/api";

const baseUrl = "/admin/user";

export type LoginParams = {
  username: string;
  password: string;
};

export const login = (params: LoginParams, other: PartialCustomRequestConfig) =>
  request.post(`${baseUrl}/login`, params, { ...other });

export const getAllUser = () => request.get("/admin/user");
