import HeroSection from "../components/common/HeroSection";
import SideWidgetCard from "../components/common/SideWidgetCard";
import KPI from "../components/layout/KPI";
import user from "../utils/images/user.svg";
import overdue from "../utils/images/overdueGray.svg";
import inprogress from "../utils/images/inprogressGray.svg";
import SectionCard from "../components/common/SectionCard";

import InprogressIcon from "../utils/images/inprogress.svg";
import StudentsIcon from "../utils/images/studentsPurple.svg";
import OverdueIcon from "../utils/images/overdue.svg";
import CompletedIcon from "../utils/images/completed.svg";

const Dashboard = () => {
  const dashboardKPIData = [
  {
    title: "Total Projects",
    subText: "Projects in Appian Solutions",
    img: InprogressIcon,
    value: "0",
    iconBg: "bg-blue-500/10",
  },
  {
    title: "Completed Projects",
    subText: "of 1 total",
    img: CompletedIcon,
    value: "0",
    iconBg: "bg-green-500/10",
  },
  {
    title: "My Tasks",
    subText: "assigned to me",
    img: StudentsIcon,
    value: "0",
    iconBg: "bg-purple-500/10",
  },
  {
    title: "Overdue",
    subText: "need attention",
    img: OverdueIcon,
    value: "0",
    iconBg: "bg-orange-500/10",
  },
];
  return (
    <>
      <HeroSection mainMessage="Welcome, Arun Prakash G" subText="Here's what's happening with your batches today" buttonLabel="New Batch"/>
      <KPI data={dashboardKPIData} />
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <SectionCard type="Project Overview"/>
        <SectionCard type="Recent Activity"/>
      </div>
      <div>
        <div className="space-y-6">
          <SideWidgetCard title="My Tasks" icon={user} data={[]} tagBackground="bg-emerald-100" tagTextColor="text-emerald-800" />
          <SideWidgetCard title="Overdue" icon={overdue} data={[]} tagBackground="bg-red-100" tagTextColor="text-red-800" />
          <SideWidgetCard title="In Progress" icon={inprogress} data={[]} tagBackground="bg-blue-100" tagTextColor="text-blue-800" />
        </div>
      </div>
    </div>
    </>
  );
};
export default Dashboard;