import { useEffect, useState } from "react";
import axios from "axios";
import {
  ClipboardList,
  Clock3,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminDashboard() {
  const { user } = useAuth();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/complaints",
          { withCredentials: true }
        );

        setComplaints(response.data);
      } catch (error) {
        console.error("Fetch complaints error:", error);
        setError("Failed to load complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Calculate dashboard statistics
  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const inProgressComplaints = complaints.filter(
    (complaint) => complaint.status === "In Progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  // Complaint categories
  const categories = [
    "Electrical",
    "Plumbing",
    "Furniture",
    "Cleaning",
    "Infrastructure",
  ];

  const categoryCounts = categories.map((category) => ({
    name: category,
    count: complaints.filter(
      (complaint) => complaint.category === category
    ).length,
  }));

  const maxCategoryCount = Math.max(
    ...categoryCounts.map((category) => category.count),
    1
  );

  // Status colors
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-600";

      case "In Progress":
        return "bg-indigo-50 text-indigo-600";

      case "Resolved":
        return "bg-emerald-50 text-emerald-600";

      case "Rejected":
        return "bg-red-50 text-red-600";

      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  return (
    <div className="p-4 sm:p-6 min-w-0">

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 break-words">
          Welcome back, {user?.name || "Admin"} 👋
        </h1>

        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Monitor and manage maintenance complaints.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">

        {/* Total Complaints */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ClipboardList size={21} />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            Total Complaints
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            {loading ? "..." : totalComplaints}
          </h2>
        </div>

        {/* Pending */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock3 size={21} />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            Pending
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            {loading ? "..." : pendingComplaints}
          </h2>
        </div>

        {/* In Progress */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Wrench size={21} />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            In Progress
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            {loading ? "..." : inProgressComplaints}
          </h2>
        </div>

        {/* Resolved */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={21} />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            Resolved
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            {loading ? "..." : resolvedComplaints}
          </h2>
        </div>

      </div>

      {/* Recent Complaints */}
      <div className="mt-6 sm:mt-8 bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

          <div className="min-w-0">
            <h2 className="font-semibold text-slate-900">
              Recent Complaints
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Latest maintenance requests submitted by students.
            </p>
          </div>

          <Link
            to="/admin/complaints"
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 shrink-0"
          >
            View all
            <ArrowRight size={16} />
          </Link>

        </div>

        <div className="divide-y divide-slate-100">

          {loading ? (
            <p className="p-4 sm:p-5 text-sm text-slate-500">
              Loading complaints...
            </p>
          ) : error ? (
            <p className="p-4 sm:p-5 text-sm text-red-500">
              {error}
            </p>
          ) : complaints.length === 0 ? (
            <p className="p-4 sm:p-5 text-sm text-slate-500">
              No complaints submitted yet.
            </p>
          ) : (
            complaints.slice(0, 3).map((complaint) => (
              <div
                key={complaint._id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:bg-slate-50/50"
              >

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-slate-800 mt-1 break-words">
                    {complaint.description}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1 break-words">
                    {complaint.location} • {complaint.category}
                  </p>
                </div>

                <div className="shrink-0">
                  <span
                    className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusStyle(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </span>
                </div>

              </div>
            ))
          )}

        </div>
      </div>

      {/* Category Overview */}
      <div className="mt-6 sm:mt-8 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">

        <h2 className="font-semibold text-slate-900">
          Complaint Categories
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Overview of reported maintenance issues.
        </p>

        <div className="mt-5 sm:mt-6 space-y-5">

          {categoryCounts.map((category) => (
            <div key={category.name}>

              <div className="flex justify-between items-center text-sm mb-2 gap-3">

                <span className="text-slate-600">
                  {category.name}
                </span>

                <span className="font-medium text-slate-800 shrink-0">
                  {loading ? "..." : category.count}
                </span>

              </div>

              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    width: `${
                      (category.count / maxCategoryCount) * 100
                    }%`,
                  }}
                />
              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;