import { Link, useLocation } from "react-router-dom";
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
          <button
            className={`btn btn-sm ${
              location.pathname === n.path ? "btn-primary" : "btn-ghost"
            }`}
          >
            {n.name}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default Nav;
