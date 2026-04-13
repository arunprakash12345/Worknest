import React from "react";
import { useNavigate } from "react-router-dom";
import batchDetailFilter from "../data/BatchDetailFilter";
import batchData from "../data/batchData";
import { taskColumns } from "../data/taskData";
import Dropdown from "../components/common/Dropdown";
import DataTable from "../components/common/DataTable";

const TaskTab = ({ id }) => {
  const navigate = useNavigate();

  const batch = batchData.find((item) => item.id === Number(id));

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

      <DataTable
        columns={taskColumns}
        data={batch?.tasks || []}
        onRowClick={(task) => navigate(`/tasks/${task.id}`)}
      />
    </div>
  );
};

export default TaskTab;
