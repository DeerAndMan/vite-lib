import { useEffect, useState } from "react";
import "./App.css";

import type { UserItem } from "./type";
import React from "react";

function App() {
  const [userList, setUserList] = useState<UserItem[]>([]);

  const getUserList = () => {
    fetch("http://111.229.142.50:9981/admin/ctr/user")
      // fetch("http://localhost:9981/admin/ctr/user")
      .then((res) => res.json())
      .then((res) => {
        setUserList(res.data);
      });
  };

  useEffect(() => {
    getUserList();
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
