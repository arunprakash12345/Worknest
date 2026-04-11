import React from "react";

const KPICards = ({ title, subText, img, value, iconBg }) => {
  return (
    <div className="bg-white border border-zinc-200  hover:border-zinc-300 transition duration-200 rounded-md">
      <div className="p-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-zinc-500 mb-1">{title}</p>
            <p className="text-3xl font-bold text-zinc-800">{value}</p>
            <p className="text-xs text-zinc-400 mt-1">{subText}</p>
          </div>
          <div className={`p-3 rounded-xl ${iconBg} bg-opacity-20`}>
            {typeof img === "string" ? <img src={img} alt="icon" /> : img}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICards;
