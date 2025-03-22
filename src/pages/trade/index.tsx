import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { LineChart } from "@/components";
import { tradeApi } from "@/api";
import { Button, message, Space, Switch } from "antd";

interface LineItem {
  time: string;
  value: number;
}

export default function Trade() {
  const [lineData, setLineData] = useState<LineItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const getTradeData = () => {
    setLoading(true);
    tradeApi
      .getTrade()
      .then((res) => {
        if (res.code !== 200) return;
        const list: LineItem[] = [];
        res.data.forEach((l) => {
          list.push({
            time: dayjs(l.date).format("YYYY-MM-DD hh:mm:ss"),
            value: l.dryk ? Number(l.dryk) : 0,
          });
        });
        setLineData(list);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 切换自动刷新状态
  const toggleAutoRefresh = (checked: boolean) => {
    setAutoRefresh(checked);
    if (checked) {
      message.success("已开启自动刷新");
      const newTimer = setInterval(() => {
        getTradeData();
      }, 1000 * 6);
      setTimer(newTimer);
    } else {
      message.info("已关闭自动刷新");
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
    }
  };

  useEffect(() => {
    getTradeData();
  }, []);

  return (
    <div className="p-4">
      Trade
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">数据</h2>
        <Space>
          <Button type="primary" onClick={getTradeData} loading={loading}>
            立即刷新
          </Button>
          <Space>
            <span>自动刷新：</span>
            <Switch checked={autoRefresh} onChange={toggleAutoRefresh} />
          </Space>
        </Space>
      </div>
      <LineChart data={lineData} />
    </div>
  );
}
