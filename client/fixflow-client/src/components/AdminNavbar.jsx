import {
  Bell,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminNavbar() {
  const { user } = useAuth();
  const location = useLocation();

  const name = user?.name || "Admin";
  const email = user?.collegeEmail || "";

  const initials = name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isNotificationsPage =
    location.pathname === "/admin/notifications";

  const isProfilePage =
    location.pathname === "/admin/profile";

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-6 lg:px-8">

      <div className="h-16 sm:h-[76px] flex items-center justify-between gap-2 sm:gap-4">

        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-100 text-indigo-600 flex items-center justify-center border border-indigo-100 shrink-0">
            <ShieldCheck size={22} strokeWidth={2} />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm sm:text-[15px] font-bold text-slate-800 tracking-tight truncate">
              Administration Workspace
            </h2>

            <p className="hidden sm:block text-xs text-slate-400 mt-0.5">
              Campus management & control
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">

          {/* Notifications */}
          <Link
            to="/admin/notifications"
            aria-label="Notifications"
            className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
              isNotificationsPage
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
          >
            <Bell size={21} strokeWidth={2} />

            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
          </Link>

          {/* Divider */}
          <div className="hidden sm:block h-9 w-px bg-slate-200" />

          {/* Admin Profile */}
          <Link
            to="/admin/profile"
            className={`flex items-center gap-2 sm:gap-3 p-1.5 sm:pr-3 rounded-xl transition-all duration-200 group ${
              isProfilePage
                ? "bg-indigo-50"
                : "hover:bg-slate-50"
            }`}
          >
            {/* Initials */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-700 flex items-center justify-center font-bold text-sm border border-indigo-100 shrink-0">
              {initials || "A"}
            </div>

            {/* Name and Email */}
            <div className="hidden sm:block text-left max-w-44">
              <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                {name}
              </p>

              <p className="text-xs text-slate-400 truncate mt-0.5">
                {email || "Administrator"}
              </p>
            </div>

            <ChevronRight
              size={17}
              className="hidden sm:block text-slate-400 group-hover:text-indigo-600 transition-colors"
            />
          </Link>

        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;