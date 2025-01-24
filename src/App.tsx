import { useEffect, useState } from "react";
import { useAppDispatch } from "@store/store";
import { userSlice } from "@store/slices";
import "./App.css";

import type { UserItem } from "./type";
import React from "react";
import { request } from "./api";

function App() {
  // const stateUser = useAppSelector((state) => state.user);
  // console.log("stateUser", stateUser);
  const dispatch = useAppDispatch();

  const [userList, setUserList] = useState<UserItem[]>([]);

  // const getUserList = () => {
  //   fetch("https://fuguilu.us.kg/api/admin/user")
  //     // fetch("http://localhost:9981/admin/ctr/user")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setUserList(res.data);
  //     });
  // };

  useEffect(() => {
    request.get("/admin/user").then((res) => {
      // console.log("res", res);
      setUserList(res.data);
      dispatch(userSlice.setToken("123456"));
    });
    // getUserList();
  }, []);

  return (
    <React.Fragment>
      {userList.map((item, index) => {
        return (
          <div key={index}>
            用户：<span>{item.name}</span>
            ，添加时间：<span>{item.addTime}</span>
          </div>
        );
      })}
      <p className="read-the-docs">Click on</p>
    </React.Fragment>
  );
}

export default App;
