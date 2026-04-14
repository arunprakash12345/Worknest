import React, { useState } from "react";
import { validateBatchValues } from "../hooks/validateBatchValues";
const CreateBatchModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const validationError = validateBatchValues(
      title,
      description,
      category,
      startDate,
      endDate,
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    const newBatch = {
      id: Date.now(),
      title,
      description,
      status,
      category,
      startDate,
      endDate,
      members: membersList.filter((member) =>
        selectedMembers.includes(member.id),
      ),
      tasks: [],
    };

    onSubmit(newBatch);
  };
  const [selectedMembers, setSelectedMembers] = useState([]);
  const membersList = [
    {
      id: 1,
      name: "Arun Prakash",
    },
    {
      id: 2,
      name: "John Doe",
    },
    {
      id: 3,
      name: "Sarah",
    },
    {
      id: 5,
      name: "Prakash",
    },
    {
      id: 6,
      name: "Saipallavi",
    },
    {
      id: 7,
      name: "Ridhanya",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 backdrop-blur-sm overflow-y-scroll">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 ">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">
              Create New Batch
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Add a new batch and manage tasks easily
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 text-xl"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Batch Title
            </label>
            <input
              type="text"
              placeholder="Enter batch title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-zinc-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter batch description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border border-zinc-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Category
              </label>
              <input
                type="text"
                placeholder="UI/UX, Frontend, Backend..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-zinc-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-zinc-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ACTIVE">Active</option>
                <option value="PLANNING">Planning</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-zinc-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-zinc-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Members
            </label>

            <div className="border border-zinc-200 rounded-lg p-3 space-y-2 max-h-40 overflow-y-scroll">
              {membersList.map((member) => (
                <label
                  key={member.id}
                  className="flex items-center gap-2 cursor-pointer text-sm text-zinc-700"
                >
                  <input
                    type="checkbox"
                    value={member.id}
                    checked={selectedMembers.includes(member.id)}
                    onChange={(e) => {
                      const memberId = Number(e.target.value);

                      if (e.target.checked) {
                        setSelectedMembers((prev) => [...prev, memberId]);
                      } else {
                        setSelectedMembers((prev) =>
                          prev.filter((id) => id !== memberId),
                        );
                      }
                    }}
                    className="rounded border-zinc-300"
                  />

                  {member.name}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Create Batch
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBatchModal;
