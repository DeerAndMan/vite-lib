import { Line } from "@ant-design/charts";

interface LineDataItem {
  time: string;
  value: number;
  type: string;
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
    colorField: "type",
    point: { shapeField: "square", sizeField: 4 },
    interaction: { tooltip: { marker: false } },
    slider: { x: {} },
    style: { lineWidth: 2 },
  };

  return (
    <div>
      <Line {...config} />
    </div>
  );
}
