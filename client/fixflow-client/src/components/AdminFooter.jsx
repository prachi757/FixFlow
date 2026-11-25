import {
  ShieldCheck,
  LayoutDashboard,
  ClipboardList,
  Users,
  Bell,
  UserRound,
  ArrowUpRight,
  Heart,
} from "lucide-react";

import { Link } from "react-router-dom";

function AdminFooter() {
  return (
    <footer className="bg-white border-t border-slate-200">

      {/* Main Footer */}
      <div className="bg-gradient-to-br from-white via-indigo-50/50 to-blue-50/70 px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-10 sm:pb-12">

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">

          {/* Brand Section */}
          <div className="lg:col-span-2">

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                <ShieldCheck size={25} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Fix<span className="text-indigo-600">Flow</span>
                </h2>

                <p className="text-[10px] uppercase tracking-[2px] text-slate-400 font-semibold">
                  Admin Portal
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 text-slate-500 max-w-md">
              Manage campus maintenance efficiently with centralized
              complaint monitoring, staff assignment and transparent
              issue resolution.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
              Smart Campus Administration
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 sm:mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm">

              <li>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-3 text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/complaints"
                  className="flex items-center gap-3 text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  <ClipboardList size={16} />
                  Manage Complaints
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/users"
                  className="flex items-center gap-3 text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  <Users size={16} />
                  Manage Users
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/notifications"
                  className="flex items-center gap-3 text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  <Bell size={16} />
                  Notifications
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/profile"
                  className="flex items-center gap-3 text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  <UserRound size={16} />
                  My Profile
                </Link>
              </li>

            </ul>
          </div>

          {/* Administration Section */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 sm:mb-6">
              Administration
            </h3>

            <p className="text-sm leading-7 text-slate-500 mb-5">
              Oversee maintenance requests, review AI-generated
              classifications and assign complaints to the appropriate
              maintenance staff.
            </p>

            <Link
              to="/admin/complaints"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-blue-700 transition-colors"
            >
              Review Complaints
              <ArrowUpRight size={16} />
            </Link>
          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-100 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">

          <p className="text-xs text-slate-400 text-center md:text-left">
            © 2026 FixFlow. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-xs text-slate-400 text-center">
            Made with
            <Heart size={13} className="text-indigo-500 fill-indigo-500 shrink-0" />
            for a better campus experience
          </p>

        </div>

      </div>

    </footer>
  );
}

export default AdminFooter;