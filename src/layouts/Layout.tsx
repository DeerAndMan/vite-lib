import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/store/store";
import Nav from "./Nav";
import { userSlice } from "@/store/slices";

export type Props = React.PropsWithChildren;

/**
 * Layout 组件
 * @returns {React.FunctionComponent}
 */
export const Layout = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const stateToken = useAppSelector((state) => state.user.token);

  const { children } = props;

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (!stateToken && !localToken) {
      navigate("/login", { replace: true });
      return;
    }
    if (!stateToken && localToken) {
      dispatch(userSlice.setToken(localToken));
    }
  }, [stateToken, navigate, dispatch]);

  return (
    <div>
      <Nav></Nav>
      {children}
    </div>
  );
};

export default Layout;
