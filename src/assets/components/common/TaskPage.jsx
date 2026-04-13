import React from "react";
import { useParams } from "react-router-dom";
import batchData from "../../data/batchData";
import ArrowLeftIcon from "../../utils/icons/arrowLeft";
import { Link } from "react-router-dom";
const TaskPage = () => {
  const { batchId, taskId } = useParams();
  const batch = batchData.find((item) => item.id === Number(batchId));
  const task = batch.tasks.find((item) => item.id === Number(taskId));
  console.log(batchId, taskId);
  return (
    <div className="flex-1 h-full p-6 xl:p-10 xl:px-16 overflow-y-scroll">
      <Link
        to={`/batches/${batchId}`}
        className="hover:bg-gray-200 transition h-8 w-20 rounded-lg flex items-center justify-center flex-shrink-0 "
      >
        <ArrowLeftIcon width={20} height={20} color="text-gray-800" /> Back
      </Link>
      <div className="flex flex-col-reverse lg:flex-row gap-6 sm:p-4 text-gray-900 max-w-6xl mx-auto">
        <div className="w-full lg:w-2/3">
          <div className="p-5 rounded-md  border border-gray-300 flex flex-col lg:h-[80vh]">
            <h2 className="text-base font-semibold flex items-center gap-2 mb-4 text-gray-900">
              Task Discussion
            </h2>
            <div className="flex-1 md:overflow-y-scroll no-scrollbar">
              <p className="text-gray-600 mb-4 text-sm">
                No comments yet. Be the first!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
              <textarea
                placeholder="Write a comment..."
                rows="3"
                className="w-full  border border-gray-300  rounded-md p-2 text-sm text-gray-900 resize-none focus:outline-none focus:ring-1 focus:ring-blue-600"
              ></textarea>
              <button className="bg-gradient-to-l from-blue-500 to-blue-600 transition-colors text-white text-sm px-5 py-2 rounded cursor-pointer hover:from-blue-600 hover:to-blue-700">
                Post
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="p-5 rounded-md bg-white border border-gray-300 ">
            <div className="mb-3">
              <h2 className="text-lg font-medium text-gray-900">Task Name</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-0.5 rounded bg-zinc-200  text-zinc-900  text-xs">
                  Todo
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-200  text-blue-900  text-xs">
                  Task
                </span>
                <span className="px-2 py-0.5 rounded bg-green-200  text-green-900  text-xs">
                  Medium
                </span>
              </div>
              <p className="text-md text-gray-900  leading-relaxed my-4">
                Project description
              </p>
              <p className="text-sm text-gray-800  leading-relaxed my-4">
                Due date: 20th Aug, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
