import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
  {
    name: "쓰레기 증가로 인한 문제",
    응답: 55.4,
  },
  {
    name: "기후변화 피해 및 대응",
    응답: 48.8,
  },
  {
    name: "대기질 개선",
    응답: 46.1,
  },
  {
    name: "미세플라스틱으로 인한 생태계 및 건강 피해",
    응답: 45.9,
  },

  {
    name: "생활 속 화학물질 및 화학사고 피해",
    응답: 26.0,
  },

  {
    name: "도시화 및 개발로 인한 생물다양성 파괴",
    응답: 18.4,
  },
  {
    name: "강/하천/호수/바다 수질 개선",
    응답: 18.2,
  },
  {
    name: "도시 녹지면적 부족",
    응답: 13.6,
  },
  {
    name: "실내 실외 소음 공해",
    응답: 11.5,
  },
  {
    name: "가뭄 및 홍수로 인한 피해",
    응답: 9.5,
  },
  {
    name: "생활 및 농업용수 등 물 부족",
    응답: 6.4,
  },

  {
    name: "기타",
    응답: 0.3,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}%`}</p>
      </div>
    );
  }

  return null;
};
const BarChartOne = () => {
  return (
    <BarChart
      width={500}
      height={500}
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
        content={<CustomTooltip />}
        cursor={{ fill: "#ffffff" }}
        wrapperStyle={{ outline: "none" }}
      />
      <Legend />
      <Bar name="가장 심각한 환경문제 " dataKey="응답" fill="#77bb3f" />
    </BarChart>
  );
};

export default BarChartOne;
