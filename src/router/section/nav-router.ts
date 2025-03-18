export interface NavRouter {
  name: string;
  path: string;
}

/** 导航栏 */
export const navRouter: NavRouter[] = [
  { name: "首页", path: "/" },
  // { name: '登录', path: '/login' },
  // { name: '布局显示', path: '/grid-show' },
  // { name: '图表', path: '/charts' },
  // { name: '自定义编辑', path: '/grid-layout' },
  // { name: 'Sigma图', path: '/sigma-graph' }
];

export default navRouter;
