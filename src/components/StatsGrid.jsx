import { FolderOpen, CheckCircle, Users, AlertTriangle } from "lucide-react";

export default function StatsGrid({ projects = [], tasks = [] }) {
  // MY TASKS
  const myTasks = tasks;

  // OVERDUE TASKS
  const overdueTasks = tasks.filter(
    (t) =>
      t.dueDate && new Date(t.dueDate) < new Date() && t.myStatus !== "DONE"
  );

  // COMPLETED BATCHES
  const completedProjects = projects.filter((p) => p.status === "COMPLETED");

  const statCards = [
    {
      icon: FolderOpen,
      title: "Total Batches",
      value: projects.length,
      subtitle: `${projects.length} batches`,
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500",
    },

    {
      icon: CheckCircle,
      title: "Completed Batches",
      value: completedProjects.length,
      subtitle: `of ${projects.length} total`,
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-500",
    },

    {
      icon: Users,
      title: "My Tasks",
      value: myTasks.length,
      subtitle: "assigned to me",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-500",
    },

    {
      icon: AlertTriangle,
      title: "Overdue",
      value: overdueTasks.length,
      subtitle: "need attention",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-9">
      {statCards.map(
        ({ icon: Icon, title, value, subtitle, bgColor, textColor }, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-950 dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition duration-200 rounded-md"
          >
            <div className="p-6 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                    {title}
                  </p>

                  <p className="text-3xl font-bold text-zinc-800 dark:text-white">
                    {value}
                  </p>

                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                    {subtitle}
                  </p>
                </div>

                <div className={`p-3 rounded-xl ${bgColor}`}>
                  <Icon size={20} className={textColor} />
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
