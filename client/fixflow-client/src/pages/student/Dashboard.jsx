import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  Plus,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const { user } = useAuth();

  const [dashboardData, setDashboardData] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0,
    recentComplaints: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/student/complaints",
          {
            withCredentials: true,
          }
        );

        setDashboardData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-4 sm:p-6">

      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">

        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Welcome back, {user?.name || "User"} 👋
          </h1>

          <p className="text-sm sm:text-base text-slate-500 mt-1">
            Track your maintenance complaints and their progress.
          </p>
        </div>

        <Link
          to="/student/report-issue"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium w-full sm:w-auto shrink-0"
        >
          <Plus size={18} />
          Report Issue
        </Link>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

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
            {dashboardData.totalComplaints}
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
            {dashboardData.pendingComplaints}
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
            {dashboardData.inProgressComplaints}
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
            {dashboardData.resolvedComplaints}
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Resolved
          </p>
        </div>

      </div>

      {/* Recent Complaints */}
      <div className="bg-white rounded-2xl border border-slate-200 mt-5 sm:mt-6 overflow-hidden">

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div>
            <h2 className="font-semibold text-slate-900">
              Recent Complaints
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Your latest maintenance requests
            </p>
          </div>

          <Link
            to="/student/my-complaints"
            className="flex items-center gap-1 text-sm text-blue-600 font-medium self-start sm:self-auto"
          >
            View all
            <ArrowRight size={16} />
          </Link>

        </div>

        {/* Complaint List */}
        <div className="divide-y divide-slate-100">

          {dashboardData.recentComplaints.map((complaint) => (
            <div
              key={complaint._id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >

              <div className="min-w-0">
                <p className="font-medium text-slate-800 break-words">
                  {complaint.description}
                </p>

                <p className="text-sm text-slate-400 mt-1 break-words">
                  {complaint.location}
                </p>
              </div>

              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold self-start shrink-0 ${
                  complaint.status === "Pending"
                    ? "bg-amber-50 text-amber-600"
                    : complaint.status === "In Progress"
                    ? "bg-indigo-50 text-indigo-600"
                    : complaint.status === "Resolved"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {complaint.status}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;