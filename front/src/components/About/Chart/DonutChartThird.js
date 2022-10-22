import React from "react";
import { PieChart, Pie, Cell, Label } from "recharts";

const data = [
  { name: "패션산업", value: 20 },
  { name: "나머지", value: 80 },
];
const COLORS = ["#CD2E57", "#dcdcdc"];

const DonutChartThird = () => {
  const CustomLabel = ({ viewBox, value1, value2 }) => {
    const { cx, cy } = viewBox;
    return (
      <>
        <text
          x={cx}
          y={cy + 20}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan fontSize="40" fill="#CD2E57">
            {value2}
          </tspan>
        </text>
        <text
          x={cx}
          y={cy - 20}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan alignmentBaseline="middle" fontSize="20">
            {value1}
          </tspan>
        </text>
      </>
    );
  };

  return (
    <PieChart width={300} height={400} text-align="center">
      <Pie
        data={data}
        cx={120}
        cy={200}
        innerRadius={80}
        outerRadius={100}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        labelLine={false}
      >
        <Label
          width={30}
          position="center"
          content={<CustomLabel value1="폐기 용수" value2="20%" />}
        ></Label>

        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default DonutChartThird;
