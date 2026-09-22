import {
  LayoutDashboard,
  ClipboardList,
  Bell,
  User,
  LogOut,
  Wrench,
  PlusCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-200 flex flex-col">

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

        {/* Dashboard */}
        <Link
        to="/student/dashboard"
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-medium">
          <LayoutDashboard size={19} />
          Dashboard
        </Link>

        {/* Report Issue */}
        <Link to="/student/report-issue" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50">
        <PlusCircle size={19} />
        Report Issue
        </Link>

        {/* My Complaints */}
        <Link to="/student/my-complaints" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50">
          <ClipboardList size={19} />
          My Complaints
        </Link>

        {/* Notifications */}
        <Link to="/student/notifications" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50">
          <Bell size={19} />
          Notifications
        </Link>

        {/* Profile */}
        <Link
        to="/student/profile"
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50">
          <User size={19} />
        Profile
        </Link>

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-500">
          <LogOut size={19} />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;