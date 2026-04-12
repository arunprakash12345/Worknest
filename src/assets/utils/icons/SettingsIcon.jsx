import React from "react";

const SettingsIcon = ({ width, height, color }) => {
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
        d="M9.671 4.136C10.01 2.62 11.99 2.62 12.329 4.136C12.61 5.39 13.95 6.07 15.12 5.51C16.53 4.84 18.03 6.34 17.36 7.75C16.8 8.92 17.48 10.26 18.73 10.54C20.25 10.88 20.25 12.86 18.73 13.2C17.48 13.48 16.8 14.82 17.36 15.99C18.03 17.4 16.53 18.9 15.12 18.23C13.95 17.67 12.61 18.35 12.329 19.61C11.99 21.12 10.01 21.12 9.671 19.61C9.39 18.35 8.05 17.67 6.88 18.23C5.47 18.9 3.97 17.4 4.64 15.99C5.2 14.82 4.52 13.48 3.27 13.2C1.75 12.86 1.75 10.88 3.27 10.54C4.52 10.26 5.2 8.92 4.64 7.75C3.97 6.34 5.47 4.84 6.88 5.51C8.05 6.07 9.39 5.39 9.671 4.136Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

export default SettingsIcon;
