import React from "react";
import { useNavigate } from "react-router-dom";
import batchDetailFilter from "../data/BatchDetailFilter";
import { taskColumns } from "../data/taskData";
import Dropdown from "../components/common/Dropdown";
import DataTable from "../components/common/DataTable";
const TaskTab = ({ batch, tasks, onCreateTask }) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        {Object.values(batchDetailFilter).map((dropdown) => (
          <Dropdown
            key={dropdown.id}
            name={dropdown.name}
            id={dropdown.id}
            values={dropdown.values}
          />
        ))}
      </div>
      {tasks.length > 0 ? (
        <DataTable
          columns={taskColumns}
          data={tasks}
          onRowClick={(task) =>
            navigate(`/batches/${batch.id}/tasks/${task.id}`)
          }
        />
      ) : (
        <div className="border border-dashed border-zinc-200 rounded-xl p-10 text-center bg-white">
          <h3 className="text-lg font-semibold text-zinc-800 mb-2">
            No tasks yet
          </h3>
          <p className="text-sm text-zinc-500 mb-4">
            Create your first task to get started
          </p>
          <button
            onClick={onCreateTask}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
          >
            New Task
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskTab;
