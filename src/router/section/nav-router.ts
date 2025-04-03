export interface NavRouter {
  name: string;
  path: string;
}

/** 导航栏 */
export const navRouter: NavRouter[] = [
  { name: "首页", path: "/" },
  { name: "数据", path: "/data" },
];

export default navRouter;
