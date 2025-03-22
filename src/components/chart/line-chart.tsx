import { Line } from "@ant-design/charts";

interface LineDataItem {
  time: string;
  value: number;
}

export interface LineProps {
  data: LineDataItem[];
}

export default function LineChart(props: LineProps) {
  const { data } = props;

  const config = {
    data,
    xField: "time",
    yField: "value",
    point: { shapeField: "square", sizeField: 4 },
    interaction: { tooltip: { marker: false } },
    style: { lineWidth: 2 },
  };

  return (
    <div>
      <Line {...config} />
    </div>
  );
}
