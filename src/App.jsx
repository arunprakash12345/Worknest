import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./assets/components/layout/DashboardLayout";
import Dashboard from "./assets/pages/Dashboard";
import BatchDetails from "./assets/pages/BatchDetails";
import Batches from "./assets/pages/Batches";
import Students from "./assets/pages/Students";
import Settings from "./assets/pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/batches" element={<Batches />} />
          <Route path="/batches/:batchId" element={<BatchDetails />} />
          <Route path="/students" element={<Students />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
