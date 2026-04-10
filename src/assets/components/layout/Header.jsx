// Header.jsx

import React from "react";
import ProfileImage from "../../utils/images/profile.jpeg";
import SearchInput from "../common/SearchInput";

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 py-3">
      <div className="mx-auto px-8 flex items-center justify-between gap-6">
        <div className="flex-1">
          <SearchInput placeholder="Search tasks, batches..." />
        </div>

        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={ProfileImage}
            alt="User Profile"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;