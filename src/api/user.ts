import { request } from "@/api";

const baseUrl = "/admin/user";

export type LoginParams = {
  username: string;
  password: string;
};

export const login = (params: LoginParams) =>
  request.post(`${baseUrl}/login`, params);

export const getAllUser = () => request.get("/admin/user");
