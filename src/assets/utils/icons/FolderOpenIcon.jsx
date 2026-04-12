import React from "react";

const FolderOpenIcon = ({ width, height, color }) => {
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
        d="M6 14L7.5 11.1C7.84 10.44 8.52 10 9.24 10H20C21.3 10 22.24 11.22 21.94 12.5L20.4 18.5C20.17 19.38 19.38 20 18.45 20H4C2.9 20 2 19.1 2 18V5C2 3.9 2.9 3 4 3H7.9C8.57 3 9.2 3.34 9.59 3.9L10.4 5.1C10.77 5.66 11.4 6 12.07 6H18C19.1 6 20 6.9 20 8V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FolderOpenIcon;
