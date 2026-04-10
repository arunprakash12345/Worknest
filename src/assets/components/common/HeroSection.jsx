import React from "react";
import PlusIcon from "../../utils/images/plus.svg";

const HeroSection = ({ mainMessage, subText, buttonLabel }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
            {mainMessage}
          </h1>

          <p className="text-gray-500 text-sm">
            {subText}
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-2 text-sm rounded bg-gradient-to-br from-blue-500 to-blue-600 text-white space-x-2 hover:opacity-90 transition">
          <img src={PlusIcon} alt="plus-icon" />
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default HeroSection;