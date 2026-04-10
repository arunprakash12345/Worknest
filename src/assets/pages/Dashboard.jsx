import HeroSection from "../components/common/HeroSection";
import DashboardLayout from "../components/layout/DashboardLayout";
import KPI from "../components/layout/KPI";
const Dashboard = () => {
  return (
    <DashboardLayout >
      <HeroSection mainMessage="Welcome, Arun Prakash G" subText="Here's what's happening with your batches today" buttonLabel="New Project"/>
    <KPI/>
    </DashboardLayout>
  );
};

export default Dashboard;