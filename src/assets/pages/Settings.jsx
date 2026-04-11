import React from "react";
import HeroSection from "../components/common/HeroSection";
import ProfileImage from "../utils/images/profile.jpeg";
import InputBox from "../components/common/InputBox";
const Settings = () => {
  return (
    <div>
      <HeroSection
        mainMessage="Settings"
        subText="Manage your account information and preferences"
      />
      <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <img
            src={ProfileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />

          <div className="flex flex-col gap-3">
            <button className="border border-gray-300 rounded-lg px-5 py-2.5 text-sm font-medium text-gray-900 w-fit hover:bg-gray-50 transition">
              Change Photo
            </button>

            <p className="text-sm text-gray-500">
              JPG, GIF or PNG. Max size of 800K
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputBox label="First Name" type="text" defaultValue="Arun" />
            <InputBox label="Last Name" type="text" defaultValue="Prakash G" />
          </div>

          <div className="mt-6">
            <InputBox
              label="Email"
              type="email"
              defaultValue="arunprakash4ux@gmail.com"
            />
          </div>

          <div className="mt-6">
            <InputBox
              label="Password"
              type="password"
              defaultValue="******************"
            />
          </div>
        </div>
        <div className="mt-6 flex gap-3 justify-end">
          <button className="px-5 py-2 text-sm rounded border border-gray-300 text-gray-900 space-x-2 hover:opacity-90 transition cursor-pointer">
            Cancel
          </button>
          <button className="px-5 py-2 text-sm rounded bg-gradient-to-br from-blue-500 to-blue-600 text-white space-x-2 hover:opacity-90 transition cursor-pointer">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
