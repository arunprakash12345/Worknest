import { useState } from "react";
import { User, BookOpen, LogOut, Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../src/features/themeSlice";

const BatchSettings = () => {
  const [userData, setUserData] = useState({
    name: "Arun",
    email: "arun@gmail.com",
    role: "Student",
    theme: "System",
  });
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.theme);

  // temporary data (replace with API later)
  const myBatches = [
    {
      id: 1,
      title: "Frontend React Cohort",
    },
    {
      id: 2,
      title: "DSA Mastery Batch",
    },
    {
      id: 3,
      title: "UI UX Batch",
    },
  ];

  const handleChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const leaveBatch = (id) => {
    console.log("Leave batch:", id);

    // API later
    // await leaveBatchApi(id)
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Settings
        </h1>

        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* PROFILE */}

      <div className="bg-white dark:bg-zinc-950 dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <div className="border-b border-zinc-200 dark:border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-gray-500 dark:text-zinc-400" />

            <h3 className="text-sm font-medium text-gray-800 dark:text-white">
              Profile
            </h3>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-sm text-gray-700 dark:text-zinc-300">
              Name
            </label>

            <input
              value={userData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full mt-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 dark:text-zinc-300">
              Email
            </label>

            <input
              value={userData.email}
              disabled
              className="w-full mt-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 text-gray-500 dark:text-zinc-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 dark:text-zinc-300">
              Role
            </label>

            <input
              value={userData.role}
              disabled
              className="w-full mt-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 text-gray-500 dark:text-zinc-400"
            />
          </div>

          <button className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm">
            Save Changes
          </button>
        </div>
      </div>

      {/* MY BATCHES */}

      <div className="bg-white dark:bg-zinc-950 dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <div className="border-b border-zinc-200 dark:border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-gray-500 dark:text-zinc-400" />

            <h3 className="text-sm font-medium text-gray-800 dark:text-white">
              My Batches
            </h3>
          </div>
        </div>

        <div className="p-5 space-y-3">
          {myBatches.map((batch) => (
            <div
              key={batch.id}
              className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900"
            >
              <p className="text-sm text-gray-800 dark:text-white">
                {batch.title}
              </p>

              <button
                onClick={() => leaveBatch(batch.id)}
                className="px-3 py-1 rounded text-xs bg-red-100  hover:bg-red-200 text-red-600"
              >
                Leave
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* THEME */}

      <div className="bg-white dark:bg-zinc-950 dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <div className="border-b border-zinc-200 dark:border-zinc-800 p-4">
          <h3 className="text-sm font-medium text-gray-800 dark:text-white">
            Preferences
          </h3>
        </div>

        <div className="p-5">
          <label className="text-sm text-gray-700 dark:text-zinc-300">
            Theme
          </label>

          <select
            value={theme}
            onChange={(e) => dispatch(setTheme(e.target.value))}
            className="w-full mt-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
          >
            <option value="light">Light</option>

            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      {/* LOGOUT */}

      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white">
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default BatchSettings;
