import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/mentor/Dashboard";
import Batches from "../pages/mentor/Batches";
import Students from "../pages/mentor/Students";
import Settings from "../pages/mentor/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/batches" element={<Batches />} />
      <Route path="/students" element={<Students />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default AppRoutes;