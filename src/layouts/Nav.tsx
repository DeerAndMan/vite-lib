import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

import { navRouter } from '@/router';
import { ThemeSwitch } from '@/theme';

/**
 * Nav 组件
 * @returns {React.FunctionComponent}
 */
export const Nav = () => {
  const location = useLocation();

  const hideNavList = ['/login'];
  if (hideNavList.includes(location.pathname)) {
    return null;
  }

  // 将路由转换为菜单项
  const menuItems: MenuProps['items'] = navRouter.map(route => ({
    key: route.path,
    label: <Link to={route.path}>{route.name}</Link>,
  }));

  return (
    <div className="py-3 px-5 mb-5 rounded-md flex items-center justify-between">
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ border: 'none', flex: 1 }}
      />
      <ThemeSwitch />
    </div>
  );
};

export default Nav;
