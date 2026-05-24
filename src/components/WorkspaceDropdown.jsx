import React from "react";
import workspace_img_default from "../assets/workspace_img_default.png";
function WorkspaceDropdown() {
  return (
    <div className="m-4">
      <div className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50">
        {/* Logo */}
        <img
          src={workspace_img_default}
          alt="WorkNest"
          className="w-10 h-10 rounded-lg shadow object-cover"
        />

        {/* App details */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 dark:text-white text-sm truncate">
            WorkNest
          </p>

          <p className="text-xs text-gray-500 dark:text-zinc-400">
            Student Task Management
          </p>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceDropdown;
