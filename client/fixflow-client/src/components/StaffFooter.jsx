import {
  Wrench,
  LayoutDashboard,
  ClipboardCheck,
  Bell,
  UserRound,
  ArrowUpRight,
  Heart,
} from "lucide-react";

import { Link } from "react-router-dom";

function StaffFooter() {
  return (
    <footer className="bg-white border-t border-slate-200">

      {/* Main Footer */}
      <div className="bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/70 px-6 sm:px-8 lg:px-12 pt-14 pb-12">

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand Section */}
          <div className="lg:col-span-2">

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-200">
                <Wrench size={25} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Fix<span className="text-blue-600">Flow</span>
                </h2>

                <p className="text-[10px] uppercase tracking-[2px] text-slate-400 font-semibold">
                  Staff Portal
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 text-slate-500 max-w-md">
              Helping maintenance teams manage assigned tasks,
              track repair progress and resolve campus issues
              efficiently.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Campus Maintenance Operations
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm">

              <li>
                <Link
                  to="/staff/dashboard"
                  className="flex items-center gap-3 text-slate-500 hover:text-blue-600 transition-colors"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/staff/complaints"
                  className="flex items-center gap-3 text-slate-500 hover:text-blue-600 transition-colors"
                >
                  <ClipboardCheck size={16} />
                  Assigned Complaints
                </Link>
              </li>

              <li>
                <Link
                  to="/staff/notifications"
                  className="flex items-center gap-3 text-slate-500 hover:text-blue-600 transition-colors"
                >
                  <Bell size={16} />
                  Notifications
                </Link>
              </li>

              <li>
                <Link
                  to="/staff/profile"
                  className="flex items-center gap-3 text-slate-500 hover:text-blue-600 transition-colors"
                >
                  <UserRound size={16} />
                  My Profile
                </Link>
              </li>

            </ul>
          </div>

          {/* Maintenance Support */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">
              Maintenance Support
            </h3>

            <p className="text-sm leading-7 text-slate-500 mb-5">
              Stay updated with assigned maintenance requests,
              start pending work and keep complaint resolution
              status up to date.
            </p>

            <Link
              to="/staff/complaints"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-indigo-700 transition-colors"
            >
              View Assigned Work
              <ArrowUpRight size={16} />
            </Link>
          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-100 bg-white">

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-xs text-slate-400 text-center md:text-left">
            © 2026 FixFlow. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-xs text-slate-400">
            Made with
            <Heart size={13} className="text-blue-500 fill-blue-500" />
            for a better campus experience
          </p>

        </div>

      </div>

    </footer>
  );
}

export default StaffFooter;