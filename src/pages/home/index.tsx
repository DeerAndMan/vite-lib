import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@store/store";
import { userSlice } from "@store/slices";

import { userApi } from "@/api";

import type { UserItem } from "@/type";

export const Home = () => {
  const navigate = useNavigate();
  // const stateUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [userList, setUserList] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getUserList = () => {
    setUserList([]);
    setLoading(true);
    userApi
      .getAllUser()
      .then((res) => {
        if (res.code === 200) {
          setUserList(res.data);
          dispatch(userSlice.setUser(res.data));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogout = () => {
    dispatch(userSlice.setUser([]));
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    getUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading && <span className="loading loading-infinity loading-xl"></span>}
      {userList.map((item, index) => {
        return (
          <div key={index}>
            用户：<span>{item.name}</span>
            ，添加时间：<span>{item.addTime}</span>
          </div>
        );
      })}
      <button className="btn btn-soft btn-sm" onClick={getUserList}>
        刷新
      </button>
      <button
        className="btn btn-active btn-sm btn-secondary"
        onClick={handleLogout}
      >
        登出
      </button>
    </div>
  );
};

export default Home;
