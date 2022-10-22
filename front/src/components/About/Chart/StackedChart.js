import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
  {
    name: "환경에 관심이 있다",
    v1: 0.3,
    v2: 1.8,
    v3: 24.6,
    v4: 56.6,
    v5: 16.7,
  },
  {
    name: "환경문제 원인을 알고 있다",
    v1: 0.2,
    v2: 4.6,
    v3: 42.3,
    v4: 48.7,
    v5: 4.1,
  },
  {
    name: "환경문제 해결 방법을 알고 있다",
    v1: 0.3,
    v2: 9.0,
    v3: 49.2,
    v4: 38.7,
    v5: 2.8,
  },
];

const customTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          fontSize: "15px",
          padding: "2px 10px 12px 10px",
          outline: "solid",
          outlineColor: "#c8c8c8",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <p style={{ fontSize: "17px", fontWeight: "bolder" }}>
          <text>{label}</text>
        </p>
        <text style={{ color: "#a0a0a0" }}>
          매우 비동의 : {payload[0].value}%
        </text>
        <br />
        <text style={{ color: "#a0a0a0" }}>비동의 : {payload[1].value}%</text>
        <br />
        <text style={{ color: "#a0a0a0" }}>보통 : {payload[2].value}%</text>
        <br />
        <text style={{ color: "#77bb3f" }}>동의 : {payload[3].value}%</text>
        <br />
        <text style={{ color: "#369F36" }}>매우 동의: {payload[4].value}%</text>
      </div>
    );
  }

  return null;
};

const StackedChart = () => {
  return (
    <BarChart
      width={700}
      height={300}
      data={data}
      layout="vertical"
      scaleToFit="true"
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis
        domain={["auto", "auto"]}
        tickFormatter={(tick) => {
          return `${tick}%`;
        }}
        tickCount={1}
        type="number"
      />
      <YAxis type="category" dataKey="name" />
      <Tooltip
        cursor={{ fill: "#ffffff" }}
        content={customTooltip}
        wrapperStyle={{
          outline: "none",
          // backgroundColor: "rgba(255, 255, 255, 0.9)",
          // padding: "10px 10px 10px 10px",
        }}
      />
      <Legend />
      <Bar
        dataKey="v1"
        name="매우 비동의"
        stackId="a"
        fill="#dcdcdc"
        barSize={40}
      />
      <Bar
        dataKey="v2"
        name="비동의"
        stackId="a"
        fill="#dcdcdc"
        maxBarSize={200}
      />

      <Bar dataKey="v3" name="보통" stackId="a" fill="#d2d2d2" />

      <Bar dataKey="v4" name="동의" stackId="a" fill="#77bb3f" />

      <Bar dataKey="v5" name="매우 동의" stackId="a" fill="#369F36" />
    </BarChart>
  );
};

export default StackedChart;
