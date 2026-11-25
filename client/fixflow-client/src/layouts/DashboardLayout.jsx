import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import AdminSidebar from "../components/AdminSidebar";
import StaffSidebar from "../components/StaffSidebar";

import Navbar from "../components/Navbar";
import AdminNavbar from "../components/AdminNavbar";
import StaffNavbar from "../components/StaffNavbar";

import Footer from "../components/Footer";
import AdminFooter from "../components/AdminFooter";
import StaffFooter from "../components/StaffFooter";

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

      <div className="flex-1 flex flex-col min-w-0">

        {isAdmin ? (
          <AdminNavbar />
        ) : isStaff ? (
          <StaffNavbar />
        ) : (
          <Navbar />
        )}

        <main className={`flex-1 min-w-0 ${
          !isAdmin && !isStaff ? "pb-20 md:pb-0" : ""
        }`}>
          <Outlet />
        </main>

        {isAdmin ? (
          <AdminFooter />
        ) : isStaff ? (
          <StaffFooter />
        ) : (
          <Footer />
        )}

      </div>
    </div>
  );
}

export default DashboardLayout;