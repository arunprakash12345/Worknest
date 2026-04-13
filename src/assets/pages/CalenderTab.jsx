import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import CalenderIcon from "../utils/icons/CalenderIcon";
import "../../calender.css";
import TaskCard from "../components/common/TaskCard";
import batchData from "../data/batchData";
import { taskColumns } from "../data/taskData";
const CalendarTab = ({ id }) => {
  const [value, setValue] = useState(new Date());
  const batch = batchData.find((item) => item.id === Number(id));
  const tasksForSelectedDate = taskColumns.filter(
    (task) =>
      new Date(task.dueDate).toDateString() === new Date(value).toDateString(),
  );
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 ">
        <div className="not-dark:bg-white  border border-zinc-300  rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-zinc-900 text-md flex gap-2 items-center max-sm:hidden">
              <CalenderIcon width="18" height="18" color="text-gray-800" /> Task
              Calender
            </h2>
          </div>
          <Calendar onChange={setValue} value={value} />
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white border border-zinc-300 rounded-lg p-4">
          <h3 className="text-zinc-900 text-md flex items-center gap-2 mb-3">
            Tasks List
          </h3>
          {tasksForSelectedDate.length > 0 ? (
            tasksForSelectedDate.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <div className="bg-zinc-50 border border-dashed border-zinc-200 p-3 rounded-lg text-center">
              <p className="text-sm text-zinc-400">No tasks for this date</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarTab;
