import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import StatsGrid from "../components/StatsGrid";
import ProjectOverview from "../components/ProjectOverview";
import RecentActivity from "../components/RecentActivity";
import TasksSummary from "../components/TasksSummary";
import CreateProjectDialog from "../components/CreateProjectDialog";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getMyTasks } from "../../service/taskApi";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isMentor = user?.role === "MENTOR" || user?.role === "ADMIN";
  const [myTasks, setMyTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/batches`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch batches");
      }

      // FORMAT PROJECTS
      const formatted = data.map((batch) => ({
        id: batch._id,
        name: batch.title,
        description: batch.description || "",
        status: batch.status || "ACTIVE",
        priority: batch.priority || "MEDIUM",
        startDate: batch.startDate,
        endDate: batch.endDate,
        members: batch.members || [],
      }));
      setProjects(formatted);
    } catch (err) {
      console.error(err);

      toast.error("Failed to load batches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // console.log("DASHBOARD PROJECTS:", projects);

  useEffect(() => {
    const fetchMyTasks = async () => {
      try {
        const data = await getMyTasks();
        setMyTasks(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMyTasks();
  }, []);
  console.log("MY TASKS:", myTasks);

  return (
    <div className="max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            Welcome back, {user?.name || "User"}
          </h1>

          <p className="text-gray-500 dark:text-zinc-400 text-sm">
            Here's what's happening with your batches today
          </p>
        </div>

        {/* CREATE BUTTON */}
        {isMentor && (
          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2 px-5 py-2 text-sm rounded bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:opacity-90 transition"
          >
            <Plus size={16} />
            New Batch
          </button>
        )}

        {/* DIALOG */}
        <CreateProjectDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </div>

      {/* KPI GRID */}
      <StatsGrid projects={projects} tasks={myTasks} />

      {/* MAIN CONTENT */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          <ProjectOverview projects={projects} />

          {/* OPTIONAL */}
          {/* <RecentActivity /> */}
        </div>

        {/* RIGHT */}
        <div>
          <TasksSummary tasks={myTasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
