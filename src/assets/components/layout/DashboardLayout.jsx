import Sidebar from "./Sidebar";
import Header from "./Header";
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
     
     <div className="fixed top-0 left-0 h-screen">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col pl-68">
      <div className="sticky top-0 z-10">
          <Header />
        </div>
      <main className="flex-1 p-8"> {children} </main>{" "}
      </div>
    </div>
  );
};
export default DashboardLayout;
