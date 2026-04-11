import React from "react";

const ShieldIcon = ({ width, height, color }) => {
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
        d="M20 13C20 18 16.5 20.5 12.34 21.95C12.12 22.03 11.89 22.03 11.67 21.94C7.5 20.5 4 18 4 13V6C4 5.45 4.45 5 5 5C7 5 9.5 3.81 11.24 2.28C11.68 1.91 12.32 1.91 12.76 2.28C14.5 3.81 17 5 19 5C19.55 5 20 5.45 20 6V13Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShieldIcon;
