import { useMemo, useState, useEffect } from "react";
import {
  CheckCircle2,
  Clock3,
  Circle,
  MessageCircle,
  ChevronDown,
} from "lucide-react";

const statusConfig = {
  DONE: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    label: "Completed",
  },

  IN_PROGRESS: {
    icon: Clock3,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    label: "In Progress",
  },

  TODO: {
    icon: Circle,
    color: "text-zinc-400",
    bg: "bg-zinc-500/10",
    label: "Pending",
  },
};

const ProjectSummary = ({ tasks, selectedTaskIdFromUrl }) => {
  const [selectedTaskId, setSelectedTaskId] = useState(
    selectedTaskIdFromUrl || ""
  );

  const [selectedStudent, setSelectedStudent] = useState(null);

  // SET FIRST TASK AFTER API LOAD
  useEffect(() => {
    if (tasks?.length > 0 && !selectedTaskId) {
      setSelectedTaskId(tasks[0]._id);
    }
  }, [tasks]);

  // URL TASK SYNC
  useEffect(() => {
    if (selectedTaskIdFromUrl) {
      setSelectedTaskId(selectedTaskIdFromUrl);
    }
  }, [selectedTaskIdFromUrl]);

  // CURRENT SELECTED TASK
  const selectedTask = useMemo(() => {
    return tasks.find((task) => task._id === selectedTaskId);
  }, [tasks, selectedTaskId]);

  // STUDENTS FROM TASK
  const students = useMemo(() => {
    if (!selectedTask) return [];

    // NEW MULTI ASSIGNEE FORMAT
    if (selectedTask.assignees?.length > 0) {
      return selectedTask.assignees.map((member, index) => ({
        id: member.user?._id || `unknown-${index}`,
        name: member.user?.name || "Unknown User",
        status: member.status || "TODO",
      }));
    }

    // OLD SINGLE ASSIGNEE FORMAT
    if (selectedTask.assignedTo) {
      return [
        {
          id:
            selectedTask.assignedTo?._id ||
            selectedTask.assignedTo ||
            "unknown",
          name: selectedTask.assignedTo?.name || "Unknown User",
          status: selectedTask.status || "TODO",
        },
      ];
    }

    return [];
  }, [selectedTask]);

  // AUTO SELECT FIRST STUDENT
  useEffect(() => {
    if (
      students.length > 0 &&
      !students.find((s) => s.id === selectedStudent?.id)
    ) {
      setSelectedStudent(students[0]);
    }

    if (students.length === 0) {
      setSelectedStudent(null);
    }
  }, [students]);

  return (
    <div className="space-y-5">
      {/* TASK SELECTOR */}
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Task Summary
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Switch between tasks and track assignee discussions
            </p>
          </div>

          {/* DROPDOWN */}
          <div className="w-full md:w-80">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 block">
              Select Task
            </label>

            <div className="relative">
              <select
                value={selectedTaskId}
                onChange={(e) => {
                  setSelectedTaskId(e.target.value);
                }}
                className="appearance-none w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 pr-10 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-blue-500"
              >
                {tasks?.length === 0 ? (
                  <option>No tasks available</option>
                ) : (
                  tasks?.map((task, index) => (
                    <option
                      key={task._id || `${task.title}-${index}`}
                      value={task._id}
                    >
                      {task.title}
                    </option>
                  ))
                )}
              </select>

              <ChevronDown className="size-4 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* TASK INFO */}
        {selectedTask && (
          <div className="mt-5 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                  {selectedTask.title}
                </h3>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  {selectedTask.description || "No description available"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300">
                  {students.length} Assigned
                </span>

                <span className="px-2 py-1 rounded-full text-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {selectedTask.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-12 gap-5 h-[75vh]">
        {/* LEFT PANEL */}
        <div className="col-span-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950 overflow-hidden">
          {/* HEADER */}
          <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Assigned Students
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Track individual student task progress
            </p>
          </div>

          {/* STUDENTS */}
          <div className="p-3 space-y-2 overflow-y-auto h-[calc(75vh-90px)]">
            {students.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center p-10">
                <p className="text-zinc-500 dark:text-zinc-400">
                  No assignees available
                </p>
              </div>
            ) : (
              students.map((student, index) => {
                const isActive = selectedStudent?.id === student.id;

                const config =
                  statusConfig[student.status] || statusConfig.TODO;

                const Icon = config.icon;

                return (
                  <button
                    key={student.id || `${student.name}-${index}`}
                    onClick={() => setSelectedStudent(student)}
                    className={`w-full flex items-center justify-between rounded-xl px-4 py-3 border transition-all ${
                      isActive
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center text-sm font-medium">
                        {student.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>

                      <div className="text-left">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {student.name}
                        </p>

                        <div
                          className={`mt-1 inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}
                        >
                          <Icon className="size-3" />
                          {config.label}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950 flex flex-col">
          {/* HEADER */}
          <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Task Discussion
              </h2>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Discussion and updates for{" "}
                <span className="font-medium">
                  {selectedStudent?.name || "No student selected"}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <MessageCircle className="size-5" />
              <span className="text-sm">0 Comments</span>
            </div>
          </div>

          {/* EMPTY STATE */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 size-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <MessageCircle className="size-7 text-zinc-400" />
              </div>

              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                No comments yet
              </h3>

              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Start the discussion with {selectedStudent?.name || "student"}
              </p>
            </div>
          </div>

          {/* INPUT */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 p-5">
            <div className="flex items-end gap-3">
              <textarea
                placeholder="Write a comment..."
                className="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 resize-none h-24 focus:outline-none focus:border-blue-500"
              />

              <button className="px-5 py-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm hover:opacity-90 transition">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;
