import React from "react";

const InputBox = ({ label, type, defaultValue }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none"
      />
    </div>
  );
};

export default InputBox;
