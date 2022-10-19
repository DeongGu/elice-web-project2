import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
  {
    name: "제품을 구매하거나 행동할 때 친환경적인 대안이 없거나 품질이 떨어진다",
    value: 44.3,
  },
  {
    name: "친환경적인 행동은 시간이 많이 소비된다",
    value: 44.0,
  },
  {
    name: "친환경적인 행동은 비용이 많이 든다",
    value: 40.7,
  },
  {
    name: "환경에 나쁜 영향을 주는 행동들이 이미 습관이 되어 바꾸기 어렵다",
    value: 36.3,
  },
  {
    name: "친환경적 행동이 나의 건강에는 오히려 해가 될 수 있다",
    value: 33.5,
  },
  {
    name: "친환경적 행동을 실천하고 싶지만 방법을 잘 모른다",
    value: 23.8,
  },
  {
    name: "친환경적 행동을 해도 환경문제가 개선되지 않을 것이라 실천의 필요를 못 느낀다",
    value: 17.5,
  },
  {
    name: "주변 사람들이 친환경적으로 행동하는 것을 비웃거나 무시한다",
    value: 11.2,
  },
  {
    name: "기타",
    value: 1.8,
  },
];

// const COLORS = [
//   "#0088FE",
//   "#c8c8c8",
//   "#b4b4b4",
//   "#A83CA8",
//   "#EB6464",
//   "#FFC300",
//   "#3CA03C	",
//   "#6E6ED7",
//   "#00D7FF	",
//   "#D7AC87",
// ];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <text>{`${label}`}</text>
        <br />
        <text>{`: ${payload[0].value}%`}</text>
      </div>
    );
  }

  return null;
};

const BarChartFirst = () => {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" tick={false} />
      <YAxis hide={true} tick={false} />
      <Tooltip
        cursor={{ fill: "#ffffff" }}
        content={<CustomTooltip />}
        wrapperStyle={{ outline: "none" }}
      />
      <Legend />
      <Bar
        dataKey="value"
        fill="#82ca9d"
        name="환경 보전을 위한 행동 실천의 어려움"
        // onMouseOver={() => (tooltip = "value")}
      />
    </BarChart>
  );
};

export default BarChartFirst;
