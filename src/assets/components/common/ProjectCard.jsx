import React from "react";
import StudentsIcon from "../../utils/icons/StudentsIcon";
import CalendarIcon from "../../utils/icons/CalenderIcon";

const ProjectCard = ({ page }) => {
  const isBatchesTab = page === "Batches";
  return (
    <div className="divide-y divide-zinc-200">
      <a
        href=""
        className={`group block p-6 hover:bg-zinc-50 transition-colors rounded-lg ${
          isBatchesTab ? "border border-gray-200" : ""
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3
              className={`font-semibold mb-1 text-zinc-800 ${
                isBatchesTab ? "group-hover:text-blue-500" : ""
              }`}
            >
              Dummy Project 2
            </h3>

            <p className="text-sm text-zinc-600 line-clamp-2">No Description</p>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs px-2 py-1 rounded bg-zinc-200 text-zinc-800">
              PLANNING
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <StudentsIcon width="12" height="12" color="text-zinc-500" />2
              members
            </div>

            <div className="flex items-center gap-1">
              <CalendarIcon width="12" height="12" color="text-zinc-500" />
              June 4,2026
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">Progress</span>
            <span className="text-zinc-600">10%</span>
          </div>

          <div className="w-full bg-zinc-200 rounded h-1.5">
            <div
              className="h-1.5 bg-blue-500 rounded"
              style={{ width: "10%" }}
            ></div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProjectCard;
