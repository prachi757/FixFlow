import {
  LayoutDashboard,
  ClipboardList,
  Bell,
  User,
  LogOut,
  Wrench,
  PlusCircle,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 min-h-screen bg-white border-r border-slate-200 flex-col shrink-0">

        {/* Logo */}
        <div className="h-20 px-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
            <Wrench size={20} />
          </div>

          <div>
            <h1 className="font-bold text-lg text-slate-900">
              FixFlow
            </h1>

            <p className="text-xs text-slate-400">
              Maintenance Management
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">

          <Link
            to="/student/dashboard"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-medium"
          >
            <LayoutDashboard size={19} />
            Dashboard
          </Link>

          <Link
            to="/student/report-issue"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <PlusCircle size={19} />
            Report Issue
          </Link>

          <Link
            to="/student/my-complaints"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <ClipboardList size={19} />
            My Complaints
          </Link>

          <Link
            to="/student/notifications"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Bell size={19} />
            Notifications
          </Link>

          <Link
            to="/student/profile"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <User size={19} />
            Profile
          </Link>

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-500"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>

      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-white border-t border-slate-200 flex items-center justify-around z-50">

        <Link
          to="/student/dashboard"
          className="flex flex-col items-center gap-1 text-blue-600"
        >
          <LayoutDashboard size={20} />
          <span className="text-[10px]">Dashboard</span>
        </Link>

        <Link
          to="/student/report-issue"
          className="flex flex-col items-center gap-1 text-slate-500"
        >
          <PlusCircle size={20} />
          <span className="text-[10px]">Report</span>
        </Link>

        <Link
          to="/student/my-complaints"
          className="flex flex-col items-center gap-1 text-slate-500"
        >
          <ClipboardList size={20} />
          <span className="text-[10px]">Complaints</span>
        </Link>

        <Link
          to="/student/notifications"
          className="flex flex-col items-center gap-1 text-slate-500"
        >
          <Bell size={20} />
          <span className="text-[10px]">Alerts</span>
        </Link>

        <Link
          to="/student/profile"
          className="flex flex-col items-center gap-1 text-slate-500"
        >
          <User size={20} />
          <span className="text-[10px]">Profile</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 text-slate-500"
        >
          <LogOut size={20} />
          <span className="text-[10px]">Logout</span>
        </button>

      </nav>
    </>
  );
}

export default Sidebar;