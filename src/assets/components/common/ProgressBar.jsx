import React from "react";

const ProgressBar = ({ title, progress, taskCount, color }) => {
  return (
    <div className="space-y-3 my-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`text-xl font-semibold ${color}`}>→</span>
          <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-zinc-500 text-sm">{taskCount} tasks</p>

          <div className="border border-zinc-300 rounded-xl px-4 py-1 text-zinc-600 text-sm">
            {progress}%
          </div>
        </div>
      </div>

      <div className="w-full h-3 bg-zinc-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color.replace("text", "bg")}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
