import { DualAxes } from "@ant-design/charts";

interface DualAxesDataItem {
  time: string;
  value: number;
  proportion: number;
}

export interface DualAxesProps {
  data: DualAxesDataItem[];
}

export default function DualAxesChart(props: DualAxesProps) {
  const { data } = props;

  const config = {
    data: data,
    xField: "time",
    legend: true,
    slider: { x: {} },
    children: [
      {
        type: "line",
        yField: "value",
        style: { stroke: "#5B8FF9", lineWidth: 2 },
        // point: {
        //   shapeField: "plus",
        //   sizeField: 4,
        //   style: { fill: "#5B8FF9", stroke: "#5B8FF9" },
        // },
        colorField: "type",
        axis: {
          y: {
            position: "left",
            title: "汇总",
            style: { titleFill: "#5B8FF9" },
          },
        },
      },
      {
        type: "line",
        yField: "proportion",
        style: { stroke: "#E74C3C", lineWidth: 2 },
        // point: {
        //   shapeField: "triangle",
        //   sizeField: 4,
        //   style: { fill: "#E74C3C", stroke: "#E74C3C" },
        // },
        itemStyle: {
          fill: "#E74C3C",
        },
        axis: {
          y: {
            position: "right",
            title: "比例",
            style: { titleFill: "#E74C3C" },
          },
        },
      },
    ],
  };

  return <DualAxes {...config} />;
}
