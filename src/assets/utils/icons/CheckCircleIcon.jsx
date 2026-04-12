import React from "react";

const CircleCheckIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      className={color}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.801 10C21.93 10.64 22 11.3 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C14.01 2 15.88 2.59 17.44 3.61"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 11L12 14L22 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CircleCheckIcon;
