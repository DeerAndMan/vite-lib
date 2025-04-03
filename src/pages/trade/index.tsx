import { useCallback, useEffect, useState } from "react";
import { Button, message, Space, Switch, DatePicker, Card } from "antd";

import dayjs from "dayjs";
import { DualAxesChart, LineChart } from "@/components";
import { tradeApi } from "@/api";

import type { RangePickerProps } from "antd/es/date-picker";

interface LineItem {
  time: string;
  value: number;
  proportion: number;
}
interface LineTypeItem extends Omit<LineItem, "proportion"> {
  type: string;
}

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

export default function Trade() {
  const [lineData, setLineData] = useState<LineItem[]>([]);
  const [lineTypeData, setLineTypeData] = useState<LineTypeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [dateTime, setDateTime] = useState([
    dayjs().startOf("day"),
    dayjs().endOf("day"),
  ]);

  const getTradeData = useCallback(() => {
    setLoading(true);

    const params = {
      startTime: dateTime[0].format(dateFormat),
      endTime: dateTime[1].format(dateFormat),
    };

    tradeApi
      .getTrade(params)
      .then((res) => {
        if (res.code !== 200) return;
        const list: LineItem[] = [];
        const listType: LineTypeItem[] = [];

        res.data.forEach((l) => {
          const time = dayjs(l.date).format("YYYY-MM-DD hh:mm:ss");
          list.push({
            time,
            value: Number(l.dryk),
            proportion: Number(l.drhz) * 100,
          });
          l.positions.forEach((p) => {
            listType.push({
              time,
              type: p.Zqmc,
              value: Number(p.Dryk),
            });
          });
        });

        setLineData(list);
        setLineTypeData(listType);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dateTime]);

  const pickerChange = (val: RangePickerProps["value"]) => {
    if (val instanceof Array) {
      setDateTime([dayjs(val[0]), dayjs(val[1])]);
    }
  };

  const toggleAutoRefresh = (checked: boolean) => {
    setAutoRefresh(checked);
  };

  useEffect(() => {
    getTradeData();

    let newTimer: NodeJS.Timeout | null = null;
    if (autoRefresh) {
      newTimer = setInterval(() => {
        getTradeData();
      }, 1000 * 60 * 3);
    } else {
      message.warning("自动刷新已关闭");
      clearInterval(newTimer!);
    }

    return () => {
      if (newTimer) {
        clearInterval(newTimer);
      }
    };
  }, [autoRefresh, getTradeData]);

  return (
    <div className="p-4">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">数据</h2>
          <Space size="middle">
            <RangePicker
              maxDate={dayjs()}
              defaultValue={[dateTime[0], dateTime[1]]}
              format={dateFormat}
              onChange={pickerChange}
            />
            <Button type="primary" onClick={getTradeData} loading={loading}>
              立即刷新
            </Button>
            <Space>
              <span>自动刷新：</span>
              <Switch checked={autoRefresh} onChange={toggleAutoRefresh} />
            </Space>
          </Space>
        </div>
        <DualAxesChart data={lineData} />
        <LineChart data={lineTypeData} />
      </Card>
    </div>
  );
}
