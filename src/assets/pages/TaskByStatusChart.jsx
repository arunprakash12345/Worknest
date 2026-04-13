import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  {
    name: "TODO",
    tasks: 1,
  },
  {
    name: "IN PROGRESS",
    tasks: 2,
  },
  {
    name: "DONE",
    tasks: 3,
  },
];

const TasksByStatusChart = () => {
  return (
    <div className="bg-white rounded-2xl h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid vertical={false} stroke="#f4f4f5" />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#71717a" }}
            axisLine={{ stroke: "#d4d4d8" }}
            tickLine={{ stroke: "#d4d4d8" }}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#71717a" }}
            axisLine={{ stroke: "#d4d4d8" }}
            tickLine={{ stroke: "#d4d4d8" }}
          />

          <Tooltip />

          <Bar
            dataKey="tasks"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
            barSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TasksByStatusChart;
