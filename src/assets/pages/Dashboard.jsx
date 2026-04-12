import HeroSection from "../components/common/HeroSection";
import SideWidgetCard from "../components/common/SideWidgetCard";
import KPI from "../components/layout/KPI";
import user from "../utils/images/user.svg";
import overdue from "../utils/images/overdueGray.svg";
import inprogress from "../utils/images/inprogressGray.svg";
import SectionCard from "../components/common/SectionCard";
import dashboardKPIData from "../data/dashboardKPIData";

const Dashboard = () => {
  return (
    <>
      <HeroSection
        mainMessage="Welcome, Arun Prakash G"
        subText="Here's what's happening with your batches today"
        buttonLabel="New Batch"
      />
      <KPI data={dashboardKPIData} />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <SectionCard type="Project Overview" />
          <SectionCard type="Recent Activity" />
        </div>
        <div>
          <div className="space-y-6">
            <SideWidgetCard
              title="My Tasks"
              icon={user}
              data={[]}
              tagBackground="bg-emerald-100"
              tagTextColor="text-emerald-800"
            />
            <SideWidgetCard
              title="Overdue"
              icon={overdue}
              data={[]}
              tagBackground="bg-red-100"
              tagTextColor="text-red-800"
            />
            <SideWidgetCard
              title="In Progress"
              icon={inprogress}
              data={[]}
              tagBackground="bg-blue-100"
              tagTextColor="text-blue-800"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
