import {
  Bell,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  const name = user?.name || "Student";
  const email = user?.collegeEmail || "";

  const initials = name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isNotificationsPage =
    location.pathname === "/student/notifications";

  const isProfilePage =
    location.pathname === "/student/profile";

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-6 lg:px-8">

      <div className="h-16 sm:h-[76px] flex items-center justify-between gap-2 sm:gap-4">

        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
            <GraduationCap size={23} strokeWidth={2} />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm sm:text-[15px] font-bold text-slate-800 tracking-tight truncate">
              Student Workspace
            </h2>

            <p className="hidden sm:block text-xs text-slate-400 mt-0.5">
              Campus services & support
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">

          {/* Notifications */}
          <Link
            to="/student/notifications"
            aria-label="Notifications"
            className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
              isNotificationsPage
                ? "bg-blue-50 text-blue-600"
                : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <Bell size={21} strokeWidth={2} />

            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </Link>

          {/* Divider */}
          <div className="hidden sm:block h-9 w-px bg-slate-200" />

          {/* Student Profile */}
          <Link
            to="/student/profile"
            className={`flex items-center gap-2 sm:gap-3 p-1.5 sm:pr-3 rounded-xl transition-all duration-200 group ${
              isProfilePage
                ? "bg-blue-50"
                : "hover:bg-slate-50"
            }`}
          >
            {/* Initials */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 flex items-center justify-center font-bold text-sm border border-blue-100 shrink-0">
              {initials || "S"}
            </div>

            {/* Name and Email */}
            <div className="hidden sm:block text-left max-w-44">
              <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                {name}
              </p>

              <p className="text-xs text-slate-400 truncate mt-0.5">
                {email || "Student Account"}
              </p>
            </div>

            <ChevronRight
              size={17}
              className="hidden sm:block text-slate-400 group-hover:text-blue-600 transition-colors"
            />
          </Link>

        </div>
      </div>
    </header>
  );
}

export default Navbar;