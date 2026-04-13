import React from "react";
import TaskTab from "./TaskTab";
import CalendarTab from "./CalenderTab";
import AnalyticsTab from "./AnalyticsTab";
import SettingsTab from "./SettingsTab";

const BatchTabLayout = ({ index, id }) => {
  return (
    <div>
      {index === 0 && <TaskTab id={id} />}
      {index === 1 && <CalendarTab id={id} />}
      {index === 2 && <AnalyticsTab id={id} />}
      {index === 3 && <SettingsTab id={id} />}
    </div>
  );
};

export default BatchTabLayout;
