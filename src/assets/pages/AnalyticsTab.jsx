import React from "react";
import analyticsTabData from "../data/analyticsTabData";
import KPI from "../components/layout/KPI";
import ProgressBar from "../components/common/ProgressBar";
import TaskBarChart from "./TaskByStatusChart.jsx";
const AnalyticsTab = ({ id }) => {
  return (
    <div>
      <KPI data={analyticsTabData} />
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="not-dark:bg-white  border border-zinc-300 rounded-lg p-6">
          <h2 className="text-zinc-900 mb-4 font-medium">Tasks by Status</h2>
          <TaskBarChart />
        </div>
        <div className="not-dark:bg-white  border border-zinc-300 rounded-lg p-6">
          <h2 className="text-zinc-900 mb-4 font-medium">Tasks by Priority</h2>
          <ProgressBar
            title="Low"
            progress={20}
            taskCount={2}
            color="text-red-500"
          />
          <ProgressBar
            title="Medium"
            progress={45}
            taskCount={5}
            color="text-blue-500"
          />

          <ProgressBar
            title="High"
            progress={70}
            taskCount={7}
            color="text-green-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
