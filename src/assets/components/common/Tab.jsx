import React from "react";

const Tab = ({ label, icon, active = false }) => {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 text-sm transition-all rounded cursor-pointer ${
        active ? "bg-zinc-100" : "hover:bg-zinc-50"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Tab;
