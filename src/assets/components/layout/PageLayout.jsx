import Sidebar from "./Sidebar";
import Header from "./Header";

const PageLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;