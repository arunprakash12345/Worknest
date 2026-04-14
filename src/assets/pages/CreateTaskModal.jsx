import React, { useState } from "react";
import validateValues from "../hooks/validateValues";

const CreateTaskModal = ({ members, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("TASK");
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("TO DO");
  const [assigneeId, setAssigneeId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateValues(
      title,
      description,
      type,
      priority,
      status,
      dueDate,
    );
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    const selectedMember = members.find(
      (member) => member.id === Number(assigneeId),
    );

    const newTask = {
      id: Date.now(),
      title,
      description,
      type,
      priority,
      status,
      dueDate,
      assignee: {
        name: selectedMember?.name || "",
        image: selectedMember?.image || "",
      },
    };

    onSubmit(newTask);
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-zinc-800">
            Create New Task
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-700 text-sm"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm text-zinc-600 mb-2">
              Task Title
            </label>

            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-zinc-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-600 mb-2">
              Description
            </label>

            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border border-zinc-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-600 mb-2">Type</label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-zinc-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500"
              >
                <option value="TASK">Task</option>
                <option value="BUG">Bug</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-zinc-600 mb-2">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-zinc-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-zinc-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500"
              >
                <option value="TO DO">To Do</option>
                <option value="IN PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-zinc-600 mb-2">
                Assignee
              </label>

              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full border border-zinc-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500"
              >
                <option value="">Select Member</option>

                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-600 mb-2">Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-zinc-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-600 hover:bg-zinc-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
