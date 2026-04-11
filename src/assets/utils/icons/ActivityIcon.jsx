import React from "react";

const ActivityIcon = ({ width, height, color }) => {
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
        d="M22 12H19.52C18.62 12 17.83 12.6 17.59 13.46L15.24 21.82C15.16 22.1 14.84 22.1 14.76 21.82L9.24 2.18C9.16 1.9 8.84 1.9 8.76 2.18L6.41 10.54C6.17 11.4 5.38 12 4.48 12H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ActivityIcon;
