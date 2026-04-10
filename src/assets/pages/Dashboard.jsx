import HeroSection from "../components/common/HeroSection";
import KPI from "../components/layout/KPI";
const Dashboard = () => {
  return (
    <>
      <HeroSection mainMessage="Welcome, Arun Prakash G" subText="Here's what's happening with your batches today" buttonLabel="New Project"/>
    <KPI/>
    </>
  );
};

export default Dashboard;