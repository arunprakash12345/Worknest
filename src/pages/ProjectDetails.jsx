import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  PlusIcon,
  SettingsIcon,
  BarChart3Icon,
  CalendarIcon,
  FileStackIcon,
  ZapIcon,
  UserPlus,
} from "lucide-react";
import ProjectAnalytics from "../components/ProjectAnalytics";
import ProjectSettings from "../components/ProjectSettings";
import CreateTaskDialog from "../components/CreateTaskDialog";
import ProjectCalendar from "../components/ProjectCalendar";
import ProjectTasks from "../components/ProjectTasks";
import toast from "react-hot-toast";
import AddMembersDialog from "../components/AddMembersDialog";
import ProjectSummary from "../components/ProjectSummary";

export default function ProjectDetail() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const selectedTaskId = searchParams.get("taskId");
  const [showAddMembers, setShowAddMembers] = useState(false);
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [activeTab, setActiveTab] = useState(tab || "tasks");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tab) setActiveTab(tab);
  }, [tab]);

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5002/api/batches/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setProject({
        id: data._id,
        name: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        members: data.members || [],
        progress: data.progress || 0,
      });

      const taskRes = await fetch(
        `http://localhost:5002/api/tasks?batch=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const taskData = await taskRes.json();

      setTasks(taskData || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const statusColors = {
    PLANNING: "bg-zinc-200 text-zinc-900 dark:bg-zinc-600 dark:text-zinc-200",
    ACTIVE:
      "bg-emerald-200 text-emerald-900 dark:bg-emerald-500 dark:text-emerald-900",
    ON_HOLD:
      "bg-amber-200 text-amber-900 dark:bg-amber-500 dark:text-amber-900",
    COMPLETED: "bg-blue-200 text-blue-900 dark:bg-blue-500 dark:text-blue-900",
    CANCELLED: "bg-red-200 text-red-900 dark:bg-red-500 dark:text-red-900",
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!project) {
    return (
      <div className="p-6 text-center">
        <p className="text-3xl mt-40 mb-10">Project not found</p>
        <button
          onClick={() => navigate("/projects")}
          className="px-4 py-2 rounded bg-zinc-200"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/projects")}
            className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
          >
            <ArrowLeftIcon className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
          </button>

          <div className="flex items-center gap-3">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-200">
              {project.name}
            </h1>

            <span
              className={`px-2 py-0.5 text-xs rounded ${
                statusColors[project.status]
              }`}
            >
              {project.status.replace("_", " ")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddMembers(true)}
            className="flex items-center gap-2 px-5 py-2 text-sm rounded bg-gradient-to-br from-blue-500 to-blue-600 hover:opacity-90 text-white transition"
          >
            <UserPlus className="size-4" />
            Add Members
          </button>

          <button
            onClick={() => setShowCreateTask(true)}
            className="flex items-center gap-2 px-5 py-2 text-sm rounded bg-gradient-to-br from-blue-500 to-blue-600 hover:opacity-90 text-white transition"
          >
            <PlusIcon className="size-4" />
            New Task
          </button>
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Tasks", value: tasks.length },
          {
            label: "Completed",
            value: tasks.filter((t) => t.status === "DONE").length,
          },
          {
            label: "In Progress",
            value: tasks.filter(
              (t) => t.status === "IN_PROGRESS" || t.status === "TODO"
            ).length,
          },
          {
            label: "Team Members",
            value: project.members?.length || 0,
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 flex items-center justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition"
          >
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {card.label}
              </p>
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-200">
                {card.value}
              </p>
            </div>
            <ZapIcon className="size-4 text-zinc-400" />
          </div>
        ))}
      </div>

      {/* TABS */}
      <div>
        <div className="flex gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1 w-fit">
          {["tasks", "summary", "calendar", "analytics", "settings"].map(
            (key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setSearchParams({ tab: key });
                }}
                className={`px-4 py-2 text-sm rounded-md transition ${
                  activeTab === key
                    ? "bg-white dark:bg-zinc-800 shadow text-zinc-900 dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {key}
              </button>
            )
          )}
        </div>

        <div className="mt-6">
          {activeTab === "tasks" && (
            <ProjectTasks
              tasks={tasks}
              onTaskUpdated={fetchProject}
              key={`${selectedTaskId}`} // Force remount when selectedTaskId changes
              projectId={id}
              selectedTaskIdFromUrl={selectedTaskId}
            />
          )}
          {activeTab === "summary" && (
            <ProjectSummary tasks={tasks} project={project} />
          )}
          {activeTab === "analytics" && (
            <ProjectAnalytics tasks={tasks} project={project} />
          )}
          {activeTab === "calendar" && <ProjectCalendar tasks={tasks} />}
          {activeTab === "settings" && <ProjectSettings project={project} />}
        </div>
      </div>

      {/* MODAL */}
      {showCreateTask && (
        <CreateTaskDialog
          showCreateTask={showCreateTask}
          setShowCreateTask={setShowCreateTask}
          projectId={id}
          onTaskCreated={fetchProject}
        />
      )}
      {showAddMembers && (
        <AddMembersDialog
          isOpen={showAddMembers}
          setIsOpen={setShowAddMembers}
          projectId={id}
          onMembersAdded={fetchProject}
          existingMembers={project.members || []}
        />
      )}
    </div>
  );
}
