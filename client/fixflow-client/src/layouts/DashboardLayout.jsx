import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import AdminSidebar from "../components/AdminSidebar";
import StaffSidebar from "../components/StaffSidebar";

import Navbar from "../components/Navbar";
import AdminNavbar from "../components/AdminNavbar";
import StaffNavbar from "../components/StaffNavbar";

import Footer from "../components/Footer";

function DashboardLayout() {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");
  const isStaff = location.pathname.startsWith("/staff");

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {isAdmin ? (
        <AdminSidebar />
      ) : isStaff ? (
        <StaffSidebar />
      ) : (
        <Sidebar />
      )}

      <div className="flex-1 flex flex-col">

        {isAdmin ? (
          <AdminNavbar />
        ) : isStaff ? (
          <StaffNavbar />
        ) : (
          <Navbar />
        )}

        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </div>
  );
}

export default DashboardLayout;