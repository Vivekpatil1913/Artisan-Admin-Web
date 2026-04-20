import Navbar from "../pages/components/Navbar";
import Sidebar from "../pages/components/Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/layout.css";

function DashboardLayout() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Navbar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;