import React from "react";

const FileStackIcon = ({ width, height, color }) => {
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
        d="M11 21C11 21.55 10.55 22 10 22H4C3.45 22 3 21.55 3 21V13C3 12.45 3.45 12 4 12H5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 16C16 16.55 15.55 17 15 17H9C8.45 17 8 16.55 8 16V8C8 7.45 8.45 7 9 7H10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 6C21 5.47 20.79 4.96 20.41 4.59L18.41 2.59C18.04 2.21 17.53 2 17 2H14C13.45 2 13 2.45 13 3V11C13 11.55 13.45 12 14 12H20C20.55 12 21 11.55 21 11V6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FileStackIcon;
