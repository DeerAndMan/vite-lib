import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";
import { navRouter } from "@/router";

/**
 * Nav 组件
 * @returns {React.FunctionComponent}
 */
export const Nav = () => {
  const location = useLocation();

  const hideNavList = ["/login"];
  if (hideNavList.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="bg-white shadow-md py-3 px-5 mb-5 rounded-md flex items-center space-x-4">
      {navRouter.map((n, i) => (
        <Link key={i} to={n.path}>
          <Button type={location.pathname === n.path ? "primary" : "link"}>
            {n.name}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default Nav;
