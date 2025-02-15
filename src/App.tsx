import React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/store";
import { userSlice } from "@store/slices";

import { toast } from "./components";
import "./App.css";

import type { UserItem } from "./type";
import { getAllUser } from "@/api";
import { Button } from "antd";

function App() {
  const stateUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [userList, setUserList] = useState<UserItem[]>([]);

  const getUserList = () => {
    getAllUser().then((res) => {
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
}

export default App;
