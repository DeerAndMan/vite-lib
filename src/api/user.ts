import { request } from "@/api";

export const getAllUser = () => request.get("/admin/user");
