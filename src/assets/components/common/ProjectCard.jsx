import React from "react";
import StudentsIcon from "../../utils/icons/StudentsIcon";
import CalendarIcon from "../../utils/icons/CalenderIcon";
import { Link } from "react-router-dom";
const ProjectCard = ({ page, data }) => {
  const isBatchesTab = page === "Batches";
  return (
    <div className="divide-y divide-zinc-200">
      <Link
        to={`/batches/${data.id}`}
        className={`group block p-6 hover:bg-zinc-50 transition-colors  rounded-lg ${
          isBatchesTab
            ? "border border-gray-200"
            : "border-b-1 rounded-none border-gray-200"
        }`}
      >
        <div className="flex items-start justify-between mb-3 gap-3">
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold mb-1 truncate ${
                isBatchesTab
                  ? "text-zinc-800 group-hover:text-blue-500 transition-colors"
                  : "text-zinc-800"
              }`}
            >
              {data?.title}
            </h3>
            <p className="text-sm text-zinc-600 line-clamp-2 truncate">
              {data?.description}
            </p>
          </div>

          <div className="flex-shrink-0">
            <span className="text-xs px-2 py-1 rounded bg-zinc-200 text-zinc-800 whitespace-nowrap">
              {data?.status}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <StudentsIcon width="12" height="12" color="text-zinc-500" />
              {data?.totalMembers} members
            </div>

            <div className="flex items-center gap-1">
              <CalendarIcon width="12" height="12" color="text-zinc-500" />
              {data?.tasks[0]?.dueDate}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">Progress</span>
            <span className="text-zinc-600">{data?.completedTasks}%</span>
          </div>

          <div className="w-full bg-zinc-200 rounded h-1.5">
            <div
              className="h-1.5 bg-blue-500 rounded"
              style={{ width: `${data?.completedTasks}%` }}
            ></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
