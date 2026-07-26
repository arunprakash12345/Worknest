import { SearchIcon, PanelLeft, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { MoonIcon, SunIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import { getAvatarGradient, getInitials } from "../utils/avatar";

const Navbar = ({ setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ batches: [], tasks: [] });
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const searchRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully 👋");
    navigate("/auth", { replace: true });
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search when query changes
  useEffect(() => {
    const searchData = async () => {
      if (!searchQuery.trim()) {
        setSearchResults({ batches: [], tasks: [] });
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      try {
        const token = localStorage.getItem("token");
        const query = searchQuery.toLowerCase();

        // Fetch batches and tasks (use my-tasks for global search)
        const [batchesRes, tasksRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/batches`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_API_URL}/tasks/my-tasks`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const batches = await batchesRes.json();
        const tasks = await tasksRes.json();

        // Filter results
        const filteredBatches = batches
          .filter((b) => b.title?.toLowerCase().includes(query) || b.description?.toLowerCase().includes(query))
          .slice(0, 5);

        const filteredTasks = tasks
          .filter((t) => t.title?.toLowerCase().includes(query) || t.description?.toLowerCase().includes(query))
          .slice(0, 5);

        setSearchResults({ batches: filteredBatches, tasks: filteredTasks });
        setShowResults(true);
      } catch (err) {
        // Silent fail
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(searchData, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleResultClick = (type, item) => {
    setSearchQuery("");
    setShowResults(false);
    if (type === "batch") {
      navigate(`/batches/${item._id}`);
    } else {
      // task.batch can be an object (from my-tasks) or string
      const batchId = item.batch?._id || item.batch;
      navigate(`/batches/${batchId}?tab=tasks&taskId=${item._id}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-6 xl:px-16 py-3 flex-shrink-0">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Left section */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="sm:hidden p-2 rounded-lg transition-colors text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <PanelLeft size={20} />
          </button>

          {/* Search Input */}
          <div ref={searchRef} className="relative flex-1 max-w-sm">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-400 size-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
              placeholder="Search batches..."
              className="pl-8 pr-8 py-2 w-full bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-md text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {searchQuery && (
              <button onClick={clearSearch} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="size-3.5" />
              </button>
            )}

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-center text-sm text-gray-500">Searching...</div>
                ) : searchResults.batches.length === 0 && searchResults.tasks.length === 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500">No results found</div>
                ) : (
                  <>
                    {searchResults.batches.length > 0 && (
                      <div>
                        <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-800">
                          Batches
                        </div>
                        {searchResults.batches.map((batch) => (
                          <button
                            key={batch._id}
                            onClick={() => handleResultClick("batch", batch)}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                          >
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{batch.title}</p>
                            <p className="text-xs text-gray-500 truncate">{batch.status}</p>
                          </button>
                        ))}
                      </div>
                    )}
                    {searchResults.tasks.length > 0 && (
                      <div>
                        <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-800">
                          Tasks
                        </div>
                        {searchResults.tasks.map((task) => (
                          <button
                            key={task._id}
                            onClick={() => handleResultClick("task", task)}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                          >
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{task.title}</p>
                            <p className="text-xs text-gray-500 truncate">{task.status} • {task.priority}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="size-8 flex items-center justify-center bg-white dark:bg-zinc-800 shadow rounded-lg transition hover:scale-105 active:scale-95"
          >
            {theme === "light" ? (
              <MoonIcon className="size-4 text-gray-800 dark:text-gray-200" />
            ) : (
              <SunIcon className="size-4 text-yellow-400" />
            )}
          </button>

          <div ref={dropdownRef} className="relative">
            <div
              onClick={() => setIsOpen((prev) => !prev)}
              className={`size-7 rounded-full bg-gradient-to-br ${getAvatarGradient(user?.name || user?.email)} flex items-center justify-center text-white text-xs font-medium cursor-pointer`}
            >
              {getInitials(user?.name)}
            </div>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg p-2 z-50">
                <div className="px-3 py-2 border-b border-gray-200 dark:border-zinc-700">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{user?.name || "User"}</p>
                  <p className="text-xs text-gray-500">{user?.role || "STUDENT"}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
