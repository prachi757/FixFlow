import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="p-6">

      {/* Welcome */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, Prachi 👋
          </h1>

          <p className="text-slate-500 mt-1">
            Track your maintenance complaints and their progress.
          </p>
        </div>

        <Link
        to="/student/report-issue"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium"
        >
        <Plus size={18} />
        Report Issue
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Total */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ClipboardList size={21} />
            </div>

            <span className="text-xs text-slate-400">
              All time
            </span>
          </div>

          <p className="text-3xl font-bold text-slate-900 mt-5">
            12
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Total Complaints
          </p>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock3 size={21} />
          </div>

          <p className="text-3xl font-bold text-slate-900 mt-5">
            3
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Pending
          </p>
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <ClipboardList size={21} />
          </div>

          <p className="text-3xl font-bold text-slate-900 mt-5">
            4
          </p>

          <p className="text-sm text-slate-500 mt-1">
            In Progress
          </p>
        </div>

        {/* Resolved */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={21} />
          </div>

          <p className="text-3xl font-bold text-slate-900 mt-5">
            5
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Resolved
          </p>
        </div>

      </div>

      {/* Recent Complaints */}
      <div className="bg-white rounded-2xl border border-slate-200 mt-6">

        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Recent Complaints
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Your latest maintenance requests
            </p>
          </div>

          <button className="flex items-center gap-1 text-sm text-blue-600 font-medium">
            View all
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="divide-y divide-slate-100">

          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800">
                Ceiling fan not working
              </p>

              <p className="text-sm text-slate-400 mt-1">
                CF-1008 • Room 204
              </p>
            </div>

            <span className="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
              In Progress
            </span>
          </div>

          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800">
                Water leakage near bathroom
              </p>

              <p className="text-sm text-slate-400 mt-1">
                CF-1007 • Block A
              </p>
            </div>

            <span className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold">
              Pending
            </span>
          </div>

          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800">
                Corridor light replacement
              </p>

              <p className="text-sm text-slate-400 mt-1">
                CF-1005 • Floor 2
              </p>
            </div>

            <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
              Resolved
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;