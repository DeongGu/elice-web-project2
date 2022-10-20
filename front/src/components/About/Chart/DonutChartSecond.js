import React from "react";
import { PieChart, Pie, Cell, Label } from "recharts";

const data = [
  { name: "패션산업", value: 10 },
  { name: "나머지", value: 90 },
];
const COLORS = ["#77bb3f", "#dcdcdc"];

const DonutChartSecond = () => {
  const renderCustomizedLabel = ({ x, y, value, index }) => {
    return value > 50 ? null : (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        fill={COLORS[index]}
        dominantBaseline="central"
      >
        {value}%
      </text>
    );
  };

  return (
    <PieChart width={300} height={400}>
      <Pie
        data={data}
        cx={120}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        label={renderCustomizedLabel}
        labelLine={false}
      >
        <Label value="온실가스" position="center" />
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default DonutChartSecond;
