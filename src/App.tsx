import { Suspense } from "react";
import locale from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

import { Spin, ConfigProvider } from "antd";

import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { Router } from "@router/main";

function App() {
  return (
    <ConfigProvider locale={locale}>
      <BrowserRouter>
        <Suspense fallback={<Spin />}>
          <Router />
        </Suspense>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
