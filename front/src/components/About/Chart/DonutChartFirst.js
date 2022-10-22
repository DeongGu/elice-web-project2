import React from "react";
import { PieChart, Pie, Cell, Label } from "recharts";

const data = [
  { name: "합성섬유", value: 35 },
  { name: "나머지", value: 65 },
];

const COLORS = ["#CD2E57", "#dcdcdc"];

const DonutChartFirst = () => {
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
    <PieChart width={300} height={400}>
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
          content={<CustomLabel value1="미세 플라스틱" value2="35%" />}
        ></Label>

        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default DonutChartFirst;
