import { useEffect, useState } from "react";
import axios from "axios";
import {
  ClipboardCheck,
  Clock3,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function StaffDashboard() {
  const { user } = useAuth();

  // Store dashboard data
  const [dashboardData, setDashboardData] = useState({
    totalAssigned: 0,
    pendingComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0,
    recentComplaints: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch staff dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/staff/complaints",
          {
            withCredentials: true,
          }
        );

        setDashboardData(response.data);
      } catch (error) {
        console.error("Staff dashboard error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Stats data
  const stats = [
    {
      title: "Total Assigned",
      count: dashboardData.totalAssigned,
      icon: ClipboardCheck,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Pending",
      count: dashboardData.pendingComplaints,
      icon: Clock3,
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      title: "In Progress",
      count: dashboardData.inProgressComplaints,
      icon: Wrench,
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      title: "Resolved",
      count: dashboardData.resolvedComplaints,
      icon: CheckCircle2,
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
  ];

  // Get status styling
  const getStatusStyle = (status) => {
    if (status === "Pending") {
      return {
        className: "bg-amber-50 text-amber-600",
        icon: Clock3,
      };
    }

    if (status === "In Progress") {
      return {
        className: "bg-indigo-50 text-indigo-600",
        icon: Clock3,
      };
    }

    if (status === "Resolved") {
      return {
        className: "bg-emerald-50 text-emerald-600",
        icon: CheckCircle2,
      };
    }

    return {
      className: "bg-slate-100 text-slate-600",
      icon: Clock3,
    };
  };

  return (
    <div className="p-4 sm:p-6 min-w-0">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">

        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Welcome back, {user?.name || "Staff"} 👋
          </h1>

          <p className="text-sm sm:text-base text-slate-500 mt-1">
            Here's an overview of your assigned maintenance complaints.
          </p>
        </div>

        <Link
          to="/staff/complaints"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shrink-0"
        >
          <ClipboardCheck size={17} />
          View Assigned Complaints
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
          Loading dashboard...
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600 break-words">
          {error}
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5">

            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5"
                >
                  <div className="flex items-center justify-between gap-3">

                    <div className="min-w-0">
                      <p className="text-sm text-slate-500">
                        {stat.title}
                      </p>

                      <h2 className="text-2xl font-bold text-slate-900 mt-2">
                        {stat.count}
                      </h2>
                    </div>

                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${stat.bgColor} ${stat.textColor} flex items-center justify-center shrink-0`}
                    >
                      <Icon size={21} />
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* Recent Assigned Complaints */}
          <div className="bg-white border border-slate-200 rounded-2xl mt-5 sm:mt-6 overflow-hidden min-w-0">

            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

              <div>
                <h2 className="font-semibold text-slate-900">
                  Recent Assigned Complaints
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Complaints assigned to you
                </p>
              </div>

              <Link
                to="/staff/complaints"
                className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 self-start sm:self-auto shrink-0"
              >
                View all
                <ArrowRight size={16} />
              </Link>

            </div>

            <div className="divide-y divide-slate-100">

              {dashboardData.recentComplaints.length > 0 ? (
                dashboardData.recentComplaints.map((complaint) => {
                  const statusStyle = getStatusStyle(complaint.status);
                  const StatusIcon = statusStyle.icon;

                  return (
                    <div
                      key={complaint._id}
                      className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/60 transition min-w-0"
                    >

                      <div className="flex items-start gap-3 sm:gap-4 min-w-0">

                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <ClipboardCheck size={20} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-400">
                            ID: {complaint._id.slice(-6).toUpperCase()}
                          </p>

                          <h3 className="text-sm font-semibold text-slate-800 mt-1 break-words">
                            {complaint.description}
                          </h3>

                          <p className="text-sm text-slate-500 mt-1 break-words">
                            {complaint.location}
                          </p>

                          <p className="text-xs text-slate-400 mt-1 break-words">
                            Reported by {complaint.studentId?.name || "Student"}
                          </p>
                        </div>

                      </div>

                      <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4 pl-0 sm:pl-14 lg:pl-0">

                        <span
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${statusStyle.className}`}
                        >
                          <StatusIcon size={14} />
                          {complaint.status}
                        </span>

                        <Link
                          to={`/staff/complaints/${complaint._id}`}
                          className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 shrink-0"
                        >
                          View
                          <ArrowRight size={16} />
                        </Link>

                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="p-8 sm:p-10 text-center">
                  <ClipboardCheck
                    size={35}
                    className="mx-auto text-slate-300 mb-3"
                  />

                  <p className="text-sm font-semibold text-slate-600">
                    No complaints assigned yet
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Complaints assigned by the admin will appear here.
                  </p>
                </div>
              )}

            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default StaffDashboard;