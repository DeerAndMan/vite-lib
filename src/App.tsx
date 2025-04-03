import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Button, ConfigProvider } from 'antd';
import dayjs from 'dayjs';

import locale from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
import { Router } from '@/router/main';

// import styles from './app.module.scss';

const App = () => {
  return (
    <ConfigProvider locale={locale}>
      <BrowserRouter>
        <Suspense fallback={<span className="loading loading-infinity loading-xl" />}>
          <Router />
        </Suspense>
      </BrowserRouter>
    </ConfigProvider>
  );
  return (
    <div className="content">
      <h1 className="text-3xl font-bold">Hello World!</h1>
      {/* <button className={styles.button}>点击我</button> */}
      <Button type="primary">Button</Button>
    </div>
  );
};

export default App;
