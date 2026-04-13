import React from "react";
import InputBox from "../components/common/InputBox";
import Dropdown from "../components/common/Dropdown";
import AddUserIcon from "../utils/icons/addUser";
const SettingsTab = ({ id }) => {
  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 ">
          <div className="not-dark:bg-white  border border-zinc-300  rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-zinc-900 text-md flex gap-2 items-center max-sm:hidden">
                Batch Details
              </h2>
            </div>
            <div className="flex gap-4 flex-col">
              <InputBox
                label="Batch Name"
                type="text"
                defaultValue="Batch 01"
              />
              <InputBox label="Description" type="text" defaultValue="" />
              <label className="block text-sm font-medium text-gray-900">
                Priority
              </label>
              <Dropdown
                key="Priority"
                name="Priority"
                id="Priority"
                values={["High", "Medium", "Low"]}
              />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white border border-zinc-300 rounded-lg p-4">
            <div className="flex justify-between mb-4">
              <h3 className="text-zinc-900 text-md flex items-center gap-2 mb-3">
                Team Members
              </h3>
              {
                <button className=" items-center px-3 py-1 rounded bg-gradient-to-br from-blue-500 to-blue-600 text-white space-x-2 hover:opacity-90 transition cursor-pointer">
                  <AddUserIcon />
                </button>
              }
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">
                arunprakash4ux@gmail.com
              </span>
              <span className="text-sm text-gray-500">Mentor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
