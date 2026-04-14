import React from "react";
import TaskTab from "./TaskTab";
import CalendarTab from "./CalenderTab";
import AnalyticsTab from "./AnalyticsTab";
import SettingsTab from "./SettingsTab";

const BatchTabLayout = ({
  index,
  batch,
  tasks,
  setTasks,
  handleAddTask,
  onCreateTask,
}) => {
  return (
    <div>
      {index === 0 && (
        <TaskTab
          batch={batch}
          tasks={tasks}
          setTasks={setTasks}
          handleAddTask={handleAddTask}
          onCreateTask={onCreateTask}
        />
      )}

      {index === 1 && <CalendarTab batch={batch} tasks={tasks} />}
      {index === 2 && <AnalyticsTab batch={batch} tasks={tasks} />}
      {index === 3 && <SettingsTab batch={batch} />}
    </div>
  );
};

export default BatchTabLayout;
