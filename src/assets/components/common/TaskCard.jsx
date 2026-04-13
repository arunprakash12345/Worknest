import React from "react";

const TaskCard = ({ task }) => {
  const formattedDate = new Date(task?.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-zinc-50 hover:bg-zinc-100 p-3 rounded-lg transition">
      <div className="flex justify-between items-start text-sm gap-3">
        <span className="text-zinc-900 font-medium truncate">{task.title}</span>

        <span
          className={`text-xs px-2 py-0.5 rounded whitespace-nowrap ${
            task.type === "TASK"
              ? "bg-green-200 text-green-800"
              : "bg-blue-200 text-blue-800"
          }`}
        >
          {task.type}
        </span>
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-zinc-600">{formattedDate}</p>

        <span
          className={`text-[10px] px-2 py-1 rounded ${
            task.priority === "HIGH"
              ? "bg-red-100 text-red-600"
              : task.priority === "MEDIUM"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-zinc-200 text-zinc-700"
          }`}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
