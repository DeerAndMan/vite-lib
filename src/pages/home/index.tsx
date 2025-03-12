import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/store";
import { userSlice } from "@store/slices";
import { Button } from "antd";

import { toast } from "@/components";
import { userApi } from "@/api";

import type { UserItem } from "@/type";

export const Home = () => {
  const stateUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [userList, setUserList] = useState<UserItem[]>([]);

  const getUserList = () => {
    userApi.getAllUser().then((res) => {
      setUserList(res.data);
      dispatch(userSlice.setToken("123456"));
    });
  };

  useEffect(() => {
    getUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <span>token：{stateUser.token}</span>

      {userList.map((item, index) => {
        return (
          <div key={index}>
            用户：<span>{item.name}</span>
            ，添加时间：<span>{item.addTime}</span>
          </div>
        );
      })}
      <Button
        onClick={() => {
          toast.success("我是成功的数据");
          // toast.info("info");
          // toast.warning("warrgin");
          // toast.error("错误");
        }}
      >
        Click on
      </Button>
    </React.Fragment>
  );
};

export default Home;
