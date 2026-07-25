import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadTheme } from "../features/themeSlice";
import { Loader2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { checkAuthToken, clearAuth } from "../utils/auth";
import toast from "react-hot-toast";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { loading } = useSelector((state) => state.workspace);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle session expiry
  const handleSessionExpired = useCallback(() => {
    clearAuth();
    toast.error("Session expired. Please log in again.");
    navigate("/auth", { replace: true });
  }, [navigate]);

  // Check auth on mount and periodically
  useEffect(() => {
    // Initial check
    if (!checkAuthToken()) {
      navigate("/auth", { replace: true });
      return;
    }
    
    setIsAuthenticated(true);

    // Check token expiry every minute
    const interval = setInterval(() => {
      if (!checkAuthToken()) {
        handleSessionExpired();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [navigate, handleSessionExpired]);

  // Listen for 401 responses globally (from fetch calls)
  useEffect(() => {
    const handleUnauthorized = (event) => {
      if (event.detail?.status === 401) {
        handleSessionExpired();
      }
    };

    window.addEventListener("unauthorized", handleUnauthorized);
    return () => window.removeEventListener("unauthorized", handleUnauthorized);
  }, [handleSessionExpired]);

  // Initial load of theme
  useEffect(() => {
    dispatch(loadTheme());
  }, [dispatch]);

  // Don't render anything until we confirm auth status
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-zinc-950">
        <Loader2Icon className="size-7 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-zinc-950">
        <Loader2Icon className="size-7 text-blue-500 animate-spin" />
      </div>
    );

  return (
    <div className="flex bg-white dark:bg-zinc-950 text-gray-900 dark:text-slate-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col h-screen">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex-1 h-full p-6 xl:p-10 xl:px-16 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
